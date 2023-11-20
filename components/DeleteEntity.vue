<template>
  <v-icon size="small" color="red" @click="deleteItem">mdi-delete</v-icon>
</template>
<script setup>
const { $swal } = useNuxtApp();
const emit = defineEmits(["result"]);

const { id, endpoint } = defineProps(["id", "endpoint"]);
const config = useRuntimeConfig();
const baseUrl = config.public.baseUrl;

const deleteItem = async () => {
  try {
    $swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await $fetch(`${baseUrl}/${endpoint}/${id}`, {
            method: "DELETE",
          });

          emit("result");

          $swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
  } catch (error) {
    $swal.fire({
      title: "Error!",
      text: "Item cannot delete",
      icon: "error",
      confirmButtonText: "Close",
    });
    emit("result");
  }
};
</script>
