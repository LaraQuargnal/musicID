// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract MusicID {
    struct Instrument {
        string name;
        string model;
        string serialNumber;
        address owner;
        string maintenanceRecords; 
        string image; 
    }

    mapping(uint256 => Instrument) public instruments;
    uint256 public instrumentsCount;

    event InstrumentAdded(
        uint256 id,
        string name,
        string model,
        string serialNumber,
        address owner
    );

    function addInstrument(
        string memory _name,
        string memory _model,
        string memory _serialNumber,
        string memory _maintenanceRecords,
        string memory _image
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_model).length > 0, "Model cannot be empty");
        require(bytes(_serialNumber).length > 0, "Serial number cannot be empty");

        instrumentsCount++;
        uint256 newInstrumentId = instrumentsCount;
        instruments[newInstrumentId] = Instrument(
            _name,
            _model,
            _serialNumber,
            msg.sender,
            _maintenanceRecords,
            _image
        );

        emit InstrumentAdded(
            newInstrumentId,
            _name,
            _model,
            _serialNumber,
            msg.sender
        );

        return newInstrumentId; // Return the ID of the newly added instrument
    }

    function getInstrumentById(uint256 _id) public view returns (
        uint256 id,
        string memory name,
        string memory model,
        string memory serialNumber,
        address owner,
        string memory maintenanceRecords,
        string memory image
    ) {
        require(_id > 0 && _id <= instrumentsCount, "Instrument ID is out of bounds");

        Instrument memory instrument = instruments[_id];
        return (
            _id,
            instrument.name,
            instrument.model,
            instrument.serialNumber,
            instrument.owner,
            instrument.maintenanceRecords,
            instrument.image
        );
    }
}
