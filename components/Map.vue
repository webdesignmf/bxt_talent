<template>
    <div id="map"></div>
</template>

<script>
/* eslint-disable no-undef */
export default {
    data() {
        return {}
    },
    mounted() {
        const latitude = -23.58606
        const longitude = -46.69744
        const element = document.getElementById('map')

        const options = {
            // How zoomed in you want the map to start at (always required)
            zoom: 15,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            center: new google.maps.LatLng(latitude, longitude)
        }
        const map = new google.maps.Map(element, options)
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map,
            title: this.name
        })
    }
}
</script>

<style lang="scss">
#map {
    height: 100%;
}
</style>
