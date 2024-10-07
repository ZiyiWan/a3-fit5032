<template>
    <pre>{{ count }}</pre>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'

const count = ref(null);
const error = ref(null);


const getBookCount = async () => {
    try {
        const respone = await axios.get('https://countbooks-jph42zefya-uc.a.run.app');
        count.value = respone.data;
        error.value = null;

    } catch (err) {
        console.log("Error getting book count:", err);
        error.value = err;
        count.value = null;
    }
}

onMounted(() => {
    getBookCount();
})

</script>