import { useHeroChoice } from "./selection";
import { getHero } from "./registry";
import "./directions.css";
export function SelectedHero() {
  const id = useHeroChoice();
  const Hero = getHero(id).component;
  return <Hero />;
}
