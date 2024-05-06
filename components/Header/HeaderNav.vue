<template>
  <nav class="header">
    <v-container>
      <v-row>
        <div class="header-logo">
          <NuxtLink to="/">
            <b> {{ logo }} </b>
          </NuxtLink>
        </div>

        <v-spacer></v-spacer>

        <div class="header-menu">
          <ul class="header-menu-list">
            <li>
              <NuxtLink to="/auth/login">
                <b> Login </b>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </v-row>
    </v-container>
  </nav>
</template>

<script setup lang="ts">
import {ref} from "vue";

const logo = ref("RentHub")
</script>

<style src="./HeaderNav.scss" lang="scss" scoped></style>
