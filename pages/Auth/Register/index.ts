import {reactive, ref, computed} from "vue";
import {ValidationsRules} from "~/utils/validations-rules";
import {User} from "~/models/User";

export function setupRegister() {
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
      repeatPassword: [ValidationsRules.required],
    }
  })

  return {
    signUpFormRef,
    signUpForm,
    rules
  }
}
