import { LandmarkCardProps } from "@/utils/types"
const OtherInfo = ({ landmark }: { landmark: LandmarkCardProps }) => {
    return (
        <div className="text-white">
            <p className="text-lg">{landmark.province}</p>
            <p className="text-xl font-semibold md:my-3 md:text-4xl tracking-wide">{landmark.name}</p>
        </div>
    )
}

export default OtherInfo
