import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../components/layout/RootLayout';
import { HomePage } from '../pages/home/HomePage';
import { AboutPage } from '../pages/about/AboutPage';
import { LeadershipPage } from '../pages/leadership/LeadershipPage';
import { LeaderDetailPage } from '../pages/leadership/LeaderDetailPage';
import { TeamPage } from '../pages/team/TeamPage';
import { ServicesOverviewPage } from '../pages/services/ServicesOverviewPage';
import { ServiceDetailPage } from '../pages/services/ServiceDetailPage';
import { WorkListingPage } from '../pages/work/WorkListingPage';
import { CaseStudyDetailPage } from '../pages/work/CaseStudyDetailPage';
import { ClientsPage } from '../pages/clients/ClientsPage';
import { InsightsListingPage } from '../pages/insights/InsightsListingPage';
import { ArticleDetailPage } from '../pages/insights/ArticleDetailPage';
import { MediaPage } from '../pages/media/MediaPage';
import { ContactPage } from '../pages/contact/ContactPage';
import { SearchPage } from '../pages/search/SearchPage';
import { PrivacyPolicyPage } from '../pages/legal/PrivacyPolicyPage';
import { TermsConditionsPage } from '../pages/legal/TermsConditionsPage';
import { NotFoundPage } from '../pages/notfound/NotFoundPage';

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
