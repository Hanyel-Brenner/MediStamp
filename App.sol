// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

/*the entity refers to the the hospitals and maybe companies and universitites who might have interest in informations from given patient
the doctor must be registered to a entity that is a hospital. The hospital takes care of registering the professional (later it might be
that for the registering to be completed, the doctor must accept the registration for validity purposes...)
Medical certificates must have the name of the responsible doctor, the uf-crm string that identifies him, the data and
time of the document emission
*/
import "./DateLib.sol";

contract App{

    uint32 nof_registeredEntities = 0;
    uint32 nof_registeredDoctors = 0;
    uint32 nof_registeredUsers = 0;

    mapping (address => Entity) entities;
    mapping (address => Doctor) doctors;
    mapping (address => User) users;

    struct Entity{
        bool isRegistered;
        address addr;
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
        string cpf;
        string email;
    }

    struct Certificate{
        string doctorName;
        string uf; 
        string crm;
        string cpfPaciente;
        string cid;
        date;
    }

    function registerEntity(address addr) public{
        require(entities[addr].isRegistered == false);
        entities[addr].addr = addr;
        entities[addr].isRegistered = true;
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


} 
