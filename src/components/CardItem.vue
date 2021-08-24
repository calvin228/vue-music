<template>
  <div class="flex bg-white rounded-lg p-3 mb-5 shadow-md">
    <div class="mr-3 relative flex-none h-24">
      <img
        :src="song.artworkUrl100"
        class="img-album rounded-lg"
        :alt="song.trackName"
      />
      <button class="btn-play">
        <img src="@/assets/img/play-circle.svg" class="" alt="" />
      </button>
    </div>
    <div class="flex flex-col justify-between flex-1">
      <div>
        <div class="text-2xs font-medium mb-1">{{song.artistName}}</div>
        <div class="text-sm font-bold leading-none">{{song.trackName}}</div>
      </div>
      <div class="flex justify-between">
        <span
          class="leading-none rounded-full bg-green-500 text-white text-2xs px-3 py-1"
          >Pop</span
        >
        <div class="flex items-center">
          <img src="@/assets/img/dollar.svg" class="mr-1.5" alt="" />
          <span class="leading-none text-yellow-400 text-xs font-bold"
            >1.9</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardItem',
  props: [
    'song'
  ],
  mounted(){
    console.log(this.song);
  }
};
</script>

<style></style>
