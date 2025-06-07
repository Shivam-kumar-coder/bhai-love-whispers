
import React, { useState, useEffect } from 'react';
import { WalletBalance } from '@/components/wallet/WalletBalance';
import { QuickStats } from '@/components/wallet/QuickStats';
import { TransactionHistory } from '@/components/wallet/TransactionHistory';
import { AddFundsDialog } from '@/components/wallet/AddFundsDialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface WalletData {
  balance: number;
  total_added: number;
  total_spent: number;
}

export const Wallet: React.FC = () => {
  const [walletData, setWalletData] = useState<WalletData>({
    balance: 0,
    total_added: 0,
    total_spent: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchWalletData();
    }
  }, [user]);

  const fetchWalletData = async () => {
    try {
      const { data, error } = await supabase
        .from('wallets')
        .select('balance, total_added, total_spent')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      
      setWalletData({
        balance: data.balance || 0,
        total_added: data.total_added || 0,
        total_spent: data.total_spent || 0
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load wallet data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFundsAdded = () => {
    fetchWalletData();
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Wallet</h1>
          <p className="text-muted-foreground">Manage your funds and view transaction history</p>
        </div>
        <AddFundsDialog onFundsAdded={handleFundsAdded} />
      </div>

      {/* Wallet Balance Card */}
      <WalletBalance balance={walletData.balance} />

      {/* Quick Stats */}
      <QuickStats 
        totalAdded={walletData.total_added}
        totalSpent={walletData.total_spent}
      />

      {/* Transaction History */}
      <TransactionHistory />
    </div>
  );
};
