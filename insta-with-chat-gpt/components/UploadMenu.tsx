import { Menu } from "@headlessui/react";
import {
  LanguageIcon,
  PhotoIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { imageToTextModalState } from "../atoms/imageToTextModalAtom";
import { textToImageModalState } from "../atoms/textToImageModalAtom";

function UploadMenu() {
  const [textToImageModalOpen, setTextToImageModalOpen] = useRecoilState(
    textToImageModalState
  );
  const [imageToTexModalOpen, setimageToTexModalOpen] = useRecoilState(
    imageToTextModalState
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>
        <PlusCircleIcon className="h-6 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-150 ease-out" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-1 py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-violet-500 text-white" : "text-gray-900"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                onClick={() => setTextToImageModalOpen(!textToImageModalOpen)}
              >
                <LanguageIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                Text to Image
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-violet-500 text-white" : "text-gray-900"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                onClick={() => setimageToTexModalOpen(!imageToTexModalOpen)}
              >
                <PhotoIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                Image to Text
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}

export default UploadMenu;
