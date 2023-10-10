import { defineStore } from "pinia";
import { Gasto } from "@/type/GastoType";
import { ref } from "vue";
import GastoService from "@/service/GastoService.ts";
import { format } from "date-fns";
import { Cartao } from "@/type/CartaoType";
import { Grupo } from "@/type/GrupoType";
import { FormaPagto } from "@/type/FormaPagtoType";
import { Categoria } from "@/type/CategoriaType";

export const gastoStore = defineStore("gastoStore", () => {
  const gastoSelectedStore = ref<Gasto | null>(null);
  const gastosStore = ref<Gasto[]>([]);
  const cdGasto = ref<number | null>(null);
  const deFatura = ref("");
  const deDescricao = ref("");
  const qtdeParcela = ref<number | null>(null);
  const vlrTotal = ref<number | null>(null);
  const pago = ref("");
  const tpLancamento = ref("");

  const selectedCartao = ref<Cartao | null>(null);
  const selectedGrupo = ref<Grupo | null>(null);
  const selectedFormaPagto = ref<FormaPagto | null>(null);
  const selectedCategoria = ref<Categoria | null>(null);

  const obterDataAtualFormatada = () => {
    const dataAtual = new Date();

    const mesAtual = dataAtual.getMonth();
    const dataUmMesDepois = new Date();
    dataUmMesDepois.setMonth(mesAtual + 1);

    return format(dataUmMesDepois, "yyyy-MM-dd");
  };

  const dtLancamento = ref(obterDataAtualFormatada());

  // Actions
  const getGastos = async () => {
    const response = await GastoService.getGastos();

    if (response.hasError) {
      return;
    }

    gastosStore.value = response.content!;
  };

  const saveGasto = async (gasto: Gasto) => {
    const response = await GastoService.saveGasto(gasto);

    if (response.hasError) {
      return response;
    }

    gastosStore.value = response.content!;
  };

  const clearGasto = () => {
    cdGasto.value = null;
    deFatura.value = "";
    deDescricao.value = "";
    qtdeParcela.value = null;
    vlrTotal.value = null;
    pago.value = "N";
    tpLancamento.value = "";
    dtLancamento.value = obterDataAtualFormatada();
    selectedCartao.value = null;
    selectedGrupo.value = null;
    selectedFormaPagto.value = null;
    selectedCategoria.value = null;
  };

  return {
    cdGasto,
    deFatura,
    deDescricao,
    qtdeParcela,
    vlrTotal,
    pago,
    tpLancamento,
    gastoSelectedStore,
    gastosStore,
    dtLancamento,
    selectedCartao,
    selectedGrupo,
    selectedFormaPagto,
    selectedCategoria,
    getGastos,
    clearGasto,
    saveGasto,
    // getGastoSelected,
  };
});

export default gastoStore;
