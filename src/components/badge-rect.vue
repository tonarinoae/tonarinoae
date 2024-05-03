<template>
  <div class="badge-rect">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.badge-rect {
  background-image: linear-gradient(90deg, #00d639 0%, #00c234 100%);
  border-radius: 2px 0 0 2px;
  padding: 0 4px;
  margin-right: 4px;
  height: 18px;
  line-height: 18px;
  color: #fff;
}
</style>
