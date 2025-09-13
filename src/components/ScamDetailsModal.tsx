import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  AlertTriangle, 
  Shield, 
  Eye, 
  Phone, 
  Mail, 
  MessageSquare, 
  Video,
  ExternalLink
} from 'lucide-react';

interface ScamDetailsModalProps {
  scam: {
    id: string;
    type: 'SMS' | 'Email' | 'Call' | 'Video';
    sender: string;
    subject?: string;
    content: string;
    riskScore: 'High' | 'Medium' | 'Low';
    timestamp: Date;
    keywords: string[];
    suspicious_elements: string[];
  };
  isOpen: boolean;
  onClose: () => void;
}

export function ScamDetailsModal({ scam, isOpen, onClose }: ScamDetailsModalProps) {
  const getIcon = () => {
    switch (scam.type) {
      case 'SMS':
        return <MessageSquare className="h-5 w-5" />;
      case 'Email':
        return <Mail className="h-5 w-5" />;
      case 'Call':
        return <Phone className="h-5 w-5" />;
      case 'Video':
        return <Video className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const highlightKeywords = (text: string, keywords: string[]) => {
    let highlightedText = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(
        regex, 
        '<mark class="bg-destructive/20 text-destructive font-semibold px-1 rounded">$1</mark>'
      );
    });
    return highlightedText;
  };

  const getRiskColor = () => {
    switch (scam.riskScore) {
      case 'High':
        return 'text-destructive';
      case 'Medium':
        return 'text-warning';
      case 'Low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {getIcon()}
            <DialogTitle className="text-2xl">Scam Alert Details</DialogTitle>
            <Badge className={`${scam.riskScore === 'High' ? 'bg-destructive' : scam.riskScore === 'Medium' ? 'bg-warning' : 'bg-success'}`}>
              {scam.riskScore} Risk
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Alert Banner */}
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <div>
                  <h3 className="font-semibold text-destructive">⚠️ This may be a scam, verify before proceeding</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Do not share personal information, passwords, or make payments. Always verify through official channels.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium">Type:</span>
                  <span className="ml-2">{scam.type}</span>
                </div>
                <div>
                  <span className="font-medium">From:</span>
                  <span className="ml-2 font-mono bg-muted px-2 py-1 rounded text-sm">{scam.sender}</span>
                </div>
                {scam.subject && (
                  <div>
                    <span className="font-medium">Subject:</span>
                    <span className="ml-2">{scam.subject}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium">Detected:</span>
                  <span className="ml-2">{scam.timestamp.toLocaleString()}</span>
                </div>
                <div>
                  <span className="font-medium">Risk Score:</span>
                  <span className={`ml-2 font-semibold ${getRiskColor()}`}>{scam.riskScore}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Suspicious Elements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {scam.suspicious_elements.map((element, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-destructive rounded-full" />
                      {element}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Content Analysis */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Content Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Message Content:</h4>
                <div 
                  className="p-4 bg-muted rounded-lg text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: highlightKeywords(scam.content, scam.keywords)
                  }}
                />
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Detected Risky Keywords:</h4>
                <div className="flex flex-wrap gap-2">
                  {scam.keywords.map((keyword) => (
                    <Badge key={keyword} variant="destructive" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Special indicators for different scam types */}
              {scam.type === 'Call' && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call Analysis
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-destructive rounded-full" />
                        <span>Fake Caller ID detected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-destructive rounded-full" />
                        <span>Voice pattern analysis indicates spoofing</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {scam.type === 'Video' && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Deepfake Analysis
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-destructive rounded-full" />
                        <span>Deepfake video markers detected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-destructive rounded-full" />
                        <span>Facial inconsistencies in video stream</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-destructive rounded-full" />
                        <span>Audio-visual synchronization anomalies</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4">
            <div className="space-x-2">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Report to Authorities
              </Button>
              <Button variant="outline" size="sm">
                Block Sender
              </Button>
            </div>
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}