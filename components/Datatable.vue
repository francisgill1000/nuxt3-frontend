<template>
  <div>
    <v-progress-linear
      v-if="pending"
      indeterminate
      color="purple"
    ></v-progress-linear>

    <ResponseDialog
      v-if="response.status"
      :key="key"
      :entity="`Product Category`"
      :response="response"
    />

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

      <template v-slot:item.action="{ item, index }">
        <EditDialog />
        <DeleteEntity
          @result="
            (e) => {
              (response = e), key++, data.data.splice(index, 1);
            }
          "
          :id="item.id"
          :endpoint="endpoint"
        />
      </template>
    </v-data-table-server>
  </div>
</template>
<script setup>
import { ref } from "vue";

const { endpoint } = defineProps(["endpoint", "headers"]);

const pageNumber = ref(1);

const response = ref({
  status: false,
  message: "Item cannot delete",
  color: "red",
});

const key = ref(0);

const per_page = ref(10);

const config = useRuntimeConfig();

const baseUrl = config.public.baseUrl;

const { data, pending, refresh } = await useFetch(
  () => `${baseUrl}/${endpoint}?page=${pageNumber}&perPage=${per_page.value}`
);

function loadItems({ page, itemsPerPage }) {
  pageNumber.value = page;
  per_page.value = itemsPerPage;
  refresh();
}
</script>
