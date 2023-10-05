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
              <tr v-for="usuario in usuarios" :key="usuario.cdUsuario">
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

    <SnackBarComponent
      :msg="snackBar.msg"
      :show="snackBar.show"
      :color="snackBar.color"
    />
  </v-container>
</template>

<script setup lang="ts">
import "@/assets/css/form-styles.css";
import axios from "axios";
import { ref, onMounted } from "vue";
import Usuario from "@/type/usuarioType";
import SnackBarComponent from "./SnackBarComponent.vue";

const cdUsuario = ref<number | null>(null);
const nome = ref(<string>"");
const senha = ref("");
const confirmacaoSenha = ref("");
const ativo = ref("");

const usuarios = ref<Usuario[]>([]);

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
      console.log("Usuário cadastrado com sucesso!", response.data);
      nome.value = "";
      senha.value = "";
      confirmacaoSenha.value = "";
      ativo.value = "S";
      cdUsuario.value = null;

      fetchUsuarios();
    })
    .catch((error) => {
      console.error("Erro ao cadastrar usuário:", error);
    });
};

const exibirUsuario = (usuario: Usuario) => {
  cdUsuario.value = usuario.cdUsuario != undefined ? usuario.cdUsuario : null;
  nome.value = usuario.deUsuario != undefined ? usuario.deUsuario : "";
  senha.value = usuario.senha != undefined ? usuario.senha : "";
  confirmacaoSenha.value = usuario.senha != undefined ? usuario.senha : "";
  ativo.value = usuario.flAtivo;
};

const fetchUsuarios = () => {
  axios
    .get("http://localhost:8081/api/usuario")
    .then((response) => {
      usuarios.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar a lista de usuários:", error);
    });
};

const excluirUsuario = (cdUsuario: number) => {
  axios
    .delete(`http://localhost:8081/api/usuario/${cdUsuario}`)
    .then(() => {
      console.log("Usuário excluído com sucesso!");
      fetchUsuarios();
    })
    .catch((error) => {
      snackBar.value.msg = error.response.data.message;
      snackBar.value.show = true;
      snackBar.value.color = "#d11e48";
    });
};

onMounted(() => {
  fetchUsuarios();
});
</script>
