<script setup>
import { ref } from "vue";

const config = useRuntimeConfig();

const baseUrl = config.public.baseUrl;

const { data } = await useFetch(`${baseUrl}/product`);

const tab = ref(null);
</script>

<template>
  <v-card  class="mx-auto"  max-width="1000" elevation="5">
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
      <v-tab :value="1">Landscape</v-tab>
      <v-tab :value="2">City</v-tab>
      <v-tab :value="3">Abstract</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item v-for="n in 3" :key="n" :value="n">
        <v-container fluid>
          <v-row>
            <v-col
              v-for="(item, index) in data.data"
              :key="index"
              cols="12"
              md="4"
            >
              <div>
                <v-img
                  style="width: 300px; height: 300px"
                  :src="item.image_url"
                ></v-img>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>
