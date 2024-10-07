<template>
    <div class="about mt-5 row">
        <div class="col-md-8 offset-md-2">
            <h1 class="text-center">Maps</h1>
            <button @click="getCurrentLocation" class="location-button">Current location</button>
            <button @click="showRoute" class="route-button">Show route</button>
            <div class="map-container">
                <div id="map" class="map"></div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const map = ref(null); // 地图实例
const currentLocation = ref(null); // 用户当前位置
const destination = ref(null); // 搜索的目的地

// 设置Mapbox Access Token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_KEY;

// 初始化地图和搜索功能
onMounted(() => {
    console.log(import.meta.env.VITE_MAPBOX_ACCESS_KEY)
    // 初始化地图
    map.value = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 2,
    });

    // 添加 Geocoder 插件进行地点搜索
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false // 不自动添加标记
    });

    // 将 geocoder 插入地图
    map.value.addControl(geocoder);

    // 当选择一个搜索结果时，记录目的地坐标
    geocoder.on('result', (event) => {
        destination.value = event.result.geometry.coordinates;

        // 在地图上添加标记
        new mapboxgl.Marker()
            .setLngLat(destination.value)
            .addTo(map.value);
    });
});

// 获取用户当前位置
const getCurrentLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { longitude, latitude } = position.coords;
            currentLocation.value = [longitude, latitude];

            // 在地图上显示当前位置
            new mapboxgl.Marker({ color: 'blue' })
                .setLngLat(currentLocation.value)
                .addTo(map.value);

            // 将地图中心设置为当前位置
            map.value.flyTo({ center: currentLocation.value, zoom: 14 });
        }, (error) => {
            console.error("Error getting location:", error);
        });
    } else {
        alert("您的浏览器不支持地理位置获取");
    }
};

// 显示从当前位置到搜索目的地的路径
const showRoute = async () => {
    if (!currentLocation.value || !destination.value) {
        alert("请先获取当前位置并搜索目的地");
        return;
    }

    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${currentLocation.value[0]},${currentLocation.value[1]};${destination.value[0]},${destination.value[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

    try {
        const response = await fetch(directionsUrl);
        const data = await response.json();

        const route = data.routes[0].geometry;

        // 在地图上显示路径
        map.value.addLayer({
            id: 'route',
            type: 'line',
            source: {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: route,
                },
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round',
            },
            paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75,
            },
        });

        // 将地图视角调整以显示整个路径
        const bounds = new mapboxgl.LngLatBounds();
        route.coordinates.forEach(coord => bounds.extend(coord));
        map.value.fitBounds(bounds);
    } catch (error) {
        console.error("Error fetching directions:", error);
    }
};
</script>

  
<style scoped>
/* 设置地图容器的大小 */
.map-container {
    position: relative;
    width: 100%;
    height: 100vh;
    /* 全屏显示地图 */
}

.map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
}
</style>