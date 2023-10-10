<template>
  <v-container>
    <v-card>
      <div class="form-cadastro">
        <h2>Cadastro de Usuário</h2>
        <div class="input-group">
          <input class="input" type="text" id="nome" v-model="nome" required />
          <label class="user-label">Nome</label>
        </div>
        <div class="input-group">
          <input
            class="input"
            type="password"
            id="senha"
            v-model="senha"
            required
          />
          <label class="user-label">Senha</label>
        </div>
        <div class="input-group">
          <input
            class="input"
            type="password"
            id="confirmacao-senha"
            v-model="confirmacaoSenha"
            required
          />
          <label class="user-label">Confirme a senha</label>
        </div>
        <div class="input-group">
          <v-checkbox
            label="Ativo"
            true-value="S"
            false-value="N"
            v-model="ativo"
          />
        </div>
        <button
          class="button-custom"
          @click="cadastrarUsuario"
          style="margin-right: 10px"
        >
          Cadastrar
        </button>
        <button class="button-custom" @click="cancelar">Cancelar</button>
      </div>
    </v-card>

    <v-card style="padding-top: 30px">
      <div class="grid-usuarios">
        <h2 style="padding-bottom: 10px">Lista de Usuários</h2>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" style="width: 700px">Nome</th>
                <th class="text-left" style="width: 100px"></th>
                <th class="text-left" style="width: 100px">Ativo</th>
                <th class="text-left"></th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="usuario in storeUsuario.usuarios"
                :key="usuario.cdUsuario"
              >
                <td>{{ usuario.deUsuario }}</td>
                <td></td>
                <td>{{ usuario.flAtivo }}</td>
                <td>
                  <span class="button-grid" @click="exibirUsuario(usuario)"
                    ><v-icon>mdi mdi-text-box-edit-outline</v-icon></span
                  >
                </td>
                <td>
                  <span
                    class="button-grid"
                    @click="
                      usuario.cdUsuario !== undefined
                        ? excluirUsuario(usuario.cdUsuario)
                        : null
                    "
                  >
                    <v-icon>mdi-delete</v-icon>
                  </span>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-card>

    <v-snackbar
      rounded="pill"
      :timeout="2000"
      v-model="snackBar.show"
      :color="snackBar.color"
    >
      {{ snackBar.msg }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import "@/assets/css/form-styles.css";
import axios from "axios";
import { ref, onMounted } from "vue";
import Usuario from "@/type/usuarioType";
import CadastroUsuarioStore from "@/store/cadastroUsuarioStore";
import { storeToRefs } from "pinia";

const storeUsuario = CadastroUsuarioStore();

const { getUsuarios, saveUsuario, deleteUsuario } = storeUsuario;

const { cdUsuario, nome, senha, confirmacaoSenha, ativo } =
  storeToRefs(storeUsuario);

const snackBar = ref({
  show: false,
  msg: "",
  color: "",
});

const cancelar = () => {
  nome.value = "";
  senha.value = "";
  confirmacaoSenha.value = "";
  ativo.value = "S";
  cdUsuario.value = null;
};

const cadastrarUsuario = () => {
  axios
    .post("http://localhost:8081/api/usuario", {
      cdUsuario: cdUsuario.value,
      deUsuario: nome.value,
      senha: senha.value,
      flAtivo: ativo.value,
    })
    .then((response) => {
      nome.value = "";
      senha.value = "";
      confirmacaoSenha.value = "";
      ativo.value = "S";
      cdUsuario.value = null;

      fetchUsuarios();
    })
    .catch((error) => {
      snackBar.value.msg = error.response.data.errors[0].defaultMessage;
      snackBar.value.show = true;
      snackBar.value.color = "#d11e48";
    });
};

const exibirUsuario = (usuario: Usuario) => {
  cdUsuario.value = usuario.cdUsuario != undefined ? usuario.cdUsuario : null;
  nome.value = usuario.deUsuario != undefined ? usuario.deUsuario : "";
  senha.value = usuario.senha != undefined ? usuario.senha : "";
  confirmacaoSenha.value = usuario.senha != undefined ? usuario.senha : "";
  ativo.value = usuario.flAtivo;
};

const fetchUsuarios = async () => {
  await getUsuarios();
};

const excluirUsuario = async (cdUsuario: number) => {
  const response = await deleteUsuario(cdUsuario);

  console.log(response);

  if (response!.hasError) {
    const msgErro = response!.error!.message;

    snackBar.value.msg = msgErro.substring(49, msgErro.length);
    snackBar.value.show = true;
    snackBar.value.color = "#d11e48";
  }
};

onMounted(() => {
  fetchUsuarios();
});
</script>
