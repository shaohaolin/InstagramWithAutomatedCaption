import { NextApiRequest, NextApiResponse } from "next";

type Data = string;
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    imageUrl: string;
  };
}

async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  const imageUrl = req.body.imageUrl;

  // POST request to Replicate to start the image caption generation process
  let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + process.env.REPLICATE_API_KEY,
    },
    body: JSON.stringify({
      version:
        "2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746",
      input: { image: imageUrl, caption: true },
    }),
  });

  // Calling this operation starts a new prediction for the version and inputs you provide.
  // As models can take several seconds or more to run, the output will not be available immediately.
  let jsonStartResponse = await startResponse.json();
  let endpointUrl = jsonStartResponse.urls.get;

  // GET request to get the status of the image caption process & return the result when it's ready
  let imageCaption: string | null = null;
  while (!imageCaption) {
    // Loop in 1s intervals until the alt text is ready
    console.log("polling for result...");
    let finalResponse = await fetch(endpointUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
    });

    const jsonFinalResponse = await finalResponse.json();
    if (jsonFinalResponse.status === "succeeded") {
      imageCaption = jsonFinalResponse.output;
    } else if (jsonFinalResponse === "failed") {
      break;
    } else {
      // Wait 1s before polling again
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  res
    .status(200)
    .json(imageCaption ? imageCaption : "Image caption generation failed :(");
}

export default handler;
