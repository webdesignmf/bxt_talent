<template>
    <div class="video--gallery">
        <div ref="mySwiper" v-swiper:mySwiper="swiperOptions" class="mySwiper">
            <div class="swiper-wrapper">
                <div
                    v-for="(slide, index) in slides"
                    :key="`slide-${index}`"
                    class="swiper-slide"
                >
                    <iframe
                        :src="getVideoSrc(slide)"
                        class="h-full w-full relative"
                        allow="autoplay;fullscreen"
                    />
                    <div class="mask"></div>
                </div>
            </div>

            <div v-if="!alone" class="swiper-pagination"></div>
            <div v-if="!alone" class="swiper-button-next">
                <img src="/desktop/arrow-next.png" />
            </div>
            <div v-if="!alone" class="swiper-button-prev">
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
            videoOptions: {
                muted: true,
                controls: [],
                vimeo: {
                    byline: false,
                    portrait: false,
                    title: false,
                    speed: true,
                    transparent: false,
                    controls: true
                },
                youtube: {
                    noCookie: false,
                    rel: 0,
                    showinfo: 0,
                    iv_load_policy: 3,
                    modestbranding: 1,
                    controls: 1
                },
                controlBar: false,
                // debug: true,
                touch: false,
                clickToPlay: false,
                tooltips: { controls: false, seek: false },
                // autopause: true,
                loop: { active: true },
                ads: { enabled: false, publisherId: '' }
            },
            swiperOptions: {
                slidesPerView: 'auto',
                effect: 'fade',
                centeredSlides: true,
                speed: 1000,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                loop: true
            },
            slideLaunched: false
        }
    },
    computed: {
        ...mapState({
            baseUrl: (state) => state.baseUrl
        }),
        player() {
            if (this.$refs.plyr) {
                return this.$refs.plyr.player
            } else {
                return null
            }
        },
        alone() {
            if (typeof this.slides !== 'undefined') {
                return this.slides.length <= 1
            }
            return true
        }
    },

    activated() {
        if (this.player) {
            setTimeout(() => {
                this.$refs.plyr.player.play()
                this.$refs.plyr.player.muted = true
            }, 1500)
        }
    },
    deactivated() {
        if (this.player) {
            this.$refs.plyr.player.pause()
        }
    },
    mounted() {
        if (this.player) {
            this.player.on('ready', () => {
                this.$refs.plyr.player.play()
                this.$refs.plyr.player.muted = true
            })
        }
    },
    methods: {
        getVideoSrc(video) {
            let src = ''
            if (video.provider === 'youtube') {
                src = 'http://www.youtube.com/embed/' + video.file
            } else {
                src = 'https://player.vimeo.com/video/' + video.file
            }
            return src + '/?controls=1'
        }
    }
}
</script>

<style lang="scss">
.video--gallery {
    .mySwiper {
        @apply w-full-v relative;
        height: 230px;
        @screen lg {
            width: 75vw;
            height: 530px;
        }
        .swiper-wrapper,
        .swiper-slide {
            @apply h-full;
        }
        .swiper-slide {
            opacity: 0 !important;
            transition: all 0.5s;
        }
        .swiper-slide-active {
            opacity: 1 !important;
        }
        .swiper-button-next,
        .swiper-button-prev {
            &::after {
                content: unset !important;
            }
        }
    }
    :root {
        --swiper-theme-color: #333;
    }
    section.slide {
        .video-wrapper-mobile {
            @screen xs {
                .plyr__video-wrapper.plyr__video-embed {
                    transform: scale(3.4);
                    padding-bottom: 60.25% !important;
                    @media (max-width: 640px) and (orientation: landscape) {
                        transform: scale(1);
                    }
                }
            }
        }
    }
    @screen sm {
        section.slide {
            .video-wrapper-mobile {
                height: auto;
                .plyr__video-wrapper.plyr__video-embed {
                    transform: scale(1);
                }
            }
        }
    }
}
</style>
