<template>
  <div
    class="md:flex md:justify-around md:items-center w-screen h-screen font-bold"
  >
    <div class="md:mr-8 text-center text-[10rem] md:text-[15rem]">
      {{ error.statusCode }}
    </div>

    <div class="max-md:text-center">
      <LeHeading class="text-7xl"> UPS!</LeHeading>

      <LeParagraph class="text-5xl"> {{ error.statusMessage }} </LeParagraph>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
};
</script>
