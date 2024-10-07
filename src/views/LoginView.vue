<script setup>
import { ref } from 'vue'
import { isAuthenticated } from '../router/index.js'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase/init'
import Button from 'primevue/button';

const router = useRouter()

const formData = ref({
    username: '',
    password: '',
})

const submitForm = async () => {
    const userEmail = formData.value.username
    const userPassword = formData.value.password

    try {
        // 用户登录
        const { user } = await signInWithEmailAndPassword(getAuth(), userEmail, userPassword)

        // 获取 Firestore 中的用户角色信息
        const userRef = doc(db, 'users', user.uid)
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
            const userData = userSnap.data()
            isAuthenticated.value = {
                user: user,
                role: userData.role,  // 保存用户角色
            }
            console.log(`Logged in as ${userData.role}`)
            router.push({ name: 'About' })  // 登录成功后跳转
        } else {
            console.error('No user document found in Firestore')
        }
    } catch (error) {
        alert(error.code)
    }
}
</script>

<template>
    <!-- 🗄️ Firebase Login Form -->
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">🗄️ Firebase Login Form</h1>
                <p class="text-center">
                    Allow user to login to our library system
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
                        <button type="submit" class="btn btn-primary me-2">Login</button>
                    </div>
                    <div class="text-center mt-3">
                        Don't have an account? Click <router-link to="/firesignup"><Button label="here" link
                                style="color: blue;" /> </router-link>to create!
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 80vw;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
}
</style>