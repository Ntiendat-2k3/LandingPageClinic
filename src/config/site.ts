export const SITE_CONTACT = {
  address: "122 Bà Triệu, phường Hai Bà Trưng, Hà Nội",
  mapsUrl: "https://maps.app.goo.gl/8Ab7ZyQyaadiZZD46",
  phoneDisplay: "03.878.12321",
  phonePlain: "0387812321",
  messengerUsername: "pkmatdrtrantuan",
  facebookUrl: "https://www.facebook.com/pkmatdrtrantuan",
} as const;

export const SITE_LINKS = {
  messenger: `https://m.me/${SITE_CONTACT.messengerUsername}`,
  zalo: `https://zalo.me/${SITE_CONTACT.phonePlain}`,
} as const;
