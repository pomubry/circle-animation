<script setup lang="ts">
const handleLogin = async () => {
  console.log("Logging in");

  const res = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "ayumu",
      password: "uehara",
    }),
    credentials: "include",
  });
  const data = await res.json();

  console.log(data);
};

const handleLogout = async () => {
  console.log("Logging out");

  const res = await fetch("http://localhost:5000/api/logout", {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();

  console.log(data);
};
</script>

<template>
  <h1>Login Component</h1>
  <div class="flex gap-3">
    <button @click="handleLogin">Login</button>
    <button @click="handleLogout">Logout</button>
  </div>
</template>
