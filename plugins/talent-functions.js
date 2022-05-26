import { gsap } from 'gsap'
export default ({ app }, inject) => {
    inject('getAge', function (payload) {
        // birthday is a date
        const birthday = new Date(payload)
        const ageDifMs = Date.now() - birthday.getTime()
        const ageDate = new Date(ageDifMs) // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970)
    })
    inject('getImage', function (url) {
        const baseUrl = process.env.BASE_URL
        if (url.includes('http')) {
            return url
        } else {
            return `${baseUrl}${url}`
        }
    })
    inject('getImageLazy', function (url) {
        const baseUrl = process.env.BASE_URL
        if (url.includes('http')) {
            return {
                loading:
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNsXAEAAbABK2U9m/MAAAAASUVORK5CYII=',
                src: url,
                error: '/img/talent_cover_error.png'
            }
        } else {
            return {
                loading:
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNsXAEAAbABK2U9m/MAAAAASUVORK5CYII=',
                src: `${baseUrl}${url}`,
                error: '/img/talent_cover_error.png'
            }
        }
    })
    inject('transitionBeforeEnter', function (el) {
        el.style.opacity = 0
        console.log(el)
    })
    inject('transitionEnter', function (el, done) {
        console.log(el)
        gsap.to(el, {
            duration: 3,
            opacity: 1,
            ease: 'slow',
            onComplete: done
        })
    })
}
