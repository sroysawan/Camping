import { auth } from "@clerk/nextjs/server"
import { CardRemoveButton, SiginCardButton } from "../form/Buttons"
import { removeLandmarkAction } from "@/actions/action"
import { usePathname } from "next/navigation"
import FormContainer from "../form/FormContainer"
import CampRemoveForm from "./CampRemoveForm"

const RemoveButton = async ({ landmarkId }: { landmarkId: string }) => {
    const { userId } = await auth()
    if (!userId) return <SiginCardButton />

    return (
        <CampRemoveForm landmarkId={landmarkId} />
    )
}

export default RemoveButton
