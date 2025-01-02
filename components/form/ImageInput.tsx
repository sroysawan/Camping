import { Label } from '@/components/ui/label'
import { Input } from '../ui/input'

type ImageProps = {
    name: string
    required: boolean
}
const ImageInput = (props:ImageProps) => {
    // const name = 'image'
    const { name, required } = props
    return (
        <div className='mb-2'>
            <Label className='capitalize'>
                {name}
            </Label>
            <Input
                id={name}
                name={name}
                type='file'
                required={required}
                accept='image/*'
            />
        </div>
    )
}

export default ImageInput
