import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${name} Visa for Indians | MyTripLooker`,
    description: `Apply for ${name} visa online. Fast processing, expert support for Indian passport holders.`,
  };
}

export default async function VisaSlugPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/apply?country=${slug}`);
}
