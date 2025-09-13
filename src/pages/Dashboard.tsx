import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertTriangle, Shield, TrendingUp, Users } from 'lucide-react';

const scamsByChannel = [
  { name: 'SMS', value: 45, color: '#ef4444' },
  { name: 'Email', value: 30, color: '#f97316' },
  { name: 'Phone', value: 20, color: '#eab308' },
  { name: 'Video Call', value: 5, color: '#dc2626' },
];

const riskyKeywords = [
  { keyword: 'Urgent Action Required', count: 124 },
  { keyword: 'Verify Account', count: 89 },
  { keyword: 'Suspended', count: 76 },
  { keyword: 'Click Here', count: 65 },
  { keyword: 'Limited Time', count: 54 },
];

const monthlyTrends = [
  { month: 'Jan', scams: 120 },
  { month: 'Feb', scams: 145 },
  { month: 'Mar', scams: 167 },
  { month: 'Apr', scams: 189 },
  { month: 'May', scams: 234 },
  { month: 'Jun', scams: 198 },
];

const stats = [
  {
    title: 'Total Scams Blocked',
    value: '1,247',
    change: '+12%',
    icon: Shield,
    color: 'text-success',
  },
  {
    title: 'Active Threats',
    value: '23',
    change: '-8%',
    icon: AlertTriangle,
    color: 'text-destructive',
  },
  {
    title: 'Protected Users',
    value: '8,432',
    change: '+24%',
    icon: Users,
    color: 'text-primary',
  },
  {
    title: 'Detection Rate',
    value: '97.8%',
    change: '+2.1%',
    icon: TrendingUp,
    color: 'text-success',
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Security Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Monitor and analyze fraud detection across all channels
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.change} from last month</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Scams by Channel - Pie Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Scams by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scamsByChannel}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {scamsByChannel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Risky Keywords - Bar Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Top Risky Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskyKeywords} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="keyword" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--destructive))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends - Line Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Monthly Scam Detection Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="scams" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}