import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

export default function RootTermsOfService() {
  redirect(`/${defaultLocale}/terms-of-service`);
}
