<template>
  <v-card class="px-5" elevation="5">
    <v-toolbar small color="white">
      <span>{{ entity }}</span>
      <v-icon class="mt-1 ml-1">mdi-reload</v-icon>
      <v-spacer></v-spacer>
      <Dialog @created="key++" />
    </v-toolbar>
    <v-divider></v-divider>
    <Datatable :key="key" :endpoint="endpoint" :headers="headers" />
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const entity = ref(`Product Category`);

const endpoint = ref(`product-categories`);

const key = ref(0);

const headers = ref([
  { value: "id", title: "Id" },
  { value: "name", title: "Name" },
  { value: "description", title: "Description" },
  { value: "action", title: "Action" },
]);
</script>
