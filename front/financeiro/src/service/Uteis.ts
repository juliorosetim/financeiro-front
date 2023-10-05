import { format } from "date-fns";

class Uteis {
  dataFormatada = (dtVencimento: string) => {
    return dtVencimento ? format(new Date(dtVencimento), "dd/MM/yyyy") : "";
  };

  formatarValorMonetario = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
}

export default new Uteis();
