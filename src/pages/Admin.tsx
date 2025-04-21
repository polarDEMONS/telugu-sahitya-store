
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminBooks from '@/components/admin/AdminBooks';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminInventory from '@/components/admin/AdminInventory';
import { FileText, Package, LayoutGrid } from 'lucide-react';

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('books');

  // Redirect non-authenticated users
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // In a real app, you would check if the user has admin rights
  // This is just a placeholder check using the email
  const isAdmin = user?.email === 'admin@ataka.com';

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="mt-2 mb-6">You do not have permission to access this page.</p>
          <Link 
            to="/" 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">ATAKA Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your products, orders, and inventory from this central dashboard.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="books" className="flex items-center justify-center">
            <LayoutGrid className="mr-2 h-4 w-4" />
            <span>Books</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center justify-center">
            <FileText className="mr-2 h-4 w-4" />
            <span>Orders</span>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center justify-center">
            <Package className="mr-2 h-4 w-4" />
            <span>Inventory</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="books">
          <AdminBooks />
        </TabsContent>
        
        <TabsContent value="orders">
          <AdminOrders />
        </TabsContent>
        
        <TabsContent value="inventory">
          <AdminInventory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
