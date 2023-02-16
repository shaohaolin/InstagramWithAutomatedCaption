import { useState } from "react";

function CaptionGenerator() {
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedCaption, setGeneratedCaption] = useState<string>("");
  const generateCaption = async (e: any) => {
    e.preventDefault();
    setGeneratedCaption("");
    setLoading(true);
    const response = await fetch("/api/image-to-text", {
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
      // setGeneratedCaptions((prev) => prev + chunkValue);
    }

    setLoading(false);
  };
}

export default CaptionGenerator;
