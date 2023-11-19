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
  </v-data-table-server>
</template>

<script setup>
import { ref } from "vue";

const loading = ref(true);
const pageNumber = ref(1);
const per_page = ref(10);

const headers = ref([
  { value: "id", title: "Id" },
  { value: "UserID", title: "User Id" },
  { value: "LogTime", title: "LogTime" },
  { value: "DeviceID", title: "DeviceID" },
  { value: "gps_location", title: "GPS Location" },
]);

const { data, pending, refresh } = await useFetch(
  () =>
    `https://backend.mytime2cloud.com/api/attendance_logs?page=${pageNumber.value}&company_id=2&per_page=${per_page.value}`
);

function loadItems({ page, itemsPerPage, sortBy }) {
  // loading.value = true;
  pageNumber.value = page;
  per_page.value = itemsPerPage;
  refresh();
  // loading.value = false;
}
</script>
