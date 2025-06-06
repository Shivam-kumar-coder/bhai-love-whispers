
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  MessageSquare, 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Send 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'pending' | 'resolved' | 'closed';
  dateCreated: string;
  lastUpdated: string;
  messages: TicketMessage[];
}

interface TicketMessage {
  id: string;
  sender: 'user' | 'support';
  message: string;
  timestamp: string;
}

export const Support: React.FC = () => {
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: '',
    priority: '',
    message: ''
  });
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock tickets data
  const tickets: Ticket[] = [
    {
      id: 'T1001',
      subject: 'Order not delivered',
      category: 'Order Issues',
      priority: 'high',
      status: 'open',
      dateCreated: '2024-01-15T10:30:00Z',
      lastUpdated: '2024-01-16T14:20:00Z',
      messages: [
        {
          id: 'M1',
          sender: 'user',
          message: 'My order #1001 for Instagram followers has not been delivered yet. It\'s been 48 hours.',
          timestamp: '2024-01-15T10:30:00Z'
        },
        {
          id: 'M2',
          sender: 'support',
          message: 'Thank you for contacting us. We are looking into your order and will update you within 24 hours.',
          timestamp: '2024-01-15T15:45:00Z'
        }
      ]
    },
    {
      id: 'T1002',
      subject: 'Payment issue',
      category: 'Billing',
      priority: 'medium',
      status: 'resolved',
      dateCreated: '2024-01-12T09:15:00Z',
      lastUpdated: '2024-01-13T11:30:00Z',
      messages: [
        {
          id: 'M3',
          sender: 'user',
          message: 'I was charged twice for my wallet top-up.',
          timestamp: '2024-01-12T09:15:00Z'
        },
        {
          id: 'M4',
          sender: 'support',
          message: 'We have reviewed your payment and processed a refund for the duplicate charge.',
          timestamp: '2024-01-13T11:30:00Z'
        }
      ]
    },
    {
      id: 'T1003',
      subject: 'Account verification',
      category: 'Account',
      priority: 'low',
      status: 'closed',
      dateCreated: '2024-01-10T14:20:00Z',
      lastUpdated: '2024-01-11T16:45:00Z',
      messages: [
        {
          id: 'M5',
          sender: 'user',
          message: 'How do I verify my account?',
          timestamp: '2024-01-10T14:20:00Z'
        },
        {
          id: 'M6',
          sender: 'support',
          message: 'Account verification is automatic. Your account is already verified.',
          timestamp: '2024-01-11T16:45:00Z'
        }
      ]
    }
  ];

  const handleCreateTicket = async () => {
    if (!newTicket.subject || !newTicket.category || !newTicket.priority || !newTicket.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsCreateTicketOpen(false);
      setNewTicket({ subject: '', category: '', priority: '', message: '' });
      toast({
        title: "Success",
        description: "Your support ticket has been created successfully",
      });
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setNewMessage('');
      toast({
        title: "Message sent",
        description: "Your message has been sent to support",
      });
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'closed':
        return <CheckCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Support Center</h1>
          <p className="text-muted-foreground">Get help with your orders and account</p>
        </div>
        <Dialog open={isCreateTicketOpen} onOpenChange={setIsCreateTicketOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
              <DialogDescription>
                Describe your issue and we'll help you resolve it
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={newTicket.category} 
                    onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Order Issues">Order Issues</SelectItem>
                      <SelectItem value="Billing">Billing</SelectItem>
                      <SelectItem value="Account">Account</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority *</Label>
                  <Select 
                    value={newTicket.priority} 
                    onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue in detail..."
                  rows={4}
                  value={newTicket.message}
                  onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateTicketOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTicket} disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Ticket'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Support Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Open Tickets</p>
                <p className="text-2xl font-bold">
                  {tickets.filter(t => t.status === 'open').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold">
                  {tickets.filter(t => t.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Resolved</p>
                <p className="text-2xl font-bold">
                  {tickets.filter(t => t.status === 'resolved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium">Total Tickets</p>
                <p className="text-2xl font-bold">{tickets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Support Tickets</CardTitle>
          <CardDescription>
            Track the status of your support requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">#{ticket.id}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">{ticket.subject}</div>
                  </TableCell>
                  <TableCell>{ticket.category}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(ticket.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(ticket.status)}
                        <span className="capitalize">{ticket.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(ticket.lastUpdated)}</TableCell>
                  <TableCell className="text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Ticket #{ticket.id}</DialogTitle>
                          <DialogDescription>{ticket.subject}</DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                            <div>
                              <Label>Category</Label>
                              <p className="font-medium">{ticket.category}</p>
                            </div>
                            <div>
                              <Label>Priority</Label>
                              <Badge className={getPriorityColor(ticket.priority)}>
                                {ticket.priority.toUpperCase()}
                              </Badge>
                            </div>
                            <div>
                              <Label>Status</Label>
                              <Badge className={getStatusColor(ticket.status)}>
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(ticket.status)}
                                  <span className="capitalize">{ticket.status}</span>
                                </div>
                              </Badge>
                            </div>
                            <div>
                              <Label>Created</Label>
                              <p className="font-medium">{formatDate(ticket.dateCreated)}</p>
                            </div>
                          </div>

                          <div className="space-y-4 max-h-96 overflow-y-auto">
                            <h4 className="font-semibold">Conversation</h4>
                            {ticket.messages.map((message) => (
                              <div 
                                key={message.id}
                                className={`p-3 rounded-lg ${
                                  message.sender === 'user' 
                                    ? 'bg-blue-50 ml-8' 
                                    : 'bg-gray-50 mr-8'
                                }`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <span className="font-medium">
                                    {message.sender === 'user' ? 'You' : 'Support Team'}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {formatDate(message.timestamp)}
                                  </span>
                                </div>
                                <p className="text-sm">{message.message}</p>
                              </div>
                            ))}
                          </div>

                          {ticket.status === 'open' && (
                            <div className="space-y-2">
                              <Label htmlFor="newMessage">Add Message</Label>
                              <div className="flex gap-2">
                                <Textarea
                                  id="newMessage"
                                  placeholder="Type your message..."
                                  value={newMessage}
                                  onChange={(e) => setNewMessage(e.target.value)}
                                  rows={2}
                                  className="flex-1"
                                />
                                <Button 
                                  onClick={handleSendMessage}
                                  disabled={isLoading || !newMessage.trim()}
                                  size="sm"
                                >
                                  <Send className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {tickets.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No support tickets</h3>
              <p className="text-muted-foreground mb-4">
                You haven't created any support tickets yet
              </p>
              <Button onClick={() => setIsCreateTicketOpen(true)}>
                Create Your First Ticket
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
