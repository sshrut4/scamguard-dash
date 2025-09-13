import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bell, 
  Shield, 
  User, 
  Smartphone, 
  Mail, 
  Volume2,
  Download,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const [settings, setSettings] = useState({
    // Notification Settings
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: true,
    soundAlerts: true,
    
    // Security Settings
    realTimeScanning: true,
    autoBlock: false,
    sensitivityLevel: 'medium',
    
    // Personal Information
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    
    // Privacy Settings
    shareAnonymousData: true,
    dataRetention: '1year',
  });

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Initiated",
      description: "Your data export will be sent to your email within 24 hours.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion Requested",
      description: "Please check your email for confirmation instructions.",
      variant: "destructive",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-muted-foreground mt-2">
          Manage your fraud protection preferences and account settings
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={settings.fullName}
                onChange={(e) => setSettings(prev => ({ ...prev, fullName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive scam alerts via email</p>
                </div>
              </div>
              <Switch
                checked={settings.emailAlerts}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailAlerts: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">SMS Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive critical alerts via text message</p>
                </div>
              </div>
              <Switch
                checked={settings.smsAlerts}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, smsAlerts: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Browser and app notifications</p>
                </div>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, pushNotifications: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Sound Alerts</p>
                  <p className="text-sm text-muted-foreground">Audio notifications for scam detection</p>
                </div>
              </div>
              <Switch
                checked={settings.soundAlerts}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, soundAlerts: checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Shield className="h-5 w-5" />
            Security & Protection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Real-time Scanning</p>
                <p className="text-sm text-muted-foreground">Continuously monitor for threats across all channels</p>
              </div>
              <Switch
                checked={settings.realTimeScanning}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, realTimeScanning: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-block Threats</p>
                <p className="text-sm text-muted-foreground">Automatically block confirmed scam sources</p>
              </div>
              <Switch
                checked={settings.autoBlock}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoBlock: checked }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Detection Sensitivity</Label>
              <Select 
                value={settings.sensitivityLevel} 
                onValueChange={(value) => setSettings(prev => ({ ...prev, sensitivityLevel: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Fewer false positives</SelectItem>
                  <SelectItem value="medium">Medium - Balanced detection</SelectItem>
                  <SelectItem value="high">High - Maximum protection</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Privacy & Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Share Anonymous Analytics</p>
                <p className="text-sm text-muted-foreground">Help improve scam detection by sharing anonymized data</p>
              </div>
              <Switch
                checked={settings.shareAnonymousData}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, shareAnonymousData: checked }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Data Retention Period</Label>
              <Select 
                value={settings.dataRetention} 
                onValueChange={(value) => setSettings(prev => ({ ...prev, dataRetention: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30days">30 Days</SelectItem>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                  <SelectItem value="indefinite">Indefinite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Data Management</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export My Data
                </Button>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="min-w-[120px]">
          Save Changes
        </Button>
      </div>
    </div>
  );
}