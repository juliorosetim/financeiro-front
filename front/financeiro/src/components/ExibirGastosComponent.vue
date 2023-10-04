<template>
  <v-container>
    <!-- Seção do formulário -->
    <v-card>
      <div class="form-cadastro">
        <h2>Transações</h2>
        <div class="input-group">
          <input
            class="input"
            type="date"
            id="dtFiltroInicio"
            v-model="dtFiltroInicio"
            required
          />
          <label class="user-label">Inicio</label>
        </div>

        <div class="input-group">
          <input
            class="input"
            type="date"
            id="dtFiltroFim"
            v-model="dtFiltroFim"
            required
          />
          <label class="user-label">Fim</label>
        </div>

        <button class="button-custom" @click="fetchGastos">Filtrar</button>
      </div>
    </v-card>

    <div style="display: flex">
      <div class="card">
        <label> Gastos do mês </label>
        <label>4000,00</label>
      </div>

      <div class="card">
        <label> Gastos por Cartão </label>
        <label>1000,00</label>
      </div>

      <div class="card">
        <label> Gastos por Categoria </label>
        <label>1000,00</label>
      </div>

      <div class="card">
        <label> Total por Forma de Pagamento </label>
        <label>1000,00</label>
      </div>

      <div class="card">
        <label> Total por Grupo </label>
        <label>1000,00</label>
      </div>
    </div>
    <v-card style="padding-top: 30px">
      <div>
        <h2 style="padding-bottom: 10px">Lista de Lançamentos</h2>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="col-descricao">Descrição do Lançamento</th>
                <th class="col-parcela">Parcela</th>
                <th class="col-cartao">Cartão</th>
                <th class="col-categoria">Categoria</th>
                <th class="col-categoria">Vencimento</th>
                <th class="col-valor">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="parcela in parcelasGastos" :key="parcela.cdParcela">
                <td>{{ parcela.deDescricao }}</td>
                <td>{{ parcela.nuParcela }} / {{ parcela.qtdeParcela }}</td>
                <td>{{ parcela.deCartao }}</td>
                <td>{{ parcela.deCategoria }}</td>
                <td>{{ Uteis.dataFormatada(parcela.dtVencimento) }}</td>
                <td>{{ formatarValorMonetario(parcela.vlrParcela) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import "@/assets/css/form-styles.css";
import axios from "axios";
import { ref, onMounted } from "vue";
import { ParcelasGastosDto } from "@/type/ParcelasGastosDto";
import Uteis from "@/service/Uteis";

const dtFiltroInicio = ref("");
const dtFiltroFim = ref("");

const parcelasGastos = ref<ParcelasGastosDto[]>([]);

const fetchGastos = () => {
  axios
    .get(
      `http://localhost:8081/api/parcelas/parcelas-por-datas/${dtFiltroInicio.value}/${dtFiltroFim.value}`
    )
    .then((response) => {
      console.log(response.data);
      parcelasGastos.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar gastos:", error);
    });
};

onMounted(() => {
  const currentDateInicio = new Date();
  currentDateInicio.setMonth(currentDateInicio.getMonth());
  const yearInicio = currentDateInicio.getFullYear();
  const monthInicio = String(currentDateInicio.getMonth()).padStart(2, "0");
  const dayInicio = String(currentDateInicio.getDate()).padStart(2, "0");

  // Crie a string da data no formato "YYYY-MM-DD"
  const formattedDateInicio = `${yearInicio}-${monthInicio}-${dayInicio}`;

  // Atribua a data formatada ao v-model
  dtFiltroInicio.value = formattedDateInicio;

  const currentDateFim = new Date();
  currentDateFim.setMonth(currentDateFim.getMonth() + 1);
  const yearFim = currentDateFim.getFullYear();
  const monthFim = String(currentDateFim.getMonth() + 1).padStart(2, "0");
  const dayFim = String(currentDateFim.getDate()).padStart(2, "0");

  // Crie a string da data no formato "YYYY-MM-DD"
  const formattedDateFim = `${yearFim}-${monthFim}-${dayFim}`;

  dtFiltroFim.value = formattedDateFim;

  fetchGastos();
});

const formatarValorMonetario = (valor: number) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
</script>


<style scoped>
.col-descricao {
  width: 20% !important;
  text-align: start !important;
}

.col-parcela {
  width: 10% !important;
  text-align: start !important;
}

.col-cartao {
  width: 30% !important;
  text-align: start !important;
}

.col-categoria {
  width: 20% !important;
  text-align: start !important;
}

.col-valor {
  width: 20% !important;
  text-align: start !important;
}
</style>
