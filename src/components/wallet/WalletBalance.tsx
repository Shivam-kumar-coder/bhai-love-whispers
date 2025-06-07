
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, TrendingUp } from 'lucide-react';

interface WalletBalanceProps {
  balance: number;
}

export const WalletBalance: React.FC<WalletBalanceProps> = ({ balance }) => {
  return (
    <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Current Balance</CardTitle>
        <Wallet className="h-6 w-6" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">${balance.toFixed(2)}</div>
        <p className="text-blue-100 text-sm mt-2">
          Available for orders
        </p>
      </CardContent>
    </Card>
  );
};
