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
    ) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_model).length > 0, "Model cannot be empty");
        require(bytes(_serialNumber).length > 0, "Serial number cannot be empty");

        instrumentsCount++;
        instruments[instrumentsCount] = Instrument(
            _name,
            _model,
            _serialNumber,
            msg.sender,
            _maintenanceRecords,
            _image
        );

        emit InstrumentAdded(
            instrumentsCount,
            _name,
            _model,
            _serialNumber,
            msg.sender
        );
    }
}
