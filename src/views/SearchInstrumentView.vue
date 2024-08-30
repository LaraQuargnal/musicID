<template>
  <div id="appSearch">
    <div class="form-container">
      <h2>Your Instruments</h2>
      <div v-if="ownedInstruments.length > 0">
        <ul>
          <li
            v-for="(instrument, index) in ownedInstruments"
            :key="index"
            @click="selectInstrument(instrument.id)"
          >
            ID: {{ instrument.id }} - {{ instrument.name }}
          </li>
        </ul>
      </div>
      <p v-if="ownedInstruments.length === 0">
        You do not own any instruments.
      </p>

      <h2>Details of an Instrument</h2>
      <div class="form-group">
        <label for="instrumentId">Instrument ID: </label>
        <input
          type="text"
          id="instrumentId"
          name="instrumentId"
          v-model="instrumentId"
          placeholder="Enter ID number"
        />
      </div>
      <button class="button" @click="searchInstrument()">Search</button>
      <p id="error" v-if="errorMessage">{{ errorMessage }}</p>

      <div class="instrumentInfo" v-if="instrument">
        <h2>Instrument Info</h2>
        <div class="info-container">
          <div class="info-column">
            <div class="form-group">
              <label for="instrumentName">Type: </label>
              <input
                type="text"
                id="instrumentName"
                name="instrumentName"
                v-model="instrument.name"
                readonly
              />
            </div>
            <div class="form-group">
              <label for="instrumentModel">Model: </label>
              <input
                type="text"
                id="instrumentModel"
                name="instrumentModel"
                v-model="instrument.model"
                readonly
              />
            </div>
            <div class="form-group">
              <label for="instrumentSerialNumber">Serial Number: </label>
              <input
                type="text"
                id="instrumentSerialNumber"
                name="instrumentSerialNumber"
                v-model="instrument.serialNumber"
                readonly
              />
            </div>
            <div class="form-group">
              <label for="instrumentMaintenanceRecords"
                >Maintenance Records:</label
              >
              <input
                type="text"
                id="instrumentMaintenanceRecords"
                name="instrumentMaintenanceRecords"
                v-model="instrument.maintenanceRecords"
                readonly
              />
            </div>
          </div>
          <div
            class="image-column"
            v-if="instrument.image"
            style="padding: 7px"
          >
            <img
              :src="instrument.image"
              alt="Instrument Image"
              class="instrument-image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";
import MusicID from "../services/MusicID.json";

let provider;
let signer;
let contract;
const contractAddress = "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1";

export default {
  name: "SearchInstrumentView",
  data() {
    return {
      instrumentId: "",
      instrument: null,
      errorMessage: "",
      ownedInstruments: [],
    };
  },
  methods: {
    async connectWallet() {
      try {
        const ethereum = window.ethereum;
        if (ethereum) {
          provider = new ethers.providers.Web3Provider(ethereum);
          signer = provider.getSigner();

          await ethereum.request({ method: "eth_requestAccounts" });

          contract = new ethers.Contract(contractAddress, MusicID.abi, signer);

          await this.loadOwnedInstruments();

          console.log("Connected to MetaMask:", await signer.getAddress());
        } else {
          alert("Please install MetaMask to use this application.");
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    },

    async loadOwnedInstruments() {
      try {
        const address = await signer.getAddress();
        const [ids, names] = await contract.getInstrumentsByOwner(address);

        this.ownedInstruments = ids.map((id, index) => ({
          id,
          name: names[index],
        }));

        console.log("Owned instruments:", this.ownedInstruments);
      } catch (error) {
        console.error("Error loading owned instruments:", error);
      }
    },

    async searchInstrument() {
      try {
        const instrumentId = parseInt(this.instrumentId, 10);

        if (!signer || !signer.getAddress()) {
          throw new Error(
            "Please connect to your Ethereum wallet (e.g., MetaMask)."
          );
        }

        const instrumentData = await contract.getInstrumentById(instrumentId);

        this.instrument = {
          id: instrumentData[0].toString(),
          name: instrumentData[1],
          model: instrumentData[2],
          serialNumber: instrumentData[3],
          owner: instrumentData[4],
          maintenanceRecords: instrumentData[5],
          image: instrumentData[6],
        };

        console.log("Instrument retrieved successfully!", this.instrument);
        this.errorMessage = "";
      } catch (error) {
        console.error("Error getting instrument:", error);
        this.errorMessage = "Instrument ID not found!";
      }
    },

    selectInstrument(id) {
      this.instrumentId = id;
      this.searchInstrument();
    },
  },

  async mounted() {
    await this.connectWallet();
  },
};
</script>

<style>
#appSearch {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}

.form-container {
  width: 700px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.searchInstrument {
  margin-bottom: 20px;
}

.row {
  display: flex;
}

.column {
  flex: 1;
  margin: 0 10%;
}

.form-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.form-group label {
  flex: 0 0 150px;
  font-weight: bold;
  margin-right: 10px;
}

.form-group input {
  flex: 1;
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

.info-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.info-column {
  flex: 1;
}

.image-column {
  flex: 0 0 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.instrument-image {
  max-width: 100%;
  max-height: 280px;
  border-radius: 10px;
}

#error {
  color: red;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px;
  cursor: pointer;
}

li:hover {
  background-color: #e0e0e0;
}
</style>
