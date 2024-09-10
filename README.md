# MediStamp

MediStamp é uma Dapp que realiza a emissão de atestados médicos. Os usuários podem ser cadastrados como pacientes, médicos ou hospitais 
através de contratos inteligentes com deploy na Ethereum.
Apenas hospitais podem cadastrar médicos, e por sua vez, apenas médicos podem emitir atestados depois de receberem requisições de um dos 
pacientes atendidos.
Para utilização do MediStamp o usuário necessita de uma carteira MetaMask.

A interface disponível para os usuários se encontra em /views, o contrato inteligente se encontra em /contracts e o código do back-end, escrito utilizando
a biblioteca web3js está em server.ts e /routes.

Para rodar a aplicação digite os comandos: 

npm i
node_modules/typescript/bin/tsc server.ts
node server.js
