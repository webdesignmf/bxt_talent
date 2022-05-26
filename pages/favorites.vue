<template>
    <div class="favoritos">
        <transition
            appear
            :css="false"
            @before-enter="$transitionBeforeEnter"
            @enter="$transitionEnter"
        >
            <section class="casting">
                <transition-group
                    v-if="Object.keys(talents).length > 0"
                    name="fade-up"
                    class="talent-list"
                    tag="div"
                >
                    <talent-favorites
                        v-for="(talent, index) in talents"
                        :key="`talent-${talent.id}-${index}`"
                        :talent="talent"
                    />
                </transition-group>
                <div
                    v-else
                    :class="{
                        'section-title': true,
                        error: invalid
                    }"
                >
                    Não há modelos selecionados
                </div>
                <form @submit.prevent="validate">
                    <h1 class="section-title">ENVIAR CASTING POR EMAIL</h1>
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
                            NOME COMPLETO
                        </label>
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
                            TELEFONE
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
            </section>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import url from '~/seo/components.js'
export default {
    data() {
        return {
            form: {
                name: '',
                email: '',
                phone: ''
            },
            loading: false,
            disabled: false,
            sended: false,
            invalid: false,
            error: false
        }
    },
    validations: {
        form: {
            name: {
                required
            },
            email: {
                required,
                email
            },
            phone: {
                required
            }
        }
    },
    computed: {
        ...mapState({
            talents: (state) => state.talents.favorites
        })
    },
    methods: {
        async validate() {
            this.disabled = true
            this.$v.$touch()
            if (this.$v.$invalid || this.talents.length < 1) {
                this.invalid = true
                this.disabled = false
            } else {
                this.invalid = false
                this.loading = true
                const data = new FormData()
                Object.keys(this.form).forEach((key) => {
                    data.append(key, this.form[key])
                })
                try {
                    await this.$store.dispatch('favorites', data)
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
            title: 'Favoritos',
            meta: [...items]
        }
    }
}
</script>

<style lang="scss">
// .favoritos {
// }
</style>
