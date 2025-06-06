
import React, { useState } from 'react';
import { WalletBalance } from '@/components/wallet/WalletBalance';
import { QuickStats } from '@/components/wallet/QuickStats';
import { TransactionHistory } from '@/components/wallet/TransactionHistory';

export const Wallet: React.FC = () => {
  const [balance] = useState(1250.50);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Wallet</h1>
        <p className="text-muted-foreground">Manage your funds and view transaction history</p>
      </div>

      {/* Wallet Balance Card */}
      <WalletBalance balance={balance} />

      {/* Quick Stats */}
      <QuickStats />

      {/* Transaction History */}
      <TransactionHistory />
    </div>
  );
};
