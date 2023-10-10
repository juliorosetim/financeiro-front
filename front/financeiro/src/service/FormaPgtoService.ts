import axios from "axios";
import { Response } from "./Rest";
import { handleApiResponse } from "@/Utils/request";
import { FormaPagto } from "@/type/FormaPagtoType";

class FormaPgtoService {
  public async getFormaPgto(): Promise<Response<FormaPagto[]>> {
    const url = "http://localhost:8081/api/formapagto";

    return handleApiResponse(() => axios.get(url));
  }

  public async saveFormaPgto(
    formapagto: FormaPagto,
  ): Promise<Response<FormaPagto>> {
    const url = "http://localhost:8081/api/formapagto";
    return handleApiResponse(() => axios.post(url, formapagto));
  }

  public async deleteFormaPgto(
    cdFormaPgto: number,
  ): Promise<Response<FormaPagto>> {
    const url = `http://localhost:8081/api/formapagto/${cdFormaPgto}`;
    return handleApiResponse(() => axios.delete(url));
  }
}

export default new FormaPgtoService();
