<template>
  <v-dialog width="500" v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-icon v-bind="props">mdi-plus-circle-outline</v-icon>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Product Category">
        <v-card-text>
          <v-text-field
            variant="underlined"
            dense
            label="Name"
            required
            v-model="payload.name"
          ></v-text-field>
          <v-text-field
            variant="underlined"
            dense
            label="Description"
            v-model="payload.description"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small color="grey" variant="flat" @click="dialog = false">
            Close
          </v-btn>
          <v-btn
            :loading="loading"
            small
            color="purple"
            variant="flat"
            @click="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup>
import { ref } from "vue";
const { $swal } = useNuxtApp();
const config = useRuntimeConfig();
const emit = defineEmits(["success"]);

const dialog = ref(false);
const loading = ref(false);

const payload = ref({
  name: "test",
  description: "test",
});

const baseUrl = config.public.baseUrl;

async function submit() {
  try {
    loading.value = true;

    await $fetch(`${baseUrl}/product-categories`, {
      method: "POST",
      body: payload.value,
    });

    loading.value = false;
    close();
  } catch (error) {
    loading.value = false;
    close();
  }
}

function close() {
  dialog.value = false;

  setTimeout(() => {
    $swal.fire({
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonColor: "#2196f3",
      cancelButtonText: "Close",
      position: "center",
      icon: "success",
      title: "Product Category Inserted",
      timer: 3000,
    });
    emit("success");
  }, 100);
}
</script>
