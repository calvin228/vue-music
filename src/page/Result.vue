<template>
  <div class="bg-purple-50 d-flex flex-column relative">
    <navbar @open-modal="isModalDisplay = true" />
    <result-list
      ref="resultListRef"
      :keyword="searchTerm"
      :songs="songs"
      :limit="songsToShow"
      @load-more="loadMore"
      :error="error"
      :loadingList="isLoadingList"
    ></result-list>
    <Modal :show="isModalDisplay" @close-modal="closeModal">
      <div class="flex flex-col items-center justify-center h-full px-2.5">
        <h2
          class="text-white font-bold text-center mb-7 tracking-wider text-xl"
        >
          Search
        </h2>
        <div class="w-full">
          <form @submit.prevent="submitModalForm">
            <Input
              ref="modalInput"
              v-model="modalKeyword"
              placeholder="Artist / Album / Title"
            />
            <div
              v-if="!metaKeyword.dirty"
              class="mt-1 text-xs text-red-500 text-center"
            >
              {{ modalKeywordError }}
            </div>
            <button
              class="mt-3.5 rounded-full w-full p-3 text-white bg-gradient-to-r from-purple-800 to-purple-600 text-sm focus:ring-2 focus:ring-purple-900 focus:outline-none"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import axios from "@/axios";
import Navbar from "@/components/Navbar";
import ResultList from "@/components/ResultList";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { useForm, useField } from "vee-validate";
import { string as yupString, object as yupObject } from "yup";

export default {
  components: {
    Navbar,
    ResultList,
    Modal,
    Input,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const songs = ref([]);
    const songsToShow = ref(5);
    const error = ref(null);
    const isLoadingList = ref(false);
    const resultListRef = ref(null);
    const searchTerm = ref(route.query.keyword);

    const isModalDisplay = ref(false);

    const schema = yupObject({
      modalKeyword: yupString()
        .required()
        .label("Keyword"),
    });

    const { resetForm } = useForm({
      validationSchema: schema,
    });

    const {
      value: modalKeyword,
      errorMessage: modalKeywordError,
      meta: metaKeyword,
    } = useField("modalKeyword", undefined, {
      initialValue: "",
    });

    function searchSongs() {
      const encodedURIKeyword = new URLSearchParams({
        term: searchTerm.value,
      }).toString();

      clearError();
      isLoadingList.value = true;

      axios
        .get("/search?" + encodedURIKeyword)
        .then((res) => {
          songs.value = res.data.results;
          modalKeyword.value = "";
        })
        .catch((err) => {
          songs.value = [];
          error.value = err;
        })
        .finally(() => {
          resultListRef.value.$el.scrollTop = 0;
          isLoadingList.value = false;
          resetSongToShow();
        });
    }

    function submitModalForm() {
      if (modalKeyword.value) {
        router.push({ name: "result", query: { keyword: modalKeyword.value } });

        isModalDisplay.value = false;
        resetForm();
      }
    }

    function closeModal() {
      isModalDisplay.value = false;
    }

    function clearError() {
      error.value = null;
    }

    function resetSongToShow() {
      songsToShow.value = 5;
    }
    function loadMore() {
      songsToShow.value += 5;
    }

    onMounted(function() {
      searchSongs();
    });

    watch(
      () => route.query.keyword,
      async (newKeyword) => {
        searchTerm.value = newKeyword;
        searchSongs();
      }
    );

    return {
      searchTerm,
      songs,
      songsToShow,
      error,
      isLoadingList,
      resultListRef,
      loadMore,
      modalKeyword,
      modalKeywordError,
      metaKeyword,
      isModalDisplay,
      submitModalForm,
      closeModal,
    };
  },
};
</script>

<style lang="scss" scoped></style>
