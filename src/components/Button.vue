<template>
  <button
    @click="$emit('click')"
    class="rounded-full w-full p-3 text-white bg-white bg-opacity-20 text-sm focus:ring-2 focus:ring-purple-700 focus:outline-none"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button"
}
</script>

<style>

</style>