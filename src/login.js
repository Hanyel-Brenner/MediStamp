async function metaMaskServicesAvailable(){
    if(window && window.ethereum) {
        return true;
    }
    else return false;
}

async function signMessage(){
    if(metaMaskServicesAvailable()){
        //this is the name of the function requested to metamask to call
        const methodName = "personal_sign";
        //public address of signer
        const accountOwner = await window.ethereum.request({method: "eth_requestAccounts"});
        console.log("Account owner : "+ accountOwner);

        let resp = await fetch('http://localhost:3000/utils/generateNonce').then(response => response.json());
        //nonce string in hex format
        const nonce = "0x"+resp.nonce;
        console.log("generated nonce :"+nonce);

        const signature = await window.ethereum.request({
            method : methodName,
            params : [nonce,accountOwner[0]],
        });

        console.log("signature : "+signature);

        let addr = accountOwner[0];
        const args = {signature,nonce,addr}
        const token = await fetch('http://localhost:3000/auth',{
            method : "POST",
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(args)
        })

        if(!token) console.log('failed to retrieve token. either user authentication failed or jwt creation failed');
        else console.log('token was generated succesfully. Login was successful');

        


    }else console.log('Unable to use MetaMask services');
}