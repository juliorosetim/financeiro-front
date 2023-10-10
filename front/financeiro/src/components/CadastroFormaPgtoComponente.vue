<template>
  <v-container>
    <!-- Seção do formulário -->
    <v-card>
      <div class="form-cadastro">
        <h2>Cadastro Forma Pagamento</h2>
        <div class="input-group">
          <input
            type="text"
            id="deFormaPagto"
            v-model="deFormaPagto"
            required
            class="input"
          />
          <label class="user-label">Forma de Pagamento</label>
        </div>
        <div>
          <v-checkbox-btn label="Cartão?" true-value="Cartão" v-model="tipo" />
        </div>
        <button
          class="button-custom"
          @click="cadastrarFormaPagto"
          style="margin-right: 10px"
        >
          Cadastrar
        </button>
        <button class="button-custom" @click="cancelar">Cancelar</button>
      </div>
    </v-card>

    <v-card style="padding-top: 30px">
      <div class="grid-forma-pagto">
        <h2 style="padding-bottom: 10px">Lista de Formas de Pagamentos</h2>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" style="width: 1000px">
                  Forma de Pagamento
                </th>
                <th class="text-left"></th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="formaPagto in formasPagto"
                :key="formaPagto.cdFormaPagto"
              >
                <td>{{ formaPagto.deFormaPagto }}</td>
                <td>
                  <span
                    class="button-grid"
                    @click="exibirFormaPagto(formaPagto)"
                    ><v-icon>mdi mdi-text-box-edit-outline</v-icon></span
                  >
                </td>
                <td>
                  <span
                    class="button-grid"
                    @click="
                      formaPagto.cdFormaPagto !== undefined
                        ? excluirFormaPagto(formaPagto.cdFormaPagto)
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
import axios from "axios";
import { ref, onMounted } from "vue";
import { FormaPagto } from "@/type/FormaPagtoType";
import "@/assets/css/form-styles.css";
import SnackBarComponent from "./SnackBarComponent.vue";

const cdFormaPagto = ref<number | null>(null);
const deFormaPagto = ref("");
const tipo = ref("");

const formasPagto = ref<FormaPagto[]>([]);

const snackBar = ref({
  show: false,
  msg: "",
  color: "",
});

const cadastrarFormaPagto = () => {
  axios
    .post("http://localhost:8081/api/formapagto", {
      cdFormaPagto: cdFormaPagto.value,
      deFormaPagto: deFormaPagto.value,
      tipo: tipo.value,
    })
    .then((response) => {
      deFormaPagto.value = "";
      cdFormaPagto.value = null;
      tipo.value = "";

      fetchFormaPagto();
    })
    .catch((error) => {
      snackBar.value.msg = error.response.data.errors[0].defaultMessage;
      snackBar.value.show = true;
      snackBar.value.color = "#d11e48";
    });
};

const cancelar = () => {
  deFormaPagto.value = "";
  cdFormaPagto.value = null;
  tipo.value = "";
};

const fetchFormaPagto = () => {
  axios
    .get("http://localhost:8081/api/formapagto")
    .then((response) => {
      formasPagto.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar a lista de formas de pagamento:", error);
    });
};

const excluirFormaPagto = (cdFormaPagto: number) => {
  axios
    .delete(`http://localhost:8081/api/formapagto/${cdFormaPagto}`)
    .then(() => {
      fetchFormaPagto();
    })
    .catch((error) => {
      const msgErro = error.response.data.message;

      snackBar.value.msg = msgErro.substring(49, msgErro.length);
      snackBar.value.show = true;
      snackBar.value.color = "#d11e48";
    });
};

const exibirFormaPagto = (formaPagto: FormaPagto) => {
  cdFormaPagto.value = formaPagto.cdFormaPagto;
  deFormaPagto.value = formaPagto.deFormaPagto;
  tipo.value = formaPagto.tipo;
};

onMounted(() => {
  fetchFormaPagto();
});
</script>
