<template>
  <input
    type="text"
    class="w-full p-3 rounded-full text-center text-xs focus:outline-none focus:ring-2 focus:ring-purple-700"
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
}
</script>

<style>

</style>