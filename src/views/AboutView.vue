<template>
  <div class="center-content">
    <h1>🎼 Music ID 🎼</h1>
    <p>
      This project leverages blockchain technology to provide a secure and
      decentralized platform for managing digital identities of musical
      instruments. It addresses the crucial need for musicians, collectors, and
      sellers to keep accurate and secure records of their instruments.
    </p>

    <p>
      By creating a digital identity for each instrument, owners can ensure that
      the instrument’s details, such as make, model, and ownership status, are
      securely stored and easily accessible. This is particularly important for
      situations such as international travel, where having a documented list of
      instruments can help avoid unnecessary taxes and complications at customs.
    </p>

    <p>
      In the unfortunate event of theft, this platform allows the rightful owner
      to report the instrument as stolen, enabling potential buyers to verify
      ownership through the blockchain before making a purchase. This helps in
      preventing the resale of stolen instruments and assists in their recovery.
    </p>

    <h2>🎵 Key Features 🎵</h2>
    <div>
      <ul>
        <li>Create and manage digital identities for musical instruments.</li>
        <li>
          Securely store instrument details, including make, model, serial
          number, and ownership history.
        </li>
        <li>
          Facilitate secure and transparent ownership transfers using blockchain
          technology.
        </li>
        <li>
          Upload link multimedia content related to instruments, such as images.
        </li>
        <li>
          Maintain a detailed record of instrument maintenance, repairs, and
          modifications.
        </li>
        <li>Report lost or stolen instruments to aid in their recovery.</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.center-content {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  height: 100vh;
  padding: 0 20px;
  font-family: "Arial", sans-serif;
  color: #333;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

p {
  text-align: justify;
}

h1,
h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

ul {
  margin-top: 10px;
  padding-left: 20px;
}

li {
  margin-bottom: 10px;
}
</style>
