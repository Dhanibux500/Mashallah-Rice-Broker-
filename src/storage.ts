import { Product, FAQ, Testimonial, SiteSettings, Lead, User } from './types';

const STORAGE_KEYS = {
  SETTINGS: 'mashallah_settings',
  PRODUCTS: 'mashallah_products',
  FAQS: 'mashallah_faqs',
  TESTIMONIALS: 'mashallah_testimonials',
  LEADS: 'mashallah_leads',
  USERS: 'mashallah_users',
  CURRENT_USER: 'mashallah_current_user',
};

const DEFAULT_SETTINGS: SiteSettings = {
  id: 'main',
  heroHeading: 'Mashallah Broker – Premium Gutka Rice Since 2005',
  heroSubheading: 'Connecting global buyers with the finest rice from Pakistan.',
  heroBannerUrl: 'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=2000',
  ownerBio:
    'With over two decades of experience in the rice trade, I ensure that every grain meets the highest standards of quality. My commitment is to build long-term relationships based on trust and excellence.',
  ownerPhotoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  aboutText:
    'Mashallah Broker started with a simple mission: to provide the world with the finest quality rice directly from the fertile lands of Pakistan. Over the years, we have grown into a trusted name in the global rice market, known for our integrity, quality, and customer-centric approach.',
  whyChooseUsItems: [
    {
      title: 'Quality Testing',
      icon: 'ShieldCheck',
      description: 'Rigorous quality checks at every stage.',
    },
    {
      title: 'Direct Mill Prices',
      icon: 'TrendingDown',
      description: 'Competitive pricing directly from mills.',
    },
    {
      title: 'All Pakistan delivery',
      icon: 'Truck',
      description: 'Reliable and timely delivery nationwide.',
    },
    {
      title: '24/7 Support',
      icon: 'Headset',
      description: 'Always available to assist you.',
    },
  ],
  contactAddress: 'Karachi, Pakistan',
  contactPhone: '+92 300 1234567',
  contactEmail: 'info@mashallahbroker.com',
  locationMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462562.8478711867!2d66.86278854415842!3d25.19320239617303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000',
  socialLinks: {
    facebook: 'https://facebook.com',
    whatsapp: 'https://wa.me/923001234567',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    tiktok: 'https://tiktok.com',
  },
  sectionVisibility: {
    hero: true,
    owner: true,
    products: true,
    about: true,
    whyChoose: true,
    testimonials: true,
    faq: true,
    contact: true,
  },
  logoUrl: '',
  theme: '',
};

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod1',
    name: 'Basmati',
    origin: 'Pakistan',
    price: '1200 USD/Ton',
    imageUrl:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
    description: 'Premium long-grain Basmati rice.',
    order: 1,
  },
  {
    id: 'prod2',
    name: '1121 Steam',
    origin: 'Lahore',
    price: '1100 USD/Ton',
    imageUrl:
      'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&q=80&w=800',
    description: 'Extra long grain steam rice.',
    order: 2,
  },
  {
    id: 'prod3',
    name: 'Irri-6',
    origin: 'Sindh',
    price: '450 USD/Ton',
    imageUrl:
      'https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?auto=format&fit=crop&q=80&w=800',
    description: 'High quality white rice.',
    order: 3,
  },
  {
    id: 'prod4',
    name: 'Super Kernel',
    origin: 'Punjab',
    price: '1050 USD/Ton',
    imageUrl:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
    description: 'Aromatic super kernel basmati.',
    order: 4,
  },
  {
    id: 'prod5',
    name: 'Brown Rice Organic',
    origin: 'Pakistan',
    price: '900 USD/Ton',
    imageUrl:
      'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&q=80&w=800',
    description: 'Healthy organic brown rice.',
    order: 5,
  },
  {
    id: 'prod6',
    name: 'Sella Rice',
    origin: 'Gujranwala',
    price: '950 USD/Ton',
    imageUrl:
      'https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?auto=format&fit=crop&q=80&w=800',
    description: 'Parboiled sella rice.',
    order: 6,
  },
];

const DEFAULT_FAQS: FAQ[] = [
  {
    id: 'faq1',
    question: 'What is the minimum order quantity?',
    answer:
      'Our minimum order quantity is typically 1 container (approx 20-25 tons) depending on the rice variety.',
    order: 1,
  },
  {
    id: 'faq2',
    question: 'Do you provide samples?',
    answer: 'Yes, we provide samples upon request. Shipping charges for samples may apply.',
    order: 2,
  },
  {
    id: 'faq3',
    question: 'What are your payment terms?',
    answer:
      'We usually work with Letter of Credit (L/C) at sight or Advance TT. Terms can be discussed based on the order volume.',
    order: 3,
  },
  {
    id: 'faq4',
    question: 'How long does shipping take?',
    answer:
      'Shipping times vary depending on the destination. Typically, it takes 15-30 days after order confirmation and payment.',
    order: 4,
  },
  {
    id: 'faq5',
    question: 'Is your rice certified?',
    answer:
      'Yes, our rice goes through strict quality testing and we can provide necessary certifications (SGS, Phytosanitary, etc.) upon request.',
    order: 5,
  },
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test1',
    name: 'Ahmed Khan',
    rating: 5,
    text: 'Mashallah Broker provided the best quality Basmati. Highly recommended for export.',
    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'test2',
    name: 'Sarah Trading Co.',
    rating: 5,
    text: 'Reliable and fast delivery. Abdul Sattar Bhayo is a man of his word.',
    imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'test3',
    name: 'Global Foods Inc.',
    rating: 4,
    text: 'Great prices for Irri-6. Will definitely do business again.',
    imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    createdAt: new Date().toISOString(),
  },
];

const DEFAULT_LEADS: Lead[] = [
  {
    id: 'lead_1',
    fullName: 'Tariq Mehmood',
    email: 'tariq.mehmood@grainstraders.ae',
    phone: '+971 50 123 4567',
    productInterest: 'Basmati',
    message: 'Interested in sourcing 5 containers of Premium Basmati to Dubai Jebel Ali port. Please quote CIF prices.',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'lead_2',
    fullName: 'David Sterling',
    email: 'd.sterling@ukfoodsupplies.co.uk',
    phone: '+44 20 7946 0192',
    productInterest: '1121 Steam',
    message: 'Looking for continuous supply of 1121 Steam rice for UK ethnic supermarket chain. Please send spec sheets.',
    status: 'contacted',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'lead_3',
    fullName: 'Kareem Al-Mansoor',
    email: 'kareem@riyadhgrain.sa',
    phone: '+966 55 987 6543',
    productInterest: 'Sella Rice',
    message: 'Need 100 metric tons of Sella Rice 1121 for Ramadan stock. Can we get samples in Riyadh?',
    status: 'closed',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
];

const DEFAULT_USERS: User[] = [
  {
    uid: 'user_admin',
    fullName: 'Abdul Sattar Bhayo',
    email: 'admin@mashallahBroker.com',
    role: 'admin',
    status: 'active',
    createdAt: new Date(Date.now() - 86400000 * 180).toISOString(),
  },
  {
    uid: 'user_trader_1',
    fullName: 'Tariq Mehmood',
    email: 'tariq.mehmood@grainstraders.ae',
    role: 'user',
    status: 'active',
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
  },
];

function getStored<T>(key: string, defaultVal: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(raw);
  } catch {
    return defaultVal;
  }
}

function setStored<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new Event('mashallah_storage_change'));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }
}

export const StorageService = {
  getSettings(): SiteSettings {
    return getStored<SiteSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  },
  saveSettings(settings: SiteSettings): void {
    setStored(STORAGE_KEYS.SETTINGS, settings);
  },

  getProducts(): Product[] {
    const list = getStored<Product[]>(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
    return list.sort((a, b) => a.order - b.order);
  },
  saveProduct(product: Product): void {
    const list = this.getProducts();
    const idx = list.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      list[idx] = product;
    } else {
      list.push({ ...product, order: list.length + 1 });
    }
    setStored(STORAGE_KEYS.PRODUCTS, list);
  },
  deleteProduct(id: string): void {
    const list = this.getProducts().filter((p) => p.id !== id);
    setStored(STORAGE_KEYS.PRODUCTS, list);
  },

  getFaqs(): FAQ[] {
    const list = getStored<FAQ[]>(STORAGE_KEYS.FAQS, DEFAULT_FAQS);
    return list.sort((a, b) => a.order - b.order);
  },
  saveFaq(faq: FAQ): void {
    const list = this.getFaqs();
    const idx = list.findIndex((f) => f.id === faq.id);
    if (idx >= 0) {
      list[idx] = faq;
    } else {
      list.push({ ...faq, order: list.length + 1 });
    }
    setStored(STORAGE_KEYS.FAQS, list);
  },
  deleteFaq(id: string): void {
    const list = this.getFaqs().filter((f) => f.id !== id);
    setStored(STORAGE_KEYS.FAQS, list);
  },

  getTestimonials(): Testimonial[] {
    return getStored<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS);
  },
  saveTestimonial(testimonial: Testimonial): void {
    const list = this.getTestimonials();
    const idx = list.findIndex((t) => t.id === testimonial.id);
    if (idx >= 0) {
      list[idx] = testimonial;
    } else {
      list.push(testimonial);
    }
    setStored(STORAGE_KEYS.TESTIMONIALS, list);
  },
  deleteTestimonial(id: string): void {
    const list = this.getTestimonials().filter((t) => t.id !== id);
    setStored(STORAGE_KEYS.TESTIMONIALS, list);
  },

  getLeads(): Lead[] {
    const list = getStored<Lead[]>(STORAGE_KEYS.LEADS, DEFAULT_LEADS);
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  addLead(lead: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead {
    const newLead: Lead = {
      ...lead,
      id: 'lead_' + Date.now(),
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    const list = this.getLeads();
    list.unshift(newLead);
    setStored(STORAGE_KEYS.LEADS, list);
    return newLead;
  },
  updateLeadStatus(id: string, status: 'new' | 'contacted' | 'closed'): void {
    const list = this.getLeads();
    const idx = list.findIndex((l) => l.id === id);
    if (idx >= 0) {
      list[idx].status = status;
      setStored(STORAGE_KEYS.LEADS, list);
    }
  },
  deleteLead(id: string): void {
    const list = this.getLeads().filter((l) => l.id !== id);
    setStored(STORAGE_KEYS.LEADS, list);
  },
  exportLeadsCsv(): void {
    const leads = this.getLeads();
    const headers = ['Name', 'Email', 'Phone', 'Product Interest', 'Status', 'Date', 'Message'];
    const rows = leads.map((l) => [
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.phone.replace(/"/g, '""')}"`,
      `"${l.productInterest.replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${new Date(l.createdAt).toLocaleDateString()}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'mashallah_leads.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  getUsers(): User[] {
    const list = getStored<User[]>(STORAGE_KEYS.USERS, DEFAULT_USERS);
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  toggleUserStatus(uid: string): void {
    const list = this.getUsers();
    const user = list.find((u) => u.uid === uid);
    if (user) {
      user.status = user.status === 'banned' ? 'active' : 'banned';
      setStored(STORAGE_KEYS.USERS, list);
    }
  },

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
    window.dispatchEvent(new Event('mashallah_auth_change'));
  },

  seedReset(): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(DEFAULT_FAQS));
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(DEFAULT_TESTIMONIALS));
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(DEFAULT_LEADS));
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    window.dispatchEvent(new Event('mashallah_storage_change'));
  },
};
