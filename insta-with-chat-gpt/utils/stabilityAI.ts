import * as Generation from "../generation/generation_pb";
import { GenerationServiceClient } from "../generation/generation_pb_service";
import { grpc as GRPCWeb } from "@improbable-eng/grpc-web";

// Authenticate using your API key, don't commit your key to a public repository!
const metadata = new GRPCWeb.Metadata();

metadata.set(
  "Authorization",
  `Bearer ${process.env.NEXT_PUBLIC_API_KEY ?? ""}`
);

// Create a generation client to use with all future requests
const client = new GenerationServiceClient("https://grpc.stability.ai", {});

export { metadata, client };
