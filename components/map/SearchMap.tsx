
import { MapPin, Search, X } from "lucide-react"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { Latlng, SearchParams } from "@/utils/types"
import { useDebouncedCallback } from "use-debounce"


const SearchMap = ({
    position,
    setPosition,
}: {
    position: Latlng | null;
    setPosition: (position: Latlng) => void;
}) => {
    const [searchText, setSearchText] = useState('')
    const [listPlace, setListPlace] = useState<any[]>([])
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const debouncedSearch = useDebouncedCallback(() => {
        if (searchText.trim().length > 0) {
            handleSearch();
        }
    }, 500);

    useEffect(() => {
        debouncedSearch()
    }, [searchText]);

    const handleSearch = async () => {
        const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
        const params: SearchParams = {
            q: searchText,
            format: 'json',
            addressdetails: 1,
            polygon_geojson: 0,
        };
        const queryString = new URLSearchParams(
            Object.entries(params).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>)
        ).toString();
        try {
            const response = await fetch(`${NOMINATIM_BASE_URL}${queryString}`);
            const result = await response.json();
            setListPlace(result);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };
    return (
        // <div className="relative flex flex-col mb-4">
        //     <div className="flex w-full justify-between gap-4">
        //         <div className="w-full">
        //             <Input
        //                 type="text"
        //                 value={searchText}
        //                 onChange={(e) => setSearchText(e.target.value)}
        //                 placeholder="Search location..."
        //                 onKeyDown={(e) => {
        //                     if (e.key === 'Enter') {
        //                         e.preventDefault(); // ป้องกันการส่งฟอร์ม
        //                         handleSearch(); // เรียกฟังก์ชันค้นหา
        //                     }
        //                 }}
        //             />
        //         </div>
        //     </div>
        //     {/* รายการสถานที่ */}
        //     {listPlace.length > 0 && (
        //         <div className="bg-white opacity-90 border rounded shadow mt-2 max-h-64 overflow-y-auto w-full absolute top-7 z-30">
        //             {listPlace.map((item: any) => {
        //                 const lat = parseFloat(item?.lat);
        //                 const lon = parseFloat(item?.lon);
        //                 return (
        //                     <div
        //                         key={item?.place_id}
        //                         className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
        //                         onClick={() => setPosition([lat, lon])}
        //                     >
        //                         <MapPin className="w-4 h-4 text-gray-500" />
        //                         <span className="text-sm">{item?.display_name}</span>
        //                     </div>
        //                 );
        //             })}
        //         </div>
        //     )}
        // </div>
        <div className="relative w-full h-full">
            {/* Overlay */}
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10"
                    onClick={() => setIsSearchOpen(false)}
                ></div>
            )}
            {/* ค้นหา */}
            {!isSearchOpen && (
                <button
                    type="button"
                    onClick={() => setIsSearchOpen(true)}
                    className="absolute -bottom-28 left-3 z-20 flex items-center justify-center rounded-sm bg-white p-1.5 shadow-md"
                    aria-label="search"
                >
                    <Search size={18} />
                </button>
            )}

            {isSearchOpen && (
                <div className="absolute -bottom-32 left-3 z-20 flex gap-2 bg-white p-0.5 sm:p-2 text-xs sm:text-base rounded shadow-md">
                    <Input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search location..."
                        className="text-xs sm:text-base"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault(); // ป้องกันการส่งฟอร์ม
                                handleSearch(); // เรียกฟังก์ชันค้นหา
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center justify-center rounded-sm bg-gray-200 p-1.5"
                        aria-label="close search"
                    >
                        <X />
                    </button>
                </div>
            )}

            {/* รายการสถานที่ */}
            {isSearchOpen && listPlace.length > 0 && (
                <div className="absolute top-32 left-3 right-4 z-20 w-full sm:w-1/2 bg-white border rounded shadow max-h-48 sm:max-h-64 overflow-y-auto">
                    {listPlace.map((item: any) => {
                        const lat = parseFloat(item?.lat);
                        const lon = parseFloat(item?.lon);
                        return (
                            <div
                                key={item?.place_id}
                                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setPosition([lat, lon]);
                                    setIsSearchOpen(false); // ปิดการค้นหาหลังจากเลือกสถานที่
                                }}
                            >
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="text-xs sm:text-sm">{item?.display_name}</span>
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
};

export default SearchMap
