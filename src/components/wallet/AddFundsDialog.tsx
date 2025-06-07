
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plus, CreditCard, Smartphone, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface AddFundsDialogProps {
  onFundsAdded: () => void;
}

export const AddFundsDialog: React.FC<AddFundsDialogProps> = ({ onFundsAdded }) => {
  const [amount, setAmount] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString());
  };

  const handlePhonePePayment = async () => {
    const amountValue = parseFloat(amount);
    if (!amountValue || amountValue < 1) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount (minimum $1)",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      // For demo purposes, we'll simulate a successful payment
      // In production, you would integrate with actual PhonePe API
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update wallet balance
      const { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('balance, total_added')
        .eq('user_id', user?.id)
        .single();

      if (walletError) throw walletError;

      const { error: updateError } = await supabase
        .from('wallets')
        .update({ 
          balance: (wallet.balance || 0) + amountValue,
          total_added: (wallet.total_added || 0) + amountValue,
          last_updated: new Date().toISOString()
        })
        .eq('user_id', user?.id);

      if (updateError) throw updateError;

      // Create transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user?.id,
          type: 'add_funds',
          amount: amountValue,
          description: `Funds added via PhonePe - $${amountValue}`,
          status: 'completed',
          payment_method: 'PhonePe',
          payment_id: `PP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        });

      if (transactionError) throw transactionError;

      toast({
        title: "Payment Successful",
        description: `$${amountValue} has been added to your wallet!`,
      });

      setAmount('');
      setIsOpen(false);
      onFundsAdded();
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message || "Failed to process payment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Funds
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Funds to Wallet</DialogTitle>
          <DialogDescription>
            Choose an amount to add to your wallet balance
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Quick Amount Selection */}
          <div>
            <Label className="text-sm font-medium">Quick Select</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {predefinedAmounts.map((value) => (
                <Button
                  key={value}
                  variant={amount === value.toString() ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAmountSelect(value)}
                >
                  ${value}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Custom Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Custom Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-muted-foreground">$</span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8"
                min="1"
                step="0.01"
              />
            </div>
          </div>

          {/* Payment Method */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                    <Smartphone className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">PhonePe</p>
                    <p className="text-xs text-muted-foreground">7870066085</p>
                  </div>
                </div>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Action Button */}
          <Button 
            onClick={handlePhonePePayment}
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={!amount || parseFloat(amount) < 1 || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <Smartphone className="mr-2 h-4 w-4" />
                Pay ${amount || '0'} with PhonePe
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Secure payment powered by PhonePe. Your funds will be added instantly.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
