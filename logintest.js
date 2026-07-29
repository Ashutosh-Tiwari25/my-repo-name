const { ethers } = require("ethers");

async function testLogin() {
    // Step A — create a brand new, random wallet (like a fresh MetaMask account)
    const wallet = ethers.Wallet.createRandom();
    console.log("Wallet address:", wallet.address);

    // Step B — ask the server for a message to sign
    const res1 = await fetch("http://localhost:3000/web3/message");
    const data1 = await res1.json();
    const message = data1.message;
    console.log("Message from server:", message);

    // Step C — sign that message using the wallet's private key
    const signature = await wallet.signMessage(message);
    console.log("Signature:", signature);

    // Step D — send the message, signature, and address back to the server to verify
    const res2 = await fetch("http://localhost:3000/web3/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: message,
            signature: signature,
            address: wallet.address
        })
    });

    const data2 = await res2.json();
    console.log("Server response:", data2);
}

testLogin();