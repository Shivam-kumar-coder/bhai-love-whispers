
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface AddFundsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddFundsDialog: React.FC<AddFundsDialogProps> = ({ isOpen, onOpenChange }) => {
  const [addAmount, setAddAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddFunds = async () => {
    if (!addAmount || parseFloat(addAmount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      setAddAmount('');
      toast({
        title: "Success",
        description: `$${addAmount} has been added to your wallet`,
      });
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Funds to Wallet</DialogTitle>
          <DialogDescription>
            Enter the amount you want to add to your wallet. Minimum amount is $10.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount (USD)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="50.00"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              min="10"
              step="0.01"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[25, 50, 100, 200].map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => setAddAmount(amount.toString())}
              >
                ${amount}
              </Button>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddFunds} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Add Funds'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
