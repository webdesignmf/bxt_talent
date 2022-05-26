<template>
    <div class="globalLoading">
        <img src="/loading.gif" />
    </div>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>

<style lang="scss">
.globalLoading {
    @apply fixed top-0 left-0 w-full h-full flex items-center justify-center;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 99999;
    img {
        height: 100px;
    }
}
</style>
