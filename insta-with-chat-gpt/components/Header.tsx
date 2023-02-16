import Image from "next/image";
import {
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import UploadMenu from "./UploadMenu";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* Left */}
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid w-24 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/ocw"
            fill
            alt="logo"
            objectFit="contain"
          />
        </div>

        <div
          onClick={() => router.push("/")}
          className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer"
        >
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
          <HomeIcon onClick={() => router.push("/")} className="navBtn" />
          {/* Show Upload menu in small screen only */}
          {session && (
            <div className="md:hidden">
              <UploadMenu />
            </div>
          )}
          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn -rotate-45" />
                <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
                  3
                </div>
              </div>
              {/* Hide Upload menu in small screen and show in bigger screen */}
              <div className="hidden md:flex">
                <UploadMenu />
              </div>
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                src={session?.user?.image || ""}
                alt="profile picture"
                className="h-10 rounded-full cursor-pointer"
                onClick={() => signOut()}
              />
            </>
          ) : (
            <button
              className="py-2 px-4 rounded-full text-xs md:text-base"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
