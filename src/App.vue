<template>
  <nav>
    <router-link to="/">🎺 Home</router-link> |
    <router-link to="/add-instrument">+ Add instrument</router-link> |
    <router-link to="/about">About</router-link>
    |
    <button @click="connectWallet" class="connect-button">
      {{ connected ? "Connected" : "Connect to MetaMask" }}
    </button>
  </nav>
  <router-view />
</template>

<script>
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

export default {
  data() {
    return {
      connected: false,
    };
  },
  methods: {
    async connectWallet() {
      try {
        const ethereum = await detectEthereumProvider();

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();

          await ethereum.request({ method: "eth_requestAccounts" });

          // Set the connected state to true when connected successfully
          this.connected = true;

          console.log("Connected to MetaMask:", await signer.getAddress());
        } else {
          alert("Please install MetaMask to use this application.");
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

nav {
  background-color: #3b3b3b;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  display: flex;
  align-items: center;
}

nav a {
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.3s ease;
}

nav a.router-link-exact-active {
  color: #ffbf00;
}

nav a:hover {
  color: #ffbf00;
}

.connect-button {
  background-color: #ffbf00;
  border: none;
  padding: 10px 20px;
  margin-left: auto;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  color: #3b3b3b;
  transition: background-color 0.3s ease;
}

.connect-button:hover {
  background-color: #ffc933;
}

router-view {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  box-sizing: border-box;
}
</style>
