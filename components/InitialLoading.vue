<template>
    <div class="globalLoading">
        <img src="/general/loading.gif" />
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
    background-color: rgb(13, 13, 13);
    z-index: 99999;
    img {
        height: 100px;
        filter: invert(1);
    }
}
</style>
