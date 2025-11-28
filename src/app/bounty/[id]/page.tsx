import { getBountyById } from '@/lib/utils';
import { BountyHero } from '@/components/detail/BountyHero';
import { BountySidebar } from '@/components/detail/BountySidebar';
import { DescriptionRenderer } from '@/components/detail/DescriptionRenderer';
import { BackButton } from '@/components/ui/BackButton';
import { StickyApplyButton } from '@/components/detail/StickyApplyButton';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BountyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const bounty = await getBountyById(id);

  if (!bounty) return notFound();

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Content */}
        <div className="lg:col-span-2 space-y-8">
          <BountyHero 
            title={bounty.title} 
            issuer={bounty.issuer} 
            status={bounty.status}
            createdAt={bounty.createdAt}
            deadline={bounty.deadline}
          />
          <hr className="border-slate-100" />
          <DescriptionRenderer content={bounty.description} />
        </div>

        {/* Right Column: Meta & Actions */}
        <div className="lg:col-span-1">
          <BountySidebar bounty={bounty} />
        </div>
      </div>
      
      <StickyApplyButton />
    </main>
  );
}
