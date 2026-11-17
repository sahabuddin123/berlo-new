import { useState, useEffect } from 'react';
import { adminApi } from '../services/adminApi';
import { navigationItems as staticNavItems, footerNavigation as staticFooterNav, NavItem } from '../config/navigation';

export function useDynamicNavigation() {
  const [navItems, setNavItems] = useState<NavItem[]>(staticNavItems);
  const [footerLinks] = useState(staticFooterNav);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadDynamicMenus() {
      setIsLoading(true);
      try {
        const res = await adminApi.getPublicMenus();
        if (!isMounted) return;

        if (res?.data && res.data.length > 0) {
          // Map backend header items to NavItem format
          const headerBackendItems = res.data.filter(
            (m) => m.location === 'header' && (!m.parent_id || m.parent_id === null)
          );

          if (headerBackendItems.length > 0) {
            const mapped: NavItem[] = headerBackendItems.map((item) => {
              // Strip /en or /bn leading slash for router path format
              const cleanPath = item.url.replace(/^\/(en|bn)\/?/, '').replace(/^\//, '');

              return {
                id: `menu-${item.id}`,
                path: cleanPath,
                label: {
                  en: item.title_en,
                  bn: item.title_bn,
                },
                children: item.children?.map((child) => ({
                  id: `menu-child-${child.id}`,
                  path: child.url.replace(/^\/(en|bn)\/?/, '').replace(/^\//, ''),
                  label: {
                    en: child.title_en,
                    bn: child.title_bn,
                  },
                })),
              };
            });

            setNavItems(mapped);
          }
        }
      } catch {
        // Fallback to static config
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadDynamicMenus();

    return () => {
      isMounted = false;
    };
  }, []);

  return { navItems, footerLinks, isLoading };
}
