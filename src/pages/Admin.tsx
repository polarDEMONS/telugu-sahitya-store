
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminBooks from '@/components/admin/AdminBooks';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminInventory from '@/components/admin/AdminInventory';

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
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-2">You do not have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ATAKA Admin Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
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
