<template>
  <v-dialog v-model="props.showModal" max-width="1200px">
    <div class="form">
      <card>
        <div class="form-cadastro">
          <h2>Lançamento</h2>

          <div class="input-group">
            <v-select
              clearable
              outlined
              v-model="storeGastos.tpLancamento"
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
              v-model="storeGastos!.deDescricao"
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
              v-model="storeGastos!.selectedGrupo"
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
              v-model="storeGastos!.selectedCategoria"
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
              v-model="storeGastos!.selectedFormaPagto"
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
              v-model="storeGastos!.selectedCartao"
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
              v-model="storeGastos!.vlrTotal"
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
              v-model="storeGastos!.qtdeParcela"
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
              v-model="storeGastos!.dtLancamento"
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
              v-model="storeGastos!.deFatura"
              required
            />
            <label class="user-label">Observação</label>
          </div>
          <div>
            <v-checkbox-btn
              label="Pago"
              true-value="S"
              false-value="N"
              v-model="storeGastos!.pago"
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
          <button class="button-custom" @click="fecharModalLancamento">
            Fechar
          </button>
        </div>
      </card>
    </div>

    <v-snackbar
      rounded="pill"
      :timeout="2000"
      v-model="snackBar.show"
      :color="snackBar.color"
    >
      {{ snackBar.msg }}
    </v-snackbar>
  </v-dialog>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted, PropType, onActivated } from "vue";
import { Cartao } from "@/type/CartaoType";
import { Grupo } from "@/type/GrupoType";
import { FormaPagto } from "@/type/FormaPagtoType";
import "@/assets/css/form-styles.css";
import { format } from "date-fns";
import { Categoria } from "@/type/CategoriaType";
import { Gasto } from "@/type/GastoType";
import { storeToRefs } from "pinia";
import gastoStore from "@/store/GastoStore";
import Uteis from "@/service/Uteis";

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
});

const snackBar = ref({
  show: false,
  msg: "",
  color: "",
});

const emits = defineEmits(["fecharModalLancamento"]);

const cartoes = ref<Cartao[]>([]);
const grupos = ref<Grupo[]>([]);
const formasPagto = ref<FormaPagto[]>([]);
const categorias = ref<Categoria[]>([]);

const storeGastos = gastoStore();
const {
  cdGasto,
  deFatura,
  deDescricao,
  qtdeParcela,
  vlrTotal,
  pago,
  tpLancamento,
  selectedCartao,
  selectedCategoria,
  selectedFormaPagto,
  selectedGrupo,
  dtLancamento
} = storeToRefs(storeGastos);

const { clearGasto, saveGasto } = storeGastos;

const tiposLancamentos = ref(["Receita", "Despesa"]);

function habilitaCartao(): boolean {
  return selectedFormaPagto.value?.tipo == "Cartão";
}

function isReceita(): boolean {
  return tpLancamento.value == "Receita";
}

// const obterDataAtualFormatada = () => {
//   const dataAtual = new Date();

//   const mesAtual = dataAtual.getMonth();
//   const dataUmMesDepois = new Date();
//   dataUmMesDepois.setMonth(mesAtual + 1);

//   return format(dataUmMesDepois, "yyyy-MM-dd");
// };

// const dtLancamento = ref(Uteis.dataFormatada());

const fetchCartoes = async () => {
  axios
    .get("http://localhost:8081/api/cartao")
    .then((response) => {
      cartoes.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar a lista de cartões:", error);
    });
};

const fetchGrupos = async () => {
  axios
    .get("http://localhost:8081/api/grupo")
    .then((response) => {
      grupos.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar a lista de grupos:", error);
    });
};

const fetchFormasPagto = async () => {
  axios
    .get("http://localhost:8081/api/formapagto")
    .then((response) => {
      formasPagto.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar a lista de Formas de pagamentos:", error);
    });
};

const fetchCategoria = async () => {
  axios
    .get("http://localhost:8081/api/categoria")
    .then((response) => {
      categorias.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar a lista de categorias", error);
    });
};

const validacoes = (): boolean => {
  if (storeGastos.tpLancamento == "") {
    snackBar.value.msg = "Tipo de lançamento deve ser preenchido";
    snackBar.value.show = true;
    snackBar.value.color = "#d11e48";

    return false;
  }

  if (storeGastos.deDescricao == "") {
    snackBar.value.msg = "Descrição do lançamento deve ser preenchido";
    snackBar.value.show = true;
    snackBar.value.color = "#d11e48";

    return false;
  }

  if (storeGastos.selectedGrupo == null) {
    snackBar.value.msg = "Grupo deve ser preenchido";
    snackBar.value.show = true;
    snackBar.value.color = "#d11e48";

    return false;
  }

  if (storeGastos.selectedCategoria == null) {
    snackBar.value.msg = "Categoria deve ser preenchida";
    snackBar.value.show = true;
    snackBar.value.color = "#d11e48";

    return false;
  }

  if (storeGastos.selectedFormaPagto == null) {
    snackBar.value.msg = "Forma de pagamento deve ser preenchida";
    snackBar.value.show = true;
    snackBar.value.color = "#d11e48";

    return false;
  }

  if (storeGastos.selectedFormaPagto?.tipo === "Cartão") {
    if (storeGastos.selectedCartao == undefined) {
      snackBar.value.msg = "Cartão deve ser preenchido";
      snackBar.value.show = true;
      snackBar.value.color = "#d11e48";

      return false;
    }
  }

  if (storeGastos.vlrTotal == null) {
    snackBar.value.msg = "Valor total deve ser preenchido";
    snackBar.value.show = true;
    snackBar.value.color = "#d11e48";

    return false;
  }

  if (storeGastos.dtLancamento == undefined) {
    snackBar.value.msg = "Data do lançamento deve ser preenchida";
    snackBar.value.show = true;
    snackBar.value.color = "#d11e48";

    return false;
  }

  return true;
};

const cadastrarGasto = async () => {
  if (!validacoes()) {
    return;
  }

  const gastoSave = {
    cdGasto: storeGastos.cdGasto,
    deFatura: storeGastos.deFatura,
    deDescricao: storeGastos.deDescricao,
    grupo: storeGastos.selectedGrupo,
    categoria: storeGastos.selectedCategoria,
    formaPagto: storeGastos.selectedFormaPagto,
    cartao: storeGastos.selectedCartao,
    qtdeParcela: storeGastos.qtdeParcela != null ? storeGastos.qtdeParcela : 1,
    vlrParcela: 0,
    vlrTotal: storeGastos.vlrTotal,
    dtLancamento: storeGastos.dtLancamento,
    pago: storeGastos.pago,
    tpLancamento: storeGastos.tpLancamento,
    usuario: {
      cdUsuario: 8,
    },
  };

  const response = await storeGastos.saveGasto(gastoSave);

  // if (response.hasError) {
  //   const msgErro = response.error.message;

  //   snackBar.value.msg = msgErro;
  //   snackBar.value.show = true;
  //   snackBar.value.color = "#d11e48";

  //   return;
  // }
  storeGastos.clearGasto();
};

function cancelar() {
  clearGasto();
}

onMounted(() => {
  fetchCartoes();
  fetchGrupos();
  fetchFormasPagto();
  fetchCategoria();

  //dtLancamento.value = obterDataAtualFormatada();
});

const fecharModalLancamento = () => {
  storeGastos.clearGasto();

  emits("fecharModalLancamento");
};
</script>
