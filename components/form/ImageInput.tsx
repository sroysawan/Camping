import { Label } from '@/components/ui/label'
import { Input } from '../ui/input'
const ImageInput = () => {
    const name = 'image'
    return (
        <div className='mb-2'>
            <Label className='capitalize'>
                {name}
            </Label>
            <Input
                id={name}
                name={name}
                type='file'
                required
                accept='image/*'
            />
        </div>
    )
}

export default ImageInput
