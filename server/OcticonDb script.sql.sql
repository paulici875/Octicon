create database OcticonDb;

use OcticonDb;

create table UserInfo (
	Id int IDENTITY(1,1) PRIMARY KEY,
	Type varchar(20) NOT NULL,
	LastName varchar(255) NOT NULL,
	FirstName varchar(255) NOT NULL,
	Email varchar(255) NOT NULL,
	Phone varchar(13),
	Password varchar(255) NOT NULL
);

create table Parking(
	Id int IDENTITY(1,1) PRIMARY KEY,
	IsOpen bit NOT NULL,
	Address varchar(255) NOT NULL
);

create table ParkingSpot(
	Id int IDENTITY(1,1) PRIMARY KEY,
	ParkingId int foreign key references Parking(Id)
);

create table Reservation(
	Id int IDENTITY(1,1) PRIMARY KEY,
	UserId int foreign key references UserInfo(Id),
	ParkingSpotId int foreign key references ParkingSpot(Id),
	LicencePlate varchar(7) NOT NULL,
	ChargingType varchar(20) NOT NULL,
	ReservationType varchar(20) NOT NULL,
	DateTime datetime NOT NULL
);
