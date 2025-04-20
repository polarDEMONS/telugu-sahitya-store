
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Mock order data - in a real app, this would come from an API
const MOCK_ORDERS = [
  {
    id: 'ORD-001',
    customer: 'Rahul Sharma',
    email: 'rahul@example.com',
    date: '2025-04-15',
    total: 1250,
    status: 'Delivered',
    items: [
      { id: 'book-1', title: 'Telugu Stories for Kids', quantity: 2, price: 350 },
      { id: 'book-3', title: 'History of Telugu Literature', quantity: 1, price: 550 }
    ]
  },
  {
    id: 'ORD-002',
    customer: 'Priya Patel',
    email: 'priya@example.com',
    date: '2025-04-17',
    total: 980,
    status: 'Processing',
    items: [
      { id: 'book-5', title: 'Modern Telugu Poetry', quantity: 1, price: 580 },
      { id: 'book-7', title: 'Telugu Folk Tales', quantity: 1, price: 400 }
    ]
  },
  {
    id: 'ORD-003',
    customer: 'Arjun Reddy',
    email: 'arjun@example.com',
    date: '2025-04-18',
    total: 1780,
    status: 'Shipped',
    items: [
      { id: 'book-4', title: 'Telugu Dictionary', quantity: 1, price: 850 },
      { id: 'book-12', title: 'Classical Telugu Drama', quantity: 1, price: 930 }
    ]
  },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>
      
      {selectedOrder ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Order #{selectedOrder.id}</h3>
            <Button 
              variant="outline" 
              onClick={() => setSelectedOrder(null)}
            >
              Back to Orders
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Customer</p>
              <p>{selectedOrder.customer}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p>{selectedOrder.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Order Date</p>
              <p>{selectedOrder.date}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedOrder.status}
                onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
              >
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
                <option>Returned</option>
              </select>
            </div>
          </div>
          
          <h4 className="font-medium mb-2">Order Items</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedOrder.items.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>₹{item.quantity * item.price}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">Total:</TableCell>
                <TableCell className="font-bold">₹{selectedOrder.total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <div className="mt-6 flex space-x-4">
            <Button>Print Invoice</Button>
            <Button variant="outline">
              Update Shipping
            </Button>
          </div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>₹{order.total}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminOrders;
