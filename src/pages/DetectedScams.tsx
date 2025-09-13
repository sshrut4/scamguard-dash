import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MessageSquare, Video, AlertTriangle, Search, Filter } from 'lucide-react';
import { ScamDetailsModal } from '@/components/ScamDetailsModal';

interface ScamAlert {
  id: string;
  type: 'SMS' | 'Email' | 'Call' | 'Video';
  sender: string;
  subject?: string;
  content: string;
  riskScore: 'High' | 'Medium' | 'Low';
  timestamp: Date;
  keywords: string[];
  suspicious_elements: string[];
}

const mockScams: ScamAlert[] = [
  {
    id: '1',
    type: 'SMS',
    sender: '+1-800-555-0199',
    content: 'URGENT: Your account has been suspended. Click here immediately to verify: https://fake-bank-verify.com/login',
    riskScore: 'High',
    timestamp: new Date('2024-01-15T10:30:00'),
    keywords: ['URGENT', 'suspended', 'Click here', 'verify'],
    suspicious_elements: ['Suspicious URL', 'Urgency tactics', 'Fake domain']
  },
  {
    id: '2',
    type: 'Email',
    sender: 'security@amaz0n-security.com',
    subject: 'Action Required: Verify Your Amazon Account',
    content: 'Dear Customer, We have detected unusual activity on your account. Please verify your information within 24 hours or your account will be permanently suspended.',
    riskScore: 'High',
    timestamp: new Date('2024-01-15T09:15:00'),
    keywords: ['Action Required', 'unusual activity', 'verify', 'permanently suspended'],
    suspicious_elements: ['Misspelled domain', 'Threatening language', 'Generic greeting']
  },
  {
    id: '3',
    type: 'Call',
    sender: '+1-202-555-FAKE',
    content: 'This is Officer Johnson from the IRS. You have unpaid taxes and a warrant will be issued unless you pay immediately using gift cards.',
    riskScore: 'High',
    timestamp: new Date('2024-01-15T08:45:00'),
    keywords: ['IRS', 'warrant', 'immediately', 'gift cards'],
    suspicious_elements: ['Fake caller ID', 'Government impersonation', 'Gift card payment request']
  },
  {
    id: '4',
    type: 'Video',
    sender: 'tech-support@micr0soft.com',
    content: 'Video call claiming to be Microsoft tech support showing fake virus alerts on screen',
    riskScore: 'Medium',
    timestamp: new Date('2024-01-15T07:20:00'),
    keywords: ['tech support', 'virus', 'Microsoft'],
    suspicious_elements: ['Deepfake indicators', 'Company impersonation', 'Fake screen sharing']
  },
  {
    id: '5',
    type: 'Email',
    sender: 'noreply@payp4l-security.com',
    subject: 'Your PayPal Account Will Be Limited',
    content: 'We have noticed some unusual activity in your account. To avoid limitations, please log in and confirm your identity.',
    riskScore: 'Medium',
    timestamp: new Date('2024-01-14T16:30:00'),
    keywords: ['unusual activity', 'limitations', 'confirm identity'],
    suspicious_elements: ['Typosquatting domain', 'Account limitation threats']
  }
];

const getIcon = (type: string) => {
  switch (type) {
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

const getRiskBadgeColor = (risk: string) => {
  switch (risk) {
    case 'High':
      return 'bg-destructive text-destructive-foreground';
    case 'Medium':
      return 'bg-warning text-warning-foreground';
    case 'Low':
      return 'bg-success text-success-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export default function DetectedScams() {
  const [scams, setScams] = useState(mockScams);
  const [selectedScam, setSelectedScam] = useState<ScamAlert | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');

  const filteredScams = scams.filter(scam => {
    const matchesSearch = scam.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scam.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (scam.subject && scam.subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || scam.type === filterType;
    const matchesRisk = filterRisk === 'all' || scam.riskScore === filterRisk;
    
    return matchesSearch && matchesType && matchesRisk;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Detected Scam Alerts</h2>
        <p className="text-muted-foreground mt-2">
          Review and analyze detected fraud attempts across all channels
        </p>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search scams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="SMS">SMS</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Call">Call</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRisk} onValueChange={setFilterRisk}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="High">High Risk</SelectItem>
                <SelectItem value="Medium">Medium Risk</SelectItem>
                <SelectItem value="Low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Scam Alerts List */}
      <div className="grid gap-4">
        {filteredScams.map((scam) => (
          <Card key={scam.id} className="shadow-card hover:shadow-alert transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent">
                    {getIcon(scam.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{scam.type}</h3>
                      <Badge className={getRiskBadgeColor(scam.riskScore)}>
                        {scam.riskScore} Risk
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {scam.timestamp.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <p><span className="font-medium">From:</span> {scam.sender}</p>
                      {scam.subject && (
                        <p><span className="font-medium">Subject:</span> {scam.subject}</p>
                      )}
                      <p className="text-muted-foreground line-clamp-2">{scam.content}</p>
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {scam.keywords.slice(0, 3).map((keyword) => (
                          <Badge key={keyword} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                        {scam.keywords.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{scam.keywords.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setSelectedScam(scam)}
                  className="ml-4"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scam Details Modal */}
      {selectedScam && (
        <ScamDetailsModal
          scam={selectedScam}
          isOpen={!!selectedScam}
          onClose={() => setSelectedScam(null)}
        />
      )}
    </div>
  );
}