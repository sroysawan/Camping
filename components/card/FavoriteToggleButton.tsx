import { auth } from '@clerk/nextjs/server'
import { SiginCardButton } from '../form/Buttons'
import { fetchFavoriteId } from '@/actions/action'
import FavoriteToggleForm from './FavoriteToggleForm'
const FavoriteToggleButton = async ({ landmarkId }: { landmarkId: string }) => {
    const { userId } = await auth()

    if (!userId) return <SiginCardButton />

    const favoriteId = await fetchFavoriteId({ landmarkId })
    return (
        <FavoriteToggleForm
            favoriteId={favoriteId}
            landmarkId={landmarkId}
        />
    )
}

export default FavoriteToggleButton
