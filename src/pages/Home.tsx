import { useEffect, useState } from "react"
import { Feature } from "../components/Feature"
import { IFeature, MagType } from "../interfaces"
import { PER_PAGE } from "../constants"

export const HomePage = () => {

  const [features, setFeatures] = useState<IFeature[]>([])

  const [page, setPage] = useState(1)
  const [magTypesFilter, setMagTypesFilter] = useState<MagType[]>([])

  useEffect(() => {
    
    const loadFeatures = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/features?page=${page}&per_page=${PER_PAGE}`)
      const { data, pagination } = await response.json()
      setFeatures(data)
    }

    loadFeatures()

  }, [page])

  useEffect(() => {
    setPage(1)
  }, [magTypesFilter])
  
  return (
    <div className="my-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {
        features.map((feature) => (
          <Feature key={feature.id} feature={feature} />
        ))
      }
    </div>
  )
}
