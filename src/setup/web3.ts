require('dotenv').config();
const {Web3} = require('web3');
const web3:any = new Web3(process.env.API_ADDRESS);

const cAbi = process.env.CONTRACT_ABI;

const contractAbi = JSON.parse(cAbi as string);

const contract = new web3.eth.Contract(contractAbi, process.env.CONTRACT_ADDRESS);

export {web3, contract};
