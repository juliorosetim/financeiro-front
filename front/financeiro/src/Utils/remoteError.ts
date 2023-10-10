import { RemoteError } from "@/type/Rest";

export const remoteError = (error: any): RemoteError => {
  let message = "Erro interno do servidor";
  let code = 500;

  console.log("error.response", error.response);
  // if (error.response.data && error.response.data.message) {
  //   message = error.response.data.message;
  //   code = error.response.data.status;
  // } else if (
  //   error.response.data &&
  //   error.response.data.error &&
  //   error.response.data.error_description
  // ) {
  //   message = error.response.data.error_description;
  //   code = error.response.status;
  // } else if (error.response.status == 404) {
  //   message = "404 - Recurso indisponível";
  // }
  // return {
  //   message: message,
  //   code: code,
  // } as RemoteError;

  if (error.response.data.errors != undefined) {
    message = error.response.data.errors[0].defaultMessage;
  }

  return {
    message: message,
    code: code,
  } as RemoteError;
};
