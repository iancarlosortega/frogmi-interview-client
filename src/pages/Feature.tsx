import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import mapboxgl from "mapbox-gl"
import { IFeature } from "../interfaces"

export const FeaturePage = () => {

  const [feature, setFeature] = useState<IFeature>()
  const [commentInputValue, setCommentInputValue] = useState('')

  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const { id } = useParams()
  const navigate = useNavigate();

  useEffect(() => {

    const loadFeature = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/features/${id}`)
        if (!response.ok) {
          return navigate('/')
        }
        const data = await response.json()
        setFeature(data)
      } catch (error) {
        console.error(error)
      }
    }
    loadFeature()

  }, [id, navigate])

  useEffect(() => {
    if (!feature || map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [feature.attributes.coordinates.longitude, feature.attributes.coordinates.latitude],
      zoom: 10
    });

    // Add a marker
    new mapboxgl.Marker()
      .setLngLat([feature.attributes.coordinates.longitude, feature.attributes.coordinates.latitude])
      .addTo(map.current);
  }, [feature])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if( commentInputValue.trim() === '') return alert('Please write a comment')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ feature_id: id, body: commentInputValue })
      })
      if (response.ok) {
        setCommentInputValue('')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold">{feature?.attributes.title}</h2>
      <div className="grid md:grid-cols-2 gap-4 my-8">
        <div ref={mapContainer} className="h-[400px] rounded-sm" />
        <aside>
          <h3 className="font-semibold text-lg mb-2">Information</h3>
          <p><span className="font-semibold">Place:</span> {feature?.attributes.place}</p>
          <p><span className="font-semibold">Date:</span> {feature?.attributes.time}</p>
          <p><span className="font-semibold">Coordinates:</span> [{feature?.attributes.coordinates.longitude} lng, {feature?.attributes.coordinates.latitude} lat]</p>
          <p><span className="font-semibold">Magnitude:</span> {feature?.attributes.magnitude} ({feature?.attributes.mag_type})</p>
          <p><span className="font-semibold">Tsunami:</span> {feature?.attributes.tsunami ? 'Yes' : 'No'}</p>

          <p className="my-4">For more information, click the following link:
            <br />
            <a 
              className="text-blue-500 hover:underline"
              href={feature?.links.external_url} 
              target="_blank" 
              rel="noreferrer">
              {feature?.links.external_url}
            </a>
          </p>
        </aside>
      </div>

      <section>
        <h5 className="font-semibold my-2">Add comment</h5>
        <form onSubmit={handleSubmit}>
          <textarea 
            className="w-full h-24 p-2 border border-gray-300 rounded-sm" 
            value={commentInputValue}
            onChange={(e) => setCommentInputValue(e.target.value)}
            placeholder="Write your comment here" />
          <button 
            disabled={!commentInputValue} 
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md disabled:bg-blue-500/70 transition-colors">
            Submit
          </button>
        </form>
      </section>

      <section className="my-4">
        <h5 className="font-semibold my-2">List of comments</h5>
        <ul>
          <li></li>
        </ul>
      </section>
    </div>
  )
}
