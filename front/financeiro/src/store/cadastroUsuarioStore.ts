import { defineStore } from "pinia";
import CadastroUsuarioService from "@/service/CadastroUsuarioService";
import { ref } from "vue";
import Usuario from "@/type/usuarioType";

export const CadastroUsuarioStore = defineStore("cadastroUsuarioStore", () => {
  const cdUsuario = ref<number | null>(null);
  const nome = ref("");
  const senha = ref("");
  const confirmacaoSenha = ref("");
  const ativo = ref("S");

  const usuarios = ref<Usuario[]>([]);
  const usuario = ref<Usuario>();

  const getUsuarios = async () => {
    const response = await CadastroUsuarioService.getUsuarios();

    if (response.hasError) {
      return;
    }

    usuarios.value = response.content!;
  };

  const deleteUsuario = async (cdUsuario: number) => {
    const response = await CadastroUsuarioService.deleteUsuario(cdUsuario);

    if (response.hasError) {
      return response;
    }

    usuarios.value = getUsuarios();
  };

  const saveUsuario = async (usuario: Usuario) => {
    const response = await CadastroUsuarioService.saveUsuario(usuario);

    if (response.hasError) {
      return response;
    }

    usuarios.value = getUsuarios();
  };

  return {
    cdUsuario,
    nome,
    senha,
    confirmacaoSenha,
    ativo,
    usuarios,
    usuario,
    saveUsuario,
    getUsuarios,
    deleteUsuario,
  };
});

export default CadastroUsuarioStore;
