<script setup>
import { ref } from 'vue';
import axios from 'axios';
import BookList from '../components/BookList.vue';

const isbn = ref('');
const name = ref('');

const addBook = async () => {
    try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
            alert('ISBN must be a valid number');
            return;
        }
        // 发送 POST 请求到 Cloud Function
        await axios.post('https://addbook-jph42zefya-uc.a.run.app', {
            isbn: isbnNumber,
            name: name.value,
        });
        isbn.value = '';
        name.value = '';
        alert('Book added successfully!');
    } catch (error) {
        console.error('Error adding book: ', error);
        alert('Failed to add book');
    }
};
</script>
<template>
    <div>
        <h1>Add Book</h1>
        <form @submit.prevent="addBook">
            <div>
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="isbn" id="isbn" required />
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="name" id="name" required />
            </div>
            <button type="submit">Add book</button>
        </form>
        <BookList />
    </div>
</template>