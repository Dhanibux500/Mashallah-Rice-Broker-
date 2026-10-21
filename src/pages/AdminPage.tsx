import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Package,
  HelpCircle,
  Sliders,
  Download,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  UserCheck,
  UserX,
  Phone,
  Mail,
} from 'lucide-react';
import { SiteSettings, Product, FAQ, Lead, User } from '../types';
import { StorageService } from '../storage';

interface AdminPageProps {
  settings: SiteSettings;
  products: Product[];
  faqs: FAQ[];
  leads: Lead[];
  users: User[];
  currentUser: User | null;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  onRefreshData: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  settings,
  products,
  faqs,
  leads,
  users,
  currentUser,
  onNavigate,
  onLogout,
  onRefreshData,
}) => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'users' | 'leads' | 'products' | 'faqs' | 'content'
  >('dashboard');

  // Product Editing state
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  // FAQ Editing state
  const [editingFaq, setEditingFaq] = useState<Partial<FAQ> | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle Export CSV
  const handleExportCsv = () => {
    StorageService.exportLeadsCsv();
    showToast('Downloaded mashallah_leads.csv', 'success');
  };

  // Handle Lead Status Change
  const handleUpdateLeadStatus = (id: string, status: 'new' | 'contacted' | 'closed') => {
    StorageService.updateLeadStatus(id, status);
    onRefreshData();
    showToast('Lead status updated', 'success');
  };

  // Handle Delete Lead
  const handleDeleteLead = (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      StorageService.deleteLead(id);
      onRefreshData();
      showToast('Lead removed', 'success');
    }
  };

  // Handle Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.price) return;

    const prodToSave: Product = {
      id: editingProduct.id || 'prod_' + Date.now(),
      name: editingProduct.name || '',
      origin: editingProduct.origin || 'Pakistan',
      price: editingProduct.price || '',
      imageUrl:
        editingProduct.imageUrl ||
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
      description: editingProduct.description || '',
      order: editingProduct.order || products.length + 1,
    };

    StorageService.saveProduct(prodToSave);
    setEditingProduct(null);
    onRefreshData();
    showToast(editingProduct.id ? 'Product updated' : 'Product created', 'success');
  };

  // Handle Delete Product
  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      StorageService.deleteProduct(id);
      onRefreshData();
      showToast('Product deleted', 'success');
    }
  };

  // Handle Save FAQ
  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq?.question || !editingFaq?.answer) return;

    const faqToSave: FAQ = {
      id: editingFaq.id || 'faq_' + Date.now(),
      question: editingFaq.question || '',
      answer: editingFaq.answer || '',
      order: editingFaq.order || faqs.length + 1,
    };

    StorageService.saveFaq(faqToSave);
    setEditingFaq(null);
    onRefreshData();
    showToast(editingFaq.id ? 'FAQ updated' : 'FAQ created', 'success');
  };

  // Handle Delete FAQ
  const handleDeleteFaq = (id: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      StorageService.deleteFaq(id);
      onRefreshData();
      showToast('FAQ deleted', 'success');
    }
  };

  // Toggle user ban status
  const handleToggleUser = (uid: string) => {
    StorageService.toggleUserStatus(uid);
    onRefreshData();
    showToast('User status updated', 'success');
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveSettings(settingsForm);
    onRefreshData();
    showToast('Settings saved successfully!', 'success');
  };

  // Toggle Section Visibility
  const handleToggleSection = (sectionKey: string) => {
    const updated = {
      ...settingsForm,
      sectionVisibility: {
        ...settingsForm.sectionVisibility,
        [sectionKey]: !settingsForm.sectionVisibility[sectionKey],
      },
    };
    setSettingsForm(updated);
    StorageService.saveSettings(updated);
    onRefreshData();
  };

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'leads', icon: MessageSquare, label: 'Leads' },
    { id: 'products', icon: Package, label: 'Products' },
    { id: 'faqs', icon: HelpCircle, label: 'FAQs' },
    { id: 'content', icon: Sliders, label: 'Site Content' },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg flex items-center gap-2 text-white text-sm font-medium ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold font-serif">
              M
            </div>
            <h2 className="text-xl font-bold text-primary font-serif">Mashallah Admin</h2>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setEditingProduct(null);
                  setEditingFaq(null);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors text-left cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.id === 'leads' && leads.filter((l) => l.status === 'new').length > 0 && (
                  <span className="ml-auto bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {leads.filter((l) => l.status === 'new').length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer links */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={() => onNavigate('/')}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <ExternalLink size={16} />
            <span>View Live Site</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        {/* Top Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {activeTab === 'content' ? 'Site Content & Theme' : activeTab}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Logged in as {currentUser?.email || 'admin@mashallahBroker.com'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('/')}
            className="hidden sm:inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-xs cursor-pointer"
          >
            <ExternalLink size={16} />
            <span>Open Website</span>
          </button>
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                  <Package size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Active Products</p>
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                  <HelpCircle size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total FAQs</p>
                  <p className="text-2xl font-bold text-gray-900">{faqs.length}</p>
                </div>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-lg">Recent Inquiries & Leads</h3>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-sm font-medium text-primary hover:underline cursor-pointer"
                >
                  View All Leads
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3 font-medium">Date</th>
                      <th className="px-6 py-3 font-medium">Buyer</th>
                      <th className="px-6 py-3 font-medium">Product</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {leads.slice(0, 5).map((l) => (
                      <tr key={l.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 text-gray-500 text-xs">
                          {new Date(l.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{l.fullName}</div>
                          <div className="text-xs text-gray-500">{l.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-primary bg-primary/5 px-2.5 py-1 rounded-md text-xs">
                            {l.productInterest || 'General Inquiry'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                              l.status === 'new'
                                ? 'bg-blue-100 text-blue-800'
                                : l.status === 'contacted'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {l.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 max-w-xs truncate text-xs">
                          {l.message}
                        </td>
                      </tr>
                    ))}
                    {leads.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                          No leads submitted yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 text-lg">User Management</h3>
              <span className="text-xs text-gray-500">{users.length} registered accounts</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 font-medium">Joined</th>
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Email</th>
                    <th className="px-6 py-3 font-medium">Role</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((u) => (
                    <tr key={u.uid} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{u.fullName}</td>
                      <td className="px-6 py-4 text-gray-600">{u.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                            u.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                            u.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {u.role !== 'admin' && (
                          <button
                            onClick={() => handleToggleUser(u.uid)}
                            className={`px-3 py-1 rounded text-xs font-medium cursor-pointer ${
                              u.status === 'active'
                                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                : 'bg-green-50 text-green-600 hover:bg-green-100'
                            }`}
                          >
                            {u.status === 'active' ? (
                              <span className="flex items-center gap-1">
                                <UserX size={14} /> Ban User
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <UserCheck size={14} /> Unban
                              </span>
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Lead Management</h3>
                <p className="text-xs text-gray-500">Inquiries sent from the quote request form</p>
              </div>
              <button
                onClick={handleExportCsv}
                className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer shadow-xs"
              >
                <Download size={16} />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Client Info</th>
                    <th className="px-6 py-3 font-medium">Interest</th>
                    <th className="px-6 py-3 font-medium">Message</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.map((l) => (
                    <tr key={l.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 text-gray-500 text-xs whitespace-nowrap">
                        {new Date(l.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{l.fullName}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                          <Phone size={12} />
                          <a href={`tel:${l.phone}`} className="hover:underline">
                            {l.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                          <Mail size={12} />
                          <a href={`mailto:${l.email}`} className="hover:underline">
                            {l.email}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md text-xs">
                          {l.productInterest || 'General'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 max-w-sm text-xs leading-relaxed">
                        {l.message}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={l.status}
                          onChange={(e) =>
                            handleUpdateLeadStatus(
                              l.id,
                              e.target.value as 'new' | 'contacted' | 'closed'
                            )
                          }
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border outline-none cursor-pointer ${
                            l.status === 'new'
                              ? 'bg-blue-50 border-blue-200 text-blue-800'
                              : l.status === 'contacted'
                              ? 'bg-amber-50 border-amber-200 text-amber-800'
                              : 'bg-green-50 border-green-200 text-green-800'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteLead(l.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                        No leads found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {editingProduct !== null ? (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-100">
                <h3 className="font-bold text-lg mb-6 text-gray-900">
                  {editingProduct.id ? 'Edit Product' : 'Add New Product'}
                </h3>
                <form onSubmit={handleSaveProduct} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Basmati Super Kernel"
                        value={editingProduct.name || ''}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Origin *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Punjab, Pakistan"
                        value={editingProduct.origin || ''}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, origin: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Price (with unit) *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. 1150 USD/Ton"
                        value={editingProduct.price || ''}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, price: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Image URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={editingProduct.imageUrl || ''}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, imageUrl: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Product highlights, grain length, moisture content, etc."
                      value={editingProduct.description || ''}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover text-sm font-medium cursor-pointer shadow-xs"
                    >
                      Save Product
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 text-lg">Rice Products</h3>
                  <button
                    onClick={() => setEditingProduct({})}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus size={16} />
                    <span>Add Product</span>
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 text-base">{prod.name}</h4>
                          <p className="text-xs text-gray-500">
                            Origin: <span className="font-medium text-gray-700">{prod.origin}</span> |{' '}
                            Price: <span className="font-bold text-secondary">{prod.price}</span>
                          </p>
                          <p className="text-xs text-gray-600 line-clamp-1 mt-1">
                            {prod.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => setEditingProduct(prod)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {products.length === 0 && (
                    <div className="p-8 text-center text-gray-400">No products added yet.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FAQS TAB */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            {editingFaq !== null ? (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-100">
                <h3 className="font-bold text-lg mb-6 text-gray-900">
                  {editingFaq.id ? 'Edit FAQ' : 'Add FAQ'}
                </h3>
                <form onSubmit={handleSaveFaq} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Question *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. What is the minimum order quantity?"
                      value={editingFaq.question || ''}
                      onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Answer *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Detailed explanation..."
                      value={editingFaq.answer || ''}
                      onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setEditingFaq(null)}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover text-sm font-medium cursor-pointer shadow-xs"
                    >
                      Save FAQ
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 text-lg">Frequently Asked Questions</h3>
                  <button
                    onClick={() => setEditingFaq({})}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus size={16} />
                    <span>Add FAQ</span>
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {faqs.map((f) => (
                    <div
                      key={f.id}
                      className="p-6 flex justify-between items-start gap-4 hover:bg-gray-50/50 transition-colors"
                    >
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 text-base">{f.question}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{f.answer}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setEditingFaq(f)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit FAQ"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(f.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete FAQ"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {faqs.length === 0 && (
                    <div className="p-8 text-center text-gray-400">No FAQs added yet.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SITE CONTENT & THEME TAB */}
        {activeTab === 'content' && (
          <div className="space-y-8">
            {/* Section Visibility Toggles */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-100">
              <h3 className="font-bold text-lg mb-6 text-gray-900">Homepage Section Visibility</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Object.keys(settingsForm.sectionVisibility || {})
                  .filter((sec) => sec !== 'testimonials')
                  .map((sec) => {
                    const isVisible = settingsForm.sectionVisibility[sec];
                    return (
                      <button
                        key={sec}
                        onClick={() => handleToggleSection(sec)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border font-medium text-sm transition-all cursor-pointer ${
                          isVisible
                            ? 'border-green-200 bg-green-50 text-green-800'
                            : 'border-gray-200 bg-gray-50 text-gray-400'
                        }`}
                      >
                        <span className="capitalize">{sec}</span>
                        {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Content Customization Form */}
            <form
              onSubmit={handleSaveSettings}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-100 space-y-8"
            >
              <h3 className="font-bold text-lg border-b pb-3 text-gray-900">
                Site Branding & Settings
              </h3>

              {/* Branding & Theme Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Branding & Logo</h4>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">Logo URL</label>
                    <input
                      type="url"
                      placeholder="https://example.com/logo.png"
                      value={settingsForm.logoUrl || ''}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, logoUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Color Theme</h4>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">
                      Preset Palette
                    </label>
                    <select
                      value={settingsForm.theme || ''}
                      onChange={(e) => {
                        const theme = e.target.value;
                        setSettingsForm({ ...settingsForm, theme });
                        document.documentElement.className = theme;
                      }}
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
                    >
                      <option value="">Default (Green & Gold)</option>
                      <option value="theme-blue">Ocean Blue</option>
                      <option value="theme-red">Crimson Red</option>
                      <option value="theme-purple">Royal Purple</option>
                      <option value="theme-dark">Midnight Dark</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Hero Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">Hero Section</h4>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">Heading</label>
                    <input
                      type="text"
                      value={settingsForm.heroHeading}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, heroHeading: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">
                      Subheading
                    </label>
                    <textarea
                      rows={2}
                      value={settingsForm.heroSubheading}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, heroSubheading: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">
                      Background Banner Image URL
                    </label>
                    <input
                      type="url"
                      value={settingsForm.heroBannerUrl || ''}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, heroBannerUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                </div>

                {/* Founder Spotlight */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">Owner Spotlight</h4>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">Photo URL</label>
                    <input
                      type="url"
                      value={settingsForm.ownerPhotoUrl}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, ownerPhotoUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">Bio</label>
                    <textarea
                      rows={4}
                      value={settingsForm.ownerBio}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, ownerBio: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* About Us */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="font-semibold text-gray-700 mb-2">About Us Text</h4>
                <textarea
                  rows={4}
                  value={settingsForm.aboutText}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, aboutText: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              {/* Contact Information & Map */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">Contact Information</h4>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">Address</label>
                    <input
                      type="text"
                      value={settingsForm.contactAddress}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, contactAddress: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">Phone</label>
                    <input
                      type="text"
                      value={settingsForm.contactPhone}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, contactPhone: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">Email</label>
                    <input
                      type="email"
                      value={settingsForm.contactEmail}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, contactEmail: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">Google Maps Embed</h4>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">
                      Map Embed URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://www.google.com/maps/embed?pb=..."
                      value={settingsForm.locationMapUrl || ''}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, locationMapUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Go to Google Maps &gt; Share &gt; Embed a map &gt; Copy the "src" URL.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="font-semibold text-gray-700 mb-4">Social Media & WhatsApp</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">
                      WhatsApp Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://wa.me/923001234567"
                      value={settingsForm.socialLinks.whatsapp || ''}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          socialLinks: { ...settingsForm.socialLinks, whatsapp: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">
                      Facebook Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://facebook.com/..."
                      value={settingsForm.socialLinks.facebook || ''}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          socialLinks: { ...settingsForm.socialLinks, facebook: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">
                      LinkedIn Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/..."
                      value={settingsForm.socialLinks.linkedin || ''}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          socialLinks: { ...settingsForm.socialLinks, linkedin: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">
                      Instagram Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://instagram.com/..."
                      value={settingsForm.socialLinks.instagram || ''}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          socialLinks: { ...settingsForm.socialLinks, instagram: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer text-sm"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
