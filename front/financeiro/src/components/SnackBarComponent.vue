<template>
  <div class="text-center ma-2">
    <v-snackbar
      rounded="pill"
      :timeout="props.timeout"
      v-model="props.show"
      :color="props.color"
    >
      {{ props.msg.substring(49, props.msg.length) }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  msg: {
    required: true,
    type: String,
  },
  show: {
    required: true,
    type: Boolean,
    default: false,
  },
  color: {
    require: true,
    type: String,
    default: "#a6bf91",
  },
  timeout: {
    require: false,
    type: Number,
    default: 2000,
  },
});
</script>
