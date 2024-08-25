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
    mapping(uint64 => CertificateRequest) public requests;
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
        string description;
        bool isApproved;
        bool isPending;
        uint256 blockNumber;
    }

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function registerEntity(address addr, string memory name) public {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not a hospital");
        require(!entities[addr].isRegistered, "Entity already registered");
        entities[addr] = Entity(true, name);
        _grantRole(HOSPITAL_ROLE, addr);
    }

    function removeEntity(address entityAddr) public {
        require(hasRole(ADMIN_ROLE, msg.sender), "Only admin can remove an entity");
        require(entities[entityAddr].isRegistered, "Entity not registered");

        _removeDoctorsAssociatedWithEntity(entityAddr);

        delete entities[entityAddr];
    }

    event DoctorRemoved(address doctorAddr);
    event DoctorAddressAdded(address doctorAddr);
    event DoctorAddressRemoved(address doctorAddr);

    function _removeDoctorsAssociatedWithEntity(address entityAddr) internal {
        uint256 length = doctorAddresses.length;
        uint256 i = 0;

        while (i < length) {
            address doctorAddr = doctorAddresses[i];
            if (doctors[doctorAddr].hospital == entityAddr) {
                removeDoctor(doctorAddr);
                emit DoctorRemoved(doctorAddr);
                if (length > 1) {
                    doctorAddresses[i] = doctorAddresses[length - 1];
                }
                length--;
                emit DoctorAddressRemoved(doctorAddr);
            } else {
                i++;
            }
        }
    }

    function getEntityInformation(address addr) public view returns (Entity memory) {
        return entities[addr];
    }

    event DoctorStatusChanged(address indexed doctorAddr, bool isActive);

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
        emit DoctorAddressAdded(doctorAddr);
        _grantRole(DOCTOR_ROLE, doctorAddr);
    }

    function removeDoctor(address doctorAddr) public {
        require(hasRole(ADMIN_ROLE, msg.sender) || (hasRole(HOSPITAL_ROLE, msg.sender)), "Not authorized");
        require(
            hasRole(HOSPITAL_ROLE, msg.sender) && doctors[doctorAddr].hospital == msg.sender || hasRole(ADMIN_ROLE, msg.sender),
            "Not authorized"
        );
        require(doctors[doctorAddr].isRegistered, "Doctor not registered");

        delete doctors[doctorAddr];

        _removeDoctorFromAddresses(doctorAddr);
    }

    function _removeDoctorFromAddresses(address doctorAddr) internal {
        uint256 length = doctorAddresses.length;
        for (uint256 i = 0; i < length; i++) {
            if (doctorAddresses[i] == doctorAddr) {
                doctorAddresses[i] = doctorAddresses[length - 1];
                doctorAddresses.pop();
                break;
            }
        }
    }

    function setDoctorActiveStatus(address doctorAddr, bool isActive) public {
        require(hasRole(HOSPITAL_ROLE, msg.sender) || hasRole(ADMIN_ROLE, msg.sender), "Not authorized");
        require(doctors[doctorAddr].isRegistered, "Doctor not registered");
        
        doctors[doctorAddr].isActive = isActive;

        emit DoctorStatusChanged(doctorAddr, isActive);
    }

    function getDoctorInformation(address doctorAddr) public view returns (Doctor memory) {
        return doctors[doctorAddr];
    }

    function registerUser(address addr, string memory nome, string memory cpf, string memory email) public {
        require(!users[addr].isRegistered, "User already registered");
        users[addr] = User(true, nome, cpf, email);
        userAddresses.push(addr);
        emit UserAddressAdded(addr);
        _grantRole(USER_ROLE, addr);
    }

    function removeUser(address userAddr) public {
        require(hasRole(ADMIN_ROLE, msg.sender), "Only admin can remove a user");
        require(users[userAddr].isRegistered, "User not registered");

        delete users[userAddr];

        _removeUserFromAddresses(userAddr);
    }

    function _removeUserFromAddresses(address userAddr) internal {
        for (uint64 i = 0; i < userAddresses.length; i++) {
            if (userAddresses[i] == userAddr) {
                userAddresses[i] = userAddresses[userAddresses.length - 1];
                userAddresses.pop();
                emit UserAddressRemoved(userAddr);
                break;
            }
        }
    }

    function getUserInformation(address userAddr) public view returns (User memory) {
        return users[userAddr];
    }

    event CertificateRequested(uint64 requestId);
    event CertificateGenerated(uint64 certificateId);

    function requestCertificate(address doctorAddr, string memory description) public {
        require(hasRole(USER_ROLE, msg.sender), "Caller is not a user");
        require(users[msg.sender].isRegistered, "User not registered");
        require(doctors[doctorAddr].isRegistered, "Doctor not registered");

        uint64 id = requestCounter;
        requestCounter++;
        requests[id] = CertificateRequest({
            id: id,
            userAddr: msg.sender,
            doctorAddr: doctorAddr,
            hospitalAddr: doctors[doctorAddr].hospital,
            description: description,
            isApproved: false,
            isPending: true,
            blockNumber: block.number
        });
        emit CertificateRequested(id);
    }

    function respondToCertificateRequest(uint64 requestId, bool approve) public {
        CertificateRequest storage request = requests[requestId];
        require(request.isPending, "Request is not pending");
        require(request.doctorAddr == msg.sender, "Only the assigned doctor can respond");
        request.isApproved = approve;
        request.isPending = false;
    }

    function generateCertificate(
        address docAddr,
        address patientAddr,
        address hospitalAddr,
        string memory description
    ) public {
        require(hasRole(DOCTOR_ROLE, docAddr), "Caller is not a doctor");
        require(doctors[docAddr].isActive, "Doctor is not active");
        require(doctors[docAddr].hospital == hospitalAddr, "Doctor does not belong to this hospital");

        uint64 requestId = findRequest(patientAddr, docAddr, hospitalAddr, description);
        require(requests[requestId].isApproved, "Request has not been approved");

        Doctor memory doctor = getDoctorInformation(docAddr);
        User memory patient = getUserInformation(patientAddr);
        Entity memory hospital = getEntityInformation(hospitalAddr);

        uint64 id = certificateCounter;
        certificateCounter++;
        certificates[id] = Certificate(id, doctor, patient, hospital, description);

        emit CertificateGenerated(id);
    }

    function findRequest(
        address userAddr,
        address doctorAddr,
        address hospitalAddr,
        string memory description
    ) internal view returns (uint64) {
        for (uint64 i = 0; i < requestCounter; i++) {
            if (
                requests[i].userAddr == userAddr &&
                requests[i].doctorAddr == doctorAddr &&
                requests[i].hospitalAddr == hospitalAddr &&
                keccak256(abi.encodePacked(requests[i].description)) ==
                keccak256(abi.encodePacked(description)) &&
                requests[i].isApproved
            ) {
                return i;
            }
        }
        revert("No matching request found");
    }

    function getDoctorAddresses() public view returns (address[] memory) {
        return doctorAddresses;
    }

    function getUserAddresses() public view returns (address[] memory) {
        return userAddresses;
    }

    event UserAddressAdded(address userAddr);
    event UserAddressRemoved(address userAddr);
}