import { useHeroChoice } from "./selection";
import { getHero } from "./registry";
import "./directions.css";
import { IdentityHero } from "./identity/IdentityHero";
import { isIdentityConcept } from "./identity/concepts";
export function SelectedHero() {
  const id = useHeroChoice();
  if (isIdentityConcept(id)) return <IdentityHero key={id} conceptId={id} />;
  const Hero = getHero(id).component;
  return <Hero />;
}
