import Link from "next/link"
import { Button } from "../ui/button"

const Logo = () => {
  return (
    <Button size='sm' asChild>
      <Link
        className="text-2xl"
        href='/'
      >
        Logo
      </Link>
    </Button>
  )
}

export default Logo
