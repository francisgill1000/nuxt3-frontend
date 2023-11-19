<template>
  <v-icon size="small" color="red" @click="deleteItem">mdi-delete</v-icon>
</template>
<script setup>
const emit = defineEmits(["result"]);
let key = ref(0);

const { id, endpoint } = defineProps(["id", "endpoint"]);
const config = useRuntimeConfig();
const baseUrl = config.public.baseUrl;

const response = ref({
  status: false,
  message: "Item cannot delete",
  color: "red",
});

const deleteItem = async () => {
  try {
    await $fetch(`${baseUrl}/${endpoint}/${id}`, {
      method: "DELETE",
    });

    response.value = {
      status: true,
      message: "Item has been deleted",
      color: "info",
    };
    emit("result", response.value);
  } catch (error) {
    response.value = {
      status: true,
      message: "Item cannot delete",
      color: "red",
    };
    emit("result", response.value);
  }
};
</script>
