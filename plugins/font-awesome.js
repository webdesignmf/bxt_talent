import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faWhatsapp,
    faInstagram,
    faFacebookSquare,
    faTwitter,
    faYoutube
} from '@fortawesome/free-brands-svg-icons'
import {
    faHeart as fasHeart,
    faSpinner,
    faAngleLeft,
    faAngleRight,
    faImage,
    faTimes,
    faArrowLeft,
    faHome,
    faUser,
    faSortDown
} from '@fortawesome/fontawesome-free-solid'
import {
    faEnvelope,
    faHeart as farHeart
} from '@fortawesome/free-regular-svg-icons'
library.add(
    faWhatsapp,
    faInstagram,
    faFacebookSquare,
    faTwitter,
    faYoutube,
    farHeart,
    faSpinner,
    faAngleLeft,
    faAngleRight,
    faImage,
    faTimes,
    faEnvelope,
    faArrowLeft,
    faHome,
    faUser,
    faSortDown,
    fasHeart
)
Vue.component('font-awesome-icon', FontAwesomeIcon)
