import { useState } from "react";
import Image from "next/image";
import LoadingDots from "./LoadingDots";
import DropDown, { VibeType } from "./DropDown";
import { AnimatePresence, motion } from "framer-motion";
import ResizablePanel from "./ResizablePanel";
import { useRecoilState } from "recoil";
import { captionState } from "../atoms/captionAtom";
import { textToImageModalState } from "../atoms/textToImageModalAtom";
import { captionModalState } from "../atoms/captionModalAtom";
import { imageToTextModalState } from "../atoms/imageToTextModalAtom";

function Caption() {
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useRecoilState(captionState);
  const [vibe, setVibe] = useState<VibeType>("Standard");
  const [generatedCaptions, setGeneratedCaptions] = useState<String>("");
  const [textToImageModalOpen, setTextToImageModalOpen] = useRecoilState(
    textToImageModalState
  );
  const [, setimageToTexModalOpen] = useRecoilState(imageToTextModalState);
  const [, setCaptionModalOpen] = useRecoilState(captionModalState);

  const prompt =
    vibe === "Funny"
      ? `Generate 2 funny instagram captions with 2 hashtags in the end and clearly labeled "1." and "2.". Make sure there is a joke in there and it's a little ridiculous. Make sure each generated caption is at max 30 words and base it on this context: ${caption}${
          caption.slice(-1) === "." ? "" : "."
        }`
      : `Generate 2 ${vibe} twitter captions with 2 hashtags in the end and clearly labeled "1." and "2.". Make sure each generated caption is at least 14 words and at max 25 words and base them on this context: ${caption}${
          caption.slice(-1) === "." ? "" : "."
        }`;

  const generatecaption = async (e: any) => {
    e.preventDefault();
    setGeneratedCaptions("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedCaptions((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  const handleSelectedCaption = (selectedCaption: string) => {
    setCaption(selectedCaption);
    if (textToImageModalOpen) {
      setTextToImageModalOpen(false);
    } else {
      setimageToTexModalOpen(false);
    }
    setCaptionModalOpen(true);
  };
  return (
    <>
      <div className="max-w-xl w-full">
        <div className="flex mt-10 items-center space-x-3">
          <Image src="/1-black.png" width={30} height={30} alt="1 icon" />
          <p className="text-left font-medium">Please enter a caption.</p>
        </div>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={4}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
          placeholder={
            "e.g. Bowser the frenchie @vancity_bowser. Goofy ball that makes you laugh everyday."
          }
        />
        <div className="flex mb-5 items-center space-x-3">
          <Image src="/2-black.png" width={30} height={30} alt="2 icon" />
          <p className="text-left font-medium">Select your vibe.</p>
        </div>
        <div className="block">
          <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
        </div>

        {!loading && generatedCaptions === "" && (
          <button
            className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
            onClick={(e) => generatecaption(e)}
          >
            Generate your caption &rarr;
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
      <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
      <ResizablePanel>
        <AnimatePresence mode="wait">
          <motion.div className="space-y-10 my-10">
            {generatedCaptions && (
              <>
                <div className="flex mb-5 items-center space-x-3">
                  <Image
                    src="/3-black.png"
                    width={30}
                    height={30}
                    alt="1 icon"
                  />
                  <p className="text-left font-medium">Select your caption.</p>
                </div>
                <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                  {generatedCaptions
                    .substring(generatedCaptions.indexOf("1") + 3)
                    .split("2.")
                    .map((generatedCaption) => {
                      return (
                        <div
                          className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                          key={generatedCaption}
                          onClick={() =>
                            handleSelectedCaption(generatedCaption)
                          }
                        >
                          <p>{generatedCaption}</p>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </ResizablePanel>
    </>
  );
}

export default Caption;
