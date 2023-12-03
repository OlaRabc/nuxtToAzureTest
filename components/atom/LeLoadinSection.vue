<template>
  <div class="relative text-center font-bold text-2xl">
    Ładowanie

    <span class="dot--1">.</span>
    <span class="dot--2">.</span>
    <span class="dot--3">.</span>
  </div>
</template>

<style scoped lang="scss">
@use "sass:math";
.dot {
  @for $i from 1 through 3 {
    &--#{$i} {
      animation: dotsAnimation--#{$i} 3s infinite linear;
      opacity: 0%;
      margin-right: 4px;
    }
  }
}

@keyframes dotsAnimation--1 {
  0% {
    opacity: 0%;
  }
  10% {
    opacity: 100%;
  }
  30% {
    opacity: 0%;
  }
}
@keyframes dotsAnimation--2 {
  0%,
  30% {
    opacity: 0%;
  }
  40% {
    opacity: 100%;
  }
  60% {
    opacity: 0%;
  }
}
@keyframes dotsAnimation--3 {
  0%,
  60% {
    opacity: 0%;
  }
  70% {
    opacity: 100%;
  }
  90% {
    opacity: 0%;
  }
}
</style>
