<template>
  <div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
div {
  height: 40%;
  background: rgba(0, 0, 0, 0.47);
  background-image: linear-gradient(
    0deg,
    rgba(10, 12, 15, 0.8) 0%,
    rgba(10, 12, 15, 0.74) 4%,
    rgba(10, 12, 15, 0.59) 17%,
    rgba(10, 12, 15, 0.4) 34%,
    rgba(10, 12, 15, 0.21) 55%,
    rgba(10, 12, 15, 0.06) 78%,
    rgba(10, 12, 15, 0) 100%
  );
  background-color: transparent;
  min-height: 60px;
  position: absolute;
  padding: 40px 10px 10px 8px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
