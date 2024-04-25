'use client';

import { Tabs } from '@/app/_components/articles/Tabs';
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation';

export function MainTabs({ isAuthenticated }: { isAuthenticated: boolean }) {
  const segment = useSelectedLayoutSegment();
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');

  const tabs = [
    ...(isAuthenticated ? [{ href: '/feed', title: 'Your Feed', isActive: segment === 'feed' }] : []),
    {
      href: '/',
      title: 'Global Feed',
      isActive: !segment && !tag
    },
    ...(!!tag ? [{
      href: `/?tag=${tag}`,
      title: `#${tag}`,
      isActive: !segment && !!tag
    }] : [])
  ]



  return <Tabs tabs={tabs} />;
}
