
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Wallet as WalletIcon, Plus, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

export const Wallet: React.FC = () => {
  const [balance] = useState(1250.50);
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'debit',
      amount: -25.00,
      description: 'Instagram Followers - Order #1001',
      status: 'completed',
      date: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      type: 'credit',
      amount: 100.00,
      description: 'Wallet Top-up via Credit Card',
      status: 'completed',
      date: '2024-01-14T15:45:00Z'
    },
    {
      id: '3',
      type: 'debit',
      amount: -15.00,
      description: 'YouTube Likes - Order #1002',
      status: 'completed',
      date: '2024-01-13T09:15:00Z'
    },
    {
      id: '4',
      type: 'credit',
      amount: 50.00,
      description: 'Bonus Credit',
      status: 'completed',
      date: '2024-01-12T12:00:00Z'
    }
  ];

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
      setIsAddFundsOpen(false);
      setAddAmount('');
      toast({
        title: "Success",
        description: `$${addAmount} has been added to your wallet`,
      });
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Wallet</h1>
        <p className="text-muted-foreground">Manage your funds and view transaction history</p>
      </div>

      {/* Wallet Balance Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <WalletIcon className="h-6 w-6" />
            Current Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-4">${balance.toFixed(2)}</div>
          <Dialog open={isAddFundsOpen} onOpenChange={setIsAddFundsOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="text-gray-900">
                <Plus className="h-4 w-4 mr-2" />
                Add Funds
              </Button>
            </DialogTrigger>
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
                <Button variant="outline" onClick={() => setIsAddFundsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddFunds} disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Add Funds'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <ArrowDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">-$340.00</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Added</CardTitle>
            <ArrowUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+$1,590.50</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent wallet transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {transaction.type === 'credit' ? (
                        <ArrowUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className="capitalize">{transaction.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
