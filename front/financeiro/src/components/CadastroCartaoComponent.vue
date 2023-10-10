<template>
  <v-container>
    <!-- Seção do formulário -->
    <v-card>
      <div class="form-cadastro">
        <h2>Cadastro de Cartões</h2>

        <div class="input-group">
          <input
            type="text"
            name="deCartao"
            id="deCartao"
            class="input"
            autocomplete="deCartao"
            v-model="deCartao"
            required
          />
          <label class="user-label">Cartão</label>
        </div>

        <div class="input-group">
          <input
            type="text"
            name="diaVirada"
            id="diaVirada"
            class="input"
            autocomplete="diaVirada"
            v-model="diaVirada"
            required
          />
          <label class="user-label">Dia da Fechamento</label>
        </div>

        <div class="input-group">
          <input
            type="text"
            name="diaVencimento"
            id="diaVencimento"
            class="input"
            autocomplete="diaVencimento"
            v-model="diaVencimento"
            required
          />
          <label class="user-label">Dia do Vencimento</label>
        </div>

        <button class="button-custom" @click="cadastrarCartao">
          Cadastrar
        </button>
        <button class="button-custom" @click="cancelar">Cancelar</button>
      </div>
    </v-card>

    <v-card style="padding-top: 30px">
      <div class="grid-cartoes">
        <h2 style="padding-bottom: 10px">Lista de Cartões</h2>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" style="width: 700px">Nome</th>
                <th class="text-left" style="width: 100px">Fechamento</th>
                <th class="text-left" style="width: 100px">Vencimento</th>
                <th class="text-left"></th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cartao in cartoes" :key="cartao.cdCartao">
                <td>{{ cartao.deCartao }}</td>
                <td>{{ cartao.diaVirada }}</td>
                <td>{{ cartao.diaVencimento }}</td>
                <td>
                  <span class="button-grid" @click="exibirCartao(cartao)"
                    ><v-icon>mdi mdi-text-box-edit-outline</v-icon></span
                  >
                </td>
                <td>
                  <span
                    class="button-grid"
                    @click="
                      cartao.cdCartao !== undefined
                        ? excluirCartao(cartao.cdCartao)
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
import { ref, onMounted } from "vue";
import { Cartao } from "@/type/CartaoType";
import "@/assets/css/form-styles.css";
import CartaoStore from "@/store/CartaoStore";
import { storeToRefs } from "pinia";

const snackBar = ref({
  show: false,
  msg: "",
  color: "",
});

const storeCartao = CartaoStore();

const { cdCartao, deCartao, diaVirada, diaVencimento, cartoes } =
  storeToRefs(storeCartao);

const { getCartoes, saveCartao, deleteCartao } = storeCartao;

const cadastrarCartao = async () => {
  const cartaoSave = {
    cdCartao: cdCartao.value,
    deCartao: deCartao.value,
    diaVirada: diaVirada.value,
    diaVencimento: diaVencimento.value,
  };
  const response = await storeCartao.saveCartao(cartaoSave);

  cancelar();
};

const cancelar = () => {
  deCartao.value = "";
  diaVirada.value = null;
  diaVencimento.value = null;
  cdCartao.value = null;
};

const fetchCartoes = async () => {
  await getCartoes();
};

const excluirCartao = async (cdCartao: number) => {
  const response = await deleteCartao(cdCartao);

  if (response!.hasError) {
    const msgErro = response!.error!.message;

    snackBar.value.msg = msgErro.substring(49, msgErro.length);
    snackBar.value.show = true;
    snackBar.value.color = "#d11e48";
  }
};

const exibirCartao = (cartao: Cartao) => {
  cdCartao.value = cartao.cdCartao;
  deCartao.value = cartao.deCartao;
  diaVirada.value = cartao.diaVirada;
  diaVencimento.value = cartao.diaVencimento;
};

onMounted(() => {
  fetchCartoes();
});
</script>
