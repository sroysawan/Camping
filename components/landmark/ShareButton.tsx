'use client'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Share2 } from "lucide-react"
import { Button } from "../ui/button"
import {
    FacebookShareButton,
    LineShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
    LineIcon,
} from "react-share";


const ShareButton = ({ landmarkId, name }: { landmarkId: string, name: string }) => {
    const url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const shareLink = `${url}/landmark/${landmarkId}`
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <Share2 />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                side="top"
                align='end'
                className="flex w-full justify-center items-center gap-x-2"
            >
                <FacebookShareButton url={shareLink} name={name}>
                    <FacebookIcon size={'36px'} className="rounded-md"/>
                </FacebookShareButton>
                <TwitterShareButton url={shareLink} name={name}>
                    <TwitterIcon size={'36px'} className="rounded-md"/>
                </TwitterShareButton>
                <LineShareButton url={shareLink} name={name}>
                    <LineIcon size={'36px'} className="rounded-md"/>
                </LineShareButton>
            </PopoverContent>
        </Popover>

    )
}

export default ShareButton
