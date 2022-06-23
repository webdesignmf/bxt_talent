<template>
    <div class="instagram--grid">
        <div class="instagram--grid__title">@bxtalents</div>
        <div class="elfsight-app-cbfd7389-4e69-4f24-b745-b6cc1ff63fd6"></div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.instagram--grid {
    @apply px-6 py-12 m-auto;
    &__title {
        @apply text-white lowercase font-semibold select-none cursor-default pb-2;
        font-size: 32px;
    }
}
@screen lg {
    .instagram--grid {
        @apply px-0 w-3/4;
        &__title {
            @apply text-center pb-6;
        }
    }
}

.eapps-instagram-feed-posts-grid-load-more-container {
    display: none !important;
}
</style>
