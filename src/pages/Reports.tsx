import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Send, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Reports() {
  const [formData, setFormData] = useState({
    channel: '',
    sender: '',
    message: '',
    file: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Report Submitted Successfully",
      description: "Thank you for reporting this suspicious activity. Our team will investigate.",
      variant: "default",
    });

    // Reset form
    setFormData({
      channel: '',
      sender: '',
      message: '',
      file: null,
    });

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Report Suspicious Activity</h2>
        <p className="text-muted-foreground mt-2">
          Help us protect others by reporting potential scams and fraudulent activities
        </p>
      </div>

      {/* Alert Banner */}
      <Card className="border-warning/50 bg-warning/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
            <div>
              <h3 className="font-semibold text-warning">Important Reporting Guidelines</h3>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• Do not include personal information like passwords, SSN, or banking details</li>
                <li>• Provide as much detail as possible about the suspicious activity</li>
                <li>• Attach screenshots or files if they contain evidence (ensure they're safe)</li>
                <li>• Your report helps protect others from similar scams</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reporting Form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Report Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Channel Selection */}
            <div className="space-y-2">
              <Label htmlFor="channel">Communication Channel *</Label>
              <Select 
                value={formData.channel} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, channel: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select the type of communication" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SMS">SMS / Text Message</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Call">Phone Call</SelectItem>
                  <SelectItem value="Video">Video Call</SelectItem>
                  <SelectItem value="Social">Social Media</SelectItem>
                  <SelectItem value="Website">Suspicious Website</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sender Information */}
            <div className="space-y-2">
              <Label htmlFor="sender">Sender Information *</Label>
              <Input
                id="sender"
                value={formData.sender}
                onChange={(e) => setFormData(prev => ({ ...prev, sender: e.target.value }))}
                placeholder="Phone number, email address, website URL, or other identifier"
                required
              />
            </div>

            {/* Message Content */}
            <div className="space-y-2">
              <Label htmlFor="message">Message Content / Description *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Describe the suspicious activity, including any messages received, claims made, or actions requested. Include as much detail as possible."
                rows={6}
                required
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="file">Supporting Evidence (Optional)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload screenshots, files, or other evidence
                </p>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('file')?.click()}
                >
                  Choose File
                </Button>
                {formData.file && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {formData.file.name}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Report
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Recent Reports (Mock) */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Your Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: '1',
                type: 'Email',
                sender: 'fake@amaz0n.com',
                date: 'Jan 14, 2024',
                status: 'Under Review'
              },
              {
                id: '2',
                type: 'SMS',
                sender: '+1-800-555-FAKE',
                date: 'Jan 12, 2024',
                status: 'Confirmed Scam'
              },
              {
                id: '3',
                type: 'Call',
                sender: '+1-202-555-0199',
                date: 'Jan 10, 2024',
                status: 'Resolved'
              }
            ].map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div>
                    <p className="font-medium">{report.type} from {report.sender}</p>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {report.status === 'Confirmed Scam' && (
                    <CheckCircle className="h-4 w-4 text-success" />
                  )}
                  <span className={`text-sm px-2 py-1 rounded ${
                    report.status === 'Confirmed Scam' 
                      ? 'bg-success/10 text-success'
                      : report.status === 'Under Review'
                      ? 'bg-warning/10 text-warning'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {report.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}