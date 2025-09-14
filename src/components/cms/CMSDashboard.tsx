import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Users, 
  Briefcase, 
  MessageSquare, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useCMS } from './CMSProvider';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

export const CMSDashboard: React.FC = () => {
  const { services, portfolio, partners, formSubmissions } = useCMS();
  const { user } = useAuth();

  const stats = [
    {
      title: 'Services',
      value: services.length,
      icon: Briefcase,
      color: 'text-vibrant-purple',
      bgColor: 'bg-purple-100',
      link: '/admin/cms/services'
    },
    {
      title: 'Portfolio Items',
      value: portfolio.length,
      icon: FileText,
      color: 'text-vibrant-cyan',
      bgColor: 'bg-cyan-100',
      link: '/admin/cms/portfolio'
    },
    {
      title: 'Partners',
      value: partners.length,
      icon: Users,
      color: 'text-vibrant-orange',
      bgColor: 'bg-orange-100',
      link: '/admin/cms/partners'
    },
    {
      title: 'Form Submissions',
      value: formSubmissions.length,
      icon: MessageSquare,
      color: 'text-vibrant-emerald',
      bgColor: 'bg-emerald-100',
      link: '/admin/cms/forms'
    }
  ];

  const recentSubmissions = formSubmissions
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-red-100 text-red-800';
      case 'read':
        return 'bg-yellow-100 text-yellow-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-vibrant-purple to-vibrant-pink text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {user?.profile?.full_name || user?.email}!
        </h2>
        <p className="text-purple-100">
          Manage your website content and monitor form submissions from this dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link key={index} to={stat.link}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Form Submissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Recent Form Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentSubmissions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No form submissions yet</p>
            ) : (
              <div className="space-y-3">
                {recentSubmissions.map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{submission.name}</p>
                      <p className="text-sm text-gray-600">{submission.email}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(submission.status)}>
                      {submission.status}
                    </Badge>
                  </div>
                ))}
                <Link to="/admin/cms/forms">
                  <Button variant="outline" className="w-full mt-4">
                    View All Submissions
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link to="/admin/cms/services">
                <Button variant="outline" className="w-full justify-start">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Manage Services
                </Button>
              </Link>
              <Link to="/admin/cms/portfolio">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Update Portfolio
                </Button>
              </Link>
              <Link to="/admin/cms/contact">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Edit Contact Info
                </Button>
              </Link>
              <Link to="/" target="_blank">
                <Button variant="outline" className="w-full justify-start">
                  <Home className="w-4 h-4 mr-2" />
                  View Live Site
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};