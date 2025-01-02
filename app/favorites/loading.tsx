import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
  return (
    // <LoadingCard/>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}

export default loading

export const SkeletonCard = () => {
  return <div>
    <Skeleton className="h-[300px] rounded-md mb-2" />
    <Skeleton className="h-4 w-3/4 rounded-md mb-2" />
    <Skeleton className="h-4 w-1/2 rounded-md mb-2" />
    <Skeleton className="h-4 w-1/4 rounded-md" />
  </div>
}
