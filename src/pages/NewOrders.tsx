
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export const NewOrders: React.FC = () => {
  const [selectedService, setSelectedService] = useState('');
  const [quantity, setQuantity] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const { toast } = useToast();

  const services = [
    { id: 'ig-followers', name: 'Instagram Followers', price: 0.025, min: 100, max: 10000 },
    { id: 'ig-likes', name: 'Instagram Likes', price: 0.015, min: 50, max: 5000 },
    { id: 'yt-views', name: 'YouTube Views', price: 0.003, min: 1000, max: 100000 },
    { id: 'yt-likes', name: 'YouTube Likes', price: 0.02, min: 50, max: 2000 },
    { id: 'tiktok-views', name: 'TikTok Views', price: 0.0035, min: 1000, max: 50000 },
    { id: 'twitter-followers', name: 'Twitter Followers', price: 0.03, min: 100, max: 5000 },
  ];

  const selectedServiceData = services.find(s => s.id === selectedService);
  const totalPrice = selectedServiceData && quantity ? 
    (parseFloat(quantity) * selectedServiceData.price).toFixed(2) : '0.00';

  const handlePlaceOrder = () => {
    if (!selectedService || !quantity || !targetUrl) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate order placement
    toast({
      title: "Order Placed",
      description: `Your order for ${selectedServiceData?.name} has been placed successfully!`,
    });

    // Reset form
    setSelectedService('');
    setQuantity('');
    setTargetUrl('');
  };

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
                  <p className="text-sm">
                    <strong>Min:</strong> {selectedServiceData.min} | 
                    <strong> Max:</strong> {selectedServiceData.max} | 
                    <strong> Rate:</strong> ${selectedServiceData.price} per unit
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
                  min={selectedServiceData?.min}
                  max={selectedServiceData?.max}
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
                disabled={!selectedService || !quantity || !targetUrl}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
