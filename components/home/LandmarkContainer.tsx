import { featchLandmarks, featchLandmarksHero } from "@/actions/action"
import LandmarkList from "./LandmarkList"
import { LandmarkCardProps } from "@/utils/types"
import Hero from "../hero/Hero"
import CategoryList from "./CategoryList"
import EmptyList from "./EmptyList"


const LandmarkContainer = async ({ search, category }:
  { search?: string, category?: string }) => {
  const landmarks: LandmarkCardProps[] = await featchLandmarks({ search, category })
  const landmarksHero: LandmarkCardProps[] = await featchLandmarksHero()

  return (
    <div className="mb-8">
      <Hero landmarks={landmarksHero} />
      <CategoryList search={search} category={category} />

      {
        landmarks.length === 0
          ? <EmptyList heading="No result" btnText="Clear Filter"/>
          : <LandmarkList landmarks={landmarks} />
      }

    </div>
  )
}

export default LandmarkContainer
