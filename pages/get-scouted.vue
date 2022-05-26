<template>
    <section class="get-scouted">
        <transition
            appear
            :css="false"
            @before-enter="$transitionBeforeEnter"
            @enter="$transitionEnter"
        >
            <form novalidate autocomplete="off" @submit.prevent="validate">
                <h1 class="section-title">SEJA MODELO</h1>

                <div class="measurements-container">
                    <div class="float-label">
                        <input
                            id="name"
                            v-model="$v.form.name.$model"
                            type="text"
                            name="name"
                            :disabled="disabled"
                            :class="{
                                input: true,
                                danger: $v.form.name.$error
                            }"
                            @keydown.enter="$event.target.blur()"
                        />
                        <label
                            :class="{
                                'input-label': true,
                                active: form.name
                            }"
                            for="name"
                        >
                            NOME
                        </label>
                    </div>
                    <div class="float-label">
                        <input
                            id="instagram"
                            v-model="$v.form.instagram.$model"
                            type="text"
                            name="instagram"
                            :disabled="disabled"
                            :class="{
                                input: true,
                                danger: $v.form.instagram.$error
                            }"
                            @keydown.enter="$event.target.blur()"
                        />
                        <label
                            :class="{
                                'input-label': true,
                                active: form.instagram
                            }"
                            for="instagram"
                        >
                            INSTAGRAM
                        </label>
                    </div>

                    <div class="float-label">
                        <input
                            id="email"
                            v-model="$v.form.email.$model"
                            type="email"
                            name="email"
                            :disabled="disabled"
                            :class="{
                                input: true,
                                danger: $v.form.email.$error
                            }"
                            @keydown.enter="$event.target.blur()"
                        />
                        <label
                            :class="{
                                'input-label': true,
                                active: form.email
                            }"
                            for="email"
                        >
                            EMAIL
                        </label>
                    </div>
                    <div class="float-label">
                        <input
                            id="address"
                            v-model="$v.form.address.$model"
                            type="text"
                            name="address"
                            :disabled="disabled"
                            :class="{
                                input: true,
                                danger: $v.form.address.$error
                            }"
                            @keydown.enter="$event.target.blur()"
                        />
                        <label
                            :class="{
                                'input-label': true,
                                active: form.address
                            }"
                            for="address"
                        >
                            ENDEREÇO
                        </label>
                    </div>

                    <div class="float-label">
                        <select
                            id="state"
                            v-model="$v.form.state.$model"
                            name="state"
                            :disabled="disabled"
                            :class="{
                                input: true,
                                danger: $v.form.state.$error
                            }"
                            @keydown.enter="$event.target.blur()"
                        >
                            <!-- @change="getCities($event.target.value)" -->
                            <option value="" hidden disabled></option>
                            <option
                                v-for="(state, index) in apiOptions.states"
                                :key="`state-${index}`"
                                :value="state.id"
                            >
                                {{ state.value }}
                            </option>
                        </select>
                        <label
                            :class="{
                                'input-label': true,
                                active: form.state
                            }"
                            for="state"
                        >
                            ESTADO
                        </label>
                    </div>
                    <div class="float-label">
                        <select
                            id="city"
                            v-model="$v.form.city.$model"
                            name="city"
                            :disabled="disabled"
                            :class="{
                                input: true,
                                danger: $v.form.city.$error
                            }"
                            @keydown.enter="$event.target.blur()"
                        >
                            <option value="" hidden disabled></option>
                            <option
                                v-for="(city, index) in apiOptions.cities"
                                :key="`city-${index}`"
                                :value="city.id"
                            >
                                {{ city.value }}
                            </option>
                        </select>
                        <label
                            :class="{
                                'input-label': true,
                                active: form.city
                            }"
                            for="city"
                        >
                            CIDADE
                        </label>
                    </div>
                    <div class="float-label">
                        <select
                            id="gender"
                            v-model="$v.form.gender.$model"
                            name="gender"
                            :disabled="disabled"
                            :class="{
                                input: true,
                                danger: $v.form.gender.$error
                            }"
                            @keydown.enter="$event.target.blur()"
                        >
                            <option value="" hidden disabled></option>
                            <option
                                v-for="(gender, index) in options.gender"
                                :key="`gender-${index}`"
                                :value="gender.value"
                            >
                                {{ gender.label }}
                            </option>
                        </select>
                        <label
                            :class="{
                                'input-label': true,
                                active: form.gender
                            }"
                            for="gender"
                        >
                            SEXO
                        </label>
                    </div>
                    <div class="float-label">
                        <div class="input clear">
                            <el-date-picker
                                v-model="$v.form.birthdate.$model"
                                :class="{
                                    danger: $v.form.birthdate.$error
                                }"
                                type="date"
                                :clearable="false"
                                name="birthdate"
                                format="dd/MMM/yyyy"
                                value-format="yyyy-MM-dd"
                                :disabled="disabled"
                                @click.prevent="$event.target.blur()"
                            />
                        </div>
                        <label
                            for="birthdate"
                            :class="{
                                'input-label calendar': true,
                                active: form.birthdate
                            }"
                            >DATA DE NASCIMIENTO</label
                        >
                    </div>

                    <div class="float-label">
                        <input
                            id="phone"
                            v-model="$v.form.phone.$model"
                            type="tel"
                            name="phone"
                            :disabled="disabled"
                            :class="{
                                input: true,
                                danger: $v.form.phone.$error
                            }"
                            @keydown.enter="$event.target.blur()"
                        />
                        <label
                            :class="{
                                'input-label': true,
                                active: form.phone
                            }"
                            for="phone"
                        >
                            CELULAR
                        </label>
                    </div>
                    <div class="float-label">
                        <select
                            id="jeans"
                            v-model="$v.form.jeans.$model"
                            name="jeans"
                            :disabled="disabled"
                            :class="{
                                input: true,
                                danger: $v.form.jeans.$error
                            }"
                            @keydown.enter="$event.target.blur()"
                        >
                            <option value="" hidden disabled></option>
                            <option
                                v-for="(jeans, index) in options.jeans"
                                :key="`jeans-${index}`"
                                :value="jeans.value"
                            >
                                {{ jeans.label }}
                            </option>
                        </select>
                        <label
                            :class="{
                                'input-label': true,
                                active: form.jeans
                            }"
                            for="jeans"
                        >
                            MANEQUIM
                        </label>
                    </div>
                    <div class="float-label">
                        <select
                            id="bust"
                            v-model="$v.form.bust.$model"
                            name="bust"
                            :disabled="disabled"
                            :class="{
                                input: true,
                                danger: $v.form.bust.$error
                            }"
                            @keydown.enter="$event.target.blur()"
                        >
                            <option value="" hidden disabled></option>
                            <option
                                v-for="(bust, index) in options.bust"
                                :key="`bust-${index}`"
                                :value="bust.value"
                            >
                                {{ bust.label }}
                            </option>
                        </select>
                        <label
                            :class="{
                                'input-label': true,
                                active: form.bust
                            }"
                            for="bust"
                        >
                            TÓRAX
                        </label>
                    </div>

                    <div class="float-label">
                        <select
                            id="height"
                            v-model="$v.form.height.$model"
                            name="height"
                            :disabled="disabled"
                            :class="{
                                input: true,
                                danger: $v.form.height.$error
                            }"
                            @keydown.enter="$event.target.blur()"
                        >
                            <option value="" hidden disabled></option>
                            <option
                                v-for="(height, index) in options.height"
                                :key="`height-${index}`"
                                :value="height.value"
                            >
                                {{ height.label }}
                            </option>
                        </select>
                        <label
                            :class="{
                                'input-label': true,
                                active: form.height
                            }"
                            for="height"
                        >
                            ALTURA
                        </label>
                    </div>
                    <div class="float-label">
                        <select
                            id="eyes"
                            v-model="$v.form.eyes.$model"
                            name="eyes"
                            :disabled="disabled"
                            :class="{
                                input: true,
                                danger: $v.form.eyes.$error
                            }"
                            @keydown.enter="$event.target.blur()"
                        >
                            <option value="" hidden disabled></option>
                            <option
                                v-for="(eyes, index) in options.eyes"
                                :key="`eyes-${index}`"
                                :value="eyes.value"
                            >
                                {{ eyes.label }}
                            </option>
                        </select>
                        <label
                            :class="{
                                'input-label': true,
                                active: form.eyes
                            }"
                            for="eyes"
                        >
                            OLHOS
                        </label>
                    </div>

                    <div class="float-label">
                        <select
                            id="shirt"
                            v-model="$v.form.shirt.$model"
                            name="shirt"
                            :disabled="disabled"
                            :class="{
                                input: true,
                                danger: $v.form.shirt.$error
                            }"
                            @keydown.enter="$event.target.blur()"
                        >
                            <option value="" hidden disabled></option>
                            <option
                                v-for="(shirt, index) in options.shirt"
                                :key="`shirt-${index}`"
                                :value="shirt.value"
                            >
                                {{ shirt.label }}
                            </option>
                        </select>
                        <label
                            :class="{
                                'input-label': true,
                                active: form.shirt
                            }"
                            for="shirt"
                        >
                            CAMISA
                        </label>
                    </div>
                    <div class="float-label">
                        <select
                            id="suit"
                            v-model="$v.form.suit.$model"
                            name="suit"
                            :disabled="disabled"
                            :class="{
                                input: true,
                                danger: $v.form.suit.$error
                            }"
                            @keydown.enter="$event.target.blur()"
                        >
                            <option value="" hidden disabled></option>
                            <option
                                v-for="(suit, index) in options.suit"
                                :key="`suit-${index}`"
                                :value="suit.value"
                            >
                                {{ suit.label }}
                            </option>
                        </select>
                        <label
                            :class="{
                                'input-label': true,
                                active: form.suit
                            }"
                            for="suit"
                        >
                            TERNO
                        </label>
                    </div>
                    <div class="float-label">
                        <select
                            id="shoes"
                            v-model="$v.form.shoes.$model"
                            name="shoes"
                            :disabled="disabled"
                            :class="{
                                input: true,
                                danger: $v.form.shoes.$error
                            }"
                            @keydown.enter="$event.target.blur()"
                        >
                            <option value="" hidden disabled></option>
                            <option
                                v-for="(shoes, index) in options.shoes"
                                :key="`shoes-${index}`"
                                :value="shoes.value"
                            >
                                {{ shoes.label }}
                            </option>
                        </select>
                        <label
                            :class="{
                                'input-label': true,
                                active: form.shoes
                            }"
                            for="shoes"
                        >
                            SAPATO
                        </label>
                    </div>
                    <div class="float-label">
                        <select
                            id="waist"
                            v-model="$v.form.waist.$model"
                            name="waist"
                            :disabled="disabled"
                            :class="{
                                input: true,
                                danger: $v.form.waist.$error
                            }"
                            @keydown.enter="$event.target.blur()"
                        >
                            <option value="" hidden disabled></option>
                            <option
                                v-for="(waist, index) in options.waist"
                                :key="`waist-${index}`"
                                :value="waist.value"
                            >
                                {{ waist.label }}
                            </option>
                        </select>
                        <label
                            :class="{
                                'input-label': true,
                                active: form.waist
                            }"
                            for="waist"
                        >
                            CINTURA
                        </label>
                    </div>

                    <div class="float-label">
                        <select
                            id="hair"
                            v-model="$v.form.hair.$model"
                            name="hair"
                            :disabled="disabled"
                            :class="{
                                input: true,
                                danger: $v.form.hair.$error
                            }"
                            @keydown.enter="$event.target.blur()"
                        >
                            <option value="" hidden disabled></option>
                            <option
                                v-for="(hair, index) in options.hair"
                                :key="`hair-${index}`"
                                :value="hair.value"
                            >
                                {{ hair.label }}
                            </option>
                        </select>
                        <label
                            :class="{
                                'input-label': true,
                                active: form.hair
                            }"
                            for="hair"
                        >
                            CABELO
                        </label>
                    </div>
                </div>
                <div class="images">
                    <label
                        v-for="(file, key) in files"
                        :key="`files-${key}`"
                        :class="{
                            'files-container': true,
                            danger: $v.files[key].$error
                        }"
                        :for="key"
                        :disabled="disabled"
                    >
                        <span class="label">{{ labels[key] }}</span>
                        <div class="img-mask">
                            <transition name="fade" mode="out-in">
                                <img v-if="file" :src="file" class="croped" />
                                <div v-else class="file-wrapper">
                                    <span>
                                        <arrow-upload
                                            class="svg-inline--fa fa-instagram fa-w-14"
                                        ></arrow-upload>
                                    </span>
                                </div>
                            </transition>
                            <input
                                :id="key"
                                type="file"
                                :name="key"
                                hidden
                                alt="Subir arquivo"
                                accept="image/x-png,image/gif,image/jpeg"
                                :disabled="disabled"
                                @change="processFile($event, key)"
                            />
                        </div>
                    </label>
                </div>
                <div v-if="invalid" class="invalid-feedback">
                    PREENCHA OS CAMPOS OBRIGATÓRIOS
                </div>
                <div v-if="!sended" class="float-button">
                    <button
                        type="submit"
                        class="btn primary"
                        :disabled="disabled"
                    >
                        <span v-if="!loading">ENVIAR</span>
                        <span v-if="loading"
                            >ENVIANDO&nbsp;<font-awesome-icon
                                spin
                                icon="spinner"
                        /></span>
                    </button>
                </div>
                <div v-else class="success-message">
                    MENSAGEM ENVIADA&nbsp;
                    <font-awesome-icon icon="check"></font-awesome-icon>
                </div>
            </form>
        </transition>
    </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import options from '~/assets/js/options'
import url from '~/seo/components.js'
import ArrowUpload from '~/assets/icons/arrowUpload.svg?inline'
export default {
    components: {
        ArrowUpload
    },
    async fetch({ store, error }) {
        try {
            const params = {
                params: {
                    language: 'pt',
                    states: 21,
                    cities: JSON.stringify({ country: 21 })
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
                birthdate: '',
                gender: '',
                email: '',
                address: '',
                phone: '',
                message: '',
                height: '',
                hips: '',
                jeans: '',
                shoes: '',
                hair: '',
                eyes: '',
                state: '',
                city: '',
                bust: '',
                waist: '',
                suit: '',
                shirt: '',
                linktowork_a: '',
                linktowork_b: '',
                linktowork_c: ''
            },
            files: {
                image_1: '',
                image_2: '',
                image_3: '',
                image_4: '',
                image_5: '',
                image_6: ''
            },
            labels: {
                image_1: 'FOTO 1',
                image_2: 'FOTO 2',
                image_3: 'FOTO 3',
                image_4: 'FOTO 4',
                image_5: 'FOTO 5',
                image_6: 'FOTO 6'
            },
            loading: false,
            disabled: false,
            sended: false,
            invalid: false,
            error: false,
            options
        }
    },
    computed: {
        ...mapState({
            apiOptions: (state) => state.options
        })
    },
    created() {},
    validations: {
        form: {
            name: {
                required
            },
            instagram: {
                required
            },
            gender: {
                required
            },
            birthdate: {
                required
            },
            email: {
                required,
                email
            },
            phone: {
                required
            },
            bust: {
                required
            },
            waist: {
                required
            },
            suit: {
                required
            },
            shirt: {
                required
            },

            address: {
                required
            },
            message: {
                required
            },

            height: {
                required
            },
            hips: {
                required
            },
            jeans: {
                required
            },
            shoes: {
                required
            },
            hair: {
                required
            },
            eyes: {
                required
            },
            state: {
                required
            },
            city: {
                required
            }
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
            },
            image_6: {
                required
            }
        }
    },
    methods: {
        processFile(e, data) {
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
            this.disabled = true
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.invalid = true
                this.disabled = false
            } else {
                this.invalid = false
                this.loading = true
                const data = new FormData()
                Object.keys(this.form).forEach((key) => {
                    data.append(key, this.form[key])
                })
                Object.keys(this.files).forEach((key) => {
                    data.append(key, document.getElementById(key).files[0])
                })
                try {
                    await this.$store.dispatch('getScouted', data)
                    this.sended = true
                } catch (error) {
                    this.loading = false
                    this.invalid = false
                    this.error = true
                    this.disabled = false
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
            title: 'SEJA MODELO',
            meta: [...items]
        }
    }
}
</script>

<style lang="scss">
section.get-scouted {
    @apply grid grid-cols-1  pt-16 pb-8 px-4 text-center;
    form {
        @apply opacity-0;
        .images {
            @apply grid grid-cols-2 gap-8 my-4;

            .files-container {
                @apply flex flex-col items-start justify-center;
                .label {
                    @apply text-xs;
                }
            }
            .img-mask {
                @apply m-0 p-0 w-full h-full;

                img.croped {
                    // object-fit: cover;
                    @apply m-0 p-0 w-auto h-full mx-auto shadow-xl;
                    max-height: 150px;
                }
            }
            .file-wrapper {
                @apply relative bg-alternative bg-opacity-75 h-full transition-all duration-300 shadow;
                min-height: 130px;
                &:hover {
                    @apply shadow-xl;
                }

                span {
                    @apply absolute w-full inset-0 mx-auto text-center;
                    top: 40%;
                    svg {
                        @apply text-xl text-white;
                    }
                }
            }
        }
        .btn {
            @apply mt-4 mb-6;
        }
        .danger {
            .el-input__inner {
                @apply border border-danger;
            }
        }
        .input-label.calendar {
            @apply ml-8;
        }
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
            @apply w-full;
        }
        .el-input.is-disabled {
            .el-input__prefix,
            .el-input__suffix {
                color: white;
            }
        }
        .el-icon-date {
            @apply text-black;
        }

        .el-input__inner {
            height: 42px;
            outline: 0;
            @apply border-black border-0 border-opacity-75 bg-forms bg-opacity-50 text-black text-opacity-75  w-full rounded-none;
            &:hover,
            &:focus,
            &:active {
                box-shadow: 0 0 0 100px rgba(0, 0, 0, 0.05) inset,
                    0 3px 3px rgba(0, 0, 0, 0.1) !important;
                @apply border-secondary border-b-2;
                //     0 3px 3px rgba(0, 0, 0, 0.1) !important;
                // background-color: #fff !important;
                &:disabled {
                    // background-color: rgba(255, 255, 255, 0.25) !important;
                    // color: white !important;
                    // box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.25) inset,
                    //     0 3px 3px rgba(0, 0, 0, 0.1) !important;
                }
            }
        }
    }
    @screen md {
        form {
            .images {
                @apply grid-cols-2;
                .img-mask {
                    img.croped {
                        max-height: 250px;
                    }
                }
            }
        }
    }
    @screen lg {
        form {
            .measurements-container {
                @apply grid grid-cols-3 gap-y-4 gap-x-12;
            }
            .images {
                @apply gap-12  grid-cols-3;
            }
            .float-button {
                @apply text-right;
                button {
                    @apply mr-0 px-8;
                }
            }
        }
    }
    @screen xl {
        @apply max-w-90 mx-auto w-full pt-32 pb-8;
        form {
            .measurements-container {
                @apply gap-x-16;
            }
            .images {
                @apply mx-auto gap-x-16;
            }
        }
    }
    @screen xxl {
        @apply max-w-90 mx-auto w-full;
        form {
            .measurements-container {
                @apply gap-x-20;
            }
            .images {
                @apply mx-auto gap-x-20;
            }
        }
    }
}
</style>
