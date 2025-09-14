import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Briefcase, 
  Mail, 
  MessageSquare, 
  Settings,
  LogOut,
  User,
  Home
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export const CMSLayout: React.FC = () => {
  const { user, signOut, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/cms', roles: ['admin', 'editor'] },
    { icon: FileText, label: 'Content', path: '/admin/cms/content', roles: ['admin', 'editor'] },
    { icon: Briefcase, label: 'Services', path: '/admin/cms/services', roles: ['admin', 'editor'] },
    { icon: Users, label: 'Portfolio', path: '/admin/cms/portfolio', roles: ['admin', 'editor'] },
    { icon: Users, label: 'Partners', path: '/admin/cms/partners', roles: ['admin', 'editor'] },
    { icon: Mail, label: 'Contact Info', path: '/admin/cms/contact', roles: ['admin', 'editor'] },
    { icon: MessageSquare, label: 'Form Submissions', path: '/admin/cms/forms', roles: ['admin', 'editor'] },
    { icon: Settings, label: 'User Management', path: '/admin/cms/users', roles: ['admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role || 'user')
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={`${import.meta.env.BASE_URL}nayacode.svg`}
              alt="Naya Code" 
              className="h-8 w-auto" 
            />
          </Link>
        </div>
        
        <nav className="p-4">
          <div className="space-y-2">
            {filteredMenuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-vibrant-purple text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Info & Actions */}
        <div className="absolute bottom-0 left-0 right-0 w-64 p-4 border-t bg-white">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-vibrant-purple to-vibrant-pink rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.profile?.full_name || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                <Badge className="text-xs mt-1" variant="secondary">
                  {user?.role || 'user'}
                </Badge>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Link to="/admin/cms/profile" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  <User className="w-4 h-4 mr-1" />
                  Profile
                </Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  <Home className="w-4 h-4 mr-1" />
                  Site
                </Button>
              </Link>
            </div>
            
            <Button 
              onClick={handleSignOut}
              variant="destructive" 
              size="sm" 
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Content Management System
            </h1>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">
                {user?.role || 'user'}
              </Badge>
              <span className="text-sm text-gray-600">
                Welcome, {user?.profile?.full_name || user?.email}
              </span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};