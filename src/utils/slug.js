/** Convierte un texto en un identificador para URL: "Revisión de contratos" → "revision-de-contratos". */
export const slugify = (s = '') =>
  String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** Identificador de un servicio: el que se escribió en el panel o, si no hay, uno a partir del título. */
export const serviceId = (s) => slugify(s?.id || s?.titulo || '')

/** Dirección de la página de detalle de un servicio. */
export const serviceUrl = (s) => `/servicios/${serviceId(s)}`
