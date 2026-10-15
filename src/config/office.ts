const env = import.meta.env;
export const office = {
  name: "عبد الله الشهري",
  fullName: "مكتب المحامي عبد الله الشهري للمحاماة والاستشارات القانونية",
  descriptor: "للمحاماة والاستشارات القانونية",
  founded: "2015",
  city: "جدة",
  address:
    "جدة، حي البغدادية، شارع الأمانة، مقابل المحكمة العمالية، برج المستقبل",
  phone: String(env.VITE_PHONE || "").replace(/[^\d+]/g, ""),
  email: String(env.VITE_EMAIL || "at.sh.14360@gmail.com"),
  introduction:
    "مكتب عبد الله الشهري للمحاماة والاستشارات القانونية، تأسس عام 2015. يقدم خدماته للشركات والمستثمرين والأفراد في التأسيس والعقود والتقاضي، من فهم الموضوع إلى تحديد الخطوة القانونية المناسبة.",
  // Map pin on Amana Street, Al-Baghdadiyah. Replace with the exact tower pin.
  location: { lat: 21.50673, lng: 39.17345 },
  mapUrl: /^https:\/\//.test(env.VITE_MAP_URL || "")
    ? String(env.VITE_MAP_URL)
    : "",
  hours: String(env.VITE_OFFICE_HOURS || ""),
  endpoint: String(env.VITE_CONSULTATION_ENDPOINT || ""),
  siteUrl: /^https:\/\//.test(env.VITE_SITE_URL || "")
    ? String(env.VITE_SITE_URL).replace(/\/$/, "")
    : "",
  indexable: env.VITE_ALLOW_INDEXING === "true",
};
export function whatsappUrl(message: string) {
  const digits = office.phone.replace(/\D/g, "");
  return digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : "";
}
