// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract MusicID {
    struct Instrument {
        string name;
        string model;
        uint256 year;
        address owner;
        string maintenanceRecords; // IPFS hash
        string image; // IPFS hash
    }

    mapping(uint256 => Instrument) public instruments;
    uint256 public instrumentsCount;

    event InstrumentAdded(
        uint256 id,
        string name,
        string model,
        uint256 year,
        address owner
    );

    function addInstrument(
        string memory _name,
        string memory _model,
        uint256 _year,
        string memory _maintenanceRecords,
        string memory _image
    ) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_model).length > 0, "Model cannot be empty");

        instrumentsCount++;
        instruments[instrumentsCount] = Instrument(
            _name,
            _model,
            _year,
            msg.sender,
            _maintenanceRecords,
            _image
        );

        emit InstrumentAdded(
            instrumentsCount,
            _name,
            _model,
            _year,
            msg.sender
        );
    }
}
