'use client'
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from 'use-debounce';
const Search = () => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const [search, setSearch] = useState(
    searchParams.get('search')?.toString() || ''
  )

  const handleSearch = useDebouncedCallback((value:string)=>{
    const params = new URLSearchParams(searchParams)
    //ถ้ามี
    if(value){
      params.set('search', value)
    } else {
      //ถ้าไม่มี
      params.delete('search')
    }
    replace(`/?${params.toString()}`)
    
  },500)

  useEffect(()=>{
    if(!searchParams.get('search')){
      setSearch('')
    }
  },[searchParams])
  return (
    <Input
      type="text"
      placeholder="Search Camping"
      className="max-w-xs text-xs sm:text-base"
      onChange={(e)=>{
        setSearch(e.target.value)
        handleSearch(e.target.value)
      }}
      value={search}
    />
  )
}

export default Search
