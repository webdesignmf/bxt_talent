<template>
    <div class="getscouted">
        <div
            data-aos="fade-up"
            data-aos-duration="1000"
            class="getscouted--title"
        >
            {{ $t('getscouted.title') }}
        </div>
        <div
            data-aos="fade-up"
            data-aos-duration="1500"
            class="getscouted--form"
        >
            <input
                id="name"
                v-model="$v.form.name.$model"
                :placeholder="$t('getscouted.name')"
                name="name"
                :class="{
                    danger: $v.form.name.$error
                }"
                @keydown.enter="$event.target.blur()"
            />
            <input
                id="email"
                v-model="$v.form.email.$model"
                :placeholder="$t('getscouted.email')"
                name="email"
                :class="{
                    danger: $v.form.email.$error
                }"
                @keydown.enter="$event.target.blur()"
            />
            <input
                id="phone"
                v-model="$v.form.phone.$model"
                :placeholder="$t('getscouted.phone')"
                name="phone"
                :class="{
                    danger: $v.form.phone.$error
                }"
                @keydown.enter="$event.target.blur()"
            />
            <select
                id="height"
                v-model="$v.form.height.$model"
                name="height"
                :class="{
                    danger: $v.form.height.$error,
                    empty: !form.height
                }"
                @keydown.enter="$event.target.blur()"
            >
                <option value="" hidden disabled>
                    {{ $t('getscouted.height') }}
                </option>
                <option
                    v-for="(height, index) in options.height"
                    :key="`height-${index}`"
                    :value="height.value"
                >
                    {{ height.label }}
                </option>
            </select>
            <select
                id="bust"
                v-model="$v.form.bust.$model"
                name="bust"
                :class="{
                    danger: $v.form.bust.$error,
                    empty: !form.bust
                }"
                @keydown.enter="$event.target.blur()"
            >
                <option value="" hidden disabled>
                    {{ $t('getscouted.bust') }}
                </option>
                <option
                    v-for="(bust, index) in options.bust"
                    :key="`bust-${index}`"
                    :value="bust.value"
                >
                    {{ bust.label }}
                </option>
            </select>
            <select
                id="waist"
                v-model="$v.form.waist.$model"
                name="waist"
                :class="{
                    danger: $v.form.waist.$error,
                    empty: !form.waist
                }"
                @keydown.enter="$event.target.blur()"
            >
                <option value="" hidden disabled>
                    {{ $t('getscouted.waist') }}
                </option>
                <option
                    v-for="(waist, index) in options.waist"
                    :key="`waist-${index}`"
                    :value="waist.value"
                >
                    {{ waist.label }}
                </option>
            </select>
            <select
                id="hips"
                v-model="$v.form.hips.$model"
                name="hips"
                :class="{
                    danger: $v.form.hips.$error,
                    empty: !form.hips
                }"
                @keydown.enter="$event.target.blur()"
            >
                <option value="" hidden disabled>
                    {{ $t('getscouted.hips') }}
                </option>
                <option
                    v-for="(hips, index) in options.hips"
                    :key="`hips-${index}`"
                    :value="hips.value"
                >
                    {{ hips.label }}
                </option>
            </select>
            <select
                id="eyes"
                v-model="$v.form.eyes.$model"
                name="eyes"
                :class="{
                    danger: $v.form.eyes.$error,
                    empty: !form.eyes
                }"
                @keydown.enter="$event.target.blur()"
            >
                <option value="" hidden disabled>
                    {{ $t('getscouted.eyes') }}
                </option>
                <option
                    v-for="(eyes, index) in apiOptions.eyes"
                    :key="`eyes-${index}`"
                    :value="eyes.id"
                >
                    {{ eyes.value }}
                </option>
            </select>
            <select
                id="hair"
                v-model="$v.form.hair.$model"
                name="hair"
                :class="{
                    danger: $v.form.hair.$error,
                    empty: !form.hair
                }"
                @keydown.enter="$event.target.blur()"
            >
                <option value="" hidden disabled>
                    {{ $t('getscouted.hair') }}
                </option>
                <option
                    v-for="(hair, index) in apiOptions.hair"
                    :key="`hair-${index}`"
                    :value="hair.id"
                >
                    {{ hair.value }}
                </option>
            </select>
        </div>
        <div
            data-aos="fade-up"
            data-aos-duration="2000"
            class="getscouted--files"
        >
            <label
                v-for="fileKey in Object.keys(files)"
                :key="fileKey"
                :class="{
                    'getscouted--files__row': true,
                    danger: $v.files[fileKey].$error
                }"
                :for="fileKey"
            >
                <img src="/general/upload.png" />
                <span>{{ filename[fileKey] || $t('getscouted.upload') }}</span>
                <input
                    :id="fileKey"
                    type="file"
                    :name="fileKey"
                    hidden
                    accept="image/x-png,image/gif,image/jpeg"
                    @change="processFile($event, fileKey)"
                />
            </label>
        </div>
        <div
            data-aos="fade-up"
            data-aos-duration="2500"
            class="getscouted--button"
        >
            <button v-if="sended">
                <font-awesome-icon icon="check" />{{ $t('getscouted.sended') }}
            </button>
            <button v-else-if="sending">
                <font-awesome-icon icon="spinner" spin />{{
                    $t('getscouted.sending')
                }}
            </button>
            <button v-else @click="validate">
                {{ $t('getscouted.send') }}
            </button>
        </div>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import options from '~/assets/js/options'
import url from '~/seo/components.js'
export default {
    async fetch({ app, store, error }) {
        try {
            const params = {
                params: {
                    hair: app.i18n.locale,
                    eyes: app.i18n.locale
                }
            }
            await store.dispatch('getOptions', params)
        } catch (e) {
            error({
                statusCode: 503,
                // message: 'Unable to fetch Website Information'
                message: e
            })
        }
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                phone: '',
                height: '',
                bust: '',
                waist: '',
                hips: '',
                eyes: '',
                hair: ''
            },
            files: {
                image_1: '',
                image_2: '',
                image_3: '',
                image_4: '',
                image_5: ''
            },
            filename: {
                image_1: '',
                image_2: '',
                image_3: '',
                image_4: '',
                image_5: ''
            },
            sending: false,
            sended: false,
            options
        }
    },
    computed: {
        ...mapState({
            apiOptions: (state) => state.options
        })
    },
    watch: {
        '$i18n.locale'(_new, _old) {
            const params = {
                params: {
                    hair: _new,
                    eyes: _new
                }
            }
            this.$store.dispatch('getOptions', params)
        }
    },
    validations: {
        form: {
            name: { required },
            email: { required, email },
            phone: { required },
            height: { required },
            bust: { required },
            waist: { required },
            hips: { required },
            eyes: { required },
            hair: { required }
        },
        files: {
            image_1: {
                required
            },
            image_2: {
                required
            },
            image_3: {
                required
            },
            image_4: {
                required
            },
            image_5: {
                required
            }
        }
    },
    methods: {
        resetForm() {
            this.$v.$reset()
            this.form = {
                name: '',
                email: '',
                phone: '',
                height: '',
                bust: '',
                waist: '',
                hips: '',
                eyes: '',
                hair: ''
            }
            this.files = {
                image_1: '',
                image_2: '',
                image_3: '',
                image_4: '',
                image_5: ''
            }
            this.filename = {
                image_1: '',
                image_2: '',
                image_3: '',
                image_4: '',
                image_5: ''
            }
        },
        processFile(e, data) {
            if (e.target.files[0].name.length > 20) {
                this.filename[data] =
                    e.target.files[0].name.substring(0, 14) + '...'
            } else {
                this.filename[data] = e.target.files[0].name
            }

            const files = e.target.files || e.dataTransfer.files

            if (!files.length) {
                this.files[data] = ''
                return
            }

            this.files[data.toString()] = new Image()

            const reader = new FileReader()

            reader.onload = (e) => {
                this.files[data.toString()] = e.target.result
            }
            reader.readAsDataURL(files[0])
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
                // Files
                Object.keys(this.files).forEach((key) => {
                    data.append(key, document.getElementById(key).files[0])
                })
                try {
                    await this.$store.dispatch('getScouted', data)
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
            title: this.$t('pages.get_scouted'),
            meta: [...items]
        }
    }
}
</script>

<style lang="scss">
.getscouted {
    .danger {
        border-color: #f00;
    }
    @apply px-6 pb-8;
    &--title {
        @apply mt-8 mb-5 text-white lowercase font-semibold select-none cursor-default;
        font-size: 32px;
    }
    &--form {
        @apply grid grid-cols-1 gap-y-2 text-sm;
        input,
        select {
            @apply bg-transparent px-2 text-white;
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
    }
    &--files {
        @apply mt-6 grid grid-cols-2 gap-4 text-sm;
        &__row {
            @apply flex justify-center items-center text-white font-light lowercase gap-x-1;
            height: 35px;
            border: 0.5px solid #fff;
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
    .getscouted {
        @apply w-2/3 m-auto;
        &--title {
            @apply text-center;
        }
        &--form {
            @apply mt-12 grid-cols-3 gap-6;
        }
        &--files {
            @apply mt-10 grid-cols-5 gap-4 w-5/6 mx-auto;
        }
        &--button {
            @apply mt-12 w-2/6 mx-auto;
        }
    }
}
</style>
