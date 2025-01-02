
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { CircleUserRound } from "lucide-react"
const UserIcon = ({ userImg,size }: { userImg?: string , size?:string}) => {
    return (
        <Avatar className={size}>
            <AvatarImage
                src={userImg}
                alt={userImg}
                className="object-cover" />
            <AvatarFallback>
                <CircleUserRound className={size}/>
            </AvatarFallback>
        </Avatar>
    )
}

export default UserIcon
