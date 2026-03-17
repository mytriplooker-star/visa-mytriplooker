import { redirect } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const name = country
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return {
    title: `${name} Visa for Indians | MyTripLooker`,
    description: `Apply for ${name} visa online. Fast processing, expert support for Indian passport holders.`,
  };
}

export default async function VisaCountryPage({ params }: Props) {
  const { country } = await params;
  redirect(`/apply?country=${country}`);
}
