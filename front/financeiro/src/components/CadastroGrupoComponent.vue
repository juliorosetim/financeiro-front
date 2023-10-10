<template>
  <v-container>
    <!-- Seção do formulário -->
    <v-card>
      <div class="form-cadastro">
        <h2>Cadastro de Grupos</h2>
        <p class="input-group">
          <input
            type="text"
            id="deGrupo"
            v-model="deGrupo"
            required
            class="input"
          />
          <label class="user-label">Grupo</label>
        </p>
        <button
          class="button-custom"
          @click="cadastrarGrupo"
          style="margin-right: 10px"
        >
          Cadastrar
        </button>
        <button class="button-custom" @click="cancelar">Cancelar</button>
      </div>
    </v-card>

    <v-card style="padding-top: 30px">
      <div class="grid-grupos">
        <h2 style="padding-bottom: 10px">Lista de Grupos</h2>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" style="width: 1000px">Grupo</th>
                <th class="text-left"></th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="grupo in grupos" :key="grupo.cdGrupo">
                <td>{{ grupo.deGrupo }}</td>
                <td>
                  <span class="button-grid" @click="exibirGrupo(grupo)"
                    ><v-icon>mdi mdi-text-box-edit-outline</v-icon></span
                  >
                </td>
                <td>
                  <span
                    class="button-grid"
                    @click="
                      grupo.cdGrupo !== undefined
                        ? excluirGrupo(grupo.cdGrupo)
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

    <v-snackbar
      rounded="pill"
      :timeout="2000"
      v-model="snackBar.show"
      :color="snackBar.color"
    >
      {{ snackBar.msg }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { Grupo } from "@/type/GrupoType";
import "@/assets/css/form-styles.css";

const deGrupo = ref("");
const cdGrupo = ref<number | null>(null);

const grupos = ref<Grupo[]>([]);

const snackBar = ref({
  show: false,
  msg: "",
  color: "",
});

const cadastrarGrupo = () => {
  axios
    .post("http://localhost:8081/api/grupo", {
      cdGrupo: cdGrupo.value,
      deGrupo: deGrupo.value,
    })
    .then((response) => {
      deGrupo.value = "";
      cdGrupo.value = null;

      fetchGrupos();
    })
    .catch((error) => {
      snackBar.value.msg = error.response.data.errors[0].defaultMessage;
      snackBar.value.show = true;
      snackBar.value.color = "#d11e48";
    });
};

const cancelar = () => {
  cdGrupo.value = null;
  deGrupo.value = "";
};

const fetchGrupos = () => {
  axios
    .get("http://localhost:8081/api/grupo")
    .then((response) => {
      grupos.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao buscar a lista de grupos:", error);
    });
};

const excluirGrupo = (cdGrupo: number) => {
  axios
    .delete(`http://localhost:8081/api/grupo/${cdGrupo}`)
    .then(() => {
      fetchGrupos();
    })
    .catch((error) => {
      const msgErro = error.response.data.message;

      snackBar.value.msg = msgErro.substring(49, msgErro.length);
      snackBar.value.show = true;
      snackBar.value.color = "#d11e48";
    });
};

const exibirGrupo = (grupo: Grupo) => {
  cdGrupo.value = grupo.cdGrupo;
  deGrupo.value = grupo.deGrupo;
};

onMounted(() => {
  fetchGrupos();
});
</script>
