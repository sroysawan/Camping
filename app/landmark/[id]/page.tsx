import { fetchLandmarkDetail } from "@/actions/action"
import MapLandmarkClient from "@/components/camp/MapLandmarkClient"
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton"
import Bredcrumbs from "@/components/landmark/Bredcrumbs"
import Description from "@/components/landmark/Description"
import ImageContainer from "@/components/landmark/ImageContainer"
import ShareButton from "@/components/landmark/ShareButton"
import MapLandmark from "@/components/map/MapLandmark"
import { redirect } from "next/navigation"

const LandmarkDetail = async ({ params }: { params: { id: string } }) => {
    const { id } = await params
    const landmark = await fetchLandmarkDetail({ id })

    if (!landmark) redirect("/")

    return (
        <section className="mb-8">
            <Bredcrumbs name={landmark.name} />
            <header className="flex justify-between items-center mt-8">
                <h1 className="text-4xl font-bold capitalize">{landmark.name}</h1>
                <div className="flex items-center gap-x-4">
                    <ShareButton landmarkId={landmark.id} name={landmark.name}/>
                    <FavoriteToggleButton landmarkId={landmark.id} />
                </div>
            </header>
            {/* Image */}
            <ImageContainer
                mainImage={landmark.image}
                name={landmark.name}
            />
            {/* Detail */}
            <section>
                <div>
                    <Description description={landmark.description} />
                    <span>ผู้สร้าง: {landmark.profile?.firstName}</span>
                </div>
                {/* <MapLandmark
                    location={{ lat: landmark.lat, lng: landmark.lng }}
                /> */}
                <MapLandmarkClient location={{ lat: landmark.lat, lng: landmark.lng }} />
            </section>
        </section>
    )
}

export default LandmarkDetail
