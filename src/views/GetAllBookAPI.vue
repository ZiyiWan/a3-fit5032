<template>
    <pre>{{ books }}</pre>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, getDocs } from 'firebase/firestore';
import db from '../firebase/init.js';

// 响应式数据
const books = ref([]);

// 查询书籍数据，动态控制是否显示所有书籍
const fetchBooks = async () => {
    try {
        let q;
        // 显示所有书籍，没有限制
        q = query(
            collection(db, 'books'),
        );
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
    } catch (error) {
        console.error('Error fetching books: ', error);
    }
};

// 在组件挂载时获取数据
onMounted(() => {
    fetchBooks();
});
</script>