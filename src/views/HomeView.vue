<template>
  <div class="home">
    <img alt="Music ID Logo" src="../assets/musicIDLogo.webp" class="logo" />
    <h1>Welcome to Music ID</h1>
    <p>Create and manage digital identities for musical instruments<br /></p>
    <router-link to="/add-instrument">Add a new Instrument</router-link>
  </div>
</template>
  
<script>
export default {
  name: "HomeView",
};
</script>

<style>
.home {
  text-align: center;
}

.logo {
  max-width: 100%;
  height: auto;
  margin: 20px auto;
  max-height: 300px;
}

.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>


  