<template>
  <div v-if="show" class="modal-container p-5 relative">
    <button @click="$emit('close-modal')" class="block ml-auto mr-0">
      <img src="@/assets/img/close.svg" class="" alt="">
    </button>
    <div class="flex flex-col items-center justify-center h-full px-2.5">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean
    }
  }
}
</script>

<style>

</style>