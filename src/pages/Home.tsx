import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Feature } from "../components/Feature"
import { InfiniteScroll } from "../components/InfiniteScroll"
import { Filter } from "../components/Filter"
import { IFeature, MagType } from "../interfaces"
import { PER_PAGE } from "../constants"

export const HomePage = () => {

  const [features, setFeatures] = useState<IFeature[]>([])
  const [magTypeFilters, setMagTypeFilters] = useState('')

  const [page, setPage] = useState(1)

  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const magTypes = searchParams.getAll('filters[mag_type][]') as MagType[]
    setMagTypeFilters(magTypes.length > 0 ? `&filters[mag_type][]=${magTypes.join('&filters[mag_type][]=')}` : '')
  }, [location])

  useEffect(() => {
    setPage(1)
    setFeatures([])
  }, [magTypeFilters])

  useEffect(() => {
    const fetchFeatures = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/features?page=${page}&per_page=${PER_PAGE}${magTypeFilters}`)
      const { data } = await response.json()
      setFeatures(data)
    }
    fetchFeatures()
  }, [magTypeFilters])

  const fetchMoreFeatures = async () => {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/features?page=${page + 1}&per_page=${PER_PAGE}${magTypeFilters}`)
    const { data } = await response.json()
		setFeatures(prev => [...prev, ...data]);
		setPage(prev => prev + 1);
		return data.length > 0;
	};
  
  return (
    <>
      <header className="my-4 flex justify-between items-center">
        <h2 className="font-semibold text-xl">List of Earthquakes</h2>
        <Filter />
      </header>
      <div className="my-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          features.length === 0 && <div className="col-span-full text-center">No data found</div>
        }
        {
          features.map((feature) => (
            <Feature key={feature.id} feature={feature} />
          ))
        }
      </div>
      <InfiniteScroll fetchData={fetchMoreFeatures} />
    </>
  )
}
