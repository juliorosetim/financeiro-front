import CartaoService from "@/service/CartaoService";
import { Cartao } from "@/type/CartaoType";
import { defineStore } from "pinia";
import { ref } from "vue";

export const CartaoStore = defineStore("CartaoStore", () => {
  const cdCartao = ref<number | null>(null);
  const deCartao = ref("");
  const diaVirada = ref<number | null>(null);
  const diaVencimento = <number | null>null;

  const cartoes = ref<Cartao[]>([]);

  const getCartoes = async () => {
    const response = await CartaoService.getCartoes();

    if (response.hasError) {
      return;
    }

    cartoes.value = response.content!;
  };

  const deleteCartao = async (cdCartao: number) => {
    const response = await CartaoService.deleteCartao(cdCartao);

    if (response.hasError) {
      return response;
    }

    cartoes.value = getCartoes();
  };

  const saveCartao = async (cartao: Cartao) => {
    const response = await CartaoService.saveCartao(cartao);

    if (response.hasError) {
      return response;
    }

    cartoes.value = getCartoes();
  };

  return {
    cdCartao,
    deCartao,
    diaVirada,
    diaVencimento,
    cartoes,
    getCartoes,
    deleteCartao,
    saveCartao,
  };
});

export default CartaoStore;
