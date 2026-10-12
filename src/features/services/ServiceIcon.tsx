import {
  BriefcaseBusiness,
  Building2,
  FileText,
  Globe2,
  Handshake,
  Landmark,
  Scale,
  Users,
} from "lucide-react";
const icons = {
  building: Building2,
  globe: Globe2,
  file: FileText,
  scale: Scale,
  handshake: Handshake,
  briefcase: BriefcaseBusiness,
  landmark: Landmark,
  users: Users,
};
export function ServiceIcon({ name }: { name: string }) {
  const Icon = icons[name as keyof typeof icons] || Scale;
  return <Icon size={28} strokeWidth={1.2} aria-hidden="true" />;
}
