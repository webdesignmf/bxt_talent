<template>
    <div :id="target" :ref="target" class="intersection-observer" />
</template>

<script>
let observer
export default {
    props: ['target'],
    mounted() {
        const target = document.querySelector(`#${this.target}`)

        observer = new IntersectionObserver(this.animationStatus, {
            rootMargin: '300px 0px 0px 0px',
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        })
        observer.observe(target)
    },
    methods: {
        animationStatus(target) {
            target.forEach((element) => {
                console.log(element)
                const height = element.boundingClientRect.height
                const lastPosition = element.intersectionRect.height
                let percent = lastPosition * 100
                percent = percent / height
                percent = Math.round(percent)
                const position = percent >= 0 ? percent : 0
                this.$emit('intersected', position)
            })
        }
    }
}
</script>

<style>
.intersection-observer {
    @apply w-full absolute inset-0 z-0;
}
</style>
