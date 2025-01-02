import { fetchFavorites } from "@/actions/action"
import EmptyList from "@/components/home/EmptyList"
import LandmarkList from "@/components/home/LandmarkList"

const FavoritesPage = async () => {
  const favorites = await fetchFavorites()
  // console.log(favorites[0].landmark.name)
  return (
    <>
      {/* {favorites.length > 0
        ? <LandmarkList landmarks={favorites} />
        : <p className="mt-4 text-center text-muted-foreground">No Favorites</p>
      } */}
      {
        favorites.length === 0
        ? <EmptyList heading="No items Favorites"/>
        : <LandmarkList landmarks={favorites} />
      }

    </>
  )
}

export default FavoritesPage
