import PageHero from '@/components/PageHero';
import ProjectExplorer from '@/components/ProjectExplorer';
import { site } from '@/lib/data';

export const metadata = {
  title: 'Projects — Residential, Hospitality, Commercial & Industrial',
  description: 'Case dossiers from Powerhouse Building Solutions: luxury towers, hotels, malls, banks and industrial plants across Pakistan supplied with certified electrical products.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="National Case Dossiers"
        subtitle="Enterprise clients and landmark fit-outs across residential, hospitality, commercial and industrial sectors — proven high-load engineering with 100% genuine certified material."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=70"
        alt="Landmark commercial towers in Pakistan"
        crumbs={[{ label: 'Projects', href: '/projects' }]}
      />
      <ProjectExplorer />
    </>
  );
}
