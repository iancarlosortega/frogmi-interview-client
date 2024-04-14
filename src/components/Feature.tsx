import { Link } from "react-router-dom";
import { IFeature } from "../interfaces"

interface Props {
  feature: IFeature
}

export const Feature = ({ feature }: Props) => {

  const { title, coordinates } = feature.attributes

  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+FF0000(${coordinates.longitude},${coordinates.latitude})/${coordinates.longitude},${coordinates.latitude},10,0/300x200?access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`


  return (
    <article className="feature-animated rounded-md border border-gray-100 shadow-sm hover:bg-gray-100 transition-colors">
      <Link to={`/${feature.id}`} >
        <img
          src={mapUrl}
          alt={title}
          className="rounded-t-md h-[200px] w-full object-cover"
        />
        <footer className="p-4">
          <h3 className="font-semibold">{title}</h3>
        </footer>
      </Link>
    </article>
  )
}
