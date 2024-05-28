<template>
  <v-app>
    <v-main>
      <HeaderNav />

      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import HeaderNav from "~/components/Header/HeaderNav.vue";
import "~/assets/css/styles.css";

</script>
