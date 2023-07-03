<template>
  <h3>Lesson</h3>
  <span>This a lesson</span>
  <p>{{ chapter?.title }}</p>
  <p>{{ lesson?.title }}</p>
</template>

<script setup lang="ts">
const course = useCourse();
console.log('🚀 ~ file: [lessonSlug].vue:10 ~ course:', course);
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
