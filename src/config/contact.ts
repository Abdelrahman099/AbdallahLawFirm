/** Office contacts use Saudi national or international notation. */
export function contactNumber(value: string) {
  const digits = value
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/\D/g, "")
    .replace(/^00/, "");
  if (/^05\d{8}$/.test(digits)) return `+966${digits.slice(1)}`;
  return /^\d{8,15}$/.test(digits) ? `+${digits}` : "";
}

export function localContactNumber(value: string) {
  return value.replace(/^\+966(?=5\d{8}$)/, "0");
}

export function contactWhatsAppUrl(number: string, message: string) {
  const digits = contactNumber(number).replace(/^\+/, "");
  return digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : "";
}
