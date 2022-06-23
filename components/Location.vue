<template>
    <div class="location">
        <div class="location--title">{{ $t('location.title') }}</div>
        <div class="location--info">
            Elefante 125, B, Actipan Del Valle, Ciudad de México
        </div>
        <Map class="location--map" />
    </div>
</template>

<script>
import Map from '~/components/Map'
export default {
    components: {
        Map
    }
}
</script>

<style lang="scss">
.location {
    &--title {
        @apply px-6 text-white lowercase font-semibold select-none cursor-default;
        font-size: 32px;
    }
    &--info {
        @apply py-5 px-6 text-white font-light w-3/4;
    }
    &--map {
        height: 275px;
    }
}
@screen lg {
    .location {
        @apply w-3/4 m-auto my-16;
        &--title {
            @apply text-center;
            font-size: 32px;
        }
        &--info {
            @apply text-center py-5 w-full;
        }
        &--map {
            height: 400px;
        }
    }
}
</style>
