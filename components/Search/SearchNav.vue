<template>
  <section class="search">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            :search-input.sync="search"
            v-model="searchForm.location"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            label="Where"
            placeholder="Search city..."
            variant="outlined"
          ></v-autocomplete>
        </v-col>

        <pre>{{search}}</pre>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
/*import {ValidationsRules} from "~/utils/validations-rules";*/

const search = ref("")
const searchForm = reactive({
  location: "",
  item: null,
  startDate: null,
  endDate: null,
});

/*const rules = computed(() => {
  return {
    location: [ValidationsRules.required]
  }
})*/
</script>

<style scoped>

</style>
