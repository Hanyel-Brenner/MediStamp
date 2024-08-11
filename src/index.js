async function main(){
    require('dotenv').config();
    const {Web3} = require('web3');
    //gets infura RPC address so we can use it
    const web3 = new Web3(process.env.API_ADDRESS); 
    
    const contractAbi = [{"inputs":[{"internalType":"address","name":"docAddr","type":"address"},{"internalType":"address","name":"patientAddr","type":"address"},{"internalType":"address","name":"hospitalAddr","type":"address"},{"internalType":"string","name":"description","type":"string"}],"name":"generateCertificate","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"doctorAddr","type":"address"}],"name":"getDoctorInformation","outputs":[{"components":[{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"address","name":"addr","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"uf","type":"string"},{"internalType":"string","name":"crm","type":"string"},{"internalType":"address","name":"hospital","type":"address"}],"internalType":"struct App.Doctor","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getEntityInformation","outputs":[{"components":[{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"address","name":"addr","type":"address"},{"internalType":"string","name":"name","type":"string"}],"internalType":"struct App.Entity","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getUserInformation","outputs":[{"components":[{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"address","name":"addr","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"cpf","type":"string"},{"internalType":"string","name":"email","type":"string"}],"internalType":"struct App.User","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"doctorAddr","type":"address"},{"internalType":"address","name":"entityAddr","type":"address"},{"internalType":"string","name":"uf","type":"string"},{"internalType":"string","name":"crm","type":"string"}],"name":"registerDoctor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"string","name":"name","type":"string"}],"name":"registerEntity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"string","name":"cpf","type":"string"},{"internalType":"string","name":"email","type":"string"}],"name":"registerUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"doctorAddr","type":"address"}],"name":"validateDoctor","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"entityAddr","type":"address"}],"name":"validateEntity","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]
    const contractAddress = '0x0a43e85e74ab052a508ca4beb84b0250197bf6d8';
    
    async function getBalance(wallet){
        var balance = await web3.eth.getBalance(wallet);
        return balance;
    }   
    
    //the address of my wallet
    var balance = await getBalance(process.env.MY_WALLET);
    
    //testing to see if we can access balance of wallet
    console.log(web3.currentProvider);
    console.log("Balance in wei = " + balance);
    console.log("Balance in ether = "+ web3.utils.fromWei(balance, 'ether'));
    
    //now checking to see if we can call a blockchain smart contract through web3's api
    let contract = new web3.eth.Contract(contractAbi, contractAddress);
    console.log(contract);
    console.log(contract.defaultAccount);
    
    let userInformation = await contract.methods.getEntityInformation(process.env.MY_WALLET)
    .call({from : process.env.MY_WALLET});
    console.log(userInformation);
    
    
    }
    
    main();