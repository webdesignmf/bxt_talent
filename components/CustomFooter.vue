<template>
    <footer class="footer">
        <div class="footer--socials">
            <img src="/mobile/instagram.png" />
            <img src="/mobile/youtube.png" />
        </div>
        <div class="footer--infos">
            <div class="footer--infos__phone">
                <div>(55) 3233-0486</div>
                <div>(55) 1289-6303</div>
            </div>
            <div class="footer--infos__email">contacto@baxtmodels.com.mx</div>
        </div>
        <div class="footer--copyright">
            copyright © 2022 <span>BXTalents</span> Powered by
            <a href="https://managerfashion.com/" target="_blank"
                >Manager Fashion</a
            >
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>

<style lang="scss">
.footer {
    @apply py-6 px-4;
    border-top: 2px solid #fff;
    &--socials {
        @apply flex justify-center items-center gap-x-2 mb-4;
    }
    &--infos {
        @screen lg {
            @apply flex gap-x-8 justify-center;
        }
        &__phone {
            @apply flex justify-center items-center text-white font-light text-sm pb-4;
            div:first-child::after {
                @apply px-5;
                content: '|';
            }
        }
        &__email {
            @apply text-center text-white font-light text-sm pb-4;
        }
    }
    &--copyright {
        @apply text-center text-white text-xxs;
        span {
            @apply font-extrabold;
        }
    }
}
</style>
