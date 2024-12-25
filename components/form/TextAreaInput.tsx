
import { Textarea } from "@/components/ui/textarea"
import { Label } from "../ui/label"

type TextAreaInputProps = {
    name: string
    labelText?: string
    defaultValue?: string
}

const TextAreaInput = (props: TextAreaInputProps) => {
    const { name, labelText, defaultValue } = props
    return (
        <div className='mb-2'>
            <Label
                htmlFor={name}
                className='capitalize'
            >
                {labelText || name}
            </Label>
            <Textarea
                id={name}
                name={name}
                defaultValue={defaultValue}
                rows={5}
                required
            />
        </div>
    )
}

export default TextAreaInput
