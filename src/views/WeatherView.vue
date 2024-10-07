<template>
    <div class="about mt-5 row">
        <div class="col-md-8 offset-md-2">
            <!-- 交互功能 -->
            <h1 class="text-center">Current Weather</h1>
            <div class="search-bar">
                <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
                <button class="search-button" @click="searchByCity">Search</button>
            </div>
        </div>
        <!-- 显示信息 -->
        <div v-if="weatherData">
            <h2>
                {{ weatherData.name }},{{ weatherData.sys.country }}
            </h2>
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
            <span>{{ weatherData.weather[0].description }}</span>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
const city = ref('')
const iconUrl = ref('')
const weatherData = ref(null)
const temperature = ref(null)

const searchByCity = async () => {
    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${weatherApiKey}`);
        weatherData.value = response.data;
        temperature.value = Math.floor(response.data.main.temp - 273.15);
        iconUrl.value = `http://api.openweathermap.org/img/w/${response.data.weather[0].icon}.png`;
    } catch (error) {
        console.log('Error info: ', error);
    }
};

const getCurrentLocationWeatherData = async (latitude, longitude) => {
    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`);
        weatherData.value = response.data;
        temperature.value = Math.floor(response.data.main.temp - 273.15);
        iconUrl.value = `http://api.openweathermap.org/img/w/${response.data.weather[0].icon}.png`;
    } catch (error) {
        console.log('Error info: ', error);
    }
};

//3.把拿到的数据按照要求显示在页面上
onMounted(() => {
    //1.获取当前的位置经纬度信息
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            const { latitude, longitude } = position.coords
            getCurrentLocationWeatherData(latitude, longitude)
        })
    }
})
</script>
  
<style>
.about {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 80vw;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
}
</style>2