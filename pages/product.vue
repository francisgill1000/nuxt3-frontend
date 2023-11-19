<template>
  <Datatable :endpoint="endpoint" :headers="headers" />
</template>

<script setup>
import { ref } from "vue";

const endpoint = ref(`product`);

const headers = ref([
  { value: "id", title: "Id" },
  { value: "image_url", title: "Image" },
  { value: "name", title: "Name" },
  { value: "price", title: "Price" },
  { value: "description", title: "Description" },
]);
</script>
