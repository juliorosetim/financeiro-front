import { Response } from "@/type/Rest";
import { remoteError } from "./remoteError";
import { AxiosResponse } from "axios";

export const newResponse = <T>(): Response<T> => {
  return new Response<T>();
};

export const handleApiResponse = async <T>(
  requestFn: () => Promise<AxiosResponse<T>>,
): Promise<Response<T>> => {
  const response = newResponse<T>();

  try {
    const { data } = await requestFn();
    response.content = data;
  } catch (e) {
    response.error = remoteError(e);
  }

  return response;
};
