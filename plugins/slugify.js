const slugify = require('slugify')
export default ({ app }, inject) => {
    inject('slugify', slugify)
}
