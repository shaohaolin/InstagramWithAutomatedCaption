import { useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { captionState } from "../atoms/captionAtom";
import { captionModalState } from "../atoms/captionModalAtom";
import ImageGenerator from "./ImageGenerator";
import { imageState } from "../atoms/imageAtom";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";

function CaptionModal() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(captionModalState);
  const [caption, setCaption] = useRecoilState(captionState);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useRecoilState(imageState);

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    // 1) Create a post and add to firestore 'posts' collection
    // 2) Get the post ID for the newly created post
    // 3) Upload the image to firebase storage with the post ID
    // 4) Get a download URL from firebase storage for the image update the original post with image

    const docRef = await addDoc(collection(db, "posts"), {
      //@ts-expect-error
      username: session?.user?.username,
      caption,
      profileImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, generatedImage as string, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setGeneratedImage(null);
    setCaption("");
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {generatedImage ? (
                  <img
                    src={generatedImage}
                    className="w-full object-contain cursor-pointer"
                  />
                ) : (
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer">
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>

              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Upload a photo
                  </Dialog.Title>
                </div>

                <div className="mt-2">
                  <div
                    className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                    key={caption}
                    onClick={() => setCaption(caption)}
                  >
                    <p>{caption}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                {generatedImage ? (
                  <button
                    onClick={uploadPost}
                    disabled={!generatedImage || caption === ""}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                  >
                    {loading ? "Uploading..." : "Upload Post"}
                  </button>
                ) : (
                  <ImageGenerator />
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default CaptionModal;
