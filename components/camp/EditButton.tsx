import { auth } from '@clerk/nextjs/server'
import { CardEditButton, SiginCardButton } from '../form/Buttons'
import Link from 'next/link'


const EditButton = async ({ landmarkId }: { landmarkId: string }) => {
    const { userId } = await auth()
    if (!userId) return <SiginCardButton />

    return (
        <>
            <Link href={`/camp/edit/${landmarkId}`}>
                <CardEditButton />
            </Link>
        </>
    )
}

export default EditButton
