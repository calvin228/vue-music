<template>
  <div class="content-wrapper">
    <div class="pt-10 pb-9 text-center">
      <span>Search Result for : </span>
      <span class="font-bold text-purple-700">{{keyword}}</span>
    </div>

    <div v-if="!error" class="px-4">
      <div v-if="loadingList">
        <card-item-skeleton></card-item-skeleton>
        <card-item-skeleton></card-item-skeleton>
        <card-item-skeleton></card-item-skeleton>
      </div>
      <card-item v-else v-for="song in displayedSongs" :activeUrl="currentTrackUrl" ref="songItem" :key="song.trackId" :song="song" @play="playTrack" :audio="$refs.audio" @pause="pauseTrack"></card-item>
    </div>
    <div v-else class="text-center">
      An error has occured!
    </div>
    <div v-if="!loadingList && !error" class="text-center">
      <button v-if="limit < songs.length" class="mb-4 bg-gray-200 rounded-full text-gray-500 font-medium text-xs py-2.5 px-7 hover:bg-purple-700	hover:text-white transition-colors" @click="$emit('load-more')">Load More</button>
    </div>
    <audio ref="audio" @ended="stopTrack"></audio>
  </div>
</template>

<script>
import CardItem from './CardItem';
import CardItemSkeleton from './CardItemSkeleton';
export default {
  name: 'ResultList',
  components:{
    CardItem,
    CardItemSkeleton
  },
  data(){
    return {
      currentTrackUrl: null
    }
  },
  props: [
    'keyword',
    'songs',
    'limit',
    'error',
    'loadingList'
  ],
  computed:{
    displayedSongs(){
      return this.songs.slice(0, this.limit)
    },
  },
  methods:{
    pauseTrack(){
      this.$refs.audio.pause();
    },
    stopTrack(){
      this.currentTrackUrl = null
      this.$refs.audio.pause();
      console.log(this.$refs);
    },
    playTrack(url){
      console.log('playTrack');
      if(this.currentTrackUrl !== url){
        this.currentTrackUrl = url;
        this.$refs.audio.src = this.currentTrackUrl;
      } 
      
      this.$refs.audio.play();
    }
  }
}
</script>

<style>

</style>