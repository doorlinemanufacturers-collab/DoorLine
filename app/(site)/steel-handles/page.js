import { getContent } from '@/lib/store';
import { LANDINGS, landingMeta } from '@/lib/landing';
import LandingView from '@/components/LandingView';

const cfg = LANDINGS['steel-handles'];

export async function generateMetadata() {
  const { site } = await getContent();
  return landingMeta(cfg, site);
}

export default function Page() {
  return <LandingView cfg={cfg} />;
}
