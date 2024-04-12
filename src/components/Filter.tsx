import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { MagType } from "../interfaces"
import { MAG_TYPES } from "../constants"

export const Filter = () => {

  const [magTypesFilter, setMagTypesFilter] = useState<MagType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const magTypes = searchParams.getAll('filters[mag_type][]') as MagType[]
    setMagTypesFilter(magTypes)
  }, [])

  useEffect(() => {
    setSearchParams(generateSearchParams(magTypesFilter))
  }, [magTypesFilter, setSearchParams])

  const generateSearchParams = (magTypes: MagType[]) => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.delete('filters[mag_type][]')
    magTypes.forEach((magType) => {
      searchParams.append('filters[mag_type][]', magType)
    })
    return searchParams
  }

  return (
    <div className="flex items-center gap-x-2">
      <span className="font-semibold">Filters:</span>
      <form>
        <fieldset className="flex items-center gap-x-2">
          {
            MAG_TYPES.map((magType) => (
              <label key={magType} className="flex items-center gap-x-1 border-r pr-2 border-r-gray-300">
                <span>{magType}</span>
                <input
                  type="checkbox"
                  value={magType}
                  checked={magTypesFilter.includes(magType)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setMagTypesFilter([...magTypesFilter, magType])
                    } else {
                      setMagTypesFilter(magTypesFilter.filter((item) => item !== magType))
                    }
                  }}
                />
              </label>
            ))
          }
        </fieldset>
      </form>
    </div>
  )
}
