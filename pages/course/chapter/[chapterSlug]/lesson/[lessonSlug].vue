<template>
  <p class="mt-0 uppercase font-bold text-slate-400 bm-1">
    Lesson {{ chapter?.number }} - {{ lesson?.number }}
  </p>
  <h2 class="my-0">{{ lesson?.title }}</h2>

  <div class="flex space-x-4 mt-2 mb-8">
    <NuxtLink
      v-if="lesson?.sourceUrl"
      class="font-normal text-md text-gray-500"
      :to="lesson?.sourceUrl"
      >Download Source Code
    </NuxtLink>
    <NuxtLink
      v-if="lesson?.downloadUrl"
      class="font-normal text-md text-gray-500"
      :to="lesson?.downloadUrl"
      >Download Video
    </NuxtLink>
  </div>
  <VideoPlayer v-if="lesson?.videoId" :videoId="lesson.videoId" />
  <p>{{ lesson?.text }}</p>

  <LessonCompleteButton
    :model-value="isCompleted"
    @update:model-value="toggleComplete"
  />
</template>

<script setup lang="ts">
import { useCourseProgress } from '~/stores/courseProgress';
const course = await useCourse();
const route = useRoute();
const { chapterSlug, lessonSlug } = route.params;
const lesson = await useLesson(chapterSlug, lessonSlug);
const store = useCourseProgress();
const { initialize, toggleComplete } = store;

initialize();

definePageMeta({
  middleware: [
    async function ({ params }, from) {
      const course = await useCourse();

      const chapter = computed(() => {
        return course.value.chapters.find(
          (chapter) => chapter.slug === params.chapterSlug
        );
      });

      if (!chapter.value) {
        throw abortNavigation(
          createError({
            statusCode: 404,
            message: 'Chapter not found',
          })
        );
      }
      const lesson = computed(() => {
        return chapter.value.lessons.find(
          (lesson) => lesson.slug === params.lessonSlug
        );
      });
      if (!lesson.value) {
        throw abortNavigation(
          createError({
            statusCode: 404,
            message: 'Lesson not found',
          })
        );
      }
    },
    'auth',
  ],
});
const progress = useLocalStorage('progress', () => {
  return [];
});
const isCompleted = computed(() => {
  return store.progress?.[chapterSlug]?.[lessonSlug] || 0;
});
const chapter = computed(() => {
  return course.value.chapters.find(
    (chapter) => chapter.slug === route.params.chapterSlug
  );
});

const title = computed(() => {
  return `${lesson.value?.title} -${course.value.title}`;
});

const content = computed(() => {
  return lesson.value?.text;
});
useHead({
  title,
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content,
    },
  ],
});
</script>

<style scoped></style>
