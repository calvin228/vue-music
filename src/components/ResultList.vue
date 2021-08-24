<template>
  <div class="content-wrapper">
    <div class="pt-10 pb-9 text-center">
      <span>Search Result for : </span>
      <span class="font-bold text-purple-700">{{keyword}}</span>
    </div>
    <div class="px-4">
      <card-item v-for="song in displayedSongs" :key="song.trackId" :song="song"></card-item>
    </div>
    <!-- <button v-if="limit < songs.length" class="fixed bottom-3 left-1/2 transform -translate-x-1/2 bottom-0 bg-gray-200 rounded-full text-gray-500 font-medium text-xs py-2.5 px-7 hover:bg-purple-700	hover:text-white transition-colors	" @click="$emit('load-more')">Load More</button> -->
    <div class="text-center">
      <button v-if="limit < songs.length" class="mb-4 bg-gray-200 rounded-full text-gray-500 font-medium text-xs py-2.5 px-7 hover:bg-purple-700	hover:text-white transition-colors" @click="$emit('load-more')">Load More</button>
    </div>
  </div>
</template>

<script>
import CardItem from './CardItem';
export default {
  name: 'ResultList',
  components:{
    CardItem
  },
  props: [
    'keyword',
    'songs',
    'limit'
  ],
  computed:{
    displayedSongs(){
      return this.songs.slice(0, this.limit)
    }
  },
}
</script>

<style>

</style>