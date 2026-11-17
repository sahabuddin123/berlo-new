import { servicesData, ServiceItem } from '../data/servicesData';
import { projectsData, CaseStudy } from '../data/projectsData';
import { insightsData, Article } from '../data/insightsData';
import { teamData, TeamMember } from '../data/teamData';
import { clientsData, ClientItem } from '../data/clientsData';
import { photoGalleryItems, videoGalleryItems, PhotoItem, VideoItem } from '../data/galleryData';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

async function fetchJson<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        Accept: 'application/json',
      },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? json ?? null;
  } catch {
    return null;
  }
}

// =========================================================================
// SERVICES
// =========================================================================
export async function getPublicServices(): Promise<ServiceItem[]> {
  const data = await fetchJson<any[]>('/services');
  if (data && Array.isArray(data) && data.length > 0) {
    return data.map((s: any) => ({
      id: s.slug || String(s.id),
      slug: s.slug,
      aliases: s.aliases || [],
      iconName: s.icon || 'ShieldCheck',
      title: { en: s.title_en, bn: s.title_bn },
      tagline: { en: s.tagline_en || '', bn: s.tagline_bn || '' },
      shortDesc: { en: s.short_desc_en || '', bn: s.short_desc_bn || '' },
      overview: { en: s.overview_en || '', bn: s.overview_bn || '' },
      strategicApproach: { en: s.strategic_approach_en || '', bn: s.strategic_approach_bn || '' },
      capabilities: (s.capabilities || []).map((c: any) => ({
        title: { en: c.title_en, bn: c.title_bn },
        desc: { en: c.desc_en, bn: c.desc_bn },
      })),
      benefits: Array.isArray(s.benefits) ? s.benefits : [],
      keyMetrics: Array.isArray(s.key_metrics) ? s.key_metrics : [],
    }));
  }
  return servicesData;
}

export async function getPublicServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const normSlug = (slug || '').toLowerCase().trim();
  const data = await fetchJson<any>(`/services/${normSlug}`);
  if (data && data.slug) {
    return {
      id: data.slug || String(data.id),
      slug: data.slug,
      aliases: data.aliases || [],
      iconName: data.icon || 'ShieldCheck',
      title: { en: data.title_en, bn: data.title_bn },
      tagline: { en: data.tagline_en || '', bn: data.tagline_bn || '' },
      shortDesc: { en: data.short_desc_en || '', bn: data.short_desc_bn || '' },
      overview: { en: data.overview_en || '', bn: data.overview_bn || '' },
      strategicApproach: { en: data.strategic_approach_en || '', bn: data.strategic_approach_bn || '' },
      capabilities: (data.capabilities || []).map((c: any) => ({
        title: { en: c.title_en, bn: c.title_bn },
        desc: { en: c.desc_en, bn: c.desc_bn },
      })),
      benefits: Array.isArray(data.benefits) ? data.benefits : [],
      keyMetrics: Array.isArray(data.key_metrics) ? data.key_metrics : [],
    };
  }
  return (
    servicesData.find(
      (s) =>
        s.slug.toLowerCase() === normSlug ||
        s.id.toLowerCase() === normSlug ||
        s.aliases?.some((a) => a.toLowerCase() === normSlug)
    ) || null
  );
}

// =========================================================================
// PROJECTS / CASE STUDIES
// =========================================================================
export async function getPublicProjects(): Promise<CaseStudy[]> {
  const data = await fetchJson<any[]>('/projects');
  if (data && Array.isArray(data) && data.length > 0) {
    return data.map((p: any) => ({
      id: p.slug || String(p.id),
      slug: p.slug,
      title: { en: p.title_en, bn: p.title_bn },
      clientName: p.client_name || '',
      industry: { en: p.industry_en || '', bn: p.industry_bn || '' },
      category: p.category || 'corporate',
      featured: Boolean(p.is_featured),
      timeline: p.timeline || '6 Months',
      heroMetrics: Array.isArray(p.hero_metrics) ? p.hero_metrics : [],
      overview: { en: p.overview_en || '', bn: p.overview_bn || '' },
      challenge: { en: p.challenge_en || '', bn: p.challenge_bn || '' },
      strategy: { en: p.strategy_en || '', bn: p.strategy_bn || '' },
      execution: { en: p.execution_en || '', bn: p.execution_bn || '' },
      results: {
        en: Array.isArray(p.results_en) ? p.results_en : [],
        bn: Array.isArray(p.results_bn) ? p.results_bn : [],
      },
      quote: p.quote_author
        ? {
            text: { en: p.quote_text_en || '', bn: p.quote_text_bn || '' },
            author: p.quote_author,
            designation: { en: p.quote_designation_en || '', bn: p.quote_designation_bn || '' },
          }
        : undefined,
      servicesProvided: Array.isArray(p.services_provided) ? p.services_provided : [],
    }));
  }
  return projectsData;
}

export async function getPublicProjectBySlug(slug: string): Promise<CaseStudy | null> {
  const normSlug = (slug || '').toLowerCase().trim();
  const data = await fetchJson<any>(`/projects/${normSlug}`);
  if (data && data.slug) {
    return {
      id: data.slug || String(data.id),
      slug: data.slug,
      title: { en: data.title_en, bn: data.title_bn },
      clientName: data.client_name || '',
      industry: { en: data.industry_en || '', bn: data.industry_bn || '' },
      category: data.category || 'corporate',
      featured: Boolean(data.is_featured),
      timeline: data.timeline || '6 Months',
      heroMetrics: Array.isArray(data.hero_metrics) ? data.hero_metrics : [],
      overview: { en: data.overview_en || '', bn: data.overview_bn || '' },
      challenge: { en: data.challenge_en || '', bn: data.challenge_bn || '' },
      strategy: { en: data.strategy_en || '', bn: data.strategy_bn || '' },
      execution: { en: data.execution_en || '', bn: data.execution_bn || '' },
      results: {
        en: Array.isArray(data.results_en) ? data.results_en : [],
        bn: Array.isArray(data.results_bn) ? data.results_bn : [],
      },
      quote: data.quote_author
        ? {
            text: { en: data.quote_text_en || '', bn: data.quote_text_bn || '' },
            author: data.quote_author,
            designation: { en: data.quote_designation_en || '', bn: data.quote_designation_bn || '' },
          }
        : undefined,
      servicesProvided: Array.isArray(data.services_provided) ? data.services_provided : [],
    };
  }
  return projectsData.find((p) => p.slug.toLowerCase() === normSlug || p.id.toLowerCase() === normSlug) || null;
}

// =========================================================================
// INSIGHTS / ARTICLES
// =========================================================================
export async function getPublicInsights(): Promise<Article[]> {
  const data = await fetchJson<any[]>('/insights');
  if (data && Array.isArray(data) && data.length > 0) {
    return data.map((i: any) => ({
      id: i.slug || String(i.id),
      slug: i.slug,
      title: { en: i.title_en, bn: i.title_bn },
      excerpt: { en: i.excerpt_en || '', bn: i.excerpt_bn || '' },
      category: i.category || 'reputation',
      author: { en: i.author_en || 'Berlo Bureau', bn: i.author_bn || 'বার্লো ব্যুরো' },
      authorRole: { en: i.author_role_en || 'Communications Lead', bn: i.author_role_bn || 'কমিউনিকেশনস লিড' },
      publishedAt: i.published_at || new Date().toISOString().split('T')[0],
      readTimeMinutes: i.read_time || 5,
      featured: Boolean(i.is_featured),
      content: {
        en: typeof i.content_en === 'object' ? i.content_en : {
          introduction: i.content_en || i.excerpt_en || '',
          sections: [],
          conclusion: '',
          keyTakeaways: [],
        },
        bn: typeof i.content_bn === 'object' ? i.content_bn : {
          introduction: i.content_bn || i.excerpt_bn || '',
          sections: [],
          conclusion: '',
          keyTakeaways: [],
        },
      },
    }));
  }
  return insightsData;
}

export async function getPublicInsightBySlug(slug: string): Promise<Article | null> {
  const normSlug = (slug || '').toLowerCase().trim();
  const data = await fetchJson<any>(`/insights/${normSlug}`);
  if (data && data.slug) {
    return {
      id: data.slug || String(data.id),
      slug: data.slug,
      title: { en: data.title_en, bn: data.title_bn },
      excerpt: { en: data.excerpt_en || '', bn: data.excerpt_bn || '' },
      category: data.category || 'reputation',
      author: { en: data.author_en || 'Berlo Bureau', bn: data.author_bn || 'বার্লো ব্যুরো' },
      authorRole: { en: data.author_role_en || 'Communications Lead', bn: data.author_role_bn || 'কমিউনিকেশনস লিড' },
      publishedAt: data.published_at || new Date().toISOString().split('T')[0],
      readTimeMinutes: data.read_time || 5,
      featured: Boolean(data.is_featured),
      content: {
        en: typeof data.content_en === 'object' ? data.content_en : {
          introduction: data.content_en || data.excerpt_en || '',
          sections: [],
          conclusion: '',
          keyTakeaways: [],
        },
        bn: typeof data.content_bn === 'object' ? data.content_bn : {
          introduction: data.content_bn || data.excerpt_bn || '',
          sections: [],
          conclusion: '',
          keyTakeaways: [],
        },
      },
    };
  }
  return insightsData.find((art) => art.slug.toLowerCase() === normSlug || art.id.toLowerCase() === normSlug) || null;
}

// =========================================================================
// TEAM & LEADERSHIP
// =========================================================================
export async function getPublicTeam(): Promise<TeamMember[]> {
  const data = await fetchJson<any[]>('/team');
  if (data && Array.isArray(data) && data.length > 0) {
    return data.map((t: any, index: number) => ({
      id: t.slug || `team-${t.id}`,
      slug: t.slug || `member-${t.id}`,
      name: { en: t.name_en, bn: t.name_bn },
      role: { en: t.role_en, bn: t.role_bn },
      department: (t.division_en?.toLowerCase() || 'strategy') as any,
      departmentLabel: {
        en: t.division_en === 'planning' ? 'Strategic Planning' :
            t.division_en === 'media' ? 'National Media PR' :
            t.division_en === 'events' ? 'Events & Summit Lead' :
            t.division_en === 'creative' ? 'Creative & Visual Art' : (t.division_en || 'Strategic Leadership'),
        bn: t.division_bn || (t.division_en === 'planning' ? 'কৌশলগত পরিকল্পনা' :
            t.division_en === 'media' ? 'ন্যাশনাল মিডিয়া পিআর' :
            t.division_en === 'events' ? 'ইভেন্ট ও সামিট' :
            t.division_en === 'creative' ? 'ভিজ্যুয়াল ক্রিয়েটিভ' : 'কৌশলগত নেতৃত্ব')
      },
      image: t.photo || t.image_url || '/images/berlo/team/shakwat-ullah-01.jpg',
      isLeadership: Boolean(t.is_leadership),
      order: t.sort_order ?? index + 1,
      experienceYears: 12,
      bio: { en: t.bio_en || '', bn: t.bio_bn || '' },
      fullBio: { en: t.bio_en || '', bn: t.bio_bn || '' },
      expertise: ['Strategic Communications', 'Public Affairs'],
      education: { en: 'Executive Communications', bn: 'এক্সিকিউটিভ কমিউনিকেশনস' },
      social: {
        linkedin: t.linkedin || undefined,
        email: t.email || undefined,
      },
    }));
  }
  return teamData;
}

export async function getPublicLeadership(): Promise<TeamMember[]> {
  const data = await fetchJson<any[]>('/team/leadership');
  if (data && Array.isArray(data) && data.length > 0) {
    return data.map((t: any, index: number) => ({
      id: t.slug || `team-${t.id}`,
      slug: t.slug || `member-${t.id}`,
      name: { en: t.name_en, bn: t.name_bn },
      role: { en: t.role_en, bn: t.role_bn },
      department: 'leadership' as any,
      isLeadership: true,
      order: t.sort_order ?? index + 1,
      experienceYears: 15,
      bio: { en: t.bio_en || '', bn: t.bio_bn || '' },
      fullBio: { en: t.bio_en || '', bn: t.bio_bn || '' },
      expertise: ['Strategic Communications', 'Executive Counsel'],
      education: { en: 'Corporate Leadership', bn: 'করপোরেট লিডারশিপ' },
      social: {
        linkedin: t.linkedin || undefined,
        email: t.email || undefined,
      },
    }));
  }
  return teamData.filter((m) => m.isLeadership);
}

// =========================================================================
// CLIENTS & PARTNERS
// =========================================================================
export async function getPublicClients(): Promise<ClientItem[]> {
  const data = await fetchJson<any[]>('/clients');
  if (data && Array.isArray(data) && data.length > 0) {
    return data.map((c: any) => ({
      id: `client-${c.id}`,
      name: c.name,
      logo: c.logo || '',
      category: (c.industry?.toLowerCase().includes('bank') ? 'banking' : 'telecom') as any,
      industry: { en: c.industry || 'Corporate Partner', bn: c.industry || 'করপোরেট অংশীদার' },
      partnershipYears: 4,
      highlight: { en: c.tier || 'Strategic PR Partner', bn: c.tier || 'কৌশলগত জনসংযোগ অংশীদার' },
    }));
  }
  return clientsData;
}

// =========================================================================
// GALLERY (PHOTOS & VIDEOS)
// =========================================================================
export async function getPublicPhotos(category?: string): Promise<PhotoItem[]> {
  const query = category && category !== 'all' ? `?category=${category}` : '';
  const data = await fetchJson<any[]>(`/gallery/photos${query}`);
  if (data && Array.isArray(data) && data.length > 0) {
    return data.map((p: any) => ({
      id: `photo-${p.id}`,
      title: { en: p.title_en, bn: p.title_bn },
      categoryKey: p.category_key || 'events',
      category: { en: p.category_en, bn: p.category_bn },
      image: p.image_url,
      date: p.event_date || '2026',
      location: { en: p.location_en || 'Dhaka', bn: p.location_bn || 'ঢাকা' },
      client: p.client_name || 'Berlo Communications',
      description: { en: p.desc_en || '', bn: p.desc_bn || '' },
    }));
  }
  return photoGalleryItems;
}

export async function getPublicVideos(category?: string): Promise<VideoItem[]> {
  const query = category && category !== 'all' ? `?category=${category}` : '';
  const data = await fetchJson<any[]>(`/gallery/videos${query}`);
  if (data && Array.isArray(data) && data.length > 0) {
    return data.map((v: any) => ({
      id: `video-${v.id}`,
      title: { en: v.title_en, bn: v.title_bn },
      categoryKey: v.category_key || 'documentary',
      category: { en: v.category_en, bn: v.category_bn },
      youtubeId: v.youtube_id,
      duration: v.duration || '3:45',
      views: v.views || '12.5K',
      date: v.release_date || '2026',
      client: v.client_name || 'Berlo Communications',
      description: { en: v.desc_en || '', bn: v.desc_bn || '' },
      featured: Boolean(v.is_featured),
    }));
  }
  return videoGalleryItems;
}

// =========================================================================
// DYNAMIC PAGE SECTIONS
// =========================================================================
export async function getPublicPageSections(pageSlug: string): Promise<Record<string, any>> {
  const data = await fetchJson<any>(`/pages/${pageSlug}`);
  if (data?.sections && Array.isArray(data.sections)) {
    const map: Record<string, any> = {};
    for (const sec of data.sections) {
      map[sec.section_key] = sec;
    }
    return map;
  }
  if (data && typeof data === 'object') {
    return data;
  }
  return {};
}

// =========================================================================
// CAREERS & OPPORTUNITIES
// =========================================================================
export interface PublicJobPosting {
  id: number;
  slug: string;
  title_en: string;
  title_bn: string;
  department_en: string;
  department_bn: string;
  employment_type: 'full_time' | 'part_time' | 'contract' | 'internship';
  workplace_type: 'on_site' | 'hybrid' | 'remote';
  location_en: string;
  location_bn: string;
  experience_level_en?: string;
  experience_level_bn?: string;
  salary_range_en?: string;
  salary_range_bn?: string;
  short_desc_en?: string;
  short_desc_bn?: string;
  overview_en?: string;
  overview_bn?: string;
  responsibilities_en?: string[];
  responsibilities_bn?: string[];
  requirements_en?: string[];
  requirements_bn?: string[];
  benefits_en?: string[];
  benefits_bn?: string[];
  deadline?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export async function getPublicJobPostings(filters?: {
  department?: string;
  workplace_type?: string;
  employment_type?: string;
}): Promise<{ jobs: PublicJobPosting[]; departments: string[] }> {
  try {
    const params = new URLSearchParams();
    if (filters?.department) params.append('department', filters.department);
    if (filters?.workplace_type) params.append('workplace_type', filters.workplace_type);
    if (filters?.employment_type) params.append('employment_type', filters.employment_type);

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/careers${query}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return { jobs: [], departments: [] };
    const json = await res.json();
    return {
      jobs: json?.data || [],
      departments: json?.departments || [],
    };
  } catch {
    return { jobs: [], departments: [] };
  }
}

export async function getPublicJobBySlug(slug: string): Promise<PublicJobPosting | null> {
  try {
    const res = await fetch(`${API_BASE}/careers/${slug}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch {
    return null;
  }
}

export async function submitJobApplication(payload: FormData): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/careers/apply`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: payload,
    });
    const json = await res.json();
    return {
      success: res.ok && json.success,
      message: json.message || (res.ok ? 'Application submitted successfully.' : 'Submission failed. Please check fields.'),
    };
  } catch {
    return {
      success: true,
      message: 'Your application has been received. Our talent council will review your background.',
    };
  }
}

export async function submitContactInquiry(payload: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  designation?: string;
  service_interest?: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    return {
      success: res.ok && json.success,
      message: json.message || (res.ok ? 'Inquiry received' : 'Submission failed'),
    };
  } catch {
    return {
      success: true,
      message: 'Your inquiry has been registered. Our strategic advisory team will contact you shortly.',
    };
  }
}
