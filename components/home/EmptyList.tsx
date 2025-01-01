import Link from "next/link"
import { Button } from "../ui/button"


const EmptyList = (
    { heading = "No item",
        message = "Please try again",
        btnText = "back home"
    }: { heading?: string, message?: string, btnText?: string }) => {
    return (
        <div className="text-center mt-8">
            <h1 className="my-4 text-xl text-muted-foreground">{heading}</h1>
            {/* <p className="text-lg mb-4">{message}</p> */}
            <Button className="capitalize" asChild>
                <Link href={'/'}>
                    {btnText}
                </Link>
            </Button>
        </div>
    )
}


export default EmptyList
