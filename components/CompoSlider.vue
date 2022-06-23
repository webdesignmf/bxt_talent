<template>
    <div class="compo--slider">
        <div class="compo--slider__title">COMPOSITES</div>
        <div ref="mySwiper" v-swiper:mySwiper="swiperOptions">
            <div class="swiper-wrapper">
                <div
                    v-for="(slide, index) in slides"
                    :key="`slide-${index}`"
                    :class="{
                        'swiper-slide': true,
                        landscape: slide.height < slide.width
                    }"
                >
                    <img class="image" :src="slide.file" />
                </div>
            </div>
            <div v-if="!alone" class="swiper-button-next cnext">
                <img src="/desktop/arrow-next.png" />
            </div>
            <div v-if="!alone" class="swiper-button-prev cprev">
                <img src="/desktop/arrow-prev.png" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        slides: {
            type: Array,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            swiperOptions: {
                effect: 'fade',
                slidesPerView: 1,
                centeredSlides: true,
                speed: 1000,
                loop: true,
                navigation: {
                    nextEl: '.cnext',
                    prevEl: '.cprev'
                }
            }
        }
    },
    computed: {
        alone() {
            if (typeof this.slides !== 'undefined') {
                return this.slides.length <= 1
            }
            return true
        }
    }
}
</script>

<style lang="scss">
.compo--slider {
    .swiper-slide {
        opacity: 0 !important;
        transition: all 0.5s;
    }
    .swiper-slide-active {
        opacity: 1 !important;
    }
    .swiper-container,
    .swiper-wrapper,
    .swiper-slide {
        @apply relative h-full;
        align-self: stretch;
        .image {
            @apply h-full w-full object-cover;
        }
    }
    &__title {
        @apply font-semibold text-white lowercase text-2xl mb-3;
        @screen lg {
            @apply mb-8 text-center;
            font-size: 32px;
        }
    }
    @apply w-full-v px-6 mb-8;
    @screen lg {
        width: 45vw;
        @apply m-auto mb-8;
    }
    .swiper-button-next,
    .swiper-button-prev {
        &::after {
            content: unset !important;
        }
    }
}
</style>
