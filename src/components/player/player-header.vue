<template>
  <div class="d-toolbar-header">
    <div class="w-full flex items-center relative">
      <slot name="left" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.d-toolbar-header {
  transition: padding 0.2s ease-in-out;
  padding-top: 18px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 8px;
  min-height: 100px;
  background-image: linear-gradient(to bottom, #000, #0006, #0000);
  background-position: bottom;
  background-repeat: repeat-x;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;

  &.desktop-mode {
    background-image: none;
  }

  &:before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    z-index: -1;
    transition: opacity 0.25s cubic-bezier(0, 0, 0.2, 1);
    height: calc(100% + 37px);
    background-size: 100% 200%;
    background-repeat: repeat-x;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);

    background-position: top;
    padding-bottom: 37px;
    top: 0;
    z-index: 0;
  }
}
</style>
