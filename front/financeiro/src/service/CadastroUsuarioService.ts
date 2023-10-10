import Usuario from "@/type/usuarioType";
import { handleApiResponse } from "@/Utils/request";
import axios from "axios";
import { RemoteError, Response } from "./Rest";

class CadastroUsuarioService {
  public async getUsuarios(): Promise<Response<Usuario[]>> {
    const url = "http://localhost:8081/api/usuario";

    return handleApiResponse(() => axios.get(url));
  }

  public async saveUsuario(usuario: Usuario): Promise<Response<Usuario>> {
    const url = "http://localhost:8081/api/usuario";
    return handleApiResponse(() => axios.post(url, usuario));
  }

  public async deleteUsuario(cdUsuario: number): Promise<Response<Usuario>> {
    const url = `http://localhost:8081/api/usuario/${cdUsuario}`;
    return handleApiResponse(() => axios.delete(url));
  }
}

export default new CadastroUsuarioService();
