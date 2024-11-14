import FlightMenu from '@/components/FlightMenu';
import { readMenuData } from '@/services/ai';

export default async function Menu() {
  const data = await readMenuData();
  console.log("aaaaaa")
  console.log(data)
  return <FlightMenu menuData={data} />;
}
