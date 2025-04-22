
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from '@/components/ui/sonner';
import { AlertCircle, CreditCard, Check } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock function - In real application, connect to backend API
const saveRazorpayConfig = async (config: any) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true };
};

const AdminPayments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [webhookSecret, setWebhookSecret] = useState('');
  const [testResult, setTestResult] = useState<null | { success: boolean, message?: string }>(null);

  // Load saved configuration
  useEffect(() => {
    // In a real application, fetch from backend or local storage
    const savedConfig = localStorage.getItem('razorpayConfig');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        setApiKey(config.apiKey || '');
        setSecretKey(config.secretKey || '');
        setWebhookSecret(config.webhookSecret || '');
        setIsLive(config.isLive || false);
      } catch (e) {
        console.error('Error parsing saved Razorpay config', e);
      }
    }
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Save to localStorage for demo purposes
      // In production, this should be sent to a secure backend
      const config = {
        apiKey,
        secretKey,
        webhookSecret,
        isLive
      };
      
      // Save to local storage for persistence between refreshes
      localStorage.setItem('razorpayConfig', JSON.stringify(config));
      
      // Mock API call
      await saveRazorpayConfig(config);
      
      toast.success("Razorpay configuration saved", {
        description: "Your payment gateway settings have been updated.",
        icon: <Check className="text-green-600" />
      });
    } catch (error: any) {
      toast.error("Failed to save configuration", {
        description: error.message || "An error occurred while saving your Razorpay settings.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async () => {
    setTestLoading(true);
    setTestResult(null);
    
    try {
      // Simulate testing the connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll just check if API key is provided
      if (apiKey && apiKey.length > 10) {
        setTestResult({ success: true, message: "Successfully connected to Razorpay API" });
        toast.success("Connection successful", {
          description: "Razorpay API connection test passed.",
        });
      } else {
        setTestResult({ success: false, message: "Invalid API key format" });
        toast.error("Connection failed", {
          description: "Could not connect to Razorpay with the provided credentials."
        });
      }
    } catch (error: any) {
      setTestResult({ success: false, message: error.message || "Connection failed" });
      toast.error("Connection test failed", {
        description: error.message || "An error occurred during the Razorpay connection test.",
      });
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Razorpay Integration
          </CardTitle>
          <CardDescription>
            Configure your Razorpay payment gateway settings for processing online payments.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="live-mode" className="flex items-center cursor-pointer">
              Live Mode
              <span className="ml-2 text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                {isLive ? "Production" : "Test"}
              </span>
            </Label>
            <Switch 
              id="live-mode" 
              checked={isLive} 
              onCheckedChange={setIsLive}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key {isLive ? "(Live)" : "(Test)"}</Label>
            <Input
              id="api-key"
              placeholder="rzp_live_xxxxxxxxxxxx or rzp_test_xxxxxxxxxxxx"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Your Razorpay API Key from the dashboard. Starts with rzp_live_ or rzp_test_
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secret-key">Secret Key {isLive ? "(Live)" : "(Test)"}</Label>
            <Input
              id="secret-key"
              type="password"
              placeholder="Enter your Razorpay secret key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Your secret key should be kept secure. This is used for server-side operations.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="webhook-secret">Webhook Secret (Optional)</Label>
            <Input
              id="webhook-secret"
              placeholder="Enter your webhook secret key"
              value={webhookSecret}
              onChange={(e) => setWebhookSecret(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Used to verify webhook requests from Razorpay for automated status updates.
            </p>
          </div>

          {testResult && (
            <Alert variant={testResult.success ? "default" : "destructive"} className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                {testResult.success ? "Connection Successful" : "Connection Failed"}
              </AlertTitle>
              <AlertDescription>
                {testResult.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={testConnection} 
            disabled={!apiKey || testLoading || isLoading}
          >
            {testLoading ? "Testing..." : "Test Connection"}
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!apiKey || !secretKey || isLoading}
          >
            {isLoading ? "Saving..." : "Save Configuration"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Analytics</CardTitle>
          <CardDescription>
            View payment transaction statistics and details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This feature will display payment analytics and transaction history in a future update.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;
