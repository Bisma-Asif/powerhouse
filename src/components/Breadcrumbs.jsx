import Link from 'next/link';
import Icon from './Icon';

export default function Breadcrumbs({ items }) {
  const list = [{ label: 'Home', href: '/' }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-navy-400">
        {list.map((item, i) => {
          const last = i === list.length - 1;
          return (
            <li key={item.href + item.label} className="flex items-center gap-1.5">
              {i > 0 && <Icon name="chevron-right" className="h-3.5 w-3.5" />}
              {last ? (
                <span aria-current="page" className="font-semibold text-navy-900">{item.label}</span>
              ) : (
                <Link href={item.href} className="transition hover:text-amber-600">{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
