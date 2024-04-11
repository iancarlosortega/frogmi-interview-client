import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <div className="border-b border-gray-100">
      <header className="container mx-auto py-2 ">
        <Link to='/' className="inline-flex items-center gap-x-3">
          <img src='/images/terremoto.webp' alt='Logo' className="aspect-square object-cover size-16" />
          <span className="text-lg uppercase font-bold text-green-700">EarthQuaker</span>
        </Link>
      </header>
    </div>
  )
}
