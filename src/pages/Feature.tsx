import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { IComment, IFeature } from "../interfaces"
import { timeAgo } from "../utils"
import { ArrowBackIcon } from "../components/icons/ArrowBackIcon"

// Mapbox config

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

export const FeaturePage = () => {

  const [feature, setFeature] = useState<IFeature>()
  const [comments, setComments] = useState<IComment[]>([])
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
    const loadFeatureComments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/comments?feature_id=${id}`)
        const { data, pagination } = await response.json()
        setComments(data)
      } catch (error) {
        console.error(error)
      }
    }
    loadFeatureComments()
  }, [id])

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

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
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
        const newComment: IComment = {
          id: Math.random(),
          feature_id: Number(id),
          body: commentInputValue,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        setComments([newComment, ...comments]) // Optimistic update
        setCommentInputValue('')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="my-8">
      <Link to="/" className="text-blue-500 hover:underline transition-colors inline-flex items-center gap-x-2"> 
        <ArrowBackIcon /> 
        Back to home
      </Link>
      <h2 className="text-2xl font-semibold mt-4">{feature?.attributes.title}</h2>
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
        <h5 className="font-semibold text-xl my-2">Add comment</h5>
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

      <section className="my-8">
        <h5 className="font-semibold text-xl my-2">List of comments</h5>
        {
          comments.length === 0 && <p>No comments yet</p>
        }
        <ul className="list-disc pl-8 my-4">
          {
            comments.map(comment => (
              <li key={comment.id} className="my-2">
                <p>{comment.body}</p>
                <span className="text-xs text-gray-400">{timeAgo(new Date(comment.created_at))}</span>
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  )
}
