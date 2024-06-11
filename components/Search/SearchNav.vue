<template>
  <section class="search">
    <v-container>
      <v-row>
        <v-col cols="10">
          <v-row>
            <v-col cols="3">
              <v-combobox
                v-model="searchForm.city"
                :search-input.sync="searchCityQuery"
                :items="cities"
                item-text="formatted_address"
                item-value="formatted_address"
                label="Where"
                placeholder="Search city..."
                :loading="loading.city"
              />
            </v-col>

            <v-col cols="3">
              <v-combobox
                v-model="searchForm.product"
                :search-input.sync="searchProductQuery"
                label="What"
                placeholder="Search product..."
                :loading="loading.product"
              />
            </v-col>

            <v-col cols="3">
              <v-menu
                v-model="menuStart"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="searchForm.startDate"
                    label="Start date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="searchForm.startDate"
                  @input="menuStart = false"
                  :min="today"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="3">
              <v-menu
                v-model="menuEnd"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="searchForm.endDate"
                    label="End date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="searchForm.endDate"
                  @input="menuEnd = false"
                  :min="searchForm.startDate"
                ></v-date-picker>
              </v-menu>
            </v-col>

          </v-row>
        </v-col>

        <v-col cols="2 d-flex align-center">
          <v-btn color="primary">
            Search
          </v-btn>
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

const loading = reactive({
  city: false,
  product: false
});
const today = ref(new Date().toISOString().substr(0, 10))

const searchForm = reactive({
  city: null,
  product: null,
  startDate: null,
  endDate: null,
});
const menuStart = ref(false);
const menuEnd = ref(false);


const searchProductQuery = ref('');
const products: any = ref([]);


const searchCityQuery = ref('');
let cities: any = ref([]);

async function searchPlaces(city: string) {
  const url = `http://localhost:8080/searchCity?city=${encodeURIComponent(city)}`;

  try {
    loading.city = true;
    const response = await fetch(url);
    const data = await response.json();
    cities.value = data.results;
    loading.city = false;
  } catch (error) {
    console.error('Помилка при пошуку місця:', error);
    return [];
  }
}

watch(searchCityQuery, (newValue) => {
  if(newValue && newValue.length >= 2) {
    searchPlaces(newValue);
  }
});

</script>

<style scoped>

</style>
