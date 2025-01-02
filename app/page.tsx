import LoadingCardHome from "@/components/card/LoadingCardHome"
import LandmarkContainer from "@/components/home/LandmarkContainer"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
const page = async({searchParams}:
  {searchParams:{ search?:string ,category?:string}}) => {
  //search
  const {search,category} = await searchParams

  return (
    <section>
      <Suspense fallback={<LoadingCardHome/>}>
        <LandmarkContainer search={search} category={category}/>
      </Suspense>
    </section>
  )
}

export default page
