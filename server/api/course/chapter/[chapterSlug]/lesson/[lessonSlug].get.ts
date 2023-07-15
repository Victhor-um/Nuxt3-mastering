import course from '~/server/courseData';
import { computed } from 'vue';
export default defineEventHandler((event) => {
  const { chapterSlug, lessonSlug } = event.context.params;

  const chapter = computed(() => {
    return course.chapters.find((chapter) => chapter.slug === chapterSlug);
  });

  if (!chapter.value) {
    throw createError({
      statusCode: 404,
      message: 'Chapter not found',
    });
  }
  const lesson = computed(() => {
    return chapter.value.lessons.find((lesson) => lesson.slug === lessonSlug);
  });
  if (!lesson.value) {
    throw createError({
      statusCode: 404,
      message: 'Lesson not found',
    });
  }

  return lesson.value;
});
