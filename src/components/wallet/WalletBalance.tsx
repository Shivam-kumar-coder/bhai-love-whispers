
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet as WalletIcon, Plus } from 'lucide-react';
import { AddFundsDialog } from './AddFundsDialog';

interface WalletBalanceProps {
  balance: number;
}

export const WalletBalance: React.FC<WalletBalanceProps> = ({ balance }) => {
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);

  return (
    <>
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <WalletIcon className="h-6 w-6" />
            Current Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-4">${balance.toFixed(2)}</div>
          <Button 
            variant="secondary" 
            className="text-gray-900"
            onClick={() => setIsAddFundsOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Funds
          </Button>
        </CardContent>
      </Card>

      <AddFundsDialog 
        isOpen={isAddFundsOpen} 
        onOpenChange={setIsAddFundsOpen} 
      />
    </>
  );
};
