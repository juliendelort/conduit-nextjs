'use client';

import { Tabs } from '@/app/_components/articles/Tabs';
import { useParams, usePathname } from 'next/navigation';

// Using a parallel route here as a workaround to get the route params (username) from the layout
export default function TabsSlot() {
  const params = useParams()
  const path = usePathname();

  const tabs = [
    {
      title: "My Articles",
      href: `/profile/${params['username']}`,
      isActive: !path.includes('/favorited'),
    },
    {

      title: "Favorited Articles",
      href: `/profile/${params['username']}/favorited`,
      isActive: path.includes('/favorited'),
    },
  ]
  return <Tabs tabs={tabs} />
}
