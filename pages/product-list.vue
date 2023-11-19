<template>
  <v-progress-linear
    v-if="pending"
    indeterminate
    color="purple"
  ></v-progress-linear>

  <v-data-table-server
    v-model:items-per-page="per_page"
    :headers="headers"
    :items-length="data.total"
    :items="data.data"
    @update:options="loadItems"
  >
    <template v-slot:item.image_url="{ item }">
      <v-avatar size="100" rounded="0" class="pa-5">
        <v-img :src="item.image_url"></v-img>
      </v-avatar>
    </template>
  </v-data-table-server>
</template>

<script setup>
import { ref } from "vue";

const loading = ref(true);
const pageNumber = ref(1);
const per_page = ref(10);

const headers = ref([
  { value: "id", title: "Id" },
  { value: "image_url", title: "Image" },
  { value: "name", title: "Product Title" },
  { value: "price", title: "Price" },
  { value: "description", title: "Description" },
]);

const config = useRuntimeConfig();

const baseUrl = config.public.baseUrl;

const { data, pending, refresh } = await useFetch(
  () => `${baseUrl}/product?page=${pageNumber}&perPage=${per_page.value}`
);

function loadItems({ page, itemsPerPage, sortBy }) {
  // loading.value = true;
  pageNumber.value = page;
  per_page.value = itemsPerPage;
  refresh();
  // loading.value = false;
}
</script>
