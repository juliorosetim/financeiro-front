<template>
  <v-container>
    <div class="form">
      <button class="button-novo" @click="novoLancamento">
        <v-icon>mdi-plus</v-icon>
      </button>
      <!-- <card>
        <div class="form-cadastro">
          <h2>Lançamento</h2>

          <button class="button-custom" @click="novoLancamento">Novo</button>

          <div class="input-group">
            <v-select
              clearable
              outlined
              v-model="tpLancamento"
              :items="tiposLancamentos"
              item-value="tpLancamento"
              item-text="deGrupo"
              item-title="deGrupo"
              label="Tipo de Lançamento"
              density="compact"
              hide-details="true"
              variant="outlined"
            />
          </div>

          <div class="input-group">
            <input
              v-model="deDescricao"
              id="deDescricao"
              type="text"
              name="text"
              required
              autocomplete="off"
              class="input"
            />
            <label class="user-label">Descrição do Lançamento</label>
          </div>

          <div class="input-group">
            <v-select
              clearable
              outlined
              v-model="selectedGrupo"
              :items="grupos"
              item-value="cdGrupo"
              item-text="deGrupo"
              item-title="deGrupo"
              label="Grupo"
              density="compact"
              hide-details="true"
              return-object
              variant="outlined"
            />
          </div>

          <div class="input-group">
            <v-select
              clearable
              v-model="selectedCategoria"
              :items="categorias"
              item-value="cdCategoria"
              item-text="deCategoria"
              item-title="deCategoria"
              label="Categoria"
              density="compact"
              hide-details="true"
              return-object
              variant="outlined"
            />
          </div>

          <div class="input-group">
            <v-select
              clearable
              outlined
              dense
              v-model="selectedFormaPagto"
              :items="formasPagto"
              item-value="cdFormaPagto"
              item-text="deFormaPagto"
              item-title="deFormaPagto"
              label="Forma Pagamento"
              density="compact"
              hide-details="true"
              return-object
              variant="outlined"
            />
          </div>

          <div v-show="habilitaCartao()" class="input-group">
            <v-select
              clearable
              outlined
              dense
              v-model="selectedCartao"
              :items="cartoes"
              item-value="cdCartao"
              item-text="deCartao"
              item-title="deCartao"
              label="Cartão"
              density="compact"
              hide-details="true"
              return-object
              variant="outlined"
            />
          </div>

          <div class="input-group">
            <input
              class="input"
              type="number"
              id="vlrTotal"
              v-model="vlrTotal"
              required
              autocomplete="off"
            />
            <label class="user-label">Valor total</label>
          </div>

          <div v-show="!isReceita()" class="input-group">
            <input
              class="input"
              type="number"
              id="qtdeParcela"
              v-model="qtdeParcela"
              required
              autocomplete="off"
            />
            <label class="user-label">Quantidade de parcelas</label>
          </div>

          <div class="input-group">
            <v-label for="dtLancamento"></v-label>
            <input
              class="input"
              type="date"
              id="dtLancamento"
              v-model="dtLancamento"
              required
              autocomplete="off"
            />
            <label class="user-label">Data de lançamento</label>
          </div>

          <div class="input-group">
            <input
              class="input"
              type="text"
              id="deFatura"
              v-model="deFatura"
              required
            />
            <label class="user-label">Observação</label>
          </div>
          <div>
            <v-checkbox-btn
              label="Pago"
              true-value="S"
              false-value="N"
              v-model="pago"
            />
          </div>
          <button
            class="button-custom"
            @click="cadastrarGasto"
            style="margin-right: 10px"
          >
            Cadastrar
          </button>
          <button class="button-custom" @click="cancelar">Cancelar</button>
        </div>
      </card> -->

      <v-card style="padding-top: 30px">
        <div class="grid-gastos">
          <h2 style="padding-bottom: 10px">Lista de Lançamentos</h2>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="width: 35%">
                    Descrição do Lançamento
                  </th>
                  <th class="text-left" style="width: 10%">Grupo</th>
                  <th class="text-left" style="width: 10%">Categoria</th>
                  <th class="text-left" style="width: 10%">Valor</th>
                  <th class="text-left" style="width: 10%"></th>
                  <th class="text-left" style="width: 10%"></th>
                  <th class="text-left" style="width: 10%"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="gasto in gastos" :key="gasto.cdGasto">
                  <td>{{ gasto.deDescricao }}</td>
                  <td>{{ gasto.grupo.deGrupo }}</td>
                  <td>{{ gasto.categoria.deCategoria }}</td>

                  <div v-if="gasto.tpLancamento == 'Receita'">
                    <td style="color: green">
                      {{ formatarValorMonetario(gasto.vlrTotal) }}
                    </td>
                  </div>
                  <div v-else="gasto.tpLancamento == 'Despesa'">
                    <td style="color: red">
                      {{ formatarValorMonetario(gasto.vlrTotal) }}
                    </td>
                  </div>

                  <td>
                    <span class="button-grid" @click="exibirParcelas(gasto)"
                      ><v-icon>mdi-eye</v-icon></span
                    >
                  </td>
                  <td>
                    <span class="button-grid" @click="exibirGasto(gasto)"
                      ><v-icon>mdi mdi-text-box-edit-outline</v-icon></span
                    >
                  </td>
                  <td>
                    <span
                      class="button-grid"
                      @click="
                        gasto.cdGasto !== undefined
                          ? excluirGasto(gasto.cdGasto)
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

      <ModalParcelas
        :parcelas="parcelasGasto"
        :showModal="showModal"
        @fecharModal="fecharModal"
      />

      <ModalLancamento
        :showModal="showLancamentos"
        :gasto="gastoSelected"
        @fechar-modal-lancamento="fecharModalLancamento"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { Cartao } from "@/type/CartaoType";
import { Grupo } from "@/type/GrupoType";
import { FormaPagto } from "@/type/FormaPagtoType";
import "@/assets/css/form-styles.css";
import { format } from "date-fns";
import { Categoria } from "@/type/CategoriaType";
import { Gasto } from "@/type/GastoType";
import { ParcelasGastosDto } from "@/type/ParcelasGastosDto";
import ModalParcelas from "./ModalParcelas.vue";
import ModalLancamento from "./ModalLancamento.vue";
// import GastoService from "@/service/GastoService.ts";
import gastoStore from "@/store/GastoStore";
import { storeToRefs } from "pinia";

const cartoes = ref<Cartao[]>([]);
const grupos = ref<Grupo[]>([]);
const formasPagto = ref<FormaPagto[]>([]);
const categorias = ref<Categoria[]>([]);
const gastos = ref<Gasto[]>([]);

const gastoSelected = ref<Gasto | null>(null);

const parcelasGasto = ref<ParcelasGastosDto[] | null>(null);

const showModal = ref(false);

const showLancamentos = ref(false);

const storeGastos = gastoStore();

const { getGastos, gastosStore } = storeGastos;

const {
  cdGasto,
  deFatura,
  deDescricao,
  qtdeParcela,
  vlrTotal,
  pago,
  tpLancamento,
  dtLancamento,
  selectedCartao,
  selectedCategoria,
  selectedFormaPagto,
  selectedGrupo,
} = storeToRefs(storeGastos);

const fetchGastos = async () => {
  await getGastos();

  gastos.value = storeGastos.gastosStore;
};

const fetchParcelas = async (cdGasto: number) => {
  axios
    .get(`http://localhost:8081/api/parcelas/parcelas-por-gasto/${cdGasto}`)
    .then((response) => {
      parcelasGasto.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar a lista de gastos", error);
    });
};

const excluirGasto = (cdGasto: number) => {
  axios
    .delete(`http://localhost:8081/api/gastos/${cdGasto}`)
    .then(() => {
      fetchGastos();
    })
    .catch((error) => {
      console.error("Erro ao excluir gasto:", error);
    });
};

const exibirGasto = (gasto: Gasto) => {
  storeGastos.cdGasto = gasto.cdGasto;
  storeGastos.deFatura = gasto.deFatura;
  storeGastos.deDescricao = gasto.deDescricao;
  storeGastos.selectedGrupo = { ...gasto.grupo };
  storeGastos.selectedCategoria = { ...gasto.categoria };
  storeGastos.selectedFormaPagto = { ...gasto.formaPagto };
  storeGastos.selectedCartao = { ...gasto.cartao };
  storeGastos.qtdeParcela = gasto.qtdeParcela;
  storeGastos.vlrTotal = gasto.vlrTotal;
  storeGastos.dtLancamento = gasto.dtLancamento;
  storeGastos.pago = gasto.pago;
  storeGastos.tpLancamento = gasto.tpLancamento;

  storeGastos.gastoSelectedStore = gasto;

  showLancamentos.value = true;
};

const formatarValorMonetario = (valor: number) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

onMounted(() => {
  fetchGastos();
});

const exibirParcelas = (gasto: Gasto) => {
  gastoSelected.value = gasto;

  fetchParcelas(gastoSelected.value.cdGasto);

  showModal.value = true;
};

const fecharModal = () => {
  showModal.value = false;
};

const fecharModalLancamento = () => {
  showLancamentos.value = false;
  fetchGastos();
};

const novoLancamento = () => {
  showLancamentos.value = true;
};
</script>
