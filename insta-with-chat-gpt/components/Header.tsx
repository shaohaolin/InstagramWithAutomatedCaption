import Image from "next/image";
import {
  Bars3Icon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

function Header() {
  return (
    <div>
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* Left */}
        <div className="relative hidden lg:inline-grid w-24 cursor-pointer">
          <Image
            src="https://links.papareact.com/ocw"
            fill
            alt="logo"
            objectFit="contain"
          />
        </div>

        <div className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
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
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navBtn" />
          <Bars3Icon className="h-6 md:hidden cursor-pointer" />
          <div className="relative">
            <PaperAirplaneIcon className="navBtn -rotate-45" />
            <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
              3
            </div>
          </div>
          <PlusCircleIcon className="navBtn" />
          <UserGroupIcon className="navBtn" />
          <HeartIcon className="navBtn" />
          <img
            src="https://i.pinimg.com/236x/d9/97/4c/d9974c818ebf4e514deceb4ce67fdfb0.jpg"
            alt="profile picture"
            className="h-10 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
