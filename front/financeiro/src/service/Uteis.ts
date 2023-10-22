import moment from "moment";

class Uteis {
  dataFormatada = (dtVencimento: string) => {
    console.log('3');
    return dtVencimento ? moment(dtVencimento).format("DD/MM/yyyy"): moment(new Date() ).format("DD/MM/yyyy");
  };

  formatarValorMonetario = (valor: number) => {
    const valorI = valor == null ? 0 : valor;

    return valorI.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
}

export default new Uteis();
