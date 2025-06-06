
import React from 'react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Wallet, Users, MessageSquare } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Orders',
      value: '1,234',
      icon: Package,
      trend: { value: '+12% from last month', isPositive: true }
    },
    {
      title: 'Wallet Balance',
      value: '$2,340.00',
      icon: Wallet,
      trend: { value: '+2.1% from last week', isPositive: true }
    },
    {
      title: 'Active Services',
      value: '23',
      icon: Users,
      trend: { value: '+5 new services', isPositive: true }
    },
    {
      title: 'Support Tickets',
      value: '3',
      icon: MessageSquare,
      trend: { value: '-2 from yesterday', isPositive: true }
    }
  ];

  const recentOrders = [
    { id: '1001', service: 'Instagram Followers', quantity: '1,000', status: 'Completed', amount: '$25.00' },
    { id: '1002', service: 'YouTube Likes', quantity: '500', status: 'Processing', amount: '$15.00' },
    { id: '1003', service: 'TikTok Views', quantity: '10,000', status: 'Pending', amount: '$35.00' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your account.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your latest service orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{order.service}</p>
                    <p className="text-sm text-muted-foreground">Qty: {order.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-3 text-left border rounded-lg hover:bg-accent transition-colors">
                <p className="font-medium">Place New Order</p>
                <p className="text-sm text-muted-foreground">Browse and order social media services</p>
              </button>
              <button className="w-full p-3 text-left border rounded-lg hover:bg-accent transition-colors">
                <p className="font-medium">Add Funds</p>
                <p className="text-sm text-muted-foreground">Top up your wallet balance</p>
              </button>
              <button className="w-full p-3 text-left border rounded-lg hover:bg-accent transition-colors">
                <p className="font-medium">Contact Support</p>
                <p className="text-sm text-muted-foreground">Get help with your orders</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
