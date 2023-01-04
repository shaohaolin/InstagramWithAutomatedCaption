import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Header() {
  return (
    <div>
      <div className="flex justify-between max-w-6xl">
        {/* Left */}
        <div className="relative hidden lg:inline-grid w-24 cursor-pointer">
          <Image
            src="https://links.papareact.com/ocw"
            fill
            alt="logo"
            objectFit="contain"
          />
        </div>

        <div className="relative h-10 w-10 lg:hidden flex-shrink-0 cursor-pointer">
          <Image
            src="https://links.papareact.com/jjm"
            fill
            alt="logo"
            objectFit="contain"
          />
        </div>
        {/* Middle - Search input field */}
        <div className="max-w-sm">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 blick w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        {/* Right */}
      </div>
    </div>
  );
}

export default Header;
