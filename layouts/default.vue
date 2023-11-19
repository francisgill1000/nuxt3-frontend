<template>
 <v-app>
    <v-app-bar color="purple" prominent>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>My files</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn variant="text" icon="mdi-magnify"></v-btn>

      <v-btn variant="text" icon="mdi-filter"></v-btn>

      <v-btn variant="text" icon="mdi-dots-vertical"></v-btn> -->
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" width="200" permanent>
      <!-- <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
            title="John Leider"
          ></v-list-item>
   -->
      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          to="/"
          color="purple"
          prepend-icon="mdi-view-dashboard"
          title="Home"
          value="home"
        ></v-list-item>
        <v-list-item
          to="/product"
          color="purple"
          prepend-icon="mdi-package"
          title="Product"
          value="product"
        ></v-list-item>
        <v-list-item
          to="/product-list"
          color="purple"
          prepend-icon="mdi-package"
          title="Product List"
          value="product list"
        ></v-list-item>
        <v-list-item
          to="/product-categories"
          color="purple"
          prepend-icon="mdi-tag"
          title="Product Categories"
          value="product-categories"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="ma-5">
      <slot />
    </v-main>
 </v-app>
</template>
<script setup>
import { ref } from "vue";

const drawer = ref(true);
</script>
