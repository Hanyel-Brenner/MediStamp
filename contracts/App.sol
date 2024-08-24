// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract App is AccessControl {
    uint64 public nof_registeredEntities;
    uint64 public nof_registeredDoctors;
    uint64 public nof_registeredUsers;
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
    mapping(uint64 => CertificateRequest) public requests;
    address[] public doctorAddresses;

    struct Entity {
        bool isRegistered;
        address addr;
        string name;
    }

    struct Doctor {
        bool isRegistered;
        bool active;
        address addr;
        string name;
        string uf;
        string crm;
        string especialidade;
        address hospital;
    }

    struct User {
        bool isRegistered;
        address addr;
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
        string description;
        bool isApproved;
        bool isPending;
    }

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function _incrementCounter(uint64 counter) internal pure returns (uint64) {
        return counter + 1;
    }

    function _decrementCounter(uint64 counter) internal pure returns (uint64) {
        return counter - 1;
    }

    function registerEntity(address addr, string memory name) public {
        require(hasRole(HOSPITAL_ROLE, msg.sender), "Caller is not a hospital");
        require(!entities[addr].isRegistered, "Entity already registered");
        entities[addr] = Entity(true, addr, name);
        nof_registeredEntities = _incrementCounter(nof_registeredEntities);
        _grantRole(HOSPITAL_ROLE, addr);
    }

    function removeEntity(address entityAddr) public {
        require(hasRole(ADMIN_ROLE, msg.sender), "Only admin can remove an entity");
        require(entities[entityAddr].isRegistered, "Entity not registered");

        _removeDoctorsAssociatedWithEntity(entityAddr);

        delete entities[entityAddr];
        nof_registeredEntities = _decrementCounter(nof_registeredEntities);
    }

    function _removeDoctorsAssociatedWithEntity(address entityAddr) internal {
        for (uint64 i = 0; i < doctorAddresses.length; i++) {
            address doctorAddr = doctorAddresses[i];
            if (doctors[doctorAddr].hospital == entityAddr) {
                removeDoctor(doctorAddr);
                i--;
            }
        }
    }

    function registerDoctor(address doctorAddr, address entityAddr, string memory uf, string memory especialidade, string memory crm) public {
        require(hasRole(HOSPITAL_ROLE, msg.sender), "Caller is not a hospital");
        require(!doctors[doctorAddr].isRegistered, "Doctor already registered");
        require(entities[entityAddr].isRegistered, "Entity not registered");
        doctors[doctorAddr] = Doctor(true, false, doctorAddr, "", uf, crm, especialidade, entityAddr);
        nof_registeredDoctors = _incrementCounter(nof_registeredDoctors);
        doctorAddresses.push(doctorAddr);
        _grantRole(DOCTOR_ROLE, doctorAddr);
    }

    function removeDoctor(address doctorAddr) public {
        require(hasRole(ADMIN_ROLE, msg.sender) || (hasRole (HOSPITAL_ROLE, msg.sender)), "Not authorized");
        require (doctors[doctorAddr].hospital == msg.sender, "Not authorized");
        require(doctors[doctorAddr].isRegistered, "Doctor not registered");

        _removeRequestsAssociatedWithDoctor(doctorAddr);

        delete doctors[doctorAddr];
        nof_registeredDoctors = _decrementCounter(nof_registeredDoctors);

        _removeDoctorFromAddresses(doctorAddr);
    }

    function _removeRequestsAssociatedWithDoctor(address doctorAddr) internal {
        for (uint64 i = 0; i < requestCounter; i++) {
            if (requests[i].doctorAddr == doctorAddr) {
                delete requests[i];
            }
        }
    }

    function _removeDoctorFromAddresses(address doctorAddr) internal {
        for (uint64 i = 0; i < doctorAddresses.length; i++) {
            if (doctorAddresses[i] == doctorAddr) {
                doctorAddresses[i] = doctorAddresses[doctorAddresses.length - 1];
                doctorAddresses.pop();
                break;
            }
        }
    }

    function registerUser(address addr, string memory cpf, string memory email) public {
        require(!users[addr].isRegistered, "User already registered");
        users[addr] = User(true, addr, "", cpf, email);
        nof_registeredUsers = _incrementCounter(nof_registeredUsers);
        _grantRole(USER_ROLE, addr);
    }

    function getUserInformation(address addr) public view returns (User memory) {
        return users[addr];
    }

    function requestCertificate(address doctorAddr, string memory description) public returns (uint64) {
        require(hasRole(USER_ROLE, msg.sender));
        require(users[msg.sender].isRegistered, "User not registered");
        require(doctors[doctorAddr].isRegistered, "Doctor not registered");
        uint64 id = requestCounter++;
        requests[id] = CertificateRequest({
            id: id,
            userAddr: msg.sender,
            doctorAddr: doctorAddr,
            hospitalAddr: doctors[doctorAddr].hospital,
            description: description,
            isApproved: false,
            isPending: true
        });
        return id;
    }

    function respondToCertificateRequest(uint64 requestId, bool approve) public {
        CertificateRequest storage request = requests[requestId];
        require(request.isPending, "Request is not pending");
        require(request.doctorAddr == msg.sender, "Only the assigned doctor can respond");
        request.isApproved = approve;
        request.isPending = false;
    }

    function generateCertificate(address docAddr, address patientAddr, address hospitalAddr, string memory description) public returns (uint64) {
        require(hasRole(DOCTOR_ROLE, docAddr), "Caller is not a doctor");
        require(doctors[docAddr].active, "Doctor is not active");
        require(doctors[docAddr].hospital == hospitalAddr, "Doctor does not belong to this hospital");

        uint64 requestId = findRequest(patientAddr, docAddr, hospitalAddr, description);
        require(requests[requestId].isApproved, "Request has not been approved");

        Doctor memory doctor = getDoctorInformation(docAddr);
        User memory patient = getUserInformation(patientAddr);
        Entity memory hospital = getEntityInformation(hospitalAddr);

        uint64 id = certificateCounter++;
        certificates[id] = Certificate(id, doctor, patient, hospital, description);
        return id;
    }

    //function viewCertificate() public {}

    function getEntityInformation(address addr) public view returns (Entity memory) {
        return entities[addr];
    }

    function getDoctorInformation(address doctorAddr) public view returns (Doctor memory) {
        return doctors[doctorAddr];
    }

    function findRequest(address userAddr, address doctorAddr, address hospitalAddr, string memory description) internal view returns (uint64) {
        for (uint64 i = 0; i < requestCounter; i++) {
            if (requests[i].userAddr == userAddr &&
                requests[i].doctorAddr == doctorAddr &&
                requests[i].hospitalAddr == hospitalAddr &&
                keccak256(abi.encodePacked(requests[i].description)) == keccak256(abi.encodePacked(description)) &&
                !requests[i].isPending) {
                return i;
            }
        }
        revert("No matching request found");
    }
}