import { redirect } from "next/navigation";

export default function OldVisaPage({
  params,
}: {
  params: { country: string };
}) {
  redirect(`/apply?country=${params.country}`);
}
