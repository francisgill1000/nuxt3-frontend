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
          <v-alert
            v-if="response.message && response.color"
            :color="response.color"
            dense
            dark
          >
            {{ response.message }}
          </v-alert>
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
const config = useRuntimeConfig();
const emit = defineEmits(["created"]);

const payload = ref({
  name: "test",
  description: "test",
});

const response = ref({
  message: null,
  color: null,
});
const dialog = ref(false);
const loading = ref(false);

const baseUrl = config.public.baseUrl;

async function submit() {
  try {
    loading.value = true;
    await $fetch(`${baseUrl}/product-categories`, {
      method: "POST",
      body: payload.value,
    });

    response.value = {
      message: "Product Category Interted",
      color: "info",
    };

    emit("created");

    loading.value = false;
    close();
  } catch (error) {
    response.value = {
      message: "Exception Occurred: " + error,
      color: "red",
    };

    loading.value = false;
    close();
  }
}

function close() {
  setTimeout(() => {
    // response.value = {
    //   message: null,
    //   color: null,
    // };
    // dialog.value = false;
  }, 2000);
}
</script>
