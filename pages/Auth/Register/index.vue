<template>
  <section class="auth register">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="4">

          <h1 class="text-left mb-3">Sign Up</h1>

          <v-form ref="signUpFormRef">

            <v-text-field
              v-model="signUpForm.name"
              :rules="rules.name"
              label="Name"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="signUpForm.login"
              :rules="rules.login"
              label="Login"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="signUpForm.email"
              :rules="rules.email"
              label="Email"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="signUpForm.country"
              :rules="rules.country"
              label="Country"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="signUpForm.city"
              :rules="rules.city"
              label="City"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="signUpForm.password"
              :rules="rules.password"
              label="Password"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="signUpForm.repeatPassword"
              :rules="rules.repeatPassword"
              label="Repeat password"
              class="mb-2"
            ></v-text-field>

            <div class="d-flex align-center">
              <v-btn class="mr-5" type="submit">
                Sign Up
              </v-btn>

              <span>
                Have an account?
                <NuxtLink to="login">Sign In</NuxtLink>
              </span>
            </div>
          </v-form>

          <pre class="mt-5">{{signUpForm}}</pre>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { setupRegister } from "./index.ts";

const { signUpFormRef, signUpForm, rules } = setupRegister();
</script>

<!--<script setup lang="ts">
import {reactive, ref, computed} from "vue";
import {ValidationsRules} from "~/utils/validations-rules";
import {User} from "~/models/User";

const signUpFormRef = ref();
const signUpForm: User = reactive(new User());

const rules = computed(() => {
  return {
    name: [ValidationsRules.required],
    login: [ValidationsRules.required],
    email: [ValidationsRules.required],
    country: [ValidationsRules.required],
    city: [ValidationsRules.required],
    password: [ValidationsRules.required],
  }
})
</script>-->
