<template>
  <Datatable :endpoint="endpoint" :headers="headers"/>
</template>

<script setup>

import { ref } from "vue";

const endpoint = ref(`product-categories`);

const headers = ref([
  { value: "id", title: "Id" },
  { value: "name", title: "Name" },
  { value: "description", title: "Description" },
]);

</script>