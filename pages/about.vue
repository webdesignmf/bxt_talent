<template>
    <div class="about">
        <div data-aos="fade-up" data-aos-duration="1000" class="about--title">
            {{ $t('about.title') }}
        </div>
        <div
            data-aos="fade-up"
            data-aos-duration="1500"
            class="about--text"
            v-html="$t('about.text')"
        />
    </div>
</template>

<script>
import url from '~/seo/components.js'
export default {
    data() {
        return {}
    },
    head() {
        const items = url.map((tag) => {
            tag.content = this.$route.fullPath
            return tag
        })
        return {
            title: 'About',
            meta: [...items]
        }
    }
}
</script>

<style lang="scss">
.about {
    @apply px-6 pb-8;
    &--title {
        @apply mt-8 mb-5 text-white lowercase font-semibold;
        font-size: 32px;
    }
    &--text {
        @apply font-light text-white text-justify;
        p {
            @apply py-1;
        }
    }
}
@screen lg {
    .about {
        &--title {
            @apply text-center;
        }
        &--text {
            @apply text-left w-3/4 m-auto;
        }
    }
}
</style>
