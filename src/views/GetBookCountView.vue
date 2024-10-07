<template>
    <div class="about mt-5 row">
        <h1 class="text-center">Book Counter</h1>
        <button @click="getBookCount">Get Book Count</button>
        <p v-if="count !== null">Total number of books: {{ count }}</p>
        <p v-if="error">{{ error }}</p>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios'

const count = ref(null);
const error = ref(null);


const getBookCount = async () => {
    try {
        const respone = await axios.get('https://countbooks-jph42zefya-uc.a.run.app');
        count.value = respone.data.count;
        error.value = null;

    } catch (err) {
        console.log("Error getting book count:", err);
        error.value = err;
        count.value = null;
    }
}

</script>