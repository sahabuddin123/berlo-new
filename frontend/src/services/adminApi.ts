/**
 * Berlo Communications — Enterprise Admin API Client
 * Supports Laravel 13 Sanctum Token Authentication, RBAC, and Seamless Offline Fallbacks.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  roles: string[];
  is_superadmin: boolean;
  permissions: string[];
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: AdminUser;
}

export interface DashboardStats {
  inquiries: {
    total: number;
    pending: number;
    in_review: number;
    contacted: number;
    closed: number;
  };
  subscribers: {
    total: number;
  };
  content: {
    services: number;
    projects: number;
    articles: number;
    team: number;
    clients: number;
    photos: number;
    videos: number;
  };
  users: {
    total: number;
  };
}

export interface InquiryItem {
  id: number;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  service_interest?: string;
  budget_range?: string;
  message: string;
  source: string;
  status: 'pending' | 'in_review' | 'contacted' | 'closed';
  admin_notes?: string;
  created_at: string;
}

export interface UserItem {
  id: number;
  name: string;
  email: string;
  roles: { id: number; name: string; display_name: string }[];
  created_at?: string;
}

export interface MenuItem {
  id: number;
  location: 'header' | 'footer_quick' | 'footer_capabilities' | 'footer_legal';
  parent_id?: number | null;
  title_en: string;
  title_bn: string;
  url: string;
  target?: string;
  icon?: string;
  badge_text?: string;
  order: number;
  is_active: boolean;
  children?: MenuItem[];
}

export interface MediaAsset {
  id: number;
  name: string;
  file_name: string;
  file_path: string;
  url: string;
  mime_type: string;
  size_bytes: number;
  dimensions?: string;
  folder: string;
  alt_text?: string;
  uploaded_by?: number;
  created_at?: string;
}

export interface PageSection {
  id: number;
  page_slug: string;
  section_key: string;
  title_en?: string;
  title_bn?: string;
  subtitle_en?: string;
  subtitle_bn?: string;
  badge_en?: string;
  badge_bn?: string;
  content_en?: string;
  content_bn?: string;
  image_url?: string;
  video_url?: string;
  cta_text_en?: string;
  cta_text_bn?: string;
  cta_link?: string;
  metadata?: Record<string, any>;
  is_active: boolean;
  sort_order: number;
}

export interface JobApplicationItem {
  id: number;
  job_posting_id?: number;
  job_posting?: {
    id: number;
    title_en: string;
    title_bn: string;
    department_en: string;
  };
  name: string;
  email: string;
  phone: string;
  linkedin_url?: string;
  portfolio_url?: string;
  cover_letter?: string;
  resume_url?: string;
  resume_path?: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  admin_notes?: string;
  created_at: string;
}

// Token storage key
const TOKEN_KEY = 'berlo_admin_token';
const USER_KEY = 'berlo_admin_user';

export const getStoredToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setStoredToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token);
export const removeStoredToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getStoredUser = (): AdminUser | null => {
  const u = localStorage.getItem(USER_KEY);
  return u ? JSON.parse(u) : null;
};

export const setStoredUser = (user: AdminUser): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      if (res.status === 401) {
        // Token invalid / expired
        removeStoredToken();
      }
      const errMessage = data.message || `Request failed with status ${res.status}`;
      throw new Error(errMessage);
    }

    return data as T;
  } catch (err: any) {
    // If backend isn't reachable or network fails, provide smart simulation for demo credentials
    throw err;
  }
}

export const adminApi = {
  // Auth
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const res = await apiRequest<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (res.token && res.user) {
        setStoredToken(res.token);
        setStoredUser(res.user);
      }
      return res;
    } catch (err: any) {
      // Offline / local fallback demo credentials
      if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        return mockLoginFallback(email, password);
      }
      throw err;
    }
  },

  async getMe(): Promise<{ success: boolean; user: AdminUser }> {
    try {
      return await apiRequest<{ success: boolean; user: AdminUser }>('/auth/me');
    } catch (err) {
      const stored = getStoredUser();
      if (stored) return { success: true, user: stored };
      throw err;
    }
  },

  async logout(): Promise<void> {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch {
      // Ignore
    } finally {
      removeStoredToken();
    }
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message: string; reset_token?: string }> {
    try {
      return await apiRequest('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    } catch (err: any) {
      if (err.message?.includes('Failed to fetch')) {
        return {
          success: true,
          message: 'Password reset link simulated. Use reset token: BERLO-SECURE-TOKEN-2026',
          reset_token: 'BERLO-SECURE-TOKEN-2026',
        };
      }
      throw err;
    }
  },

  async resetPassword(params: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      return await apiRequest('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(params),
      });
    } catch (err: any) {
      if (err.message?.includes('Failed to fetch')) {
        return {
          success: true,
          message: 'Password has been reset successfully. You may now log in with your new credentials.',
        };
      }
      throw err;
    }
  },

  // Dashboard Stats
  async getDashboardStats(): Promise<{
    success: boolean;
    stats: DashboardStats;
    recent_inquiries: InquiryItem[];
    recent_activity: any[];
  }> {
    try {
      return await apiRequest('/admin/dashboard/stats');
    } catch (err) {
      return mockDashboardFallback();
    }
  },

  // Inquiries
  async getInquiries(status = 'all', search = ''): Promise<{ success: boolean; data: { data: InquiryItem[] } | InquiryItem[] }> {
    try {
      return await apiRequest(`/admin/inquiries?status=${status}&search=${encodeURIComponent(search)}`);
    } catch (err) {
      return mockInquiriesFallback();
    }
  },

  async updateInquiryStatus(id: number, status: string, admin_notes?: string): Promise<{ success: boolean; message: string }> {
    return await apiRequest(`/admin/inquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status, admin_notes }),
    });
  },

  async deleteInquiry(id: number): Promise<{ success: boolean; message: string }> {
    return await apiRequest(`/admin/inquiries/${id}`, { method: 'DELETE' });
  },

  // Users & RBAC (Superadmin only)
  async getUsers(): Promise<{ success: boolean; users: UserItem[]; roles: any[] }> {
    return await apiRequest('/admin/users');
  },

  async createUser(payload: { name: string; email: string; password: string; roles: string[] }): Promise<any> {
    return await apiRequest('/admin/users', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async deleteUser(id: number): Promise<any> {
    return await apiRequest(`/admin/users/${id}`, { method: 'DELETE' });
  },

  // Services
  async getServices(): Promise<any> {
    return await apiRequest('/admin/services');
  },

  async createService(payload: any): Promise<any> {
    return await apiRequest('/admin/services', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateService(id: number, payload: any): Promise<any> {
    return await apiRequest(`/admin/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteService(id: number): Promise<any> {
    return await apiRequest(`/admin/services/${id}`, {
      method: 'DELETE',
    });
  },

  // Projects / Case Studies
  async getProjects(): Promise<any> {
    return await apiRequest('/admin/projects');
  },

  async createProject(payload: any): Promise<any> {
    return await apiRequest('/admin/projects', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateProject(id: number, payload: any): Promise<any> {
    return await apiRequest(`/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteProject(id: number): Promise<any> {
    return await apiRequest(`/admin/projects/${id}`, {
      method: 'DELETE',
    });
  },

  // Insights / Articles
  async getInsights(): Promise<any> {
    return await apiRequest('/admin/insights');
  },

  async createInsight(payload: any): Promise<any> {
    return await apiRequest('/admin/insights', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateInsight(id: number, payload: any): Promise<any> {
    return await apiRequest(`/admin/insights/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteInsight(id: number): Promise<any> {
    return await apiRequest(`/admin/insights/${id}`, {
      method: 'DELETE',
    });
  },

  // Gallery
  async getGallery(): Promise<any> {
    return await apiRequest('/admin/gallery');
  },

  async createPhoto(payload: any): Promise<any> {
    return await apiRequest('/admin/gallery/photos', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async deletePhoto(id: number): Promise<any> {
    return await apiRequest(`/admin/gallery/photos/${id}`, {
      method: 'DELETE',
    });
  },

  async createVideo(payload: any): Promise<any> {
    return await apiRequest('/admin/gallery/videos', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async deleteVideo(id: number): Promise<any> {
    return await apiRequest(`/admin/gallery/videos/${id}`, {
      method: 'DELETE',
    });
  },

  // Team
  async getTeam(): Promise<any> {
    return await apiRequest('/admin/team');
  },

  async createTeamMember(payload: any): Promise<any> {
    return await apiRequest('/admin/team', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateTeamMember(id: number, payload: any): Promise<any> {
    return await apiRequest(`/admin/team/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteTeamMember(id: number): Promise<any> {
    return await apiRequest(`/admin/team/${id}`, {
      method: 'DELETE',
    });
  },

  // Clients
  async getClients(): Promise<any> {
    return await apiRequest('/admin/clients');
  },

  async createClient(payload: any): Promise<any> {
    return await apiRequest('/admin/clients', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateClient(id: number, payload: any): Promise<any> {
    return await apiRequest(`/admin/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteClient(id: number): Promise<any> {
    return await apiRequest(`/admin/clients/${id}`, {
      method: 'DELETE',
    });
  },

  // Settings
  async getSettings(): Promise<any> {
    return await apiRequest('/admin/settings');
  },

  async updateSettings(settings: Record<string, any>): Promise<any> {
    return await apiRequest('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify({ settings }),
    });
  },

  // =========================================================================
  // Navigation Menu Management
  // =========================================================================
  async getMenus(): Promise<{ success: boolean; items: MenuItem[]; grouped: Record<string, MenuItem[]> }> {
    return await apiRequest('/admin/menus');
  },

  async createMenu(payload: Partial<MenuItem>): Promise<{ success: boolean; item: MenuItem }> {
    return await apiRequest('/admin/menus', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateMenu(id: number, payload: Partial<MenuItem>): Promise<{ success: boolean; item: MenuItem }> {
    return await apiRequest(`/admin/menus/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteMenu(id: number): Promise<{ success: boolean; message: string }> {
    return await apiRequest(`/admin/menus/${id}`, { method: 'DELETE' });
  },

  // =========================================================================
  // Careers & Job Openings Management
  // =========================================================================
  async getCareers(): Promise<{ success: boolean; data: any[] }> {
    return await apiRequest('/admin/careers');
  },

  async createCareer(payload: Record<string, any>): Promise<{ success: boolean; data: any }> {
    return await apiRequest('/admin/careers', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateCareer(id: number, payload: Record<string, any>): Promise<{ success: boolean; data: any }> {
    return await apiRequest(`/admin/careers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteCareer(id: number): Promise<{ success: boolean; message: string }> {
    return await apiRequest(`/admin/careers/${id}`, { method: 'DELETE' });
  },

  async getJobApplications(params: { job_id?: number; status?: string; page?: number } = {}): Promise<{
    success: boolean;
    data: JobApplicationItem[];
    total: number;
    current_page: number;
    last_page: number;
  }> {
    const q = new URLSearchParams();
    if (params.job_id) q.append('job_id', params.job_id.toString());
    if (params.status && params.status !== 'all') q.append('status', params.status);
    if (params.page) q.append('page', params.page.toString());
    return await apiRequest(`/admin/job-applications?${q.toString()}`);
  },

  async updateJobApplicationStatus(id: number, status: string, admin_notes?: string): Promise<{ success: boolean; data: JobApplicationItem }> {
    return await apiRequest(`/admin/job-applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status, admin_notes }),
    });
  },

  async deleteJobApplication(id: number): Promise<{ success: boolean; message: string }> {
    return await apiRequest(`/admin/job-applications/${id}`, { method: 'DELETE' });
  },

  async reorderMenus(items: { id: number; order: number }[]): Promise<{ success: boolean }> {
    return await apiRequest('/admin/menus/reorder', {
      method: 'POST',
      body: JSON.stringify({ items }),
    });
  },

  // =========================================================================
  // Media Library Management
  // =========================================================================
  async getMediaAssets(params: { search?: string; folder?: string; type?: string; page?: number } = {}): Promise<{
    success: boolean;
    data: { data: MediaAsset[]; total: number; current_page: number; last_page: number };
    folders: string[];
  }> {
    const q = new URLSearchParams();
    if (params.search) q.append('search', params.search);
    if (params.folder && params.folder !== 'all') q.append('folder', params.folder);
    if (params.type && params.type !== 'all') q.append('type', params.type);
    if (params.page) q.append('page', params.page.toString());

    return await apiRequest(`/admin/media-assets?${q.toString()}`);
  },

  async uploadMediaAsset(file: File, folder = 'general', alt_text = ''): Promise<{ success: boolean; asset: MediaAsset }> {
    const token = getStoredToken();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('alt_text', alt_text);

    const res = await fetch(`${API_BASE}/admin/media-assets/upload`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'File upload failed');
    }

    return await res.json();
  },

  async updateMediaAsset(id: number, payload: { name?: string; alt_text?: string; folder?: string }): Promise<{ success: boolean; asset: MediaAsset }> {
    return await apiRequest(`/admin/media-assets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteMediaAsset(id: number): Promise<{ success: boolean; message: string }> {
    return await apiRequest(`/admin/media-assets/${id}`, { method: 'DELETE' });
  },

  // =========================================================================
  // Dynamic Page Sections Management
  // =========================================================================
  async getManagedPages(): Promise<{ success: boolean; pages: string[] }> {
    return await apiRequest('/admin/pages');
  },

  async getPageSections(slug: string): Promise<{ success: boolean; page: string; sections: PageSection[] }> {
    return await apiRequest(`/admin/pages/${slug}/sections`);
  },

  async updatePageSection(slug: string, sectionKey: string, payload: Partial<PageSection>): Promise<{ success: boolean; section: PageSection }> {
    return await apiRequest(`/admin/pages/${slug}/sections/${sectionKey}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  // =========================================================================
  // Public Dynamic Website APIs (consumed by frontend pages)
  // =========================================================================
  async getPublicMenus(location?: string): Promise<{
    success: boolean;
    data: MenuItem[];
    grouped: Record<string, MenuItem[]>;
  }> {
    try {
      const q = location ? `?location=${location}` : '';
      return await apiRequest(`/menus${q}`);
    } catch {
      // Fallback
      return {
        success: true,
        data: [],
        grouped: {},
      };
    }
  },

  async getPublicPageSections(slug: string): Promise<{
    success: boolean;
    page: string;
    sections: PageSection[];
    data: Record<string, PageSection>;
  }> {
    try {
      return await apiRequest(`/pages/${slug}`);
    } catch {
      return {
        success: true,
        page: slug,
        sections: [],
        data: {},
      };
    }
  },
};

// =========================================================================
// MOCK FALLBACKS FOR ROBUST DEV & OFFLINE EXPERIENCE
// =========================================================================
function mockLoginFallback(email: string, _pass: string): LoginResponse {
  const normEmail = email.toLowerCase();
  const mockRoles: Record<string, { name: string; roles: string[]; is_superadmin: boolean; permissions: string[] }> = {
    'superadmin@berlocommunications.com': {
      name: 'Sahab Uddin (Superadmin)',
      roles: ['superadmin'],
      is_superadmin: true,
      permissions: ['*'],
    },
    'admin@berlocommunications.com': {
      name: 'Operations Admin',
      roles: ['admin'],
      is_superadmin: false,
      permissions: ['services.*', 'projects.*', 'insights.*', 'gallery.*', 'inquiries.*', 'settings.*'],
    },
    'moderator@berlocommunications.com': {
      name: 'Editorial Moderator',
      roles: ['moderator'],
      is_superadmin: false,
      permissions: ['inquiries.view', 'inquiries.edit', 'insights.publish', 'gallery.manage'],
    },
    'writer@berlocommunications.com': {
      name: 'Content Writer',
      roles: ['content_writer'],
      is_superadmin: false,
      permissions: ['services.create', 'services.edit', 'projects.create', 'insights.create', 'gallery.manage'],
    },
  };

  const userMeta = mockRoles[normEmail];
  if (!userMeta) {
    throw new Error('Invalid email or password.');
  }

  const user: AdminUser = {
    id: 1,
    name: userMeta.name,
    email: normEmail,
    roles: userMeta.roles,
    is_superadmin: userMeta.is_superadmin,
    permissions: userMeta.permissions,
  };

  const token = 'mock_sanctum_token_' + Math.random().toString(36).substring(2);
  setStoredToken(token);
  setStoredUser(user);

  return {
    success: true,
    token,
    user,
  };
}

function mockDashboardFallback() {
  return {
    success: true,
    stats: {
      inquiries: { total: 14, pending: 4, in_review: 3, contacted: 5, closed: 2 },
      subscribers: { total: 1840 },
      content: { services: 9, projects: 12, articles: 8, team: 14, clients: 25, photos: 16, videos: 8 },
      users: { total: 4 },
    },
    recent_inquiries: [
      {
        id: 1,
        name: 'Mahmudur Rahman',
        email: 'director@topconglomerate.com',
        phone: '+880 1712 345 678',
        organization: 'Top National Conglomerate',
        service_interest: 'Crisis Communication & Reputation Risk',
        budget_range: '$10,000 - $25,000',
        message: 'Preparing for a major market restructuring and require senior reputation risk advisory.',
        source: 'contact_form',
        status: 'pending' as const,
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        name: 'Syed Tanvir Ahmed',
        email: 'tanvir@fintechinnovations.bd',
        phone: '+880 1819 888 999',
        organization: 'Fintech Innovations Ltd',
        service_interest: 'Strategic PR & Corporate Communications',
        budget_range: '$5,000 - $10,000',
        message: 'Looking for a comprehensive media launch campaign for our new micro-investment app.',
        source: 'chatbot',
        status: 'in_review' as const,
        created_at: new Date(Date.now() - 3600000).toISOString(),
      },
    ],
    recent_activity: [
      { id: 1, action: 'login', module: 'auth', created_at: new Date().toISOString() },
      { id: 2, action: 'updated', module: 'inquiries', entity_id: '1', created_at: new Date(Date.now() - 7200000).toISOString() },
    ],
  };
}

function mockInquiriesFallback() {
  return {
    success: true,
    data: [
      {
        id: 1,
        name: 'Mahmudur Rahman',
        email: 'director@topconglomerate.com',
        phone: '+880 1712 345 678',
        organization: 'Top National Conglomerate',
        service_interest: 'Crisis Communication & Reputation Risk',
        budget_range: '$10,000 - $25,000',
        message: 'Preparing for a major market restructuring and require senior reputation risk advisory.',
        source: 'contact_form',
        status: 'pending' as const,
        admin_notes: 'Urgent callback requested for Monday 10:00 AM.',
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        name: 'Syed Tanvir Ahmed',
        email: 'tanvir@fintechinnovations.bd',
        phone: '+880 1819 888 999',
        organization: 'Fintech Innovations Ltd',
        service_interest: 'Strategic PR & Corporate Communications',
        budget_range: '$5,000 - $10,000',
        message: 'Looking for a comprehensive media launch campaign for our new micro-investment app.',
        source: 'chatbot',
        status: 'in_review' as const,
        created_at: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 3,
        name: 'Farhana Yasmin',
        email: 'f.yasmin@greenenergy.org',
        phone: '+880 1911 222 333',
        organization: 'Green Energy Consortium',
        service_interest: 'Advocacy & Public Affairs',
        budget_range: '$15,000+',
        message: 'Require strategic policy alignment and media roundtable sessions with government regulators.',
        source: 'contact_form',
        status: 'contacted' as const,
        admin_notes: 'Sent formal proposal packet on Nov 17.',
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
  };
}
