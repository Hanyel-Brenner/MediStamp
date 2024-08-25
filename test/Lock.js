const { expect } = require("chai");
const { ethers } = require("hardhat");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe("App Contract", function () {
  let App;
  let app;
  let owner;
  let hospital;
  let doctor;
  let user;

  beforeEach(async function () {
    App = await ethers.getContractFactory("App");
    [owner, hospital, doctor, user] = await ethers.getSigners();
    app = await App.deploy();
  });

  describe("Entity (Hospital) Management", function () {
    it("Should register an entity and grant HOSPITAL_ROLE", async function () {
      await app.connect(owner).grantRole(await app.HOSPITAL_ROLE(), hospital.address);
      await app.connect(hospital).registerEntity(hospital.address, "Hospital A");
  
      const entity = await app.getEntityInformation(hospital.address);
      expect(entity.isRegistered).to.be.true;
      expect(entity.name).to.equal("Hospital A");
      expect(await app.hasRole(await app.HOSPITAL_ROLE(), hospital.address)).to.be.true;
    });

    it("Should not allow non-hospital to register an entity", async function () {
      await expect(
        app.connect(user).registerEntity(hospital.address, "Hospital A")
      ).to.be.revertedWith("Caller is not a hospital");
    });

    it("Should remove an entity and associated doctors", async function () {
      await app.connect(owner).grantRole(await app.HOSPITAL_ROLE(), hospital.address);
      await app.connect(hospital).registerEntity(hospital.address, "Hospital A");
      await app.connect(hospital).registerDoctor(doctor.address, hospital.address, "UF A", "Cardiology", "CRM001");

      await app.connect(owner).removeEntity(hospital.address);

      const entity = await app.getEntityInformation(hospital.address);
      const doctorInfo = await app.getDoctorInformation(doctor.address);

      expect(entity.isRegistered).to.be.false;
      expect(doctorInfo.isRegistered).to.be.false;
    });
  });

  describe("Doctor Management", function () {
    it("Should register a doctor", async function () {
      await app.connect(owner).grantRole(await app.HOSPITAL_ROLE(), hospital.address);
      await app.connect(hospital).registerEntity(hospital.address, "Hospital A");
      await app.connect(hospital).registerDoctor(doctor.address, hospital.address, "UF A", "Cardiology", "CRM001");

      const doctorInfo = await app.getDoctorInformation(doctor.address);
      expect(doctorInfo.isRegistered).to.be.true;
      expect(doctorInfo.crm).to.equal("CRM001");
    });

    it("Should remove a doctor", async function () {
      await app.connect(owner).grantRole(await app.HOSPITAL_ROLE(), hospital.address);
      await app.connect(hospital).registerEntity(hospital.address, "Hospital A");
      await app.connect(hospital).registerDoctor(doctor.address, hospital.address, "UF A", "Cardiology", "CRM001");

      await app.connect(hospital).removeDoctor(doctor.address);

      const doctorInfo = await app.getDoctorInformation(doctor.address);
      expect(doctorInfo.isRegistered).to.be.false;
    });
  });

  describe("User Management", function () {
    it("Should register a user", async function () {
      await app.connect(owner).registerUser(user.address, "Charles", "12345678900", "charles@example.com");

      const userInfo = await app.getUserInformation(user.address);
      expect(userInfo.isRegistered).to.be.true;
      expect(userInfo.name).to.equal("Charles");
    });

    it("Should remove a user", async function () {
      await app.connect(owner).registerUser(user.address, "Charles", "12345678900", "charles@example.com");

      await app.connect(owner).removeUser(user.address);

      const userInfo = await app.getUserInformation(user.address);
      expect(userInfo.isRegistered).to.be.false;
    });
  });

  describe("Certificate Request and Generation", function () {
    it("Should allow a user to request a certificate", async function () {
        await app.connect(owner).registerUser(user.address, "Charles", "12345678900", "charles@example.com");
        await app.connect(owner).grantRole(await app.HOSPITAL_ROLE(), hospital.address);
        await app.connect(hospital).registerEntity(hospital.address, "Hospital A");
        await app.connect(hospital).registerDoctor(doctor.address, hospital.address, "UF A", "Cardiology", "CRM001");

        await expect(app.connect(user).requestCertificate(doctor.address, "Medical condition"))
            .to.emit(app, "CertificateRequested")
            .withArgs(anyValue);

        const requestId = Number(await app.requestCounter()) - 1;
        //const requestId = (await app.requestCounter()) - 1n; mantendo o retorno (BigInt) e subtraindo 1

        const request = await app.requests(requestId);
        expect(request.userAddr).to.equal(user.address);
        expect(request.doctorAddr).to.equal(doctor.address);
        expect(request.description).to.equal("Medical condition");
        expect(request.isPending).to.be.true;
    });

    it("Should allow a doctor to respond to a certificate request", async function () {
        await app.connect(owner).registerUser(user.address, "Charles", "12345678900", "charles@example.com");
        await app.connect(owner).grantRole(await app.HOSPITAL_ROLE(), hospital.address);
        await app.connect(hospital).registerEntity(hospital.address, "Hospital A");
        await app.connect(hospital).registerDoctor(doctor.address, hospital.address, "UF A", "Cardiology", "CRM001");

        await expect(app.connect(user).requestCertificate(doctor.address, "Medical condition"))
            .to.emit(app, "CertificateRequested")
            .withArgs(anyValue);

        const requestId = Number(await app.requestCounter()) - 1;
        //const requestId = (await app.requestCounter()) - 1n;

        await app.connect(doctor).respondToCertificateRequest(requestId, true);

        await expect(app.connect(doctor).generateCertificate(doctor.address, user.address, hospital.address, "Medical condition"))
            .to.emit(app, "CertificateGenerated")
            .withArgs(anyValue);

        const certificate = await app.certificates(0);
        expect(certificate.id).to.equal(0);
        expect(certificate.description).to.equal("Medical condition");
    });
});
});
