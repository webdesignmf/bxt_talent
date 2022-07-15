<template>
    <div class="book--slider">
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
                    <img :src="slide.file" />
                </div>
            </div>
            <div class="swiper-button-next _cnext">
                <img src="/desktop/arrow-next.png" />
            </div>
            <div class="swiper-button-prev _cprev">
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
                slidesPerView: 'auto',
                centeredSlides: false,
                speed: 1000,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                navigation: {
                    nextEl: '._cnext',
                    prevEl: '._cprev'
                }
            }
        }
    }
}
</script>

<style lang="scss">
.book--slider {
    @apply w-full-v;
    height: 600px;
    .swiper-container,
    .swiper-wrapper,
    .swiper-slide {
        @apply relative h-full;
        img {
            @apply h-full w-full object-cover object-top;
        }
    }
    .swiper-slide {
        @apply px-3;
        width: calc(100vw / 4);
        &.landscape {
            width: calc(100vw / 2);
        }
    }
    .swiper-button-next,
    .swiper-button-prev {
        margin: 0 3rem;
        height: 25px !important;
        width: 25px !important;
        &::after {
            content: unset !important;
        }
    }
}
</style>
