import CampContainer from "@/components/camp/CampContainer";
import LoadingCard from "@/components/card/LoadingCard";
import { Suspense } from "react";

const CampPage = async() => {

  return (
    <section>
      <Suspense fallback={<LoadingCard/>}>
        <CampContainer />
      </Suspense>
    </section>
  )
}

export default CampPage
