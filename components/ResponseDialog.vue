<template>
  <v-dialog width="500" v-model="dialog">
    <v-card class="text-center">
      <v-card-text class="">
        <div class="text-right">
          <v-icon @click="close">mdi-close-circle</v-icon>
        </div>
        <div>
          <v-btn
            color="green"
            variant="outlined"
            icon="mdi-check-circle"
            size="large"
          ></v-btn>
        </div>
        <div class="text-center my-5">Success</div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref } from "vue";
const { response, entity, id } = defineProps(["response", "entity"]);

const dialog = ref(true);

close();

function close() {
  setTimeout(() => {
    dialog.value = false;
  }, 2000);
}
</script>
