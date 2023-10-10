import { Cartao } from "@/type/CartaoType";
import axios from "axios";
import { RemoteError, Response } from "./Rest";
import { handleApiResponse } from "@/Utils/request";

class CartaoService {
  public async getCartoes(): Promise<Response<Cartao[]>> {
    const url = "http://localhost:8081/api/cartao";

    return handleApiResponse(() => axios.get(url));
  }

  public async saveCartao(cartao: Cartao): Promise<Response<Cartao>> {
    const url = "http://localhost:8081/api/cartao";
    return handleApiResponse(() => axios.post(url, cartao));
  }

  public async deleteCartao(cdCartao: number): Promise<Response<Cartao>> {
    const url = `http://localhost:8081/api/cartao/${cdCartao}`;
    return handleApiResponse(() => axios.delete(url));
  }
}

export default new CartaoService();
