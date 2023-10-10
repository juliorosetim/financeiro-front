<template>
  <v-container>
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

    <h2>Totais</h2>

    <div class="wrapCard">
      <!-- <div class="card">
        <span>Periodo</span>
        <div v-for="gasto in gastosPorDatas" :key="index">
          <label>
            {{ Uteis.formatarValorMonetario(gasto.vlrTotal) }}
          </label>
        </div>
      </div> -->

      <div class="card">
        <span>Receitas Totais</span>
        <div v-for="gasto in totaisReceitas" :key="index">
          <label>
            {{ Uteis.formatarValorMonetario(gasto.vlrTotal) }}
          </label>
        </div>
      </div>

      <div class="card">
        <span>Despesas Totais</span>
        <div v-for="gasto in totaisDespesas" :key="index">
          <label>
            {{ Uteis.formatarValorMonetario(gasto.vlrTotal) }}
          </label>
        </div>
      </div>

      <div class="card">
        <span>Cartão</span>
        <div v-for="gasto in gastosPorCartao" :key="index">
          <label>
            {{ gasto.deDescricao }}:
            {{ Uteis.formatarValorMonetario(gasto.vlrTotal) }}
          </label>
        </div>
      </div>

      <div class="card">
        <span>Forma de pagamento</span>
        <div v-for="gasto in gastosPorFormaPgto" :key="index">
          <label>
            {{ gasto.deDescricao }}:
            {{ Uteis.formatarValorMonetario(gasto.vlrTotal) }}
          </label>
        </div>
      </div>

      <div class="card">
        <span>Categoria</span>
        <div v-for="gasto in gastosPorCategoria" :key="index">
          <label>
            {{ gasto.deDescricao }}:
            {{ Uteis.formatarValorMonetario(gasto.vlrTotal) }}
          </label>
        </div>
      </div>

      <div class="card">
        <span>Grupo</span>
        <div v-for="gasto in gastosPorGrupo" :key="index">
          <label>
            {{ gasto.deDescricao }}:
            {{ Uteis.formatarValorMonetario(gasto.vlrTotal) }}
          </label>
        </div>
      </div>
    </div>
    <!-- <v-card style="padding-top: 30px">
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
    </v-card> -->
  </v-container>
</template>

<script setup lang="ts">
import "@/assets/css/form-styles.css";
import axios from "axios";
import { ref, onMounted } from "vue";
import { ParcelasGastosDto } from "@/type/ParcelasGastosDto";
import { GastosPorCartao } from "@/type/GastosPorCartao";
import { GastosPorFormaPgto } from "@/type/GastosPorFormaPgto";
import { GastosPorCategoria } from "@/type/GastosPorCategoria";
import { GastosPorGrupo } from "@/type/GastosPorGrupo";
import { GastosPorDatas } from "@/type/GastosPorDatas";
import { TotaisReceitas } from "@/type/TotaisReceitas";
import { TotaisDespesas } from "@/type/TotaisDespesas";
import Uteis from "@/service/Uteis";

const dtFiltroInicio = ref("");
const dtFiltroFim = ref("");

const parcelasGastos = ref<ParcelasGastosDto[]>([]);
const gastosPorCartao = ref<GastosPorCartao[]>([]);
const gastosPorFormaPgto = ref<GastosPorFormaPgto[]>([]);
const gastosPorCategoria = ref<GastosPorCategoria[]>([]);
const gastosPorGrupo = ref<GastosPorGrupo[]>([]);
const gastosPorDatas = ref<GastosPorDatas[]>([]);
const totaisReceitas = ref<TotaisReceitas[]>([]);
const totaisDespesas = ref<TotaisDespesas[]>([]);

const fetchGastos = () => {
  fetchGastosPeriodo();
  fetchTotaisReceitas();
  fetchTotaisDespesas();
  fetchGastosPorCartoes();
  fetchGastosPorFormaPgto();
  fetchGastosPorCategoria();
  fetchGastosPorGrupo();
  fetchGastosPorDatas();
};

const fetchGastosPeriodo = () => {
  axios
    .get(
      `http://localhost:8081/api/parcelas/parcelas-por-datas/${dtFiltroInicio.value}/${dtFiltroFim.value}`,
    )
    .then((response) => {
      console.log(response.data);
      parcelasGastos.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar gastos:", error);
    });
};

const fetchTotaisDespesas = () => {
  axios
    .get(
      `http://localhost:8081/api/parcelas/totais-despesas/${dtFiltroInicio.value}/${dtFiltroFim.value}`,
    )
    .then((response) => {
      console.log(response.data);
      totaisDespesas.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar gastos:", error);
    });
};

const fetchTotaisReceitas = () => {
  axios
    .get(
      `http://localhost:8081/api/parcelas/totais-receitas/${dtFiltroInicio.value}/${dtFiltroFim.value}`,
    )
    .then((response) => {
      console.log(response.data);
      totaisReceitas.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar gastos:", error);
    });
};

const fetchGastosPorCartoes = () => {
  axios
    .get(
      `http://localhost:8081/api/parcelas/totais-por-cartoes/${dtFiltroInicio.value}/${dtFiltroFim.value}`,
    )
    .then((response) => {
      console.log(response.data);
      gastosPorCartao.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar gastos por cartões", error);
    });
};

const fetchGastosPorFormaPgto = () => {
  axios
    .get(
      `http://localhost:8081/api/parcelas/totais-por-forma-pgto/${dtFiltroInicio.value}/${dtFiltroFim.value}`,
    )
    .then((response) => {
      console.log(response.data);
      gastosPorFormaPgto.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar gastos por Forma de pagamento", error);
    });
};

const fetchGastosPorCategoria = () => {
  axios
    .get(
      `http://localhost:8081/api/parcelas/totais-por-categorias/${dtFiltroInicio.value}/${dtFiltroFim.value}`,
    )
    .then((response) => {
      console.log(response.data);
      gastosPorCategoria.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar gastos por Categorias", error);
    });
};

const fetchGastosPorGrupo = () => {
  axios
    .get(
      `http://localhost:8081/api/parcelas/totais-por-grupo/${dtFiltroInicio.value}/${dtFiltroFim.value}`,
    )
    .then((response) => {
      console.log(response.data);
      gastosPorGrupo.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar gastos por grupo", error);
    });
};

const fetchGastosPorDatas = () => {
  axios
    .get(
      `http://localhost:8081/api/parcelas/totais-por-datas/${dtFiltroInicio.value}/${dtFiltroFim.value}`,
    )
    .then((response) => {
      console.log(response.data);
      gastosPorDatas.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar gastos por Datas", error);
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
