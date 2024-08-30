<template>
  <div class="transfer-container">
    <h3>Transfer Instrument Ownership</h3>

    <div v-if="selectedInstrument" class="transfer-form">
      <div class="form-group">
        <label for="recipientAddress">Recipient's Ethereum Address:</label>
        <input
          type="text"
          id="recipientAddress"
          v-model="recipientAddress"
          placeholder="Enter recipient's Ethereum address"
        />
      </div>
      <button class="transfer-button" @click="transferOwnership">
        Transfer Ownership
      </button>
    </div>

    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "InstrumentTransferComponent",
  props: {
    selectedInstrument: {
      type: Object,
      required: true,
    },
    contract: {
      type: Object,
      required: true,
    },
    signer: {
      type: Object,
      required: true,
    },
    onTransferComplete: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      recipientAddress: "",
      message: "",
    };
  },
  methods: {
    async transferOwnership() {
      if (!this.selectedInstrument || !this.recipientAddress) return;

      try {
        const tx = await this.contract.transferOwnership(
          this.selectedInstrument.id,
          this.recipientAddress
        );
        await tx.wait();

        this.message = "Ownership transferred successfully!";
        this.onTransferComplete();
      } catch (error) {
        console.error("Error transferring ownership:", error);
        this.message = "Failed to transfer ownership. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
.transfer-container {
  margin-top: 20px;
}

.transfer-form {
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

input[type="text"] {
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

.transfer-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.transfer-button:hover {
  background-color: #38a373;
}
</style>
