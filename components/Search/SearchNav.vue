<template>
  <section class="search">
    <v-container>
      <v-row>
        <v-col cols="10">
          <v-row>
            <v-col cols="3">
              <v-combobox
                v-model="searchForm.city"
                :search-input.sync="searchQuery"
                :items="cities"
                item-text="formatted_address"
                item-value="formatted_address"
                label="Where"
                placeholder="Search city..."
                :loading="loading"
              />
            </v-col>

          </v-row>
        </v-col>

        <v-col cols="2 d-flex align-center">
          <v-btn
            color="primary"
          >Search</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <pre>{{ searchForm }}</pre>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import {reactive, ref, watch} from "vue";

const loading = ref(false);
const searchForm = reactive({
  city: null,
  item: null,
  startDate: null,
  endDate: null,
});


const searchQuery = ref('');
let cities: any = ref([]);

async function searchPlaces(city: string) {
  const url = `http://localhost:8080/searchCity?city=${encodeURIComponent(city)}`;

  try {
    loading.value = true;
    const response = await fetch(url);
    const data = await response.json();
    cities.value = data.results;
    loading.value = false;
  } catch (error) {
    console.error('Помилка при пошуку місця:', error);
    return [];
  }
}

watch(searchQuery, (newValue) => {
  if(newValue && newValue.length >= 2) {
    searchPlaces(newValue);
  }
});

</script>

<style scoped>

</style>
