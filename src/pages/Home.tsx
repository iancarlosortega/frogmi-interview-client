import { useEffect, useState } from "react"
import { Feature } from "../components/Feature"
import { InfiniteScroll } from "../components/InfiniteScroll"
import { IFeature, MagType } from "../interfaces"
import { PER_PAGE } from "../constants"

export const HomePage = () => {

  const [features, setFeatures] = useState<IFeature[]>([])

  const [page, setPage] = useState(1)
  const [magTypesFilter, setMagTypesFilter] = useState<MagType[]>([])

  useEffect(() => {
    setPage(1)
  }, [magTypesFilter])

  const fetchMoreFeatures = async () => {

		const response = await fetch(`${import.meta.env.VITE_API_URL}/features?page=${page}&per_page=${PER_PAGE}`)
    const { data } = await response.json()

		setFeatures(prev => [...prev, ...data]);
		setPage(prev => prev + 1);

		return data.length > 0;
	};
  
  return (
    <>
      <div className="my-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          features.map((feature) => (
            <Feature key={feature.id} feature={feature} />
          ))
        }
      </div>
      <InfiniteScroll fetchData={fetchMoreFeatures}/>
    </>
  )
}
