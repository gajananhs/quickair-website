import { lazy } from 'react'
import { ROUTES } from '@/data/navigation'
import Home from '@/pages/Home'

/** Lazy page element. `pick` selects a named export when a file holds several pages. */
const page = (loader, pick) => {
  const Component = lazy(pick ? () => loader().then((module) => ({ default: module[pick] })) : loader)
  return <Component />
}

const calculators = () => import('@/pages/Calculators')
const blog = () => import('@/pages/Blog')

/**
 * Route table. Home is in the main bundle; every other page is a lazy chunk.
 * To add a page: create src/pages/<Name>.jsx and add one line here.
 */
export const routes = [
  { path: ROUTES.home, element: <Home /> },
  { path: ROUTES.about, element: page(() => import('@/pages/About')) },

  { path: ROUTES.products, element: page(() => import('@/pages/Products')) },
  { path: '/products/:slug', element: page(() => import('@/pages/ProductDetail')) },
  { path: ROUTES.services, element: page(() => import('@/pages/Services')) },

  { path: ROUTES.calculators, element: page(calculators, 'CalculatorsHub') },
  { path: ROUTES.pipeSize, element: page(calculators, 'PipeSizeCalculator') },
  { path: ROUTES.pressureDrop, element: page(calculators, 'PressureDropCalculator') },
  { path: ROUTES.electricityCost, element: page(calculators, 'ElectricityCalculator') },

  { path: ROUTES.gallery, element: page(() => import('@/pages/Gallery')) },
  { path: ROUTES.caseStudies, element: page(blog, 'CaseStudies') },
  { path: '/case-studies/:slug', element: page(blog, 'Article') },
  { path: ROUTES.blog, element: page(blog, 'BlogIndex') },
  { path: '/blog/:slug', element: page(blog, 'Article') },

  { path: ROUTES.contact, element: page(() => import('@/pages/Contact')) },
  { path: '*', element: page(() => import('@/pages/NotFound')) },
]
