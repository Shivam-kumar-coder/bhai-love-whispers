
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  min_quantity: number;
  max_quantity: number;
  description: string;
}

export const NewOrders: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [quantity, setQuantity] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedServiceData = services.find(s => s.id === selectedService);
  const totalPrice = selectedServiceData && quantity ? 
    (parseFloat(quantity) * selectedServiceData.price).toFixed(2) : '0.00';

  const handlePlaceOrder = async () => {
    if (!selectedService || !quantity || !targetUrl) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!selectedServiceData) return;

    const qty = parseInt(quantity);
    if (qty < selectedServiceData.min_quantity || qty > selectedServiceData.max_quantity) {
      toast({
        title: "Error",
        description: `Quantity must be between ${selectedServiceData.min_quantity} and ${selectedServiceData.max_quantity}`,
        variant: "destructive",
      });
      return;
    }

    try {
      setPlacing(true);
      
      // Check wallet balance first
      const { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', user?.id)
        .single();

      if (walletError) throw walletError;

      const orderTotal = parseFloat(totalPrice);
      if (wallet.balance < orderTotal) {
        toast({
          title: "Insufficient Balance",
          description: "Please add funds to your wallet first",
          variant: "destructive",
        });
        return;
      }

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id,
          service: selectedServiceData.name,
          quantity: qty,
          target_url: targetUrl,
          price: orderTotal,
          status: 'pending',
          start_count: 0,
          remains: qty
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Update wallet balance
      const { error: walletUpdateError } = await supabase
        .from('wallets')
        .update({ 
          balance: wallet.balance - orderTotal,
          total_spent: (wallet.total_spent || 0) + orderTotal
        })
        .eq('user_id', user?.id);

      if (walletUpdateError) throw walletUpdateError;

      // Create transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user?.id,
          type: 'order_payment',
          amount: -orderTotal,
          description: `Order #${order.id.slice(0, 8)} - ${selectedServiceData.name}`,
          status: 'completed'
        });

      if (transactionError) throw transactionError;

      toast({
        title: "Order Placed Successfully",
        description: `Your order for ${selectedServiceData.name} has been placed!`,
      });

      // Reset form
      setSelectedService('');
      setQuantity('');
      setTargetUrl('');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to place order",
        variant: "destructive",
      });
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New Orders</h1>
        <p className="text-muted-foreground">Place orders for social media marketing services</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Place New Order</CardTitle>
              <CardDescription>Select a service and specify your requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} - ${service.price}/unit
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedServiceData && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm mb-2">
                    <strong>Min:</strong> {selectedServiceData.min_quantity} | 
                    <strong> Max:</strong> {selectedServiceData.max_quantity} | 
                    <strong> Rate:</strong> ${selectedServiceData.price} per unit
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedServiceData.description}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min={selectedServiceData?.min_quantity}
                  max={selectedServiceData?.max_quantity}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetUrl">Target URL</Label>
                <Input
                  id="targetUrl"
                  type="url"
                  placeholder="Enter your social media URL"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-medium">
                    {selectedServiceData?.name || 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span className="font-medium">{quantity || '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rate:</span>
                  <span className="font-medium">
                    ${selectedServiceData?.price || '0.00'}/unit
                  </span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
              <Button 
                onClick={handlePlaceOrder} 
                className="w-full"
                disabled={!selectedService || !quantity || !targetUrl || placing}
              >
                {placing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  'Place Order'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
