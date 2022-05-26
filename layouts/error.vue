<template>
    <main class="error">
        <h4 class="title">
            {{ message }}
        </h4>
        <div id="error"></div>
        <nav v-if="statusCode === 404" class="buttons">
            <a class="btn primary" @click="goBack">
                <font-awesome-icon icon="arrow-left"></font-awesome-icon>
                &nbsp;Return
            </a>
            <nuxt-link to="/" class="btn primary">
                <font-awesome-icon icon="home"></font-awesome-icon>
                &nbsp;HOME
            </nuxt-link>
        </nav>
    </main>
</template>
<script>
import lottie from 'lottie-web'
import ErrorLoading from '~/assets/animations/error'
export default {
    name: 'NuxtError',
    props: {
        error: {
            type: Object,
            default: null
        }
    },
    computed: {
        statusCode() {
            return (this.error && this.error.statusCode) || 500
        },
        message() {
            return this.error.message
        }
    },
    mounted() {
        lottie.loadAnimation({
            container: document.getElementById('error'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: ErrorLoading
        })
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    },
    head() {
        return {
            title: this.message // <--- Set the SEO title
        }
    }
}
</script>
<style lang="scss">
main.error {
    @apply pt-32 pb-8 px-4 mx-auto;
    .title {
        @apply text-2xl uppercase text-center text-primary;
    }
    .buttons {
        @apply mx-auto flex text-center m-4;
    }
    #error {
        @apply max-w-75 mx-auto;
        svg {
            max-height: 30vh !important;
        }
    }
}
</style>
