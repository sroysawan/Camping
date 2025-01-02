import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
  return (
    // <LoadingCard/>
    <div className="gap-8 mt-4">
      <SkeletonCard />

    </div>
  )
}

export default loading

export const SkeletonCard = () => {
  return <div>
    <Skeleton className="h-4 w-1/4 rounded-md mb-2" />
    <Skeleton className="h-[800px] rounded-md mb-2" />
  </div>
}
