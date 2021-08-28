<template>
  <div v-if="show" class="modal-container p-5 relative">
    <button @click="$emit('close-modal')" class="block ml-auto mr-0">
      <img src="@/assets/img/close.svg" class="" alt="">
    </button>
    <slot></slot>
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