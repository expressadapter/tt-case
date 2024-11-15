import FlightMenu from '@/components/FlightMenu';
import { readMenuData } from '@/services/ai';

export default async function Menu() {
  return <FlightMenu />;
}
