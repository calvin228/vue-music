<template>
  <div>
    <div class="search-wrapper">
      <div class="flex h-full items-center justify-center w-full">
        <img src="@/assets/img/logo.svg" class="img-logo" alt="" />
      </div>
      <form @submit.prevent="submitHomeForm">
        <div class="px-7 py-6">
          <div class="mb-3.5">
            <Input :invalid="Boolean(keywordError)" v-model="keyword" placeholder="Artist / Album / Title" />
            <div class="mt-1 text-xs text-red-600 text-center">
              {{ keywordError }}
            </div>
          </div>
          <Button>Search</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import { string as yupString, object as yupObject } from "yup";
import { computed } from "vue";

export default {
  components: {
    Input,
    Button,
  },
  setup() {
    // const keyword = ref(""); //no use ref, since using vee-validate
    const router = useRouter();
    const schema = computed(() => {
      return yupObject({
        keyword: yupString().required("Keyword field is required"),
      });
    });

    useForm({
      validationSchema: schema,
    });

    const { value: keyword, errorMessage: keywordError } = useField("keyword");

    function submitHomeForm() {
      if (!keywordError.value) {
        router.push({ name: "result", query: { keyword: keyword.value } });
      }
    }

    return {
      keyword,
      keywordError,
      submitHomeForm,
    };
  },
};
</script>

<style lang="scss" scoped></style>
