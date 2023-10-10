import { handleApiResponse } from "@/Utils/request";
import { gastoStore } from "@/store/GastosStore";
import { Gasto } from "@/type/GastoType";
import axios from "axios";

class GastoService {
  public async getGastoByCdGasto(cdGasto: number): Promise<Response<Gasto>> {
    const url = "http://localhost:8081/api/gastos";

    return handleApiResponse(() => axios.get(url));
  }

  public async getGastos(): Promise<Response<Gasto[]>> {
    const url = "http://localhost:8081/api/gastos";

    return handleApiResponse(() => axios.get(url));
  }

  public async saveGasto(gasto: Gasto): Promise<Response<Gasto>> {
    const url = "http://localhost:8081/api/gastos";
    return handleApiResponse(() => axios.post(url, gasto));
  }
}

export default new GastoService();
