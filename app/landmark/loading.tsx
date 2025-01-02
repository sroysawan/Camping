import { Skeleton } from '@/components/ui/skeleton'

const loading = () => {
    return (
        <>
            <Skeleton className='h-8 w-1/4 rounded-md mt-4' />
            <Skeleton className='h-8 w-full rounded-md mt-4' />
            <Skeleton className='h-[300px] md:h-[500px] w-full rounded-md mt-8' />
            <Skeleton className='h-8 w-full rounded-md mt-4' />
            <Skeleton className='h-8 w-3/4 rounded-md mt-4' />
            <Skeleton className='h-8 w-2/4 rounded-md mt-4' />
            <Skeleton className='h-[300px] md:h-[500px] w-full rounded-md mt-8' />
        </>
    )
}

export default loading
