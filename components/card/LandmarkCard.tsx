import { LandmarkCardProps } from '@/utils/types'
import Image from 'next/image'
import LandmarkRating from './LandmarkRating'
import FavoriteToggleButton from './FavoriteToggleButton'
import Link from 'next/link'


const LandmarkCard = ({ landmark }: { landmark: LandmarkCardProps }) => {
    const { name, image, id, description, province, lat, lng, category, price } = landmark
    return (
        <article className='group relative'>
            <Link href={`/landmark/${id}`}>
                <div className='relative h-[300px] rounded-md'>
                    <Image
                        src={image}
                        sizes="(max-width:768) 100vw, 50vw"
                        alt={name}
                        fill
                        className="object-cover rounded-md 
                    group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <h3 className='text-sm font-semibold '>{name.substring(0, 30)}</h3>
                    <LandmarkRating />
                </div>
                <p className='text-sm mt-1 text-muted-foreground line-clamp-1'>
                    {description}
                </p>
                <div className='flex justify-between items-center mt-1 font-semibold'>
                    <span>THB {price}</span>
                    <p>{province}</p>
                </div>
            </Link>
            <div className='absolute top-3 right-3'>
                <FavoriteToggleButton landmarkId={id} />
            </div>
        </article>

    )
}

export default LandmarkCard
