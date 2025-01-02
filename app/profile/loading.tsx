import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
  return (
   <>
    <Skeleton className='h-8 w-full rounded-md mt-4' />
    <Skeleton className='h-[200px] md:h-[400px] w-full rounded-md mt-8' />
   </>
  )
}

export default loading
