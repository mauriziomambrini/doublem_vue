<script setup>
import { defineProps, computed } from 'vue';
import { Head } from '@unhead/vue/components';
import useGQL from '@composable/useGQL.js';
import Seo from '@gql/seo.gql';
const { data } = useGQL(Seo);

const props = defineProps({
  title: { type: String },
  description: { type: String },
});

const favicons = computed(() => data.value?._site?.faviconMetaTags || []);
const title = computed(
  () => props.title ?? data.value?._site.globalSeo.fallbackSeo.title,
);
const description = computed(
  () =>
    props.description ?? data.value?._site.globalSeo.fallbackSeo.description,
);
const seoImage = computed(() => {
  const image = data.value?._site?.globalSeo?.fallbackSeo?.image;
  return {
    url: image?.url,
    alt: image?.alt,
  };
});
</script>

<template>
  <Head>
    <title>{{ title }}</title>
    <template v-for="tag in favicons" :key="tag.attributes.href">
      <link v-bind="tag.attributes" :content="tag.content" :tag="tag.tag" />
    </template>
    <meta name="description" :content="description" />
    <meta property="og:title" :content="title" />
    <meta property="og:description" :content="description" />
    <meta property="og:image" :content="seoImage.url" />
    <meta property="og:image:alt" :content="seoImage.alt" />
  </Head>
</template>
