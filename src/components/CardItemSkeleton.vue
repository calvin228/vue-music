<template>
  <div class="animate-pulse flex bg-white rounded-lg p-3 mb-5 shadow-md">
    <div class="mr-3 relative flex-none h-24">
      <div class="w-25 h-25 rounded-lg bg-gray-300"></div>
    </div>
    <div class="flex flex-col justify-between flex-1">
      <div>
        <div class="w-20 h-4 rounded-sm bg-gray-300 mb-1"></div>
        <div class="w-full h-4 rounded-sm bg-gray-300"></div>
      </div>
      <div class="flex justify-between">
        <span class="rounded-full bg-gray-300 w-8">
        </span>
        <div class="flex items-center">
          <div class="w-10 h-4 bg-gray-300 rounded-sm"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardItemSkeleton"
}
</script>

<style scoped>

</style>