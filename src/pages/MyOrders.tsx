
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Filter, Package, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Order {
  id: string;
  service: string;
  category: string;
  quantity: number;
  target: string;
  price: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  startCount: number;
  remains: number;
  dateCreated: string;
  dateCompleted?: string;
}

export const MyOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock orders data
  const orders: Order[] = [
    {
      id: '1001',
      service: 'Instagram Followers',
      category: 'Instagram',
      quantity: 1000,
      target: 'https://instagram.com/example',
      price: 25.00,
      status: 'completed',
      startCount: 1520,
      remains: 0,
      dateCreated: '2024-01-15T10:30:00Z',
      dateCompleted: '2024-01-16T14:20:00Z'
    },
    {
      id: '1002',
      service: 'YouTube Likes',
      category: 'YouTube',
      quantity: 500,
      target: 'https://youtube.com/watch?v=example',
      price: 15.00,
      status: 'processing',
      startCount: 245,
      remains: 200,
      dateCreated: '2024-01-16T09:15:00Z'
    },
    {
      id: '1003',
      service: 'TikTok Views',
      category: 'TikTok',
      quantity: 10000,
      target: 'https://tiktok.com/@example',
      price: 45.00,
      status: 'pending',
      startCount: 0,
      remains: 10000,
      dateCreated: '2024-01-16T15:45:00Z'
    },
    {
      id: '1004',
      service: 'Twitter Retweets',
      category: 'Twitter',
      quantity: 250,
      target: 'https://twitter.com/example/status/123',
      price: 12.50,
      status: 'cancelled',
      startCount: 45,
      remains: 250,
      dateCreated: '2024-01-14T11:20:00Z'
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.includes(searchTerm) ||
                         order.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || order.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending':
        return <Package className="h-4 w-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

  const getProgress = (order: Order) => {
    if (order.quantity === 0) return 0;
    return Math.round(((order.quantity - order.remains) / order.quantity) * 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your order history</p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Label htmlFor="search">Search Orders</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Order ID, service, or URL..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                  <SelectItem value="TikTok">TikTok</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setCategoryFilter('all');
              }}>
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          <CardDescription>
            Your order history and current order status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.service}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.quantity.toLocaleString()} units
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        {getProgress(order)}% Complete
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgress(order)}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {order.quantity - order.remains} / {order.quantity}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(order.dateCreated)}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${order.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Order Details - #{order.id}</DialogTitle>
                          <DialogDescription>
                            Complete information about your order
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Service</Label>
                              <p className="font-medium">{order.service}</p>
                            </div>
                            <div>
                              <Label>Category</Label>
                              <p className="font-medium">{order.category}</p>
                            </div>
                            <div>
                              <Label>Quantity</Label>
                              <p className="font-medium">{order.quantity.toLocaleString()}</p>
                            </div>
                            <div>
                              <Label>Price</Label>
                              <p className="font-medium">${order.price.toFixed(2)}</p>
                            </div>
                            <div>
                              <Label>Start Count</Label>
                              <p className="font-medium">{order.startCount.toLocaleString()}</p>
                            </div>
                            <div>
                              <Label>Remains</Label>
                              <p className="font-medium">{order.remains.toLocaleString()}</p>
                            </div>
                          </div>
                          <div>
                            <Label>Target URL</Label>
                            <p className="font-medium break-all">{order.target}</p>
                          </div>
                          <div>
                            <Label>Status</Label>
                            <Badge className={getStatusColor(order.status)}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(order.status)}
                                <span className="capitalize">{order.status}</span>
                              </div>
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Date Created</Label>
                              <p className="font-medium">{formatDate(order.dateCreated)}</p>
                            </div>
                            {order.dateCompleted && (
                              <div>
                                <Label>Date Completed</Label>
                                <p className="font-medium">{formatDate(order.dateCompleted)}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'You haven\'t placed any orders yet'}
              </p>
              {!searchTerm && statusFilter === 'all' && categoryFilter === 'all' && (
                <Button variant="outline">
                  Place Your First Order
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
