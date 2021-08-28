<template>
  <input
    type="text"
    class="w-full p-3 rounded-full text-center text-xs"
    :value="value"
    @input="$emit('input', $event.target.value)"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  name: "Input",
  props: {
    value: String,
    placeholder: {
      type: String,
      default: '',
    },
  },
  mounted(){
    console.log(this);
  }
}
</script>

<style>

</style>