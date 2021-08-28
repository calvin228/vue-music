<template>
  <div class="flex bg-white rounded-lg p-3 mb-5 shadow-md">
    <div class="mr-3 relative flex-none h-24">
      <img
        :src="song.artworkUrl100"
        class="img-album rounded-lg"
        :alt="song.trackName"
      />
      <button class="btn-play">
        <img :src="buttonImage" @click="togglePlay" class="img-button" alt="" />
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
import playIcon from '../assets/img/play-circle.svg';
import pauseIcon from '../assets/img/pause-circle-svg.svg';

export default {
  name: 'CardItem',
  props: [
    'song',
    'activeUrl',
    'audio'
  ],
  data(){
    return {
      isPlay: false,
    }
  },
  computed:{
    buttonImage(){
      if(this.activeUrl === this.song.previewUrl){
        if(!this.isPlay){
          return playIcon;
        }
        return pauseIcon;
      } else {
        return playIcon;
      }
    }
  },
  methods:{
    togglePlay(){
      this.isPlay = !this.isPlay;
      if(this.isPlay){
        this.$emit('play', this.song.previewUrl);
      } else {
        this.$emit('pause');
      }
    },
    audioEventListener(){
      this.audio.addEventListener('ended', () => { // lambda function to get "this" context from vue  
        this.isPlay = false;
      })
    }
  },
  mounted(){
    this.audioEventListener()
  }
};
</script>

<style></style>
