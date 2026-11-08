import { Product, FAQ, Testimonial, SiteSettings, Lead, User } from './types';
import { db, auth, testFirestoreConnection } from './firebase';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  getDocs,
  getDoc,
} from 'firebase/firestore';

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
  heroHeading: 'Mashallah Rice Broker – Trusted Rice Broker in Pakistan',
  heroSubheading: 'Connecting genuine rice buyers and verified mills across all Pakistan. 15+ years of trusted grain brokerage.',
  heroBannerUrl: 'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=2000',
  ownerBio:
    'With over 15 years of dedicated brokerage experience in Pakistan’s major grain markets, I personally facilitate transparent, secure deals between rice mills, exporters, and buyers. Based in Mirpur Mathelo, Sindh, we verify quality, coordinate fair pricing, and ensure seamless delivery nationwide.',
  ownerPhotoUrl: '/abdul-sattar-bhayo-rice-broker.jpg',
  aboutText:
    'Mashallah Rice Broker is an established rice brokerage firm founded by Abdul Sattar Bhayo, headquartered in Mirpur Mathelo, Sindh, providing brokerage services across all Pakistan. With over 15 years of market presence, we are an independent brokerage firm (not sellers or exporters). We bridge the gap between verified rice millers and genuine wholesale buyers, helping both parties negotiate transparent prices, verify physical grain samples, and coordinate secure delivery and payment. We earn our brokerage commission from both sides only after each deal is successfully concluded.',
  whyChooseUsItems: [
    {
      title: 'Verified Mill Network',
      icon: 'ShieldCheck',
      description: 'Direct connections with vetted, authentic rice mills and traders across Punjab and Sindh.',
    },
    {
      title: 'Transparent Market Rates',
      icon: 'TrendingDown',
      description: 'Daily market intelligence and fair rate negotiation without hidden markups.',
    },
    {
      title: 'All Pakistan Service',
      icon: 'Truck',
      description: 'Covering Karachi, Lahore, Gujranwala, Hafizabad, Larkana, and all nationwide grain hubs.',
    },
    {
      title: 'Sample & Quality Checks',
      icon: 'Headset',
      description: 'Physical grain inspection, moisture check, and honest sample verification before dispatch.',
    },
  ],
  contactAddress: 'Main Grain Market, Mirpur Mathelo, Sindh, Pakistan (Service Area: All Pakistan)',
  contactPhone: '03058102365 / 0333 3643891',
  contactEmail: 'info@mashallahbroker.com',
  locationMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113426.31427845781!2d69.4589979!3d27.9942478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393699b7f52478b1%3A0xe54e207b588db652!2sMirpur%20Mathelo%2C%20Ghotki%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000',
  socialLinks: {
    facebook: 'https://facebook.com',
    whatsapp: 'https://wa.me/923058102365',
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
    name: 'Super Kernel Basmati Rice',
    origin: 'Punjab, Pakistan',
    price: 'Market Competitive Rate',
    imageUrl:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
    description: 'Long aromatic grain, exceptional cooking length, ideal for export and premium domestic dining.',
    order: 1,
  },
  {
    id: 'prod2',
    name: '1121 Kainat Steam Rice',
    origin: 'Punjab / Sindh, Pakistan',
    price: 'Market Competitive Rate',
    imageUrl:
      'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&q=80&w=800',
    description: 'Extra-long grain 1121 steam rice with superior elongation, non-sticky texture, and high yield.',
    order: 2,
  },
  {
    id: 'prod3',
    name: 'Irri-6 White & Parboiled Rice',
    origin: 'Sindh, Pakistan',
    price: 'Direct Mill Rate',
    imageUrl:
      'https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?auto=format&fit=crop&q=80&w=800',
    description: 'Popular non-basmati long grain variety suited for mass catering, commercial trade, and bulk African/Middle East export.',
    order: 3,
  },
  {
    id: 'prod4',
    name: 'Irri-9 Long Grain Rice',
    origin: 'Sindh / Punjab, Pakistan',
    price: 'Direct Mill Rate',
    imageUrl:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
    description: 'Fine non-basmati long slender grain with excellent cooking properties at an economical market rate.',
    order: 4,
  },
  {
    id: 'prod5',
    name: 'Gutka / Sella Rice (Golden & Creamy)',
    origin: 'Sindh / Punjab, Pakistan',
    price: 'Market Competitive Rate',
    imageUrl:
      'https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?auto=format&fit=crop&q=80&w=800',
    description: 'Specialty parboiled sella and gutka rice varieties processed for strong durability and rich pilaf/biryani preparation.',
    order: 5,
  },
  {
    id: 'prod6',
    name: 'Parboiled (Sella) Long Grain Rice',
    origin: 'Pakistan Nationwide',
    price: 'Market Competitive Rate',
    imageUrl:
      'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&q=80&w=800',
    description: 'Nutrient-retained hydrothermal treated rice with hard grain resistance to breakage during cooking.',
    order: 6,
  },
];

const DEFAULT_FAQS: FAQ[] = [
  {
    id: 'faq1',
    question: 'What does a rice broker do in Pakistan?',
    answer:
      'A rice broker acts as an independent intermediary between rice buyers (wholesalers, exporters, retail brands) and rice sellers (mills, processors, stockists). Mashallah Rice Broker, led by Abdul Sattar Bhayo, connects genuine parties, assists in price discovery, inspects sample quality, coordinates contract terms, and facilitates smooth delivery across Pakistan.',
    order: 1,
  },
  {
    id: 'faq2',
    question: 'How do you help rice buyers find verified sellers and mills?',
    answer:
      'With over 15 years in the grain market, we have direct personal relationships with reputable rice mills across Sindh and Punjab. When a buyer specifies variety, grain length, and volume, we match them with verified suppliers capable of fulfilling the order with consistent quality and reliable dispatch.',
    order: 2,
  },
  {
    id: 'faq3',
    question: 'How do rice mills and sellers find genuine buyers through your brokerage?',
    answer:
      'We maintain an active network of vetted wholesale buyers, exporters, and domestic traders seeking continuous grain supply. We introduce ready buyers with confirmed purchasing intent, negotiate market-aligned prices, and facilitate contracts so millers can sell inventory rapidly.',
    order: 3,
  },
  {
    id: 'faq4',
    question: 'How does the brokerage commission work?',
    answer:
      'As a professional brokerage firm, we earn a standard commission paid by both the buyer and the seller only after a trade is successfully concluded and agreed upon. This ensures our interests are completely aligned with delivering honest terms and a smooth transaction for both parties.',
    order: 4,
  },
  {
    id: 'faq5',
    question: 'Is it safe to trade rice through Abdul Sattar Bhayo and Mashallah Rice Broker?',
    answer:
      'Yes, absolute safety and trust are the cornerstones of our 15+ years of operation. We vet both sides of every transaction, inspect physical samples before loading, ensure mutual clarity on delivery terms, and remain personally reachable at all times until the truck arrives and payment is settled.',
    order: 5,
  },
  {
    id: 'faq6',
    question: 'Which varieties of Pakistani rice do you broker?',
    answer:
      'We broker all major Pakistani rice varieties including Super Kernel Basmati, 1121 Kainat (Steam, Sella, White), Irri-6, Irri-9, Gutka/Sella, Parboiled rice, Brown rice, and D-98, sourced from top harvesting belts in Punjab and Sindh.',
    order: 6,
  },
  {
    id: 'faq7',
    question: 'Can you assist with rice sample testing and quality verification?',
    answer:
      'Yes. Quality verification is an essential part of our brokerage service. We coordinate physical sample exchange, verify grain elongation, check moisture levels, inspect broken percentage, and confirm that dispatch matches agreed specifications.',
    order: 7,
  },
  {
    id: 'faq8',
    question: 'Where is Mashallah Rice Broker located, and what areas do you serve?',
    answer:
      'Our central brokerage desk is based in Mirpur Mathelo, Sindh, Pakistan. We actively serve clients nationwide, connecting mills and buyers in Karachi, Lahore, Gujranwala, Hafizabad, Larkana, Sukkur, Faisalabad, and all major commercial ports.',
    order: 8,
  },
  {
    id: 'faq9',
    question: 'How are payment and delivery coordinated?',
    answer:
      'We coordinate delivery schedules, truck loading, weight-bridge slips, and dispatch documentation. We assist both parties in establishing clear, mutually agreeable payment schedules (such as advance bank transfers, sight settlement, or delivery confirmation) so trade proceeds without dispute.',
    order: 9,
  },
  {
    id: 'faq10',
    question: 'How do I start buying or selling rice through Mashallah Rice Broker?',
    answer:
      'Simply call or WhatsApp Abdul Sattar Bhayo directly at 03058102365 (or 0333 3643891). You can also submit the inquiry form on our website with your required variety, destination, and volume, and our brokerage desk will get in touch immediately.',
    order: 10,
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

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Global initialization flag
let isFirebaseInitialized = false;

export const StorageService = {
  // Synchronous getters from local cache for instant UI rendering
  getSettings(): SiteSettings {
    return getStored<SiteSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  },

  async saveSettings(settings: SiteSettings): Promise<void> {
    setStored(STORAGE_KEYS.SETTINGS, settings);
    try {
      await setDoc(doc(db, 'settings', 'main'), settings);
    } catch (err) {
      console.warn('Firestore saveSettings warning:', err);
      handleFirestoreError(err, OperationType.WRITE, 'settings/main');
    }
  },

  getProducts(): Product[] {
    const list = getStored<Product[]>(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
    return list.sort((a, b) => a.order - b.order);
  },

  async saveProduct(product: Product): Promise<void> {
    const list = this.getProducts();
    const idx = list.findIndex((p) => p.id === product.id);
    const itemToSave = idx >= 0 ? product : { ...product, order: list.length + 1 };
    if (idx >= 0) {
      list[idx] = itemToSave;
    } else {
      list.push(itemToSave);
    }
    setStored(STORAGE_KEYS.PRODUCTS, list);

    try {
      await setDoc(doc(db, 'products', itemToSave.id), itemToSave);
    } catch (err) {
      console.warn('Firestore saveProduct warning:', err);
      handleFirestoreError(err, OperationType.WRITE, `products/${itemToSave.id}`);
    }
  },

  async deleteProduct(id: string): Promise<void> {
    const list = this.getProducts().filter((p) => p.id !== id);
    setStored(STORAGE_KEYS.PRODUCTS, list);

    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (err) {
      console.warn('Firestore deleteProduct warning:', err);
      handleFirestoreError(err, OperationType.DELETE, `products/${id}`);
    }
  },

  getFaqs(): FAQ[] {
    const list = getStored<FAQ[]>(STORAGE_KEYS.FAQS, DEFAULT_FAQS);
    return list.sort((a, b) => a.order - b.order);
  },

  async saveFaq(faq: FAQ): Promise<void> {
    const list = this.getFaqs();
    const idx = list.findIndex((f) => f.id === faq.id);
    const itemToSave = idx >= 0 ? faq : { ...faq, order: list.length + 1 };
    if (idx >= 0) {
      list[idx] = itemToSave;
    } else {
      list.push(itemToSave);
    }
    setStored(STORAGE_KEYS.FAQS, list);

    try {
      await setDoc(doc(db, 'faqs', itemToSave.id), itemToSave);
    } catch (err) {
      console.warn('Firestore saveFaq warning:', err);
      handleFirestoreError(err, OperationType.WRITE, `faqs/${itemToSave.id}`);
    }
  },

  async deleteFaq(id: string): Promise<void> {
    const list = this.getFaqs().filter((f) => f.id !== id);
    setStored(STORAGE_KEYS.FAQS, list);

    try {
      await deleteDoc(doc(db, 'faqs', id));
    } catch (err) {
      console.warn('Firestore deleteFaq warning:', err);
      handleFirestoreError(err, OperationType.DELETE, `faqs/${id}`);
    }
  },

  getTestimonials(): Testimonial[] {
    return getStored<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS);
  },

  async saveTestimonial(testimonial: Testimonial): Promise<void> {
    const list = this.getTestimonials();
    const idx = list.findIndex((t) => t.id === testimonial.id);
    if (idx >= 0) {
      list[idx] = testimonial;
    } else {
      list.push(testimonial);
    }
    setStored(STORAGE_KEYS.TESTIMONIALS, list);

    try {
      await setDoc(doc(db, 'testimonials', testimonial.id), testimonial);
    } catch (err) {
      console.warn('Firestore saveTestimonial warning:', err);
      handleFirestoreError(err, OperationType.WRITE, `testimonials/${testimonial.id}`);
    }
  },

  async deleteTestimonial(id: string): Promise<void> {
    const list = this.getTestimonials().filter((t) => t.id !== id);
    setStored(STORAGE_KEYS.TESTIMONIALS, list);

    try {
      await deleteDoc(doc(db, 'testimonials', id));
    } catch (err) {
      console.warn('Firestore deleteTestimonial warning:', err);
      handleFirestoreError(err, OperationType.DELETE, `testimonials/${id}`);
    }
  },

  /**
   * Publishes all current local device data (settings, products, FAQs) directly to Firestore
   * so all users worldwide immediately see the changes.
   */
  async syncAllLocalToCloud(): Promise<void> {
    const currentSettings = this.getSettings();
    const currentProducts = this.getProducts();
    const currentFaqs = this.getFaqs();

    try {
      await setDoc(doc(db, 'settings', 'main'), currentSettings);
      for (const prod of currentProducts) {
        await setDoc(doc(db, 'products', prod.id), prod);
      }
      for (const faq of currentFaqs) {
        await setDoc(doc(db, 'faqs', faq.id), faq);
      }
      window.dispatchEvent(new Event('mashallah_storage_change'));
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'syncAllLocalToCloud');
    }
  },

  getLeads(): Lead[] {
    const list = getStored<Lead[]>(STORAGE_KEYS.LEADS, DEFAULT_LEADS);
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async addLead(lead: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<Lead> {
    const newLead: Lead = {
      ...lead,
      id: 'lead_' + Date.now(),
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    const list = this.getLeads();
    list.unshift(newLead);
    setStored(STORAGE_KEYS.LEADS, list);

    try {
      await setDoc(doc(db, 'leads', newLead.id), newLead);
    } catch (err) {
      console.warn('Firestore addLead failed:', err);
    }
    return newLead;
  },

  async updateLeadStatus(id: string, status: 'new' | 'contacted' | 'closed'): Promise<void> {
    const list = this.getLeads();
    const idx = list.findIndex((l) => l.id === id);
    if (idx >= 0) {
      list[idx].status = status;
      setStored(STORAGE_KEYS.LEADS, list);
    }

    try {
      await updateDoc(doc(db, 'leads', id), { status });
    } catch (err) {
      console.warn('Firestore updateLeadStatus failed:', err);
    }
  },

  async deleteLead(id: string): Promise<void> {
    const list = this.getLeads().filter((l) => l.id !== id);
    setStored(STORAGE_KEYS.LEADS, list);

    try {
      await deleteDoc(doc(db, 'leads', id));
    } catch (err) {
      console.warn('Firestore deleteLead failed:', err);
    }
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

  async saveUser(user: User): Promise<void> {
    const list = this.getUsers();
    const idx = list.findIndex((u) => u.uid === user.uid || u.email.toLowerCase() === user.email.toLowerCase());
    if (idx >= 0) {
      list[idx] = user;
    } else {
      list.push(user);
    }
    setStored(STORAGE_KEYS.USERS, list);

    try {
      await setDoc(doc(db, 'users', user.uid), user);
    } catch (err) {
      console.warn('Firestore saveUser failed:', err);
    }
  },

  async toggleUserStatus(uid: string): Promise<void> {
    const list = this.getUsers();
    const user = list.find((u) => u.uid === uid);
    if (user) {
      const nextStatus = user.status === 'banned' ? 'active' : 'banned';
      user.status = nextStatus;
      setStored(STORAGE_KEYS.USERS, list);

      try {
        await updateDoc(doc(db, 'users', uid), { status: nextStatus });
      } catch (err) {
        console.warn('Firestore toggleUserStatus failed:', err);
      }
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

  /**
   * Initializes real-time synchronization with online Firestore database.
   * Listens to collections so that any change in one browser is instantly broadcast
   * and reflected in all other browsers and devices.
   */
  initRealtimeSync(): void {
    if (isFirebaseInitialized) return;
    isFirebaseInitialized = true;

    testFirestoreConnection();

    // 1. Sync Settings
    onSnapshot(
      doc(db, 'settings', 'main'),
      (snap) => {
        if (snap.exists()) {
          const val = snap.data() as SiteSettings;
          setStored(STORAGE_KEYS.SETTINGS, val);
        } else {
          // First time initialization: seed default settings to cloud
          const current = StorageService.getSettings();
          setDoc(doc(db, 'settings', 'main'), current).catch(console.error);
        }
      },
      (error) => console.warn('Settings sync error:', error)
    );

    // 2. Sync Products
    onSnapshot(
      collection(db, 'products'),
      (snap) => {
        if (!snap.empty) {
          const list: Product[] = [];
          snap.forEach((d) => {
            list.push(d.data() as Product);
          });
          list.sort((a, b) => a.order - b.order);
          setStored(STORAGE_KEYS.PRODUCTS, list);
        } else {
          // First time initialization: seed default products to cloud
          const current = StorageService.getProducts();
          current.forEach((prod) => {
            setDoc(doc(db, 'products', prod.id), prod).catch(console.error);
          });
        }
      },
      (error) => console.warn('Products sync error:', error)
    );

    // 3. Sync FAQs
    onSnapshot(
      collection(db, 'faqs'),
      (snap) => {
        if (!snap.empty) {
          const list: FAQ[] = [];
          snap.forEach((d) => {
            list.push(d.data() as FAQ);
          });
          list.sort((a, b) => a.order - b.order);
          setStored(STORAGE_KEYS.FAQS, list);
        } else {
          const current = StorageService.getFaqs();
          current.forEach((faq) => {
            setDoc(doc(db, 'faqs', faq.id), faq).catch(console.error);
          });
        }
      },
      (error) => console.warn('FAQs sync error:', error)
    );

    // 4. Sync Testimonials
    onSnapshot(
      collection(db, 'testimonials'),
      (snap) => {
        if (!snap.empty) {
          const list: Testimonial[] = [];
          snap.forEach((d) => {
            list.push(d.data() as Testimonial);
          });
          setStored(STORAGE_KEYS.TESTIMONIALS, list);
        } else {
          const current = StorageService.getTestimonials();
          current.forEach((test) => {
            setDoc(doc(db, 'testimonials', test.id), test).catch(console.error);
          });
        }
      },
      (error) => console.warn('Testimonials sync error:', error)
    );

    // 5. Sync Secured Collections (Leads & Users: Only when authenticated)
    let unsubscribeLeads: (() => void) | null = null;
    let unsubscribeUsers: (() => void) | null = null;

    auth.onAuthStateChanged((user) => {
      if (user) {
        if (!unsubscribeLeads) {
          unsubscribeLeads = onSnapshot(
            collection(db, 'leads'),
            (snap) => {
              if (!snap.empty) {
                const list: Lead[] = [];
                snap.forEach((d) => {
                  list.push(d.data() as Lead);
                });
                list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setStored(STORAGE_KEYS.LEADS, list);
              }
            },
            (error) => {
              if (error.code !== 'permission-denied') {
                console.warn('Leads sync:', error.message);
              }
            }
          );
        }

        if (!unsubscribeUsers) {
          unsubscribeUsers = onSnapshot(
            collection(db, 'users'),
            (snap) => {
              if (!snap.empty) {
                const list: User[] = [];
                snap.forEach((d) => {
                  list.push(d.data() as User);
                });
                list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setStored(STORAGE_KEYS.USERS, list);
              }
            },
            (error) => {
              if (error.code !== 'permission-denied') {
                console.warn('Users sync:', error.message);
              }
            }
          );
        }
      } else {
        if (unsubscribeLeads) {
          unsubscribeLeads();
          unsubscribeLeads = null;
        }
        if (unsubscribeUsers) {
          unsubscribeUsers();
          unsubscribeUsers = null;
        }
      }
    });
  },
};
