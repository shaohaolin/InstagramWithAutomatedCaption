import { useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import Caption from "./Caption";
import { captionState } from "../atoms/captionAtom";
import { imageState } from "../atoms/imageAtom";
import LoadingDots from "./LoadingDots";
import { imageToTextModalState } from "../atoms/imageToTextModalAtom";

function Modal() {
  const [open, setOpen] = useRecoilState(imageToTextModalState);
  const [generatedImage, setGeneratedImage] = useRecoilState(imageState);
  const [generatedCaption, setGeneratedCaption] =
    useRecoilState<string>(captionState);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (readerEvent) => {
        setGeneratedImage(readerEvent.target?.result as unknown as string);
      };
    }
  };

  const generateCaption = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const res = await fetch("/api/image-to-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: generatedImage }),
    });

    let newCaption = await res.json();
    if (res.status !== 200) {
      setError(newCaption);
    } else {
      const trimmedCaption = newCaption.split("Caption: ")[1];
      setGeneratedCaption(trimmedCaption);
    }
    setLoading(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* The element is to trick the browser into centering the modal contents */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="east-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6 w-full">
              <div>
                {generatedImage ? (
                  <img
                    src={generatedImage as unknown as string}
                    className="object-contain cursor-pointer w-full"
                    onClick={() => setGeneratedImage(null)}
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current?.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Upload a photo
                    </Dialog.Title>

                    <div>
                      <input
                        ref={filePickerRef}
                        type="file"
                        hidden
                        onChange={addImageToPost}
                      />
                    </div>
                  </div>

                  <div className="mt-2">{generatedCaption}</div>
                  <div className="mt-2">{generatedCaption && <Caption />}</div>
                  <div className="mt-2">
                    {error && (
                      <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8"
                        role="alert"
                      >
                        <span className="block sm:inline">{error}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  {!generatedCaption && !loading && (
                    <button
                      onClick={generateCaption}
                      disabled={!generatedImage}
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                    >
                      Image to text
                    </button>
                  )}
                  {loading && (
                    <button
                      className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                      disabled
                    >
                      <LoadingDots color="white" style="large" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
