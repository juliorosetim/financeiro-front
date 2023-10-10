import FormaPgtoService from "@/service/FormaPgtoService";
import { FormaPagto } from "@/type/FormaPagtoType";
import { defineStore } from "pinia";
import { ref } from "vue";

export const FormaPgtoStore = defineStore("FormaPgtoStore", () => {
  const cdFormaPagto = ref<number | null>(null);
  const deFormaPagto = ref("");
  const tipo = ref("");

  const formasPagto = ref<FormaPagto[]>([]);

  const getFormasPgto = async () => {
    const response = await FormaPgtoService.getFormaPgto();

    if (response.hasError) {
      return;
    }

    formasPagto.value = response.content!;
  };

  const deleteFormaPgto = async (cdFormaPgto: number) => {
    const response = await FormaPgtoService.deleteFormaPgto(cdFormaPgto);

    if (response.hasError) {
      return response;
    }

    formasPagto.value = getFormasPgto();
  };

  const saveFormaPgto = async (formapagto: FormaPagto) => {
    const response = await FormaPgtoService.saveFormaPgto(formapagto);

    if (response.hasError) {
      return response;
    }

    formasPagto.value = getFormasPgto();
  };

  return {
    cdFormaPagto,
    deFormaPagto,
    tipo,
    formasPagto,
    getFormasPgto,
    deleteFormaPgto,
    saveFormaPgto,
  };
});

export default FormaPgtoStore;
