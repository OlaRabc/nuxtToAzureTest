<template>
  <div class="bg-gradient absolute top-0 left-0 w-screen h-screen z-[210]">
    <LeLogo />

    <form
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 md:w-1/2 lg:w-1/3 px-16 pb-10 bg-white rounded-2xl"
      @submit.prevent="logIn"
    >
      <LeHeading type="h1" class="text-center"> Zaloguj </LeHeading>

      <LeLoginInput
        id="login"
        label="Login"
        name="login"
        type="text"
        placeholder="Podaj login"
        @onChange="updateLoginValue"
      />

      <LeLoginInput
        id="haslo"
        label="Hasło"
        name="password"
        type="password"
        placeholder="Podaj hasło"
        @onChange="updatePasswordValue"
      />

      <LeBtn type="submit" class="ml-auto mr-0"> Zaloguj </LeBtn>

      <LeErrorBox
        class="text-red-700 transition-opacity"
        :class="isError ? 'opacity-100' : ' opacity-0'"
      >
        Nieprawidłowy login lub hasło!
      </LeErrorBox>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "#imports";

import { useSessionStore } from "~/stores/sessionStore";
const sessionStore = useSessionStore();

const router = useRouter();

onMounted(() => {
  if (sessionStore.isLogged) router.push({ path: "/" });
});

const logIn = () => {
  sessionStore.login(login.value, password.value);
  if (sessionStore.isLogged) router.push({ path: "/" });
  else isError = true;
};

const login = ref("");
const password = ref("");
let isError = false;

const updateLoginValue = (val: string) => {
  login.value = val;
  isError = false;
};
const updatePasswordValue = (val: string) => {
  password.value = val;
  isError = false;
};
</script>

<style scoped>
div {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    5deg,
    rgba(0, 0, 0, 1) 21%,
    rgba(31, 31, 121, 1) 64%,
    rgba(59, 59, 233, 1) 92%
  );
}
</style>
