import { useState, useEffect } from 'react';
import { AlertTriangle, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      const mockNotifications = [
        {
          id: Date.now().toString(),
          type: 'error' as const,
          title: 'Scam Alert Detected',
          message: '⚠️ Potential Scam Detected – Do not share OTP. Verify source immediately.',
          timestamp: new Date(),
        },
        {
          id: (Date.now() + 1).toString(),
          type: 'warning' as const,
          title: 'Suspicious Activity',
          message: 'Fake caller ID detected from +1-800-FAKE-NUM. Exercise caution.',
          timestamp: new Date(),
        },
        {
          id: (Date.now() + 2).toString(),
          type: 'info' as const,
          title: 'System Update',
          message: 'Fraud detection models updated with latest threat patterns.',
          timestamp: new Date(),
        }
      ];

      const randomNotification = mockNotifications[Math.floor(Math.random() * mockNotifications.length)];
      setNotifications(prev => [randomNotification, ...prev.slice(0, 4)]);
    }, 15000); // Show notification every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      default:
        return <Info className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="fixed top-20 right-6 z-50 space-y-3 max-w-sm">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={cn(
            "p-4 shadow-alert animate-slide-in border-l-4",
            notification.type === 'error' && "border-l-destructive bg-destructive/5",
            notification.type === 'warning' && "border-l-warning bg-warning/5",
            notification.type === 'info' && "border-l-primary bg-primary/5"
          )}
        >
          <div className="flex items-start gap-3">
            {getIcon(notification.type)}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{notification.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
              <div className="flex items-center gap-2 mt-3">
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeNotification(notification.id)}
                >
                  Dismiss
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 shrink-0"
              onClick={() => removeNotification(notification.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}