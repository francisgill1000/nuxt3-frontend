<template>
  <v-card class="px-5" elevation="5">
    <v-toolbar small color="white">
      <span>{{ entity }}</span>
      <v-icon class="mt-1 ml-1" @click="refresh">mdi-reload</v-icon>
      <v-spacer></v-spacer>
      <Dialog @success="refresh" />
    </v-toolbar>
    <v-divider></v-divider>

    <v-progress-linear
      v-if="pending"
      indeterminate
      color="purple"
    ></v-progress-linear>

    <v-data-table-server
      v-model:items-per-page="per_page"
      :headers="headers"
      item-value="name"
      :items-length="data.total"
      :items="data.data"
      @update:options="loadItems"
    >
      <template v-slot:item.image_url="{ item }">
        <v-avatar size="100" rounded="0" class="pa-5">
          <v-img :src="item.image_url"></v-img>
        </v-avatar>
      </template>

      <template v-slot:item.action="{ item, index }">
        <EditDialog :item="item" @success="refresh" />
        <DeleteEntity
          @result="(e) => data.data.splice(index, 1)"
          :id="item.id"
          :endpoint="endpoint"
        />
      </template>
    </v-data-table-server>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const entity = ref(`Product Category`);

const endpoint = ref(`product-categories`);

const headers = ref([
  { value: "id", title: "Id" },
  { value: "name", title: "Name" },
  { value: "description", title: "Description" },
  { value: "action", title: "Action" },
]);

const pageNumber = ref(1);

const per_page = ref(10);

const config = useRuntimeConfig();

const baseUrl = config.public.baseUrl;

const { data, pending, refresh } = await useFetch(
  () =>
    `${baseUrl}/${endpoint.value}?page=${pageNumber.value}&perPage=${per_page.value}`
);

function loadItems({ page, itemsPerPage }) {
  pageNumber.value = page;
  per_page.value = itemsPerPage;
  refresh();
}
</script>
