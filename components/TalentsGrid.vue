<template>
    <div class="talents--grid">
        <div class="talents--grid__title">{{ $t('home.news') }}</div>
        <transition-group
            class="talents--grid__list"
            name="fade"
            mode="out-in"
            tag="div"
        >
            <talent
                v-for="talent in talents"
                :key="talent.id"
                :talent="talent"
                :category="$t('home.talents')"
            />
        </transition-group>
    </div>
</template>

<script>
import Talent from '~/components/Talent'
export default {
    components: {
        Talent
    },
    props: {
        talents: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss">
.talents--grid {
    @apply px-6 py-12 m-auto;
    &__title {
        @apply text-white lowercase font-semibold select-none cursor-default pb-2;
        font-size: 32px;
    }
    &__list {
        @apply grid grid-cols-1 gap-y-4;
    }
}
@screen lg {
    .talents--grid {
        @apply px-0 w-3/4;
        &__title {
            @apply text-center pb-6;
        }
        &__list {
            @apply grid-cols-4 gap-x-8;
        }
    }
}
</style>
