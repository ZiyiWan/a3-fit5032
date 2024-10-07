<template>
    <!-- 🗄️ Firebase Sign Up Form -->
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">🗄️ Firebase Sign Up Form</h1>
                <p class="text-center">
                    Allow user to create a new account in our system
                </p>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6 offset-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" v-model="formData.username" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6 offset-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" v-model="formData.password" />
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Sign up</button>
                    </div>
                    <div class="text-center mt-3">
                        Already have an account? Click <router-link to="/login"><Button label="here" link
                                style="color: blue;" /> </router-link>to sign in!
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import db from '../firebase/init'  // 假设 Firestore 初始化在 init.js 中
import { isAuthenticated } from '../router/index.js'
import Button from 'primevue/button';

const auth = getAuth();
const router = useRouter()

const formData = ref({
    username: '',
    password: '',
})

const submitForm = async () => {
    const userEmail = formData.value.username
    const userPassword = formData.value.password

    try {
        // 创建用户
        const { user } = await createUserWithEmailAndPassword(auth, userEmail, userPassword)

        // 创建 Firestore 文档并保存用户信息，设置默认角色为 "user"
        await setDoc(doc(db, 'users', user.uid), {
            email: userEmail,
            role: 'admin',  // 默认角色
        })

        // 设置登录状态
        isAuthenticated.value = {
            user: user,
            role: 'admin',
        }

        // 跳转到 About 页面
        router.push({ name: 'About' })
    } catch (error) {
        alert(error.message)
    }
}
</script>

<style scoped>
.container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 80vw;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
}
</style>