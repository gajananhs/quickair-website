import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import { routes } from '@/routes'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  )
}
