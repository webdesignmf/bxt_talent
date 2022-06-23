<template>
    <section v-if="type == 'image'" class="slide">
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
                            :srcset="$getImage(slide.url.mobile)"
                        />
                        <img
                            :src="$getImage(slide.url.desktop)"
                            :alt="slide.description ? slide.description : ''"
                            class="img-slide"
                        />
                    </picture>
                </div>
            </div>

            <div v-if="!alone" class="swiper-pagination"></div>
            <div v-if="!alone" class="swiper-button-next"></div>
            <div v-if="!alone" class="swiper-button-prev"></div>
        </div>
    </section>
    <section v-else-if="type == 'video'">
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
    </section>
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
        },
        type: {
            type: String,
            default: 'image'
        },
        alone: {
            type: Boolean,
            defaul: false
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
            slideLaunched: false,
            baseUrl:
                process.env.BASE_URL ||
                'https://bxt.managerfashion.net'
        }
    },
    computed: {
        player() {
            if (this.$refs.plyr) {
                return this.$refs.plyr.player
            } else {
                return null
            }
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
:root {
    --swiper-theme-color: #333;
}
section.slide {
    min-height: 100vh;
    .video-wrapper-mobile {
        height: 100vh;
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
        min-height: 30vh;
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
        min-height: calc(100vh - 145px);
    }
}
</style>
