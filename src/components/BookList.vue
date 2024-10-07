<template>
    <div>
        <h1>Books with ISBN > 1000</h1>
        <ul>
            <li v-for="book in books" :key="book.id">
                {{ book.name }} - ISBN: {{ book.isbn }}
                <button @click="editBook(book)">Edit</button>
                <button @click="deleteBook(book.id)">Delete</button>
            </li>
        </ul>

        <button @click="toggleShowAll">
            {{ showAll ? 'Show Top 5 Books' : 'Show All Books' }}
        </button>

        <!-- 编辑书籍的表单 -->
        <div v-if="editingBook">
            <h2>Edit Book</h2>
            <form @submit.prevent="updateBook(editingBook.id)">
                <label for="name">Name:</label>
                <input type="text" v-model="editingBook.name" />

                <label for="isbn">ISBN:</label>
                <input type="number" v-model="editingBook.isbn" />

                <button type="submit">Update Book</button>
                <button @click="cancelEdit">Cancel</button>
            </form>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from '../firebase/init.js';

// 响应式数据
const books = ref([]);
const showAll = ref(false); // 控制是否显示所有书籍
const editingBook = ref(null);

// 查询书籍数据，动态控制是否显示所有书籍
const fetchBooks = async () => {
    try {
        let q;
        if (showAll.value) {
            // 显示所有书籍，没有限制
            q = query(
                collection(db, 'books'),
                where('isbn', '>', 1000),
                orderBy('isbn', 'asc')
            );
        } else {
            // 仅显示前 5 本书籍
            q = query(
                collection(db, 'books'),
                where('isbn', '>', 1000),
                orderBy('isbn', 'asc'),
                limit(5)
            );
        }
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

// 切换显示所有书籍或显示前 5 本
const toggleShowAll = () => {
    showAll.value = !showAll.value;
    fetchBooks(); // 切换后重新获取数据
};

// 编辑书籍
const editBook = (book) => {
    editingBook.value = { ...book }; // 创建书籍副本以便编辑
};

// 取消编辑
const cancelEdit = () => {
    editingBook.value = null;
};

// 更新书籍
const updateBook = async (bookId) => {
    try {
        const bookRef = doc(db, 'books', bookId);
        await updateDoc(bookRef, {
            name: editingBook.value.name,
            isbn: editingBook.value.isbn,
        });
        console.log('Book updated successfully');
        fetchBooks(); // 更新数据后重新获取书籍列表
        editingBook.value = null; // 重置编辑状态
    } catch (error) {
        console.error('Error updating book: ', error);
    }
};

// 删除书籍
const deleteBook = async (bookId) => {
    try {
        const bookRef = doc(db, 'books', bookId);
        await deleteDoc(bookRef);
        console.log('Book deleted successfully');
        fetchBooks(); // 删除书籍后重新获取书籍列表
    } catch (error) {
        console.error('Error deleting book: ', error);
    }
};

// 在组件挂载时获取数据
onMounted(() => {
    fetchBooks();
});
</script>