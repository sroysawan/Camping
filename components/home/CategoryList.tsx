import { categories } from "@/utils/categorys"
import Link from "next/link"


const CategoryList = ({ search, category }:
    { search?: string, category?: string }) => {
    const searchTerm = search ? `&search=${search}` : ''
    return (
        <div className="flex justify-between mt-4">
            {categories.map((item) => {
                const isActive = item.label === category
                return (
                    <Link
                        href={`/?category=${item.label}${searchTerm}`}
                        key={item.label}
                        className={``}
                    >
                        <article 
                        className={`flex flex-col justify-center items-center p-1.5 sm:p-3 text-xs sm:text-base
                            hover:text-primary hover:scale-105 hover:duration-300 
                            ${isActive ? 'text-primary' : ''}`}
                        >
                            <item.icon className="size-3 sm:size-6"/>
                            {item.label}
                        </article>
                    </Link>
                )
            })}
        </div>
    )
}

export default CategoryList
