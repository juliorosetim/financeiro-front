<template>
  <v-container>
    <!-- Seção do formulário -->
    <v-card>
      <div class="form-cadastro">
        <h2>Cadastro de categoria</h2>
        <div class="input-group">
          <input
            type="text"
            id="deCategoria"
            v-model="deCategoria"
            required
            class="input"
          />
          <label class="user-label">Categoria</label>
        </div>
        <div class="input-group">
          <input
            type="text"
            id="metaMensal"
            v-model="metaMensal"
            required
            class="input"
          />
          <label class="user-label">Meta mensal</label>
        </div>
        <button
          class="button-custom"
          @click="cadastrarCategoria"
          style="margin-right: 10px"
        >
          Cadastrar
        </button>
        <button class="button-custom" @click="cancelar">Cancelar</button>
      </div>
    </v-card>

    <v-card style="padding-top: 30px">
      <div>
        <h2 style="padding-bottom: 10px">Lista de Categorias</h2>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" style="width: 1000px">Categoria</th>
                <th class="text-left" style="width: 1000px">Meta</th>
                <th class="text-left"></th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="categoria in categorias" :key="categoria.cdCategoria">
                <td>{{ categoria.deCategoria }}</td>
                <td>
                  {{ Uteis.formatarValorMonetario(categoria.metaMensal) }}
                </td>
                <td>
                  <span class="button-grid" @click="exibirCategoria(categoria)"
                    ><v-icon>mdi mdi-text-box-edit-outline</v-icon></span
                  >
                </td>
                <td>
                  <span
                    class="button-grid"
                    @click="
                      categoria.cdCategoria !== undefined
                        ? excluirCategoria(categoria.cdCategoria)
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
import axios from "axios";
import { ref, onMounted } from "vue";
import { Categoria } from "@/type/CategoriaType";
import "@/assets/css/form-styles.css";
import SnackBarComponent from "./SnackBarComponent.vue";
import Constantes from "@/service/Constantes";
import Uteis from "@/service/Uteis";

const deCategoria = ref("");
const cdCategoria = ref<number | null>(null);

const metaMensal = ref<number | null>(null);

const categorias = ref<Categoria[]>([]);

const snackBar = ref({
  show: false,
  msg: "",
  color: "",
});

const cadastrarCategoria = () => {
  if (deCategoria.value === "") {
    alert("Preencha o campo Categoria");
    return;
  }

  axios
    .post("http://localhost:8081/api/categoria", {
      cdCategoria: cdCategoria.value,
      deCategoria: deCategoria.value,
      metaMensal: metaMensal.value,
    })
    .then((response) => {
      console.log("Categoria cadastrada com sucesso!", response.data);
      deCategoria.value = "";
      cdCategoria.value = null;
      metaMensal.value = null;

      fetchCategorias();
    })
    .catch((error) => {
      console.error("Erro ao cadastrar Categoria:", error);
    });
};

const cancelar = () => {
  deCategoria.value = "";
  cdCategoria.value = null;
  metaMensal.value = null;
};

const fetchCategorias = () => {
  axios
    .get("http://localhost:8081/api/categoria")
    .then((response) => {
      categorias.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar a lista de Categorias:", error);
    });
};

const excluirCategoria = (cdCategoria: number) => {
  axios
    .delete(`http://localhost:8081/api/categoria/${cdCategoria}`)
    .then(() => {
      console.log("Categoria excluída com sucesso!");
      fetchCategorias();
    })
    .catch((error) => {
      console.log(error);
      snackBar.value.msg = error.response.data.message;
      snackBar.value.show = true;
      snackBar.value.color = "#d11e48";
    });
};

const exibirCategoria = (categoria: Categoria) => {
  cdCategoria.value = categoria.cdCategoria;
  deCategoria.value = categoria.deCategoria;
  metaMensal.value = categoria.metaMensal;
};

onMounted(() => {
  fetchCategorias();
  console.log(Constantes.URL_API);
});
</script>
