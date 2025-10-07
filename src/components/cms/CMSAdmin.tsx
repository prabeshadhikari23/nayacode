import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Eye, 
  EyeOff, 
  FileText, 
  Users, 
  Briefcase, 
  Mail,
  Settings,
  MessageSquare
} from 'lucide-react';
import { useCMS } from './CMSProvider';
import { 
  updateServices, 
  updatePortfolio, 
  updatePartners, 
  updateContactInfo,
  updateFormSubmission 
} from '@/lib/cms';
import { ServiceItem, PortfolioItem, PartnerItem, ContactInfo, FormSubmission } from '@/types/cms';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const CMSAdmin: React.FC = () => {
  const { 
    services, 
    portfolio, 
    partners, 
    contact, 
    formSubmissions, 
    isEditMode, 
    setEditMode, 
    refreshData 
  } = useCMS();

  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);
  const [editingPartner, setEditingPartner] = useState<PartnerItem | null>(null);
  const [editingContact, setEditingContact] = useState<ContactInfo | null>(null);

  // Loading state for better UX
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveService = (service: ServiceItem) => {
    setIsLoading(true);
    const updatedServices = editingService?.id 
      ? services.map(s => s.id === service.id ? service : s)
      : [...services, { ...service, id: Date.now().toString() }];
    
    updateServices(updatedServices).then(() => {
      refreshData();
      setIsLoading(false);
      toast.success('Service updated successfully');
    }).catch(() => {
      setIsLoading(false);
      toast.error('Failed to update service');
    });
    setEditingService(null);
  };

  const handleDeleteService = (id: string) => {
    setIsLoading(true);
    const updatedServices = services.filter(s => s.id !== id);
    updateServices(updatedServices).then(() => {
      refreshData();
      setIsLoading(false);
      toast.success('Service deleted successfully');
    }).catch(() => {
      setIsLoading(false);
      toast.error('Failed to delete service');
    });
  };

  const handleSavePortfolio = (item: PortfolioItem) => {
    setIsLoading(true);
    const updatedPortfolio = editingPortfolio?.id 
      ? portfolio.map(p => p.id === item.id ? item : p)
      : [...portfolio, { ...item, id: Date.now().toString() }];
    
    updatePortfolio(updatedPortfolio).then(() => {
      refreshData();
      setIsLoading(false);
      toast.success('Portfolio item updated successfully');
    }).catch(() => {
      setIsLoading(false);
      toast.error('Failed to update portfolio item');
    });
    setEditingPortfolio(null);
  };

  const handleDeletePortfolio = (id: string) => {
    setIsLoading(true);
    const updatedPortfolio = portfolio.filter(p => p.id !== id);
    updatePortfolio(updatedPortfolio).then(() => {
      refreshData();
      setIsLoading(false);
      toast.success('Portfolio item deleted successfully');
    }).catch(() => {
      setIsLoading(false);
      toast.error('Failed to delete portfolio item');
    });
  };

  const handleSavePartner = (partner: PartnerItem) => {
    setIsLoading(true);
    const updatedPartners = editingPartner?.id 
      ? partners.map(p => p.id === partner.id ? partner : p)
      : [...partners, { ...partner, id: Date.now().toString() }];
    
    updatePartners(updatedPartners).then(() => {
      refreshData();
      setIsLoading(false);
      toast.success('Partner updated successfully');
    }).catch(() => {
      setIsLoading(false);
      toast.error('Failed to update partner');
    });
    setEditingPartner(null);
  };

  const handleDeletePartner = (id: string) => {
    setIsLoading(true);
    const updatedPartners = partners.filter(p => p.id !== id);
    updatePartners(updatedPartners).then(() => {
      refreshData();
      setIsLoading(false);
      toast.success('Partner deleted successfully');
    }).catch(() => {
      setIsLoading(false);
      toast.error('Failed to delete partner');
    });
  };

  const handleSaveContact = (contactInfo: ContactInfo) => {
    setIsLoading(true);
    updateContactInfo(contactInfo).then(() => {
      refreshData();
      setIsLoading(false);
      toast.success('Contact information updated successfully');
    }).catch(() => {
      setIsLoading(false);
      toast.error('Failed to update contact information');
    });
    setEditingContact(null);
  };

  const handleFormStatusUpdate = (id: string, status: FormSubmission['status']) => {
    setIsLoading(true);
    updateFormSubmission(id, { status }).then(() => {
      refreshData();
      setIsLoading(false);
      toast.success('Form status updated');
    }).catch(() => {
      setIsLoading(false);
      toast.error('Failed to update form status');
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Management System</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => setEditMode(!isEditMode)}
              variant={isEditMode ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              {isEditMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="partners" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Partners
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="forms" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Forms
            </TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Manage Services</h2>
                <Button onClick={() => setEditingService({
                  id: '',
                  icon: 'Code',
                  title: '',
                  description: '',
                  features: [],
                  category: '',
                  order: services.length + 1
                })}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              </div>

              <div className="grid gap-4">
                {services.map((service) => (
                  <Card key={service.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{service.title}</CardTitle>
                          <Badge variant="secondary">{service.category}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setEditingService(service)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteService(service.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-2">{service.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {service.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline">{feature}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Manage Portfolio</h2>
                <Button onClick={() => setEditingPortfolio({
                  id: '',
                  title: '',
                  category: '',
                  description: '',
                  imageUrl: '',
                  tags: [],
                  featured: false,
                  order: portfolio.length + 1
                })}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Portfolio Item
                </Button>
              </div>

              <div className="grid gap-4">
                {portfolio.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{item.title}</CardTitle>
                          <Badge variant="secondary">{item.category}</Badge>
                          {item.featured && <Badge className="ml-2">Featured</Badge>}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setEditingPortfolio(item)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeletePortfolio(item.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-2">{item.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Partners Tab */}
          <TabsContent value="partners">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Manage Partners</h2>
                <Button onClick={() => setEditingPartner({
                  id: '',
                  name: '',
                  logo: '',
                  description: '',
                  category: '',
                  order: partners.length + 1
                })}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Partner
                </Button>
              </div>

              <div className="grid gap-4">
                {partners.map((partner) => (
                  <Card key={partner.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{partner.name}</CardTitle>
                          <Badge variant="secondary">{partner.category}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setEditingPartner(partner)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeletePartner(partner.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{partner.description}</p>
                      {partner.website && (
                        <a href={partner.website} className="text-blue-600 hover:underline text-sm">
                          {partner.website}
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Manage Contact Information</h2>
                <Button onClick={() => setEditingContact(contact)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Contact Info
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Current Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="font-semibold">Address</Label>
                    <p className="text-gray-600">{contact.address}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Phone Numbers</Label>
                    {contact.phone?.map((phone, idx) => (
                      <p key={idx} className="text-gray-600">{phone}</p>
                    ))}
                  </div>
                  <div>
                    <Label className="font-semibold">Email Addresses</Label>
                    {contact.email?.map((email, idx) => (
                      <p key={idx} className="text-gray-600">{email}</p>
                    ))}
                  </div>
                  <div>
                    <Label className="font-semibold">Business Hours</Label>
                    {contact.businessHours?.map((hours, idx) => (
                      <p key={idx} className="text-gray-600">{hours}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Form Submissions</h2>
              
              <div className="grid gap-4">
                {formSubmissions.map((submission) => (
                  <Card key={submission.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{submission.name}</CardTitle>
                          <p className="text-sm text-gray-600">{submission.email}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge 
                            variant={
                              submission.status === 'new' ? 'destructive' :
                              submission.status === 'read' ? 'default' :
                              submission.status === 'replied' ? 'secondary' : 'outline'
                            }
                          >
                            {submission.status}
                          </Badge>
                          <select
                            value={submission.status}
                            onChange={(e) => handleFormStatusUpdate(submission.id, e.target.value as any)}
                            className="text-xs border rounded px-2 py-1"
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {submission.subject && (
                        <p className="font-medium mb-2">Subject: {submission.subject}</p>
                      )}
                      <p className="text-gray-600 mb-2">{submission.message}</p>
                      {submission.phone && (
                        <p className="text-sm text-gray-500">Phone: {submission.phone}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Modals would go here - simplified for this implementation */}
    </div>
  );
};