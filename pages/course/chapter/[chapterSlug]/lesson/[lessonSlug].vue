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

  <LessonCompleteButton
    :model-value="isLessonCompleted"
    @update:model-value="toggleComplete"
  />
</template>

<script setup lang="ts">
const course = useCourse();
const route = useRoute();

const progress = useLocalStorage('progress', () => {
  return [];
});

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

const title = computed(() => {
  return `${lesson.value?.title} -${course.title}`;
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

const isLessonCompleted = computed(() => {
  if (!progress.value[chapter.value?.number - 1]) {
    return false;
  }
  if (!progress.value[chapter.value?.number - 1][lesson.value?.number - 1]) {
    return false;
  }

  return progress.value[chapter.value?.number - 1][lesson.value?.number - 1];
});

const toggleComplete = () => {
  if (!progress.value[chapter.value.number - 1]) {
    progress.value[chapter.value.number - 1] = [];
  }

  progress.value[chapter.value.number - 1][lesson.value.number - 1] =
    !isLessonCompleted.value;
};
</script>

<style scoped></style>
