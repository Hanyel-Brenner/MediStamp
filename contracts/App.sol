// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

/*the entity refers to the the hospitals and maybe companies and universitites who might have interest in informations from given patient
the doctor must be registered to a entity that is a hospital. The hospital takes care of registering the professional (later it might be
that for the registering to be completed, the doctor must accept the registration for validity purposes...)
Medical certificates must have the name of the responsible doctor, the uf-crm string that identifies him, the data and
time of the document emission
*/

contract App{

    uint64 nof_registeredEntities = 0;
    uint64 nof_registeredDoctors = 0;
    uint64 nof_registeredUsers = 0;
    uint64 certificateCounter = 0;

    /*the roles hashmap is useless for now*/
    mapping (address => string) roles;
    mapping (address => Entity) entities;
    mapping (address => Doctor) doctors;
    mapping (address => User) users;
    mapping (uint64 => Certificate) certificates;

    /*modifier onlyDoctor(){
        require(roles[msg.sender] == 'doctor');
        _;
    }*/

    struct Entity{
        bool isRegistered;
        address addr;
        string name;
    }

    struct Doctor{
        bool isRegistered;
        address addr;
        string name;
        string uf; 
        string crm; //6 digit number that identifies the professional
        address hospital;
    }

    struct User{
        bool isRegistered;
        address addr;
        string name;
        string cpf;
        string email;
    }

    struct Certificate{
        uint64 id;
        Doctor doctor;
        User user;
        Entity hospital;
        string Description;
    }

    function registerEntity(address addr, string memory name) public{
        require(entities[addr].isRegistered == false);
        entities[addr] = Entity(true,addr,name);
        nof_registeredEntities = nof_registeredEntities + 1;
    } 

    function getEntityInformation(address addr) public view returns (Entity memory) {
        return entities[addr];
    }

    function validateEntity(address entityAddr) public view returns(bool){
        return entities[entityAddr].isRegistered;
    }

    function registerDoctor(address doctorAddr, address entityAddr,string memory uf,string memory crm) public{
        require(doctors[doctorAddr].isRegistered == false);
        require( validateEntity(entityAddr) == true);
        doctors[doctorAddr].addr = doctorAddr;
        doctors[doctorAddr].uf = uf;
        doctors[doctorAddr].crm = crm;
        doctors[doctorAddr].hospital = entityAddr;
    }

    function getDoctorInformation(address doctorAddr) public view returns(Doctor memory){
        return doctors[doctorAddr];
    }

    function validateDoctor(address doctorAddr) public view returns(bool){
        return doctors[doctorAddr].isRegistered;
    }

    function registerUser(address addr,string memory cpf, string memory email)public{
        require(users[addr].isRegistered == false);
        users[addr].addr = addr;
        users[addr].isRegistered = true;
        nof_registeredUsers = nof_registeredUsers + 1;
        users[addr].cpf = cpf;
        users[addr].email = email;
    }

    function getUserInformation(address addr) public view returns (User memory){
        return users[addr];
    }

    function generateCertificate(address docAddr, address patientAddr, address hospitalAddr, string memory description) public returns (uint64){
        //TODO verify if there was a request by user to the doctor
        //TODO verify if the request was accepted by the doctor
        Doctor memory doctor = getDoctorInformation(docAddr);
        User memory patient = getUserInformation(patientAddr);
        Entity memory hospital = getEntityInformation(hospitalAddr);
        //bytes32 id = keccak256(abi.encode(doctor, patient, hospital, description));
        uint64 id = certificateCounter;
        certificates[id] = Certificate(id, doctor,patient, hospital, description);
        return id;
    }
    
} 
