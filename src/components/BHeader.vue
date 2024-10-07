<script setup>
import { isAuthenticated } from '../router/index.js'
import { useRouter } from 'vue-router'
import { getAuth, signOut } from "firebase/auth";

const router = useRouter();
const auth = getAuth();

const logout = () => {
  signOut(auth).then(() => {
    alert("Sign out!")
    isAuthenticated.value = null
    router.push({ name: 'Login' })
  }).catch((error) => {
    alert(error.code)
  });
}
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link" active-class="active" aria-current="page">Login</router-link>
        </li>
        <li class="nav-item" v-else>
          <button class="nav-link btn btn-link disabled">Logged in as {{ isAuthenticated.role }}</button>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home (Week 5)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/weatherCheck" class="nav-link" active-class="active" aria-current="page">Get Weather</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated && isAuthenticated.role === 'admin'">
          <router-link to="/admin" class="nav-link" active-class="active">Admin Panel</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link to="/addbook" class="nav-link" active-class="active">Add book</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link to="/getBookCount" class="nav-link" active-class="active">Get Book Count</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <button class="nav-link btn btn-link" @click="logout">Logout</button>
        </li>
        <li class="nav-item">
          <router-link to="/routePage" class="nav-link" active-class="active">Route page</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>