<template>
  <div class="article_item">
      <a class="article_item--url" :href="article.url || '#'" target="_blank">
          {{ article.title }}
      </a>
      <small class="article_item--author"></small>
      <small class="article_item--source-date">
          {{ article.source || "-" }} | {{ article.date || "-" }}
      </small>
  </div>
</template>

<script>
export default {
    props: {
        article: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.article_item {
    display: flex;
    flex-direction: column;
}
</style>