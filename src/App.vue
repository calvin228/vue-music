<template>
  <div id="app">
    <div v-if="!searching" class="search-wrapper">
      <div class="flex h-full items-center justify-center w-full">
        <img src="./assets/img/logo.svg" alt="" />
      </div>
      <div class="px-7 py-6">
        <div class="mb-3.5">
          <Input v-model="keyword" placeholder="Artist / Album / Title"/>
          <!-- <div class="mt-1 text-xs text-red-700 text-center" v-if="$v.keyword.$dirty && !$v.keyword.required">
            Keyword is required
          </div> -->
        </div>
        <Button @click="searchSongs(keyword)">
          Search
        </Button>
      </div>
    </div>
    <div v-else class="bg-purple-50 d-flex flex-column relative">
      <navbar @open-modal="isModalDisplay = true"/>
      <result-list
        ref="resultList"
        :keyword="keyword"
        :songs="songs"
        :limit="songsToShow"
        @load-more="loadMore"
        :error="error"
        :loadingList="isLoadingList"
      ></result-list>
      <modal :show="isModalDisplay" @close-modal="closeModal">
        <h2 class="text-white font-bold text-center mb-7 tracking-wider text-xl">Search</h2>
        <div class="mb-3.5 w-full">
          <Input ref="modalKeyword" v-model="modalKeyword" placeholder="Artist / Album / Title"/>
        </div>
        <button
          @click="searchSongs($refs.modalKeyword.value)"
          class="rounded-full w-full p-3 text-white bg-gradient-to-r from-purple-800 to-purple-600 text-sm"
        >
          Search
        </button>
      </modal>
    </div>
  </div>
</template>

<script>
import axios from "./axios";
import Navbar from "./components/Navbar";
import ResultList from "./components/ResultList";
import Modal from "./components/Modal";
import Input from "./components/Input";
import Button from "./components/Button";
// import { required } from 'vuelidate/lib/validators'

export default {
  name: "App",
  components: {
    Navbar,
    ResultList,
    Modal,
    Input, 
    Button
  },
  data() {
    return {
      searching: false,
      songs: [],
      keyword: "",
      songsToShow: 5,
      modalKeyword: "",
      isModalDisplay: false,
      error: null,
      isLoadingList: false,
    };
  },
  // validations:{
  //   keyword: {
  //     required
  //   }
  // },
  methods: {
    searchSongs(inputKeyword) {

      this.keyword = inputKeyword;
      const encodedURIKeyword = new URLSearchParams({
        term: this.keyword
      }).toString();

      this.clearError();
      this.searching = true;
      this.isLoadingList = true;
      
      axios.get("/search?" + encodedURIKeyword).then((res) => {
        this.songs = res.data.results;
        this.modalKeyword = '';
        console.log(this.$refs.resultList.$refs.audio.pause());
      }).catch(err => {
        this.error = err;
      }).finally(() => {
        this.$refs.resultList.$el.scrollTop = 0
        this.isLoadingList = false;
        this.resetSongToShow()
      })
      this.closeModal();
    },
    clearError(){
      this.error = null;
    },
    resetSongToShow(){
      this.songsToShow = 5;
    },
    loadMore() {
      this.songsToShow += 5;
    },
    closeModal(){
      this.isModalDisplay = false;
    }
  },
};
</script>

<style>
#app {
  max-width: 360px;
  margin: 0 auto;
  width: 100%;
  position: relative;
}
</style>
