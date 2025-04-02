<template>
  <div
    class="px-4 py-6 md:px-8"
    :class="[config.main.padded && 'container', config.toc.enableInHomepage && 'lg:grid lg:grid-cols-[1fr_220px] lg:gap-14 lg:py-8']"
  >
    <ContentRenderer
      :key="page._id"
      :value="page"
    />

    <div v-if="config.toc.enableInHomepage" class="hidden text-sm lg:block">
      <div class="sticky top-[90px] h-[calc(100vh-3.5rem)] overflow-hidden">
        <LayoutToc :is-small="false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { page } = useContent();
const config = useConfig();

useSeoMeta({
  title: `${page.value?.meta_title ?? page.value?.title ?? '404'} | ${config.value.site.name}`,
  ogTitle: page.value?.meta_title ?? page.value?.title,
  description: page.value?.description ?? page.value?.meta_description,
  ogDescription: page.value?.description ?? page.value?.meta_description,
  ogImage: config.value.site.ogImage,
  twitterCard: 'summary_large_image',
});
</script>
