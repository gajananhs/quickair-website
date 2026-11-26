/**
 * Catalogue PDFs that ship with the site (public/qa/catalogues), each tied to the
 * products that offer it as their "Download catalogue" file in products.js.
 * Sizes are the actual file sizes.
 */
import { fullName, products, productsIntro } from './products'

const TITLES = {
  'quickair-aluminium-engineering-plastic-catalogue.pdf': ['Quickair aluminium piping with engineering plastic fittings', '2.3 MB'],
  'aluminium-with-aluminium-fittings.pdf': ['Quickair aluminium piping with aluminium fittings', '12.3 MB'],
  'al-crimping-grooving.pdf': ['Aluminium crimping and grooving type piping', '3.5 MB'],
  'pex.pdf': ['PEX piping with brass fittings', '3.5 MB'],
  '30-08-ball-valve-2page-catalogue-2-1.pdf': ['Ball valves, butterfly valves and actuators', '1.5 MB'],
  'aluminium-profile-catalogue-20-12-16-0.pdf': ['Aluminium extrusion profiles', '32.8 MB'],
  'electro-static-discharge-prevention.pdf': ['Electro static discharge (ESD) prevention products', '3.4 MB'],
}

export const downloads = Object.entries(TITLES).map(([file, [title, size]]) => {
  const href = '/qa/catalogues/' + file
  return {
    href,
    title,
    size,
    main: href === productsIntro.mainCatalogue,
    products: products.filter((product) => product.catalogue === href).map((product) => ({ name: fullName(product), to: `/products/${product.slug}` })),
  }
})
