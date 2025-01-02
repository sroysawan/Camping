import { featchLandmarks, featchLandmarksHero, featchLandmarksByCurrentUser } from "@/actions/action"
import { LandmarkCardProps } from "@/utils/types"
import CampList from "./CampList"
import EmptyList from "../home/EmptyList";


const CampContainer = async () => {
    const userLandmarks: LandmarkCardProps[] = await featchLandmarksByCurrentUser();

  return (
    <div className="mb-8">

      {
        userLandmarks.length === 0
          ? <EmptyList heading="No result" btnText="Clear Filter"/>
          : <CampList landmarks={userLandmarks} />
      }

    </div>
  )
}

export default CampContainer
