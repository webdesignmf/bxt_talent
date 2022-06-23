<template>
    <div v-if="type == 'image'" class="custom--slider">
        <div ref="mySwiper" v-swiper:mySwiper="swiperOptions">
            <div class="swiper-wrapper">
                <div
                    v-for="(slide, index) in slides"
                    :key="`slide-${index}`"
                    class="swiper-slide"
                >
                    <picture>
                        <source
                            media="(max-width:650px)"
                            :srcset="baseUrl + slide.url.mobile"
                        />
                        <img
                            :src="baseUrl + slide.url.desktop"
                            :alt="slide.description ? slide.description : ''"
                            class="img-slide"
                        />
                    </picture>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="type == 'video'" class="custom--slider">
        <vue-plyr
            ref="plyr"
            :options="videoOptions"
            class="video-wrapper-mobile"
        >
            <div
                :data-plyr-provider="slides[0].video_provider"
                :data-plyr-embed-id="slides[0].video_id"
            ></div>
        </vue-plyr>
        <div class="mask"></div>
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
                    controls: false
                },
                youtube: {
                    noCookie: false,
                    rel: 0,
                    showinfo: 0,
                    iv_load_policy: 3,
                    modestbranding: 1,
                    controls: 0
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
                effect: 'fade',
                slidesPerView: 'auto',
                centeredSlides: true,
                speed: 2500,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    hideOnClick: false,
                    clickable: true
                },
                autoplay: this.alone
                    ? false
                    : {
                          delay: 5000,
                          disableOnInteraction: false
                      },
                loop: !this.alone,
                allowTouchMove: !this.alone
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
        type() {
            if (typeof this.slides === 'undefined') return ''
            const type = this.slides.find((item) => item.type === 'video')
                ? 'video'
                : 'image'
            return type
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
    methods: {}
}
</script>

<style lang="scss">
.custom--slider {
    @apply w-full-v m-auto;
    @screen lg {
        @apply w-3/4;
    }
    // height: calc(75vw * 0.3672);
    :root {
        --swiper-theme-color: #333;
    }
    section.slide {
        height: calc(75vw * 0.3672);
        .video-wrapper-mobile {
            height: calc(75vw * 0.3672);
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
            height: calc(75vw * 0.3672);
            .video-wrapper-mobile {
                height: auto;
                .plyr__video-wrapper.plyr__video-embed {
                    transform: scale(1);
                }
            }
        }
    }
    @screen xl {
        section.slide {
            height: calc(75vw * 0.3672);
        }
    }
}
</style>
