import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../components/layout/RootLayout';

// Code-Splitting: Lazy load all route chunks for maximum Lighthouse speed & instant initial load
const HomePage = lazy(() => import('../pages/home/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('../pages/about/AboutPage').then((m) => ({ default: m.AboutPage })));
const LeadershipPage = lazy(() => import('../pages/leadership/LeadershipPage').then((m) => ({ default: m.LeadershipPage })));
const LeaderDetailPage = lazy(() => import('../pages/leadership/LeaderDetailPage').then((m) => ({ default: m.LeaderDetailPage })));
const TeamPage = lazy(() => import('../pages/team/TeamPage').then((m) => ({ default: m.TeamPage })));
const ServicesOverviewPage = lazy(() => import('../pages/services/ServicesOverviewPage').then((m) => ({ default: m.ServicesOverviewPage })));
const ServiceDetailPage = lazy(() => import('../pages/services/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })));
const WorkListingPage = lazy(() => import('../pages/work/WorkListingPage').then((m) => ({ default: m.WorkListingPage })));
const CaseStudyDetailPage = lazy(() => import('../pages/work/CaseStudyDetailPage').then((m) => ({ default: m.CaseStudyDetailPage })));
const PhotoGalleryPage = lazy(() => import('../pages/gallery/PhotoGalleryPage').then((m) => ({ default: m.PhotoGalleryPage })));
const VideoGalleryPage = lazy(() => import('../pages/gallery/VideoGalleryPage').then((m) => ({ default: m.VideoGalleryPage })));
const ClientsPage = lazy(() => import('../pages/clients/ClientsPage').then((m) => ({ default: m.ClientsPage })));
const InsightsListingPage = lazy(() => import('../pages/insights/InsightsListingPage').then((m) => ({ default: m.InsightsListingPage })));
const ArticleDetailPage = lazy(() => import('../pages/insights/ArticleDetailPage').then((m) => ({ default: m.ArticleDetailPage })));
const MediaPage = lazy(() => import('../pages/media/MediaPage').then((m) => ({ default: m.MediaPage })));
const ContactPage = lazy(() => import('../pages/contact/ContactPage').then((m) => ({ default: m.ContactPage })));
const SearchPage = lazy(() => import('../pages/search/SearchPage').then((m) => ({ default: m.SearchPage })));
const PrivacyPolicyPage = lazy(() => import('../pages/legal/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsConditionsPage = lazy(() => import('../pages/legal/TermsConditionsPage').then((m) => ({ default: m.TermsConditionsPage })));
const NotFoundPage = lazy(() => import('../pages/notfound/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

export const router = createBrowserRouter([
  // Root URL redirects to default language /en
  {
    path: '/',
    element: <Navigate to="/en" replace />,
  },
  // Language root: /:lang
  {
    path: '/:lang',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'leadership', element: <LeadershipPage /> },
      { path: 'leadership/:slug', element: <LeaderDetailPage /> },
      { path: 'team', element: <TeamPage /> },
      { path: 'services', element: <ServicesOverviewPage /> },
      { path: 'services/:slug', element: <ServiceDetailPage /> },
      { path: 'work', element: <WorkListingPage /> },
      { path: 'work/:slug', element: <CaseStudyDetailPage /> },
      { path: 'gallery', element: <Navigate to="photos" replace /> },
      { path: 'gallery/photos', element: <PhotoGalleryPage /> },
      { path: 'gallery/videos', element: <VideoGalleryPage /> },
      { path: 'clients', element: <ClientsPage /> },
      { path: 'insights', element: <InsightsListingPage /> },
      { path: 'insights/:slug', element: <ArticleDetailPage /> },
      { path: 'media', element: <MediaPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'privacy', element: <PrivacyPolicyPage /> },
      { path: 'terms', element: <TermsConditionsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  // Global wildcard fallback
  {
    path: '*',
    element: <Navigate to="/en" replace />,
  },
]);
