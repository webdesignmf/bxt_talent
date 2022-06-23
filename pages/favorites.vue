<template>
    <div class="favoritesp">
        <div
            data-aos="fade-up"
            data-aos-duration="1000"
            class="favoritesp--title anchorTitle"
        >
            {{ $t('favorites.title') }}
        </div>
        <transition-group
            v-if="Object.keys(talents).length > 0"
            class="favoritesp--list"
            name="fade"
            mode="out-in"
            tag="div"
            data-aos="fade-up"
            data-aos-duration="1250"
            data-aos-anchor=".anchorTitle"
        >
            <talent
                v-for="key in Object.keys(talents)"
                :key="talents[key].id"
                :talent="talents[key]"
                :category="$t('home.talents')"
            />
        </transition-group>
        <div
            v-else
            data-aos="fade-up"
            data-aos-duration="1250"
            data-aos-anchor=".anchorTitle"
            class="favoritesp--notalents"
        >
            {{ $t('favorites.notalents') }}
        </div>
        <div
            v-if="Object.keys(talents).length > 0"
            data-aos="fade-up"
            data-aos-duration="1500"
            class="favoritesp--title"
            data-aos-anchor=".anchorTitle"
        >
            {{ $t('favorites.budget') }}
        </div>
        <div
            v-if="Object.keys(talents).length > 0"
            data-aos="fade-up"
            data-aos-duration="1750"
            class="favoritesp--form"
            data-aos-anchor=".anchorTitle"
        >
            <input
                id="name"
                v-model="$v.form.name.$model"
                :placeholder="$t('favorites.name')"
                name="name"
                :class="{
                    danger: $v.form.name.$error
                }"
                @keydown.enter="$event.target.blur()"
            />
            <input
                id="email"
                v-model="$v.form.email.$model"
                :placeholder="$t('favorites.email')"
                name="email"
                :class="{
                    danger: $v.form.email.$error
                }"
                @keydown.enter="$event.target.blur()"
            />
            <input
                id="phone"
                v-model="$v.form.phone.$model"
                :placeholder="$t('favorites.phone')"
                name="phone"
                :class="{
                    danger: $v.form.phone.$error
                }"
                @keydown.enter="$event.target.blur()"
            />
            <textarea
                id="message"
                v-model="$v.form.message.$model"
                :placeholder="$t('contact.message')"
                name="message"
                :class="{
                    danger: $v.form.message.$error
                }"
                @keydown.enter="$event.target.blur()"
            />
        </div>
        <div
            v-if="Object.keys(talents).length > 0"
            data-aos="fade-up"
            data-aos-duration="2000"
            class="favoritesp--button"
            data-aos-anchor=".anchorTitle"
        >
            <button v-if="sended">
                <font-awesome-icon icon="check" />{{ $t('favorites.sended') }}
            </button>
            <button v-else-if="sending">
                <font-awesome-icon icon="spinner" spin />{{
                    $t('favorites.sending')
                }}
            </button>
            <button v-else @click="validate">
                {{ $t('favorites.send') }}
            </button>
        </div>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import Talent from '~/components/Talent'
import url from '~/seo/components.js'
export default {
    components: {
        Talent
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                phone: '',
                message: ''
            },
            sending: false,
            sended: false
        }
    },
    computed: {
        ...mapState({
            talents: (state) => state.talents.favorites
        })
    },
    validations: {
        form: {
            name: { required },
            email: { required, email },
            phone: { required },
            message: { required }
        }
    },
    methods: {
        resetForm() {
            this.$v.$reset()
            this.form = {
                name: '',
                email: '',
                phone: '',
                message: ''
            }
        },
        async validate() {
            const _this = this
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.sending = true
                const data = new FormData()
                // Form
                Object.keys(this.form).forEach((key) => {
                    data.append(key, this.form[key])
                })
                data.append('favorites', JSON.stringify(this.talents))
                try {
                    await this.$store.dispatch('favorites', data)
                    this.sending = false
                    this.sended = true
                    setTimeout(() => {
                        _this.resetForm()
                        _this.sended = false
                    }, 2000)
                } catch (error) {
                    console.error(error)
                    this.sending = false
                }
            }
        }
    },
    head() {
        const items = url.map((tag) => {
            tag.content = this.$route.fullPath
            return tag
        })
        return {
            title: this.$t('favorites.title'),
            meta: [...items]
        }
    }
}
</script>

<style lang="scss">
.favoritesp {
    .danger {
        border-color: #f00;
    }
    @apply px-6 pb-8;
    &--title {
        @apply mt-8 mb-5 text-white lowercase font-semibold select-none cursor-default;
        font-size: 32px;
    }
    &--list {
        @apply grid grid-cols-2 gap-2;
    }
    &--notalents {
        @apply text-white text-center font-light text-lg text-opacity-75 mt-12 py-10;
    }
    &--form {
        @apply grid grid-cols-1 gap-y-2 text-sm;
        input,
        textarea {
            @apply bg-transparent p-2 text-white;
            height: 35px;
            border: 0.5px solid #fff;
            option {
                @apply text-black;
            }
            &::placeholder,
            &.empty {
                @apply font-light lowercase select-none;
                color: rgba($color: #fff, $alpha: 0.5);
            }
        }
        textarea {
            height: 96px;
        }
    }
    &--button {
        @apply mt-4;
        button {
            @apply select-none flex justify-center items-center gap-x-3 w-full p-4 bg-white outline-none text-black font-semibold lowercase;
        }
    }
}
@screen lg {
    .favoritesp {
        @apply w-2/3 mx-auto;
        &--title {
            @apply text-center;
        }
        &--list {
            @apply grid-cols-4 gap-8;
        }
        &--form {
            @apply mt-12 grid-cols-3 gap-6;
            textarea {
                grid-column: 1 / 4;
            }
        }
        &--button {
            @apply mt-12 w-2/6 mx-auto;
        }
    }
}
</style>
