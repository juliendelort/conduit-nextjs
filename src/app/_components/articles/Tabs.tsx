import clsx from 'clsx';
import Link from 'next/link';

interface Tab {
  title: string;
  href: string;
  isActive: boolean;
}

export function Tabs({ tabs }: { tabs: Tab[] }) {
  return <nav className="mb-4 border-b border-borderprimary">
    <ul className="flex flex-wrap gap-x-2 gap-y-0">
      {tabs.map((tab) => (
        <li key={tab.title}>
          <Tab
            href={tab.href}
            isActive={tab.isActive}
          >
            {tab.title}
          </Tab>
        </li>
      ))}
    </ul>
  </nav >
}

function Tab({ isActive, href, children }: { isActive: boolean, href: string, children: React.ReactNode }) {
  return <Link
    className={clsx(
      "block whitespace-nowrap p-2",
      isActive
        ? "border-b-2 border-brand text-brand"
        : "text-onsurfaceprimaryhighest",
    )}
    href={href}
  >
    {children}
  </Link>
}
