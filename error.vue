<template>
  <main>
    <Le404 v-if="error.statusCode === 404" />
    <Le500 v-else-if="error.statusCode === 500" />
    <LeError v-else :error="error" />
  </main>
</template>

<script>
export default {
  props: ["error"],
};
</script>
