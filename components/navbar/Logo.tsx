import Link from "next/link"
import { Button } from "../ui/button"
import { Tent } from "lucide-react"

const Logo = () => {
  return (
    <Button size='sm' asChild>
      <Link
        className="text-2xl"
        href='/'
      >
        <Tent />
      </Link>
    </Button>
  )
}

export default Logo
