import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Link } from "react-router-dom";
import { IFeature } from "../interfaces"

interface Props {
  feature: IFeature
}

export const Feature = ({ feature }: Props) => {

  const { title, coordinates } = feature.attributes

  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if( map.current || !mapContainer.current ) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [coordinates.longitude, coordinates.latitude],
      zoom: 10
    });

    map.current.scrollZoom.disable();

    // Add a marker
    new mapboxgl.Marker()
      .setLngLat([coordinates.longitude, coordinates.latitude])
      .addTo(map.current);
  });


  return (
    <article className="rounded-md border border-gray-100 shadow-sm">
      <Link to={`/${feature.id}`} >
        <div ref={mapContainer} className="rounded-t-md h-[400px]" />
        <footer className="p-4">
          <h3 className="font-semibold">{title}</h3>
        </footer>
      </Link>
    </article>
  )
}
