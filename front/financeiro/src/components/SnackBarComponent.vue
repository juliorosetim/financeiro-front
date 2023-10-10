<template>
  <v-snackbar
    rounded="pill"
    :timeout="props.timeout"
    v-model="props.show"
    :color="props.color"
    onclick="props.show = false"
  >
    {{ props.msg.substring(49, props.msg.length) }}
  </v-snackbar>
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
    type: String,
    default: "2000",
  },
});
</script>
