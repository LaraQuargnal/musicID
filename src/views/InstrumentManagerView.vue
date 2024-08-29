<template>
  <div id="appEdit">
    <div class="form-container">
      <h2>Edit Your Instrument Details</h2>

      <div v-if="ownedInstruments.length > 0">
        <h3>Select an Instrument</h3>
        <ul>
          <li v-for="instrument in ownedInstruments" :key="instrument.id">
            <button class="select-button" @click="selectInstrument(instrument)">
              {{ instrument.id }} - {{ instrument.name }}
            </button>
          </li>
        </ul>
      </div>

      <div v-if="selectedInstrument" class="edit-form">
        <h3>Edit Instrument Details</h3>
        <div class="form-group">
          <label for="instrumentName">Instrument Name:</label>
          <input
            type="text"
            id="instrumentName"
            v-model="selectedInstrument.name"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="instrumentModel">Model:</label>
          <input
            type="text"
            id="instrumentModel"
            v-model="selectedInstrument.model"
            readonly
            placeholder="Can not change"
          />
        </div>
        <div class="form-group">
          <label for="instrumentSerialNumber">Serial Number:</label>
          <input
            type="text"
            id="instrumentSerialNumber"
            v-model="selectedInstrument.serialNumber"
            readonly
            placeholder="Can not change"
          />
        </div>
        <div class="form-group">
          <label for="instrumentMaintenanceRecords">Maintenance History:</label>
          <textarea
            id="instrumentMaintenanceRecords"
            v-model="updatedMaintenanceRecords"
            placeholder="Enter maintenance history, repairs, and services"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="instrumentImage">Image URL:</label>
          <input
            type="text"
            id="instrumentImage"
            v-model="updatedImage"
            placeholder="Enter new image URL"
          />
        </div>
        <button class="button" @click="updateInstrument">
          Update Instrument
        </button>
      </div>

      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";
import MusicID from "../services/MusicID.json";

export default {
  name: "InstrumentEditorView",
  data() {
    return {
      ownedInstruments: [],
      selectedInstrument: null,
      updatedMaintenanceRecords: "",
      updatedImage: "",
      message: "",
    };
  },
  methods: {
    async connectWallet() {
      try {
        const ethereum = window.ethereum;
        if (ethereum) {
          this.provider = new ethers.providers.Web3Provider(ethereum);
          this.signer = this.provider.getSigner();

          await ethereum.request({ method: "eth_requestAccounts" });

          this.contract = new ethers.Contract(
            "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
            MusicID.abi,
            this.signer
          );

          await this.loadInstruments();
        } else {
          alert("Please install MetaMask to use this application.");
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    },
    async loadInstruments() {
      try {
        const address = await this.signer.getAddress();
        const [ids, names] = await this.contract.getInstrumentsByOwner(address);

        this.ownedInstruments = ids.map((id, index) => ({
          id: id.toString(),
          name: names[index],
        }));
      } catch (error) {
        console.error("Error loading instruments:", error);
      }
    },
    selectInstrument(instrument) {
      this.selectedInstrument = instrument;
      this.updatedMaintenanceRecords = "";
      this.updatedImage = "";
    },
    async updateInstrument() {
      if (!this.selectedInstrument) return;

      try {
        const tx = await this.contract.updateInstrument(
          this.selectedInstrument.id,
          this.updatedMaintenanceRecords,
          this.updatedImage
        );
        await tx.wait();

        this.message = "Instrument updated successfully!";
        this.loadInstruments();
      } catch (error) {
        console.error("Error updating instrument:", error);
        this.message = "Failed to update instrument. Please try again.";
      }
    },
  },
  async mounted() {
    await this.connectWallet();
  },
};
</script>

<style>
#appEdit {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.select-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.select-button:hover {
  background-color: #38a373;
}

.edit-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.message {
  color: green;
  font-weight: bold;
  margin-top: 20px;
}
</style>
