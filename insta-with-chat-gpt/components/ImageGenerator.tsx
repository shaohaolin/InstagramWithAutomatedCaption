import {
  buildGenerationRequest,
  executeGenerationRequest,
  onGenerationComplete,
} from "../utils/helpers";
import { client, metadata } from "../utils/stabilityAI";
import { DiffusionSampler } from "../generation/generation_pb";
import { useState } from "react";
import LoadingDots from "./LoadingDots";
import { useRecoilState } from "recoil";
import { captionState } from "../atoms/captionAtom";
import { imageState } from "../atoms/imageAtom";

function ImageGenerator() {
  const [loading, setLoading] = useState(false);
  const [caption] = useRecoilState(captionState);
  const [, setGeneratedImage] = useRecoilState(imageState);

  const request = buildGenerationRequest("stable-diffusion-512-v2-1", {
    type: "text-to-image",
    prompts: [
      {
        text: caption,
      },
    ],
    width: 512,
    height: 512,
    samples: 1,
    cfgScale: 13,
    steps: 25,
    sampler: DiffusionSampler.SAMPLER_K_DPMPP_2M,
  });

  const generateImage = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedImage(null);
    executeGenerationRequest(client, request, metadata)
      .then((response) => {
        const imageUrl = onGenerationComplete(response);
        console.log(imageUrl);
        setLoading(false);
        setGeneratedImage(imageUrl as string);
      })
      .catch((error) => {
        console.error("Failed to make text-to-image request:", error);
      });
  };

  return (
    <>
      {!loading && (
        <button
          className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
          onClick={(e) => generateImage(e)}
        >
          Generate your image &rarr;
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
    </>
  );
}

export default ImageGenerator;
