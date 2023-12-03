<template>
  <header class="sticky top-0 right-0 z-[200]">
    <LeNavLoggedOut v-if="!sessionStore.isLogged" />

    <LeNavLogged v-else />
  </header>
</template>

<script setup lang="ts">
import { useSessionStore } from "~/stores/sessionStore";

const sessionStore = useSessionStore();
</script>
