<template>
  <div id="app">
    <div v-if="!searching" class="search-wrapper">
      <div class="flex h-full items-center justify-center w-full">
        <img src="@/assets/img/logo.svg" class="img-logo" alt="" />
      </div>
      <form @submit.prevent="submitHomeForm(keyword)">
        <div class="px-7 py-6">
          <div class="mb-3.5">
            <Input v-model="keyword" placeholder="Artist / Album / Title"/>
            <div class="mt-1 text-xs text-red-600 text-center" v-if="$v.keyword.$dirty && !$v.keyword.required">
              Keyword is required
            </div>
          </div>
          <Button>Search</Button>
        </div>
      </form>
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
        <div class="flex flex-col items-center justify-center h-full px-2.5">
          <h2 class="text-white font-bold text-center mb-7 tracking-wider text-xl">Search</h2>
          <div class="w-full">
            <form @submit.prevent="submitModalForm(modalKeyword)"> 
              <Input ref="modalKeyword" v-model="modalKeyword" placeholder="Artist / Album / Title"/>
              <div class="mt-1 text-xs text-red-500 text-center" v-if="$v.modalKeyword.$dirty && !$v.modalKeyword.required">
                Keyword is required
              </div>            
              <button class="mt-3.5 rounded-full w-full p-3 text-white bg-gradient-to-r from-purple-800 to-purple-600 text-sm focus:ring-2 focus:ring-purple-900 focus:outline-none">
                Search
              </button>
            </form>
          </div>
        </div>
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
import { required } from 'vuelidate/lib/validators'

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
  validations:{
    keyword: {
      required
    },
    modalKeyword: {
      required
    }
  },
  methods: {
    submitHomeForm(value){
      this.$v.keyword.$touch();
    
      if(this.$v.keyword.$invalid){
        return ;
      } else {
        this.$v.keyword.$reset();
        this.searchSongs(value)
      }
    },
    submitModalForm(value){
      this.$v.modalKeyword.$touch();
    
      if(this.$v.modalKeyword.$invalid){
        return ;
      } else {
        this.$v.modalKeyword.$reset();
        this.searchSongs(value)
      }
    },
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
      }).catch(err => {
        this.songs = [];
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
@media only screen and (min-device-width: 480px) {
    #app{
        max-width: 480px;
    }
}
#app {
  margin: 0 auto;
  width: 100%;
  position: relative;
}
</style>
