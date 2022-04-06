export function formatPhoneNumber(maskedNumber) {
  let cleaned = '';
  cleaned = ('' + maskedNumber).replace(/\D/g, '');
  let match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return match[1] + ' (' + match[2] + ') ' + match[3] + ' ' + match[4];
  }
  return null;
}
