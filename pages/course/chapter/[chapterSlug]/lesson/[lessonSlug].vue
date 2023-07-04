<template>
  <p class="mt-0 uppercase font-bold text-slate-400 bm-1">
    Lesson {{ chapter?.number }} - {{ lesson?.number }}
  </p>
  <h2 class="my-0">{{ lesson?.title }}</h2>

  <div class="flex space-x-4 mt-2 mb-8">
    <NuxtLink
      v-if="lesson?.sourceUrl"
      class="font-normal text-md text-gray-500"
      :href="lesson?.sourceUrl"
      >Download Source Code
    </NuxtLink>
    <NuxtLink
      v-if="lesson?.downloadUrl"
      class="font-normal text-md text-gray-500"
      :href="lesson?.downloadUrl"
      >Download Video
    </NuxtLink>
  </div>
  <VideoPlayer v-if="lesson?.videoId" :videoId="lesson.videoId" />
  <p>{{ lesson?.text }}</p>
</template>

<script setup lang="ts">
const course = useCourse();
const route = useRoute();

const chapter = computed(() => {
  return course.chapters.find(
    (chapter) => chapter.slug === route.params.chapterSlug
  );
});

const lesson = computed(() => {
  return chapter.value.lessons.find(
    (lesson) => lesson.slug === route.params.lessonSlug
  );
});
</script>

<style scoped></style>