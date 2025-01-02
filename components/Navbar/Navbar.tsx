import { DarkMode } from "./DakMode"
import DropDownListMenu from "./DropDownListMenu"
import Logo from "./Logo"
import Search from "./Search"

const Navbar = () => {
    return (
        <nav>
            <div className="container flex flex-row justify-between
            py-8 sm:items-center gap-4">
                {/* logo */}
                <Logo />
                {/* search */}
                <Search />
                {/* theme & profile */}
                <div className="flex gap-4">
                    <DarkMode/>
                    <DropDownListMenu/>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
