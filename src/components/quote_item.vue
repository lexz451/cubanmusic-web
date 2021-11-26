<template>
  <div class="quote_item">
      <p class="quote_item--quote">{{ quote.quote }}</p>
      <span class="quote_item--author">{{ quote.author }}</span>
      <small class="quote_item--source-date">{{ quote.source || "-" }} | {{ quote.date || "-" }}</small>
  </div>
</template>

<script>
export default {
    props: {
        quote: {
            type: Object,
            required: true
        }
    },
    setup() {

    }
}
</script>

<style lang="scss" scoped>
.quote_item {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: var(--surface);
    &--quote {
        font-style: italic;
    }
    &--author {
        color: var(--primary);
    }
}
</style>