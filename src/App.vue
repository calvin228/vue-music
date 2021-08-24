<template>
  <div id="app">
    <div v-if="!searching" class="search-wrapper">
      <div class="flex h-full items-center justify-center w-full">
        <img src="./assets/img/logo.svg" alt="" />
      </div>
      <div class="px-7 py-6">
        <div class="mb-3.5">
          <input
            type="text"
            v-model="keyword"
            class="w-full p-3 rounded-full text-center text-xs"
            placeholder="Artist / Album / Title"
          />
        </div>
        <button
          @click="searchSongs"
          class="rounded-full w-full p-3 text-white bg-white bg-opacity-20 text-sm"
        >
          Search
        </button>
      </div>
    </div>
    <div v-else class="bg-purple-50 d-flex flex-column relative">
      <navbar />
      <result-list
        :keyword="keyword"
        :songs="songs"
        :limit="songsToShow"
        @load-more="loadMore"
      ></result-list>
    </div>
  </div>
</template>

<script>
import axios from "./axios";
import Navbar from "./components/Navbar";
import ResultList from "./components/ResultList";

export default {
  name: "App",
  components: {
    Navbar,
    ResultList,
  },
  data() {
    return {
      searching: false,
      songs: [],
      keyword: "",
      songsToShow: 5,
    };
  },
  methods: {
    searchSongs() {
      const encodedURIKeyword = new URLSearchParams({
        term: this.keyword
      }).toString();

      this.searching = true;
      axios.get("/search?" + encodedURIKeyword).then((res) => {
        this.songs = res.data.results;
      });
    },
    loadMore() {
      this.songsToShow += 5;
    },
  },
};
</script>

<style>
#app {
  max-width: 340px;
  margin: 0 auto;
  width: 100%;
  position: relative;
}
</style>
