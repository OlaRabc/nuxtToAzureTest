<template>
  <div>
    <LeNavWrapper>
      <button
        class="my-auto w-fit ml-4 mr-8 text-slate-100"
        aria-label="Otwórz menu"
        @click="showMenu"
      >
        <font-awesome-icon icon="bars" size="2xl" />
      </button>
    </LeNavWrapper>

    <div
      class="absolute top-0 right-0 w-full md:w-1/2 lg:w-1/4 min-h-screen py-8 bg-black text-indigo-50 z-[210]"
      :class="{ hidden: !isMenuOpen }"
    >
      <LeCloseBtn class="absolute top-6 right-8" @click="hideMenu" />
      <LeList>
        <LeListItem
          v-for="item in sessionStore.isCompany
            ? companyNavList
            : customerNavList"
          :key="item.content"
          class="block my-16 text-center text-white hover:text-indigo-400 transition-colors duration-300"
        >
          <button
            class="flex justify-center mx-auto text-xl"
            :aria-label="`Przejdź do strony ${item.content}`"
            @click="goToPage(item.content, item?.to)"
          >
            <client-only>
              <font-awesome-icon :icon="item.icon" size="xl" class="mr-2" />

              {{ item.content }}
            </client-only>
          </button>
        </LeListItem>
      </LeList>

      <div v-if="!error" class="w-1/4 h-auto mx-auto mb-4 rounded">
        <nuxt-img
          class="w-full h-auto rounded"
          :src="`images/gallery${data}`"
          alt="Twoje zdjęcie profilowe"
          width="255"
          height="255"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSessionStore } from "~/stores/sessionStore";
import { useApiUrlStore } from "~/stores/api";

const sessionStore = useSessionStore();

const apiUrl = useApiUrlStore().getApiUrl();

const { data, error } = await useFetch(
  `${apiUrl}/profile/${sessionStore.isCompany ? "company" : "customer"}/${
    sessionStore.loggedId
  }`,
);

const isMenuOpen = ref(false);

const showMenu = () => {
  isMenuOpen.value = true;
};

const hideMenu = () => {
  isMenuOpen.value = false;
};

const companyNavList = [
  {
    icon: "building",
    content: "Dane firmy",
    to: "",
  },
  {
    icon: "gear",
    content: "Ustawienia",
    to: "edycja-profilu",
  },
  {
    icon: "handshake-simple",
    content: "Współprace",
    to: "wspolprace",
  },
  {
    icon: "arrow-right-from-bracket",
    content: "Wyloguj",
    to: "/",
  },
];

const customerNavList = [
  {
    icon: "magnifying-glass",
    content: "Szukaj",
    to: "/",
  },
  {
    icon: "heart",
    content: "Ulubione",
    to: "ulubione",
  },
  {
    icon: "handshake-simple",
    content: "Współprace",
    to: "wspolprace",
  },
  {
    icon: "user",
    content: "Moje konto",
    to: "",
  },
  {
    icon: "arrow-right-from-bracket",
    content: "Wyloguj",
    to: "/",
  },
];

const router = useRouter();
const goToPage = (content: String, to: String | null) => {
  const id = sessionStore.loggedId;

  if (content === "Wyloguj") {
    sessionStore.logout();
    router.push({ path: "/" });
  } else if (content === "Szukaj") {
    router.push({ path: "/" });
  } else if (content === "Dane firmy") {
    router.push({ path: "/firma/" + id });
  } else if (content === "Moje konto") {
    router.push({ path: "/klient/" + id });
  } else {
    router.push({
      path: `/moje-konto/${sessionStore.isCompany ? "f" : "k"}/${to}`,
    });
  }
};
</script>
