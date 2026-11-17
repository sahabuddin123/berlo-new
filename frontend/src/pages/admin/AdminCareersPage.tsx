import React, { useState, useEffect } from 'react';
import { adminApi, JobApplicationItem } from '../../services/adminApi';
import {
  Briefcase,
  Users,
  Plus,
  CheckCircle,
  X,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  FileText,
  Save,
  RefreshCw,
} from 'lucide-react';

interface CareerJob {
  id: number;
  slug: string;
  title_en: string;
  title_bn: string;
  department_en: string;
  department_bn: string;
  employment_type: string;
  workplace_type: string;
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
  applications_count?: number;
}

export const AdminCareersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'openings' | 'applications'>('openings');
  const [jobs, setJobs] = useState<CareerJob[]>([]);
  const [applications, setApplications] = useState<JobApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Filters for applications
  const [appStatusFilter, setAppStatusFilter] = useState('all');
  const [appJobFilter, setAppJobFilter] = useState<number | undefined>(undefined);

  // Modals
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<CareerJob | null>(null);
  const [selectedApp, setSelectedApp] = useState<JobApplicationItem | null>(null);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);

  // Job Form Data
  const initialJobForm = {
    title_en: '',
    title_bn: '',
    department_en: 'Corporate Advisory',
    department_bn: 'কর্পোরেট স্ট্র্যাটেজি',
    employment_type: 'full_time',
    workplace_type: 'hybrid',
    location_en: 'Niketon, Gulshan-1, Dhaka',
    location_bn: 'নিকেতন, গুলশান-১, ঢাকা',
    experience_level_en: '5+ Years',
    experience_level_bn: '৫+ বছরের অভিজ্ঞতা',
    salary_range_en: 'Competitive Industry Standard',
    salary_range_bn: 'প্রতিযোগিতামূলক বেতন',
    short_desc_en: '',
    short_desc_bn: '',
    overview_en: '',
    overview_bn: '',
    responsibilities_en_text: '',
    responsibilities_bn_text: '',
    requirements_en_text: '',
    requirements_bn_text: '',
    benefits_en_text: '',
    benefits_bn_text: '',
    deadline: '',
    is_active: true,
    sort_order: 1,
  };
  const [jobFormData, setJobFormData] = useState(initialJobForm);
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab, appStatusFilter, appJobFilter]);

  async function fetchData() {
    setLoading(true);
    try {
      if (activeTab === 'openings') {
        const res = await adminApi.getCareers();
        if (res.data) setJobs(res.data);
      } else {
        const res = await adminApi.getJobApplications({
          job_id: appJobFilter,
          status: appStatusFilter !== 'all' ? appStatusFilter : undefined,
        });
        if (res.data) setApplications(res.data);
        // Also fetch jobs for filter dropdown
        const jobRes = await adminApi.getCareers();
        if (jobRes.data) setJobs(jobRes.data);
      }
    } catch {
      // offline fallback
    } finally {
      setLoading(false);
    }
  }

  const openCreateJobModal = () => {
    setEditingJob(null);
    setJobFormData(initialJobForm);
    setIsJobModalOpen(true);
  };

  const openEditJobModal = (job: CareerJob) => {
    setEditingJob(job);
    setJobFormData({
      title_en: job.title_en || '',
      title_bn: job.title_bn || '',
      department_en: job.department_en || 'Corporate Advisory',
      department_bn: job.department_bn || 'কর্পোরেট স্ট্র্যাটেজি',
      employment_type: job.employment_type || 'full_time',
      workplace_type: job.workplace_type || 'hybrid',
      location_en: job.location_en || 'Niketon, Gulshan-1, Dhaka',
      location_bn: job.location_bn || 'নিকেতন, গুলশান-১, ঢাকা',
      experience_level_en: job.experience_level_en || '',
      experience_level_bn: job.experience_level_bn || '',
      salary_range_en: job.salary_range_en || '',
      salary_range_bn: job.salary_range_bn || '',
      short_desc_en: job.short_desc_en || '',
      short_desc_bn: job.short_desc_bn || '',
      overview_en: job.overview_en || '',
      overview_bn: job.overview_bn || '',
      responsibilities_en_text: (job.responsibilities_en || []).join('\n'),
      responsibilities_bn_text: (job.responsibilities_bn || []).join('\n'),
      requirements_en_text: (job.requirements_en || []).join('\n'),
      requirements_bn_text: (job.requirements_bn || []).join('\n'),
      benefits_en_text: (job.benefits_en || []).join('\n'),
      benefits_bn_text: (job.benefits_bn || []).join('\n'),
      deadline: job.deadline ? job.deadline.substring(0, 10) : '',
      is_active: job.is_active ?? true,
      sort_order: job.sort_order ?? 1,
    });
    setIsJobModalOpen(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingJob(true);

    const payload = {
      title_en: jobFormData.title_en,
      title_bn: jobFormData.title_bn,
      department_en: jobFormData.department_en,
      department_bn: jobFormData.department_bn,
      employment_type: jobFormData.employment_type,
      workplace_type: jobFormData.workplace_type,
      location_en: jobFormData.location_en,
      location_bn: jobFormData.location_bn,
      experience_level_en: jobFormData.experience_level_en,
      experience_level_bn: jobFormData.experience_level_bn,
      salary_range_en: jobFormData.salary_range_en,
      salary_range_bn: jobFormData.salary_range_bn,
      short_desc_en: jobFormData.short_desc_en,
      short_desc_bn: jobFormData.short_desc_bn,
      overview_en: jobFormData.overview_en,
      overview_bn: jobFormData.overview_bn,
      responsibilities_en: jobFormData.responsibilities_en_text.split('\n').map((s) => s.trim()).filter(Boolean),
      responsibilities_bn: jobFormData.responsibilities_bn_text.split('\n').map((s) => s.trim()).filter(Boolean),
      requirements_en: jobFormData.requirements_en_text.split('\n').map((s) => s.trim()).filter(Boolean),
      requirements_bn: jobFormData.requirements_bn_text.split('\n').map((s) => s.trim()).filter(Boolean),
      benefits_en: jobFormData.benefits_en_text.split('\n').map((s) => s.trim()).filter(Boolean),
      benefits_bn: jobFormData.benefits_bn_text.split('\n').map((s) => s.trim()).filter(Boolean),
      deadline: jobFormData.deadline || null,
      is_active: jobFormData.is_active,
      sort_order: Number(jobFormData.sort_order),
    };

    try {
      if (editingJob) {
        await adminApi.updateCareer(editingJob.id, payload);
        setFeedback('Job opening updated successfully.');
      } else {
        await adminApi.createCareer(payload);
        setFeedback('Job opening created successfully.');
      }
      setIsJobModalOpen(false);
      fetchData();
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback('Error saving job opening.');
    } finally {
      setIsSubmittingJob(false);
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this job opening?')) return;
    try {
      await adminApi.deleteCareer(id);
      setFeedback('Job opening deleted.');
      fetchData();
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback('Error deleting job opening.');
    }
  };

  // Application Handlers
  const handleUpdateAppStatus = async (id: number, newStatus: string, notes?: string) => {
    try {
      await adminApi.updateJobApplicationStatus(id, newStatus, notes);
      setFeedback('Applicant status updated.');
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus as any, admin_notes: notes });
      }
      fetchData();
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback('Error updating applicant status.');
    }
  };

  const handleDeleteApp = async (id: number) => {
    if (!window.confirm('Are you sure you want to remove this applicant record?')) return;
    try {
      await adminApi.deleteJobApplication(id);
      setFeedback('Application removed.');
      setIsAppModalOpen(false);
      fetchData();
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback('Error deleting application.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'reviewed':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'rejected':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'hired':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#A302FF]" />
            <h1 className="text-2xl font-black text-white tracking-tight">
              Careers & Talent Desk
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage strategic job openings, candidate dossiers, and hiring status workflows.
          </p>
        </div>

        {activeTab === 'openings' && (
          <button
            onClick={openCreateJobModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#A302FF] hover:bg-[#8D00DE] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-900/30 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Opening</span>
          </button>
        )}
      </div>

      {feedback && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-3">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800/80 pb-3">
        <button
          onClick={() => setActiveTab('openings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'openings'
              ? 'bg-[#A302FF] text-white shadow-md shadow-purple-900/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Open Positions ({jobs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'applications'
              ? 'bg-[#A302FF] text-white shadow-md shadow-purple-900/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Applicant Dossiers</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OPEN POSITIONS LIST                                                 */}
      {/* ========================================================================= */}
      {activeTab === 'openings' && (
        <div className="space-y-4">
          {loading ? (
            <div className="py-20 text-center text-xs text-slate-400">Loading job postings...</div>
          ) : jobs.length === 0 ? (
            <div className="py-20 text-center rounded-2xl bg-slate-900/60 border border-slate-800 p-8 space-y-3">
              <Briefcase className="w-10 h-10 text-slate-500 mx-auto" />
              <p className="text-sm text-slate-400">No job openings created yet.</p>
              <button
                onClick={openCreateJobModal}
                className="px-4 py-2 rounded-xl bg-[#A302FF] text-white text-xs font-bold"
              >
                Create First Opening
              </button>
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-5 py-4">Position Title</th>
                      <th className="px-5 py-4">Department</th>
                      <th className="px-5 py-4">Workplace / Type</th>
                      <th className="px-5 py-4">Applicants</th>
                      <th className="px-5 py-4">Deadline</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-normal">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-bold text-white text-sm">{job.title_en}</div>
                          <div className="text-[11px] text-slate-400">{job.title_bn}</div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            {job.department_en}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-white capitalize">{job.workplace_type.replace('_', ' ')}</div>
                          <div className="text-[10px] text-slate-400 capitalize">{job.employment_type.replace('_', ' ')}</div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1 font-bold text-white">
                            <Users className="w-3 h-3 text-[#A302FF]" />
                            {job.applications_count ?? 0}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-slate-400">
                          {job.deadline ? job.deadline.substring(0, 10) : 'Open'}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                              job.is_active
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : 'bg-slate-700/30 text-slate-400 border-slate-700'
                            }`}
                          >
                            {job.is_active ? 'Active' : 'Closed'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right space-x-2">
                          <button
                            onClick={() => openEditJobModal(job)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#A302FF] text-slate-300 hover:text-white transition-colors"
                            title="Edit Opening"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
                            title="Delete Opening"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: APPLICANTS LIST                                                     */}
      {/* ========================================================================= */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={appStatusFilter}
                onChange={(e) => setAppStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-[#A302FF]"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending Review</option>
                <option value="reviewed">Reviewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>

              <select
                value={appJobFilter ?? ''}
                onChange={(e) => setAppJobFilter(e.target.value ? Number(e.target.value) : undefined)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-[#A302FF]"
              >
                <option value="">All Job Positions</option>
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title_en}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-xs text-slate-400">
              Total Applicants: <strong className="text-white">{applications.length}</strong>
            </div>
          </div>

          {/* Applications Table */}
          {loading ? (
            <div className="py-20 text-center text-xs text-slate-400">Loading candidate dossiers...</div>
          ) : applications.length === 0 ? (
            <div className="py-20 text-center rounded-2xl bg-slate-900/60 border border-slate-800 p-8">
              <Users className="w-10 h-10 text-slate-500 mx-auto mb-2" />
              <p className="text-sm text-slate-400">No applicant submissions found.</p>
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-5 py-4">Applicant Name</th>
                      <th className="px-5 py-4">Position</th>
                      <th className="px-5 py-4">Contact</th>
                      <th className="px-5 py-4">Applied Date</th>
                      <th className="px-5 py-4">Resume / Profile</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-normal">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-5 py-4 font-bold text-white text-sm">
                          {app.name}
                        </td>
                        <td className="px-5 py-4 text-purple-400 font-semibold">
                          {app.job_posting ? app.job_posting.title_en : 'General Application'}
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-slate-300">{app.email}</div>
                          <div className="text-[11px] text-slate-400">{app.phone}</div>
                        </td>
                        <td className="px-5 py-4 text-slate-400">
                          {app.created_at ? new Date(app.created_at).toLocaleDateString() : '—'}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            {app.resume_url ? (
                              <a
                                href={app.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] text-[#A302FF] hover:underline"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>Dossier</span>
                              </a>
                            ) : (
                              <span className="text-slate-500 text-[11px]">No file</span>
                            )}
                            {app.linkedin_url && (
                              <a
                                href={app.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300"
                                title="LinkedIn Profile"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={app.status}
                            onChange={(e) => handleUpdateAppStatus(app.id, e.target.value, app.admin_notes)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border focus:outline-none cursor-pointer ${getStatusBadge(
                              app.status
                            )}`}
                          >
                            <option value="pending" className="bg-slate-900 text-white">Pending</option>
                            <option value="reviewed" className="bg-slate-900 text-white">Reviewed</option>
                            <option value="shortlisted" className="bg-slate-900 text-white">Shortlisted</option>
                            <option value="rejected" className="bg-slate-900 text-white">Rejected</option>
                            <option value="hired" className="bg-slate-900 text-white">Hired</option>
                          </select>
                        </td>
                        <td className="px-5 py-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setIsAppModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#A302FF] text-slate-300 hover:text-white transition-colors"
                            title="View Full Application"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteApp(app.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
                            title="Delete Applicant"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CREATE / EDIT JOB OPENING                                           */}
      {/* ========================================================================= */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#A302FF]" />
                <span>{editingJob ? 'Edit Career Appointment' : 'Create New Career Appointment'}</span>
              </h2>
              <button
                onClick={() => setIsJobModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={jobFormData.title_en}
                    onChange={(e) => setJobFormData({ ...jobFormData, title_en: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Title (Bengali / বাংলা) *</label>
                  <input
                    type="text"
                    required
                    value={jobFormData.title_bn}
                    onChange={(e) => setJobFormData({ ...jobFormData, title_bn: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Department (English) *</label>
                  <input
                    type="text"
                    required
                    value={jobFormData.department_en}
                    onChange={(e) => setJobFormData({ ...jobFormData, department_en: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Department (Bengali) *</label>
                  <input
                    type="text"
                    required
                    value={jobFormData.department_bn}
                    onChange={(e) => setJobFormData({ ...jobFormData, department_bn: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Employment Type *</label>
                  <select
                    value={jobFormData.employment_type}
                    onChange={(e) => setJobFormData({ ...jobFormData, employment_type: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  >
                    <option value="full_time">Full Time</option>
                    <option value="part_time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Fellowship / Intern</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Workplace Type *</label>
                  <select
                    value={jobFormData.workplace_type}
                    onChange={(e) => setJobFormData({ ...jobFormData, workplace_type: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  >
                    <option value="hybrid">Hybrid</option>
                    <option value="on_site">On-Site (Gulshan-1)</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Experience (English)</label>
                  <input
                    type="text"
                    value={jobFormData.experience_level_en}
                    onChange={(e) => setJobFormData({ ...jobFormData, experience_level_en: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Salary Range</label>
                  <input
                    type="text"
                    value={jobFormData.salary_range_en}
                    onChange={(e) => setJobFormData({ ...jobFormData, salary_range_en: e.target.value })}
                    placeholder="e.g. Competitive Corporate Scale"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Application Deadline</label>
                  <input
                    type="date"
                    value={jobFormData.deadline}
                    onChange={(e) => setJobFormData({ ...jobFormData, deadline: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Status</label>
                  <div className="flex items-center gap-3 pt-2">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={jobFormData.is_active}
                        onChange={(e) => setJobFormData({ ...jobFormData, is_active: e.target.checked })}
                        className="rounded"
                      />
                      <span>Active & Accepting Applications</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Responsibilities (English, 1 per line)</label>
                  <textarea
                    rows={4}
                    value={jobFormData.responsibilities_en_text}
                    onChange={(e) => setJobFormData({ ...jobFormData, responsibilities_en_text: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Responsibilities (Bengali, 1 per line)</label>
                  <textarea
                    rows={4}
                    value={jobFormData.responsibilities_bn_text}
                    onChange={(e) => setJobFormData({ ...jobFormData, responsibilities_bn_text: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>
              </div>

              {/* Requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Requirements (English, 1 per line)</label>
                  <textarea
                    rows={4}
                    value={jobFormData.requirements_en_text}
                    onChange={(e) => setJobFormData({ ...jobFormData, requirements_en_text: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Requirements (Bengali, 1 per line)</label>
                  <textarea
                    rows={4}
                    value={jobFormData.requirements_bn_text}
                    onChange={(e) => setJobFormData({ ...jobFormData, requirements_bn_text: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingJob}
                  className="px-6 py-2.5 rounded-xl bg-[#A302FF] hover:bg-[#8D00DE] text-white text-xs font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingJob ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>{isSubmittingJob ? 'Saving...' : 'Save Job Opening'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: VIEW APPLICANT DOSSIER                                              */}
      {/* ========================================================================= */}
      {isAppModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">{selectedApp.name}</h2>
                <p className="text-xs text-purple-400">
                  {selectedApp.job_posting ? selectedApp.job_posting.title_en : 'General Appointment'}
                </p>
              </div>
              <button
                onClick={() => setIsAppModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-slate-500 block mb-0.5">Email</span>
                  <a href={`mailto:${selectedApp.email}`} className="text-white font-medium hover:underline">
                    {selectedApp.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Phone</span>
                  <a href={`tel:${selectedApp.phone}`} className="text-white font-medium hover:underline">
                    {selectedApp.phone}
                  </a>
                </div>
                {selectedApp.linkedin_url && (
                  <div className="col-span-2">
                    <span className="text-slate-500 block mb-0.5">LinkedIn Profile</span>
                    <a
                      href={selectedApp.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>{selectedApp.linkedin_url}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                {selectedApp.portfolio_url && (
                  <div className="col-span-2">
                    <span className="text-slate-500 block mb-0.5">Portfolio / Website</span>
                    <a
                      href={selectedApp.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:underline flex items-center gap-1"
                    >
                      <span>{selectedApp.portfolio_url}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {selectedApp.cover_letter && (
                <div className="space-y-1">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    Cover Letter / Statement
                  </span>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-line">
                    {selectedApp.cover_letter}
                  </div>
                </div>
              )}

              {selectedApp.resume_url && (
                <div className="pt-2">
                  <a
                    href={selectedApp.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download / View Resume Dossier</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Status Update & Notes */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-bold">Applicant Hiring Status</label>
                  <select
                    value={selectedApp.status}
                    onChange={(e) => handleUpdateAppStatus(selectedApp.id, e.target.value, selectedApp.admin_notes)}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                    <option value="hired">Hired</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Internal Interviewer Notes</label>
                  <textarea
                    rows={2}
                    value={selectedApp.admin_notes || ''}
                    onChange={(e) => setSelectedApp({ ...selectedApp, admin_notes: e.target.value })}
                    placeholder="Enter confidential notes, interview observations..."
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleUpdateAppStatus(selectedApp.id, selectedApp.status, selectedApp.admin_notes)}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-[#A302FF] text-white text-xs font-semibold"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
