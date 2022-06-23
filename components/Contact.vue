<template>
    <div class="contact">
        <div class="contact--info">
            <div class="contact--info__title">{{ $t('contact.contact') }}</div>
            <div class="contact--info__item">
                <div class="contact--info__item--title">
                    {{ $t('contact.phone') }}:
                </div>
                <div class="contact--info__item--description">
                    (55) 3233-0486
                </div>
            </div>
            <div class="contact--info__item">
                <div class="contact--info__item--title">
                    {{ $t('contact.celphone') }}:
                </div>
                <div class="contact--info__item--description">
                    (55) 1289-6303
                </div>
            </div>
            <div class="contact--info__item">
                <div class="contact--info__item--title">
                    {{ $t('contact.email') }}:
                </div>
                <div class="contact--info__item--description">
                    contacto@baxtmodels.com.mx
                </div>
            </div>
        </div>
        <div class="contact--form">
            <div class="contact--form__title">
                {{ $t('contact.talk_with_us') }}
            </div>
            <div class="contact--form__fields">
                <input
                    id="name"
                    v-model="$v.form.name.$model"
                    :placeholder="$t('contact.name')"
                    name="name"
                    :class="{
                        danger: $v.form.name.$error
                    }"
                    @keydown.enter="$event.target.blur()"
                />
                <input
                    id="email"
                    v-model="$v.form.Email.$model"
                    :placeholder="$t('contact.email')"
                    name="email"
                    :class="{
                        danger: $v.form.Email.$error
                    }"
                    @keydown.enter="$event.target.blur()"
                />
                <input
                    id="phone"
                    v-model="$v.form.phone.$model"
                    :placeholder="$t('contact.phone')"
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
            <div class="contact--form__button">
                <button v-if="sended">
                    <font-awesome-icon icon="check" />{{ $t('contact.sended') }}
                </button>
                <button v-else-if="sending">
                    <font-awesome-icon icon="spinner" spin />{{
                        $t('contact.sending')
                    }}
                </button>
                <button v-else @click="validate">
                    {{ $t('contact.send') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            form: {
                name: '',
                Email: '',
                phone: '',
                message: ''
            },
            sending: false,
            sended: false
        }
    },
    validations: {
        form: {
            name: { required },
            Email: { required, email },
            phone: { required },
            message: { required }
        }
    },
    methods: {
        resetForm() {
            this.$v.$reset()
            this.form = {
                name: '',
                Email: '',
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
                try {
                    await this.$store.dispatch('contact', data)
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
    }
}
</script>

<style lang="scss">
.contact {
    @apply p-6;
    &--info {
        &__title {
            @apply mb-5 text-white lowercase font-semibold select-none cursor-default;
            font-size: 32px;
        }
        &__item {
            @apply font-light text-white mb-5;
            &:last-child {
                @apply mb-8;
            }
        }
    }
    &--form {
        &__title {
            @apply mb-5 text-white lowercase font-semibold select-none cursor-default;
            font-size: 32px;
        }
        &__fields {
            @apply grid grid-cols-1 gap-y-2 text-sm;
            input,
            textarea {
                @apply bg-transparent p-2 text-white;
                height: 35px;
                border: 0.5px solid #fff;
                &::placeholder {
                    @apply font-light lowercase select-none;
                    color: rgba($color: #fff, $alpha: 0.5);
                }
                &.danger {
                    border-color: #f00;
                }
            }
            textarea {
                height: 96px;
            }
        }
        &__button {
            @apply mt-4;
            button {
                @apply flex justify-center items-center gap-x-3 w-full p-4 bg-white outline-none text-black font-semibold lowercase;
            }
        }
    }
}
@screen lg {
    .contact {
        @apply px-0 grid w-3/4 m-auto mt-16 py-0;
        grid-template-columns: 30% 70%;
        &--info {
            &__title {
                @apply mb-5 text-white lowercase font-semibold select-none cursor-default;
                font-size: 32px;
            }
            &__item {
                &--title {
                    @apply select-none;
                }
                @apply font-light text-white mb-5;
                &:last-child {
                    @apply mb-8;
                }
            }
        }
        &--form {
            &__title {
                @apply mb-5 text-white lowercase font-semibold select-none cursor-default;
                font-size: 32px;
            }
            &__fields {
                @apply grid grid-cols-3 gap-2 text-sm;
                textarea {
                    grid-column: 1 / 4;
                }
            }
            &__button {
                @apply mt-4 grid grid-cols-3 gap-x-2;
                button {
                    grid-column: 3 / 4;
                    @apply select-none flex justify-center items-center gap-x-3 w-full p-4 bg-white outline-none text-black font-semibold lowercase;
                }
            }
        }
    }
}
</style>
