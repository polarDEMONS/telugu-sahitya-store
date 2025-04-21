
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminBooks from '@/components/admin/AdminBooks';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminInventory from '@/components/admin/AdminInventory';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FileText, Package, LayoutGrid, AlertCircle, CheckCircle2 } from 'lucide-react';
import { medusaClient } from '@/lib/medusa-client';

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('books');
  const [medusaStatus, setMedusaStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [medusaError, setMedusaError] = useState<string | null>(null);

  // Check Medusa connection
  React.useEffect(() => {
    const checkMedusaConnection = async () => {
      try {
        await medusaClient.getProducts();
        setMedusaStatus('connected');
      } catch (err: any) {
        setMedusaStatus('error');
        setMedusaError(err.message || 'Could not connect to Medusa server');
      }
    };

    checkMedusaConnection();
  }, []);

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
      
      {/* Medusa Connection Status */}
      {medusaStatus === 'checking' && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connecting to Medusa</AlertTitle>
          <AlertDescription>
            Attempting to connect to your Medusa e-commerce server...
          </AlertDescription>
        </Alert>
      )}
      
      {medusaStatus === 'connected' && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertTitle className="text-green-700">Connected to Medusa</AlertTitle>
          <AlertDescription className="text-green-600">
            Your admin panel is successfully connected to Medusa e-commerce backend.
          </AlertDescription>
        </Alert>
      )}
      
      {medusaStatus === 'error' && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            <p>{medusaError || 'Failed to connect to Medusa server'}</p>
            <p className="mt-2 text-sm">
              Make sure your Medusa server is running at http://localhost:9000 or update the URL in src/lib/medusa-client.ts
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Retry Connection
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
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
