// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract App is AccessControl {
    uint64 public certificateCounter;
    uint64 public requestCounter;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant HOSPITAL_ROLE = keccak256("HOSPITAL_ROLE");
    bytes32 public constant DOCTOR_ROLE = keccak256("DOCTOR_ROLE");
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");

    mapping(address => Entity) public entities;
    mapping(address => Doctor) public doctors;
    mapping(address => User) public users;
    mapping(uint64 => Certificate) public certificates;
    mapping(address => CertificateRequest[]) public requests;  //the address here is from the doctor, so when we search for it with the address, all requests related to him are recovered
    mapping(address => Certificate[]) public certificatesByUser;
    address[] public doctorAddresses;
    address[] public userAddresses;


    struct Entity {
        bool isRegistered;
        string name;
    }

    struct Doctor {
        bool isRegistered;
        bool isActive;
        string uf;
        string crm;
        string especialidade;
        address hospital;
    }

    struct User {
        bool isRegistered;
        string name;
        string cpf;
        string email;
    }

    struct Certificate {
        uint64 id;
        Doctor doctor;
        User user;
        Entity hospital;
        string description;
    }

    struct CertificateRequest {
        uint64 id;
        address userAddr;
        address doctorAddr;
        address hospitalAddr;
        bool isApproved;
        bool isPending;
        uint256 blockNumber;
    }

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        requestCounter = 0;
        certificateCounter = 0;
    }

    function registerEntity(address addr, string memory name) public {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not a hospital");
        require(!entities[addr].isRegistered, "Entity already registered");
        entities[addr] = Entity(true, name);
        _grantRole(HOSPITAL_ROLE, addr);
    }

    function getEntityInformation(address addr) public view returns (Entity memory) {
        return entities[addr];
    }

    function registerDoctor(
        address doctorAddr,
        address entityAddr,
        string memory uf,
        string memory especialidade,
        string memory crm
    ) public {
        require(hasRole(HOSPITAL_ROLE, msg.sender), "Caller is not a hospital");
        require(!doctors[doctorAddr].isRegistered, "Doctor already registered");
        require(entities[entityAddr].isRegistered, "Entity not registered");
        doctors[doctorAddr] = Doctor(true, true, uf, crm, especialidade, entityAddr);
        doctorAddresses.push(doctorAddr);
        _grantRole(DOCTOR_ROLE, doctorAddr);
    }

    function getDoctorInformation(address doctorAddr) public view returns (Doctor memory) {
        return doctors[doctorAddr];
    }

    function registerUser(address addr, string memory nome, string memory cpf, string memory email) public {
        require(!users[addr].isRegistered, "User already registered");
        users[addr] = User(true, nome, cpf, email);
        userAddresses.push(addr);
        _grantRole(USER_ROLE, addr);
    }

    function getUserInformation(address userAddr) public view returns (User memory) {
        return users[userAddr];
    }

    event CertificateRequested(uint64 requestId);
    event CertificateGenerated(uint64 certificateId);

    function requestCertificate(address doctorAddr) public {
        require(hasRole(USER_ROLE, msg.sender), "Caller is not a user");
        require(users[msg.sender].isRegistered, "User not registered");
        require(doctors[doctorAddr].isRegistered, "Doctor not registered");

        uint64 id = requestCounter;
        requestCounter++;
        requests[doctorAddr].push(CertificateRequest({
            id: id,
            userAddr: msg.sender,
            doctorAddr: doctorAddr,
            hospitalAddr: doctors[doctorAddr].hospital,
            isApproved: false,
            isPending: true,
            blockNumber: block.number
        }));
        emit CertificateRequested(id);
    }

    function respondToCertificateRequest(uint64 requestId, bool approve) public {

        CertificateRequest storage request = requests[msg.sender][requestId];
        require(request.isPending, "Request is not pending");
        require(request.doctorAddr == msg.sender, "Only the assigned doctor can respond");
        request.isApproved = approve;
        request.isPending = false;

    }

    function generateCertificate(uint64 certificateId, string memory description) public {
        require(hasRole(DOCTOR_ROLE, msg.sender), "Caller is not a doctor");

        CertificateRequest[] memory request = findRequest(msg.sender);
        require(request[certificateId].isApproved, "Request has not been approved");

        Doctor memory doctor = getDoctorInformation(request[certificateId].doctorAddr);
        User memory patient = getUserInformation(request[certificateId].userAddr);
        Entity memory hospital = getEntityInformation(request[certificateId].hospitalAddr);
    
        uint64 id = certificateCounter;
        certificateCounter++;
        certificates[id] = Certificate(id, doctor, patient, hospital, description);

        certificatesByUser[request[certificateId].userAddr].push(certificates[id]);

        emit CertificateGenerated(id);
    }

    function getCertificate(address userAddr) public view returns(Certificate[] memory){
        require(hasRole(USER_ROLE,userAddr) && userAddr == msg.sender, "Only users or doctors can see it, and user must be message sender");
        return certificatesByUser[userAddr];
    }

    function findRequest(address docAddr) public view returns (CertificateRequest[] memory) {
        require(hasRole(DOCTOR_ROLE, msg.sender), "message sender must be Doctor");
        require(docAddr == msg.sender);
        CertificateRequest[] storage request = requests[msg.sender];   
        return request;
    }

    event UserAddressAdded(address userAddr);
    event UserAddressRemoved(address userAddr);
}