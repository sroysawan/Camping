import { AlignLeft } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import UserIcon from "./UserIcon"
import Link from "next/link"
import { links } from "@/utils/links"

import SignOutLinks from "./SignOutLinks"
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'
import { currentUser } from "@clerk/nextjs/server"

const DropDownListMenu = async() => {
    const user = await currentUser()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline'>
                    <AlignLeft />
                    <UserIcon userImg={user?.imageUrl} size="size-6"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* ล็อคเอ้าแล้ว */}
                <SignedOut>
                    <DropdownMenuItem >
                        <SignInButton mode="modal">
                            <button>
                                Log in
                            </button>
                        </SignInButton>
                    </DropdownMenuItem>

                    <DropdownMenuItem >
                        <SignUpButton mode="modal">
                            <button>
                                Sign Up
                            </button>
                        </SignUpButton>
                    </DropdownMenuItem>
                </SignedOut>

                {/* ล็อคอินแล้ว */}
                <SignedIn>
                    {
                        links.map((item, index) => {
                            return (
                                <DropdownMenuItem key={index} >
                                    <Link href={item.href}  className="w-full">
                                        {item.label}
                                    </Link>
                                </DropdownMenuItem>
                            )
                        })
                    }
                    <DropdownMenuSeparator />
                    <DropdownMenuItem >
                        <SignOutLinks />
                    </DropdownMenuItem>
                </SignedIn>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDownListMenu
