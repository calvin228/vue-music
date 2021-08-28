<template>
  <div class="flex bg-white rounded-lg p-3 mb-5 shadow-md">
    <div class="mr-3 relative flex-none h-24">
      <img
        :src="song.artworkUrl100"
        class="img-album rounded-lg"
        :alt="song.trackName"
      />
      <button v-if="isPlay && (activeUrl === song.previewUrl)" class="btn-play" @click="pausePreview">
        <img src="@/assets/img/pause-circle.svg" class="img-button" alt="" />
      </button>
      <button v-else class="btn-play" @click="playPreview">
        <img src="@/assets/img/play-circle.svg" class="img-button" alt="" />
      </button>

    </div>
    <div class="flex flex-col justify-between flex-1">
      <div>
        <a :href="song.artistViewUrl" target="_blank" class="block text-2xs font-medium mb-1">{{song.artistName}}</a>
        <a :href="song.trackViewUrl" target="_blank" class="text-sm font-bold leading-none block">{{song.trackName}}</a>
      </div>
      <div class="flex justify-between">
        <span
          class="leading-none rounded-full bg-green-500 text-white text-2xs px-3 py-1 max-w-min"
          >{{song.primaryGenreName}}</span
        >
        <div class="flex items-center">
          <img src="@/assets/img/dollar.svg" class="mr-1.5" alt="" />
          <span class="leading-none text-yellow-400 text-xs font-bold"
            >{{song.trackPrice || 'N/A'}}</span
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
    'song',
    'activeUrl',
    'audio',
    'isPlay'
  ],
  methods:{
    playPreview(){
      this.$emit('play', this.song.previewUrl);
    },
    pausePreview(){
      this.$emit('pause', this.song.previewUrl);
    }
  },
};
</script>

<style></style>
