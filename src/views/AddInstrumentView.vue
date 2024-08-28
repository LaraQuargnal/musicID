<template>
  <div id="appAdd">
    <div class="form-container">
      <h2>Add an Instrument</h2>
      <div class="form-group">
        <label for="instrumentName">Type of instrument: </label>
        <input
          type="text"
          id="instrumentName"
          name="instrumentName"
          v-model="instrumentName"
          placeholder="Enter type of instrument, eg.Clarinet (required)"
        />
      </div>
      <div class="form-group">
        <label for="instrumentModel">Model: </label>
        <input
          type="text"
          id="instrumentModel"
          name="instrumentModel"
          v-model="instrumentModel"
          placeholder="Enter model, eg.Yamaha 255s (required)"
        />
      </div>
      <div class="form-group">
        <label for="instrumentSerialNumber">Serial Number: </label>
        <input
          type="text"
          id="instrumentSerialNumber"
          name="instrumentSerialNumber"
          v-model="instrumentSerialNumber"
          placeholder="Enter serial number (required)"
        />
      </div>
      <div class="form-group">
        <label for="instrumentMaintenanceRecords">Maintenance History: </label>
        <input
          type="text"
          id="instrumentMaintenanceRecords"
          name="instrumentMaintenanceRecords"
          v-model="instrumentMaintenanceRecords"
          placeholder="Enter maintenance history, repairs, and services (optional)"
        />
      </div>
      <div class="form-group">
        <label for="instrumentImage">Image: </label>
        <input
          type="text"
          id="instrumentImage"
          name="instrumentImage"
          v-model="instrumentImage"
          placeholder="Url link to image (optional)"
        />
      </div>
      <button class="button" @click="addInstrument()">Add Instrument</button>
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import MusicID from "../services/MusicID.json";
import { useToast } from "vue-toastification";

let provider;
let signer;
let contract;
const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

export default {
  name: "AddInstrument",
  data() {
    return {
      instrumentName: "",
      instrumentModel: "",
      instrumentSerialNumber: "",
      instrumentMaintenanceRecords: "",
      instrumentImage: "",
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },

  methods: {
    async connectWallet() {
      try {
        const ethereum = await detectEthereumProvider();

        if (ethereum) {
          provider = new ethers.providers.Web3Provider(ethereum);
          signer = provider.getSigner();

          await ethereum.request({ method: "eth_requestAccounts" });

          contract = new ethers.Contract(contractAddress, MusicID.abi, signer);

          console.log("Connected to MetaMask:", await signer.getAddress());
        } else {
          alert("Please install MetaMask to use this application.");
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        this.toast.error("Error connecting to MetaMask.");
      }
    },

    async addInstrument() {
      try {
        const instrumentName = this.instrumentName;
        const instrumentModel = this.instrumentModel;
        const instrumentSerialNumber = this.instrumentSerialNumber;
        const maintenanceRecords = this.instrumentMaintenanceRecords;
        const image = this.instrumentImage;

        if (!signer || !signer.getAddress()) {
          throw new Error(
            "Please connect to your Ethereum wallet (e.g., MetaMask)."
          );
        }

        contract = new ethers.Contract(contractAddress, MusicID.abi, signer);

        const tx = await contract.addInstrument(
          instrumentName,
          instrumentModel,
          instrumentSerialNumber,
          maintenanceRecords,
          image
        );
        await tx.wait();

        console.log("Instrument added successfully!");
        this.toast.success("Instrument added successfully!");
      } catch (error) {
        console.error("Error adding instrument:", error);
      }
    },
  },
  async mounted() {
    await this.connectWallet();
  },
};
</script>

<style>
#appAdd {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}

.form-container {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: #38a373;
}
</style>
