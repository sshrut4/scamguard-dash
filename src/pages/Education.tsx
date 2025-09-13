import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Clock, 
  Phone, 
  Eye, 
  Shield, 
  ExternalLink,
  CheckCircle,
  XCircle,
  Lightbulb,
  Users
} from 'lucide-react';

const scamTactics = [
  {
    id: 1,
    title: 'Urgency and Time Pressure',
    description: 'Scammers create false deadlines to pressure victims into hasty decisions.',
    icon: Clock,
    examples: [
      'Your account will be closed in 24 hours',
      'Limited time offer - act now!',
      'Immediate action required'
    ],
    tips: [
      'Take time to think and verify',
      'Legitimate companies rarely demand immediate action',
      'Contact the company through official channels'
    ],
    color: 'text-destructive'
  },
  {
    id: 2,
    title: 'Threats and Intimidation',
    description: 'Using fear tactics to coerce victims into compliance.',
    icon: AlertTriangle,
    examples: [
      'Legal action will be taken',
      'Your account is suspended',
      'Warrant issued for your arrest'
    ],
    tips: [
      'Government agencies don\'t threaten via phone/email',
      'Verify through official websites',
      'Ask for written documentation'
    ],
    color: 'text-warning'
  },
  {
    id: 3,
    title: 'Fake Caller ID & Spoofing',
    description: 'Displaying fake phone numbers or sender information to appear legitimate.',
    icon: Phone,
    examples: [
      'Calls appearing from known companies',
      'Government agency phone numbers',
      'Local area codes to build trust'
    ],
    tips: [
      'Never trust caller ID alone',
      'Hang up and call back using official numbers',
      'Verify identity through multiple channels'
    ],
    color: 'text-primary'
  },
  {
    id: 4,
    title: 'Deepfakes and AI Manipulation',
    description: 'Using AI technology to create fake audio and video content.',
    icon: Eye,
    examples: [
      'Fake video calls from family members',
      'AI-generated voice messages',
      'Manipulated video evidence'
    ],
    tips: [
      'Ask questions only the real person would know',
      'Look for visual inconsistencies',
      'Verify through a separate communication channel'
    ],
    color: 'text-destructive'
  }
];

const protectionTips = [
  {
    category: 'Verification',
    tips: [
      'Always verify through official websites',
      'Use known contact information, not what\'s provided',
      'Ask for credentials and verify independently',
      'Cross-check information with multiple sources'
    ]
  },
  {
    category: 'Personal Information',
    tips: [
      'Never share passwords or PINs',
      'Don\'t provide SSN over phone/email',
      'Banks will never ask for full account details',
      'Keep personal information private on social media'
    ]
  },
  {
    category: 'Financial Safety',
    tips: [
      'Use secure payment methods',
      'Monitor bank statements regularly',
      'Enable account alerts and notifications',
      'Never pay with gift cards or wire transfers for services'
    ]
  },
  {
    category: 'Technology',
    tips: [
      'Keep software and security updates current',
      'Use reputable antivirus software',
      'Be cautious with public Wi-Fi',
      'Enable two-factor authentication'
    ]
  }
];

const redFlags = [
  'Requests for immediate payment',
  'Asks for personal information verification',
  'Threatens legal action or account closure',
  'Requests payment via gift cards or wire transfer',
  'Unsolicited contact claiming account issues',
  'Poor grammar or spelling in communications',
  'Urgent messages about family emergencies',
  'Offers that seem too good to be true'
];

export default function Education() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Scam Awareness & Education</h2>
        <p className="text-muted-foreground mt-2">
          Learn to identify and protect yourself from common fraud tactics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">56M</p>
                <p className="text-sm text-muted-foreground">Americans targeted by scams in 2023</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">$10B</p>
                <p className="text-sm text-muted-foreground">Lost to fraud in 2023</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">97%</p>
                <p className="text-sm text-muted-foreground">Prevention rate with awareness</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Common Scam Tactics */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Common Scam Tactics</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {scamTactics.map((tactic) => (
            <Card key={tactic.id} className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <tactic.icon className={`h-6 w-6 ${tactic.color}`} />
                  {tactic.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{tactic.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-destructive" />
                    Common Examples:
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {tactic.examples.map((example, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-destructive rounded-full" />
                        "{example}"
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Protection Tips:
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {tactic.tips.map((tip, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-success rounded-full" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Red Flags */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            Major Red Flags to Watch For
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {redFlags.map((flag, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <XCircle className="h-5 w-5 text-destructive shrink-0" />
                <span className="text-sm">{flag}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Protection Guidelines */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Protection Guidelines</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {protectionTips.map((category) => (
            <Card key={category.category} className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Resources */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold">Report Fraud:</h4>
              <div className="space-y-2 text-sm">
                <a href="https://reportfraud.ftc.gov" className="flex items-center gap-2 text-primary hover:underline">
                  <ExternalLink className="h-4 w-4" />
                  Federal Trade Commission (FTC)
                </a>
                <a href="https://ic3.gov" className="flex items-center gap-2 text-primary hover:underline">
                  <ExternalLink className="h-4 w-4" />
                  FBI Internet Crime Complaint Center
                </a>
                <a href="https://scamwatch.gov.au" className="flex items-center gap-2 text-primary hover:underline">
                  <ExternalLink className="h-4 w-4" />
                  ACMA Scamwatch
                </a>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Learn More:</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                  <ExternalLink className="h-4 w-4" />
                  AARP Fraud Watch Network
                </a>
                <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                  <ExternalLink className="h-4 w-4" />
                  Better Business Bureau Scam Tracker
                </a>
                <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                  <ExternalLink className="h-4 w-4" />
                  Consumer Protection Resources
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}