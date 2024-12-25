'use client'
import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import { Heart, RotateCw } from "lucide-react"
import { SignInButton } from "@clerk/nextjs"

type btnSize = 'default' | 'lg' | 'sm'

type SubmitButtonProps = {
    className?: string
    size?: btnSize
    text?: string
}
export const SubmitButton = (props: SubmitButtonProps) => {
    const { className, size, text } = props
    const { pending } = useFormStatus();
    return (
        <Button
            type='submit'
            size={size}
            className={`${className} capitalize`}
            disabled={pending}
        >
            {pending
                ? <>
                    <RotateCw className="animate-spin" />
                    <span>Please wait...</span>
                </>
                : `${text}`
            }

        </Button>
    )
}


export const SiginCardButton = () => {
    return (
        <SignInButton mode="modal">
            <Button size="icon" variant="outline">
                <Heart />
            </Button>
        </SignInButton>
    )
}

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
    const { pending } = useFormStatus()
    return (
        <Button
            type="submit"
            size='icon'
            variant='outline'
        >
            {pending
                ? <RotateCw className="animate-spin" />
                : isFavorite
                ? <Heart fill="green" />
                : <Heart />
            }
            
        </Button>
    )
}
