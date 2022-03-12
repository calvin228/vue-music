<template>
  <input
    type="text"
    class="w-full p-3 rounded-full text-center text-xs focus:outline-none focus:ring-2 "
    :class="invalid ? 'bg-red-200 animate-shake focus:ring-red-500' : 'focus:ring-purple-700'"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  name: "Input",
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: '',
    },
    invalid: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style>

</style>