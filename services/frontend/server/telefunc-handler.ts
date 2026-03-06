import { enhance, type UniversalHandler } from "@universal-middleware/core";
import { telefunc } from "telefunc";

// Note: You can directly define a server middleware instead of defining a universal middleware. (Vike's scaffolder uses https://github.com/magne4000/universal-middleware to simplify its internal logic.)
export const telefuncHandler: UniversalHandler = enhance(
  async (request, context, runtime) => {
    const httpResponse = await telefunc({
      request,
      context: {
        ...context,
        ...runtime,
      },
    });
    const { body, statusCode, contentType } = httpResponse;
    return new Response(body, {
      status: statusCode,
      headers: {
        "content-type": contentType,
      },
    });
  },
  {
    name: "my-app:telefunc-handler",
    path: `/_telefunc`,
    method: ["GET", "POST"],
    immutable: false,
  },
);
