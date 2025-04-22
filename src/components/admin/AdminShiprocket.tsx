
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Package } from "lucide-react";
import { shiprocket } from '@/modules/api/payment/payment-shipping';

export default function AdminShiprocket() {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const testConnection = async () => {
    setIsLoading(true);
    try {
      // Test connection using the shiprocket.createShipment with a test order
      const testOrder = {
        order_id: `test_${Date.now()}`,
        order_date: new Date().toISOString(),
        pickup_location: 'Test Location',
        billing_customer_name: 'Test Customer',
        billing_address: 'Test Address',
        billing_city: 'Test City',
        billing_state: 'Test State',
        billing_country: 'India',
        billing_pin_code: '123456',
        billing_email: 'test@example.com',
        billing_phone: '9999999999',
        shipping_is_billing: true,
        payment_method: 'prepaid' as 'prepaid' | 'COD', // Fix: Use proper type assertion
        sub_total: 100,
        length: 10,
        breadth: 10,
        height: 5,
        weight: 0.5,
        order_items: [{
          name: 'Test Item',
          sku: 'TEST001',
          units: 1,
          selling_price: 100,
        }]
      };

      const result = await shiprocket.createShipment(testOrder);
      
      if (result.shipment_id) {
        toast({
          title: "Connection Successful",
          description: "Successfully connected to Shiprocket API",
        });
      }
    } catch (error: any) {
      console.error('Shiprocket test connection error:', error);
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: error.message || "Could not connect to Shiprocket",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!token) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please enter your Shiprocket token",
      });
      return;
    }

    // Save token (in a real app, this would be saved securely)
    localStorage.setItem('shiprocket_token', token);
    toast({
      title: "Settings Saved",
      description: "Shiprocket configuration has been updated",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Shiprocket Settings</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>
            Configure your Shiprocket API credentials to enable shipping functionality.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="token" className="text-sm font-medium">
              Shiprocket Token
            </label>
            <Input
              id="token"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter your Shiprocket token"
            />
          </div>
          
          <div className="flex space-x-3">
            <Button onClick={handleSave}>
              Save Configuration
            </Button>
            <Button 
              variant="outline" 
              onClick={testConnection}
              disabled={isLoading}
            >
              <Package className="mr-2 h-4 w-4" />
              Test Connection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
