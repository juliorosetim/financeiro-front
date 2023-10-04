import { format } from "date-fns";

class Uteis {

  dataFormatada = (dtVencimento: string) => {
    return dtVencimento ? format(new Date(dtVencimento), "dd/MM/yyyy") : "";
  };

}

export default new Uteis;
