import { Link } from 'react-router-dom'
import Seo from '../components/ui/Seo.jsx'

export default function NotFound() {
  return (
    <section className="container-site py-28 text-center">
      <Seo title="Página no encontrada" />
      <p className="eyebrow mb-4 text-terra">Error 404</p>
      <h1 className="text-5xl text-wine-deep">Esta página no existe.</h1>
      <Link to="/" className="btn btn-primary mt-10">Volver al inicio</Link>
    </section>
  )
}
