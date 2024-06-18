import {reactive, ref, computed, watch} from "vue";
import {ValidationsRules} from "~/utils/validations-rules";
import {User} from "~/models/User";

export function setupRegister() {
  const signUpFormRef = ref();
  const searchCityQuery = ref('');
  let cities: any = ref([]);

  const loading = reactive({
    city: false
  });
  const signUpForm: User = reactive(new User());
  const password = reactive({
    isShowPassword: false,
    isShowRepeatPassword: false
  })

  const rules = computed(() => {
    return {
      name: [ValidationsRules.required],
      login: [ValidationsRules.required],
      email: [ValidationsRules.required, ValidationsRules.email],
      city: [ValidationsRules.required],
      password: [ValidationsRules.required, ValidationsRules.minPassword, ValidationsRules.hasUpperCase, ValidationsRules.hasNumber],
      repeatPassword: [ValidationsRules.required],
      match: ValidationsRules.match,
    }
  });
  const score = computed(() => {
    const result = calculateScore(signUpForm.password);

    switch (result) {
      case 4:
        return {
          color: "light-blue",
          value: 100
        };
      case 3:
        return {
          color: "light-green",
          value: 75
        };
      case 2:
        return {
          color: "yellow",
          value: 50
        };
      case 1:
        return {
          color: "orange",
          value: 25
        };
      default:
        return {
          color: "red",
          value: 0
        };
    }
  });

  async function searchPlaces(city: string) {
    const url = `http://localhost:8080/searchCity?city=${encodeURIComponent(city)}`;

    try {
      loading.city = true;
      const response = await fetch(url);
      const data = await response.json();
      cities.value = data;
      loading.city = false;
    } catch (error) {
      console.error('Помилка при пошуку місця:', error);
      return [];
    }
  }

  function calculateScore(password: string) {
    return rules.value.password.reduce((count, rule) => {
      return count + (rule(password) === true ? 1 : 0);
    }, 0);
  }

  async function createUser() {
    const valid = signUpFormRef.value.validate();

    if(!valid) {
      return;
    }

    console.log("VALID")

    const requestBody = {
      query: `
        mutation {
          createUser(userInput: {
            name: "${signUpForm.name}",
            login: "${signUpForm.login}",
            email: "${signUpForm.email}",
            city: {
              cityId: "${signUpForm.city.cityId}",
              cityName: "${signUpForm.city.cityId}",
              cityFullName: "${signUpForm.city.cityFullName}"
            },
            password: "${signUpForm.password}",
          })
        }
      `
    }

    try {
      await fetch('http://localhost:8080/graphql', {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        }
      })

    } catch (err: any) {
      console.log("ERROR ", err.message)
    }
  }

  watch(searchCityQuery, (newValue) => {
    if(newValue && newValue.length >= 2) {
      searchPlaces(newValue);
    }
  });

  return {
    signUpFormRef,
    signUpForm,
    rules,
    searchCityQuery,
    cities,
    loading,
    password,
    score,
    createUser
  }
}
