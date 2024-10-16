import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('955a3a64-f4d0-4ff1-8972-8e27b98bcc6c', '1Tianna.Quitzon9@hotmail.com', 'Alice Jones', 'https://i.imgur.com/YfJQV5z.png?id=3', 'jkl012', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('40eb0ad2-fe7b-4975-acab-6e231d35a36c', '10Alicia.Conn50@hotmail.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=12', 'abc123', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('bbbcc00e-d28d-42c7-9a13-aeba9f640cdb', '19Nathanial_Gutmann@yahoo.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=21', 'def456', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('d2675fa2-89d7-4004-83cd-16aeb19a54d4', '28Donato_Schumm84@gmail.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=30', 'mno345', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('f0eba81d-5b42-435c-82c1-c8828c88095f', '37Lue_Gutkowski-Orn@gmail.com', 'Alice Jones', 'https://i.imgur.com/YfJQV5z.png?id=39', 'mno345', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('89d61e3e-274c-48c9-bdd9-175a96a7f3f6', '46Wiley.Wisozk@yahoo.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=48', 'abc123', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('015838f6-d6bf-4748-b105-be8560508d18', '55Maud58@gmail.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=57', 'jkl012', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('4f2fab91-661a-43c0-a14e-a4f27b88d11e', '64Rhea.Littel52@gmail.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=66', 'jkl012', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('923df93e-7ceb-4384-a995-65b5c40aeda3', '82Leanna.Satterfield@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=84', 'mno345', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Airport" ("id", "code", "name", "city", "country") VALUES ('7d102eff-4d65-4290-bf5e-9601b333d648', 'LAX', 'OHare International Airport', 'New York', 'United States');
INSERT INTO "Airport" ("id", "code", "name", "city", "country") VALUES ('d3647880-feb5-4555-95ef-23f2a621e0a2', 'LAX', 'John F. Kennedy International Airport', 'Dallas', 'United States');
INSERT INTO "Airport" ("id", "code", "name", "city", "country") VALUES ('45f20864-0156-4f16-a86a-0b7d0c2630b5', 'ORD', 'DallasFort Worth International Airport', 'Dallas', 'United States');
INSERT INTO "Airport" ("id", "code", "name", "city", "country") VALUES ('996f8012-91e4-4136-85e6-018a141967a1', 'ATL', 'John F. Kennedy International Airport', 'Atlanta', 'United States');
INSERT INTO "Airport" ("id", "code", "name", "city", "country") VALUES ('67bebb1c-2e5c-4cd9-aca9-54070afe2adc', 'JFK', 'OHare International Airport', 'Los Angeles', 'United States');
INSERT INTO "Airport" ("id", "code", "name", "city", "country") VALUES ('ca9ff0dd-6374-42f5-a924-ce40e390a02e', 'JFK', 'DallasFort Worth International Airport', 'Dallas', 'United States');
INSERT INTO "Airport" ("id", "code", "name", "city", "country") VALUES ('8f733763-5130-461f-9e18-2dc00290d658', 'JFK', 'OHare International Airport', 'Los Angeles', 'United States');
INSERT INTO "Airport" ("id", "code", "name", "city", "country") VALUES ('a11b63c9-457e-4b0b-9333-bfa7dd19f4e5', 'ORD', 'HartsfieldJackson Atlanta International Airport', 'Dallas', 'United States');
INSERT INTO "Airport" ("id", "code", "name", "city", "country") VALUES ('34728cea-9b1f-4041-a7af-ea4d91e71749', 'LAX', 'DallasFort Worth International Airport', 'Dallas', 'United States');
INSERT INTO "Airport" ("id", "code", "name", "city", "country") VALUES ('31ea8eed-39ff-4bd7-b208-5f6b7694a0da', 'DFW', 'Los Angeles International Airport', 'Los Angeles', 'United States');

INSERT INTO "Aircraft" ("id", "model", "capacity") VALUES ('7f208651-db63-4f64-a8ad-2d5687c78eb2', 'Airbus A350', 606);
INSERT INTO "Aircraft" ("id", "model", "capacity") VALUES ('a535dd59-17da-4c68-90bf-7a50ecee83ef', 'Airbus A320', 310);
INSERT INTO "Aircraft" ("id", "model", "capacity") VALUES ('cd5045a2-118f-404f-8a4b-2b3614c761d7', 'Airbus A320', 212);
INSERT INTO "Aircraft" ("id", "model", "capacity") VALUES ('4f7f07e6-9abb-4966-9b34-174ebbe4c21a', 'Boeing 737', 27);
INSERT INTO "Aircraft" ("id", "model", "capacity") VALUES ('16c7867a-4930-4fb6-ae98-54a23f783a9c', 'Embraer E190', 372);
INSERT INTO "Aircraft" ("id", "model", "capacity") VALUES ('63906f00-7607-48ca-9496-b0e19e85bf4b', 'Embraer E190', 405);
INSERT INTO "Aircraft" ("id", "model", "capacity") VALUES ('229eee2b-1ff4-4d05-9279-1ef431d37e6c', 'Boeing 737', 636);
INSERT INTO "Aircraft" ("id", "model", "capacity") VALUES ('403c0dc4-3588-453b-a1a4-d1b8aadf1431', 'Boeing 737', 719);
INSERT INTO "Aircraft" ("id", "model", "capacity") VALUES ('107247f2-d138-4847-b34f-e030247124f5', 'Embraer E190', 579);
INSERT INTO "Aircraft" ("id", "model", "capacity") VALUES ('31a7c1d1-de0b-4429-a7c3-c028a047f2fd', 'Airbus A320', 761);

INSERT INTO "Flight" ("id", "flightNumber", "departureTime", "arrivalTime", "departureAirportId", "arrivalAirportId", "aircraftId") VALUES ('57152be8-c23c-4b0f-84e4-8cfe67b3bd9c', 'AA1234', '2024-11-28T10:21:04.793Z', '2024-05-19T16:54:57.205Z', '67bebb1c-2e5c-4cd9-aca9-54070afe2adc', 'a11b63c9-457e-4b0b-9333-bfa7dd19f4e5', '7f208651-db63-4f64-a8ad-2d5687c78eb2');
INSERT INTO "Flight" ("id", "flightNumber", "departureTime", "arrivalTime", "departureAirportId", "arrivalAirportId", "aircraftId") VALUES ('ee7f0d5e-a107-4bd1-85eb-3fe0fc0a335d', 'SW2345', '2024-07-31T00:13:42.606Z', '2025-01-13T10:19:05.510Z', '8f733763-5130-461f-9e18-2dc00290d658', '31ea8eed-39ff-4bd7-b208-5f6b7694a0da', '16c7867a-4930-4fb6-ae98-54a23f783a9c');
INSERT INTO "Flight" ("id", "flightNumber", "departureTime", "arrivalTime", "departureAirportId", "arrivalAirportId", "aircraftId") VALUES ('62c90967-39c0-4332-ac12-1b3acc65976e', 'AA1234', '2024-01-24T16:16:42.790Z', '2025-08-18T15:10:07.848Z', '8f733763-5130-461f-9e18-2dc00290d658', 'ca9ff0dd-6374-42f5-a924-ce40e390a02e', '107247f2-d138-4847-b34f-e030247124f5');
INSERT INTO "Flight" ("id", "flightNumber", "departureTime", "arrivalTime", "departureAirportId", "arrivalAirportId", "aircraftId") VALUES ('b1e2f2d0-70c6-4b10-a056-28e4f93661c8', 'BA6789', '2024-03-06T18:47:50.477Z', '2025-03-03T10:07:19.049Z', '45f20864-0156-4f16-a86a-0b7d0c2630b5', 'ca9ff0dd-6374-42f5-a924-ce40e390a02e', '16c7867a-4930-4fb6-ae98-54a23f783a9c');
INSERT INTO "Flight" ("id", "flightNumber", "departureTime", "arrivalTime", "departureAirportId", "arrivalAirportId", "aircraftId") VALUES ('a71db97a-b63f-4e11-8faa-31d7fe743aaa', 'SW2345', '2025-09-21T23:08:35.332Z', '2024-09-22T06:52:20.370Z', 'a11b63c9-457e-4b0b-9333-bfa7dd19f4e5', '996f8012-91e4-4136-85e6-018a141967a1', '4f7f07e6-9abb-4966-9b34-174ebbe4c21a');
INSERT INTO "Flight" ("id", "flightNumber", "departureTime", "arrivalTime", "departureAirportId", "arrivalAirportId", "aircraftId") VALUES ('938ebb32-0b34-49a3-9567-d1e58bdceb02', 'AA1234', '2024-06-17T14:37:10.519Z', '2024-08-13T01:39:36.325Z', '34728cea-9b1f-4041-a7af-ea4d91e71749', '34728cea-9b1f-4041-a7af-ea4d91e71749', '31a7c1d1-de0b-4429-a7c3-c028a047f2fd');
INSERT INTO "Flight" ("id", "flightNumber", "departureTime", "arrivalTime", "departureAirportId", "arrivalAirportId", "aircraftId") VALUES ('69fcb09f-6ecf-4f6f-91c4-b2cdee7ca2df', 'BA6789', '2024-05-07T18:02:01.937Z', '2024-09-14T22:38:29.299Z', '45f20864-0156-4f16-a86a-0b7d0c2630b5', 'd3647880-feb5-4555-95ef-23f2a621e0a2', '63906f00-7607-48ca-9496-b0e19e85bf4b');
INSERT INTO "Flight" ("id", "flightNumber", "departureTime", "arrivalTime", "departureAirportId", "arrivalAirportId", "aircraftId") VALUES ('2ec4c401-174a-4f2b-9dbf-2adace58ef2a', 'BA6789', '2023-12-12T22:43:49.591Z', '2023-11-15T14:44:19.036Z', '45f20864-0156-4f16-a86a-0b7d0c2630b5', '8f733763-5130-461f-9e18-2dc00290d658', '63906f00-7607-48ca-9496-b0e19e85bf4b');
INSERT INTO "Flight" ("id", "flightNumber", "departureTime", "arrivalTime", "departureAirportId", "arrivalAirportId", "aircraftId") VALUES ('6ad33e4f-4dab-4a7f-8cda-4c26b7d70688', 'DL5678', '2024-08-13T21:52:18.869Z', '2024-11-01T22:24:59.439Z', '45f20864-0156-4f16-a86a-0b7d0c2630b5', '67bebb1c-2e5c-4cd9-aca9-54070afe2adc', '107247f2-d138-4847-b34f-e030247124f5');
INSERT INTO "Flight" ("id", "flightNumber", "departureTime", "arrivalTime", "departureAirportId", "arrivalAirportId", "aircraftId") VALUES ('bbd4404c-518d-41c1-96b4-6e29176e46e6', 'SW2345', '2025-03-08T20:34:16.282Z', '2025-09-07T03:21:27.762Z', '67bebb1c-2e5c-4cd9-aca9-54070afe2adc', '34728cea-9b1f-4041-a7af-ea4d91e71749', '4f7f07e6-9abb-4966-9b34-174ebbe4c21a');

INSERT INTO "Seat" ("id", "seatNumber", "class", "aircraftId") VALUES ('87278db6-0e15-430c-a586-8c4f8dbb7732', '14B', 'Economy', 'a535dd59-17da-4c68-90bf-7a50ecee83ef');
INSERT INTO "Seat" ("id", "seatNumber", "class", "aircraftId") VALUES ('11af3974-684d-4e2e-9037-5cc588e51b16', '22C', 'Business', 'cd5045a2-118f-404f-8a4b-2b3614c761d7');
INSERT INTO "Seat" ("id", "seatNumber", "class", "aircraftId") VALUES ('3dee1d15-180f-4713-b728-33eacc15360d', '12A', 'Economy', '31a7c1d1-de0b-4429-a7c3-c028a047f2fd');
INSERT INTO "Seat" ("id", "seatNumber", "class", "aircraftId") VALUES ('ee49086d-5e82-4813-8dde-54145064acba', '18E', 'Premium Economy', '63906f00-7607-48ca-9496-b0e19e85bf4b');
INSERT INTO "Seat" ("id", "seatNumber", "class", "aircraftId") VALUES ('c2e6aa81-6d21-4028-a95b-99db4810bc9c', '14B', 'Economy', '7f208651-db63-4f64-a8ad-2d5687c78eb2');
INSERT INTO "Seat" ("id", "seatNumber", "class", "aircraftId") VALUES ('fbd00b0d-35be-4bd9-9b51-9f36869a8a06', '14B', 'Economy', '63906f00-7607-48ca-9496-b0e19e85bf4b');
INSERT INTO "Seat" ("id", "seatNumber", "class", "aircraftId") VALUES ('427b6f10-7a36-400c-9cbc-b2e766395460', '12A', 'Economy', '4f7f07e6-9abb-4966-9b34-174ebbe4c21a');
INSERT INTO "Seat" ("id", "seatNumber", "class", "aircraftId") VALUES ('8907dbed-fb18-407a-a723-42081c893339', '22C', 'Business', '4f7f07e6-9abb-4966-9b34-174ebbe4c21a');
INSERT INTO "Seat" ("id", "seatNumber", "class", "aircraftId") VALUES ('7dbdb2e7-62cc-4fd0-b19d-5aae4ce0d5a6', '14B', 'First', '4f7f07e6-9abb-4966-9b34-174ebbe4c21a');
INSERT INTO "Seat" ("id", "seatNumber", "class", "aircraftId") VALUES ('508c5bc2-0bf3-4007-832f-c9330bf1c9d9', '22C', 'Economy', '16c7867a-4930-4fb6-ae98-54a23f783a9c');

INSERT INTO "Passenger" ("id", "firstName", "lastName", "passportNumber", "userId") VALUES ('e02aabdb-9a6a-48f9-a3d8-a7d8a74ab978', 'Michael', 'Jones', 'E56789012', 'd2675fa2-89d7-4004-83cd-16aeb19a54d4');
INSERT INTO "Passenger" ("id", "firstName", "lastName", "passportNumber", "userId") VALUES ('fc49f2eb-18cc-4108-bd8f-a5230fe74c47', 'Michael', 'Smith', 'C34567890', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Passenger" ("id", "firstName", "lastName", "passportNumber", "userId") VALUES ('71ca9318-f034-4f4f-98e2-b8c9f043c658', 'Emily', 'Williams', 'C34567890', 'bbbcc00e-d28d-42c7-9a13-aeba9f640cdb');
INSERT INTO "Passenger" ("id", "firstName", "lastName", "passportNumber", "userId") VALUES ('d63dd7ad-4748-4c1d-8fff-a5e143d27f4f', 'Michael', 'Smith', 'C34567890', 'f0eba81d-5b42-435c-82c1-c8828c88095f');
INSERT INTO "Passenger" ("id", "firstName", "lastName", "passportNumber", "userId") VALUES ('26d141fe-0667-4834-97e5-097a8dc2e069', 'Michael', 'Williams', 'C34567890', '955a3a64-f4d0-4ff1-8972-8e27b98bcc6c');
INSERT INTO "Passenger" ("id", "firstName", "lastName", "passportNumber", "userId") VALUES ('72462ec0-a8e0-4da8-aad0-1a4b9e26a513', 'John', 'Johnson', 'A12345678', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Passenger" ("id", "firstName", "lastName", "passportNumber", "userId") VALUES ('bbd7a985-a71d-48dc-b228-7cd4410e0728', 'David', 'Brown', 'C34567890', '923df93e-7ceb-4384-a995-65b5c40aeda3');
INSERT INTO "Passenger" ("id", "firstName", "lastName", "passportNumber", "userId") VALUES ('86525af5-8bd0-4a28-9032-f19a4b3e421f', 'Emily', 'Johnson', 'B23456789', '923df93e-7ceb-4384-a995-65b5c40aeda3');
INSERT INTO "Passenger" ("id", "firstName", "lastName", "passportNumber", "userId") VALUES ('d9694579-14fe-4989-9eae-728cca160d5a', 'Emily', 'Johnson', 'B23456789', '923df93e-7ceb-4384-a995-65b5c40aeda3');
INSERT INTO "Passenger" ("id", "firstName", "lastName", "passportNumber", "userId") VALUES ('a60ffdce-be02-42f3-bd6d-f840263f0b5f', 'Michael', 'Johnson', 'E56789012', '89d61e3e-274c-48c9-bdd9-175a96a7f3f6');

INSERT INTO "Booking" ("id", "bookingDate", "status", "userId", "flightId", "passengerId", "seatId") VALUES ('354359f4-f2f0-4324-84da-6c71bc4f247e', '2023-12-23T16:53:29.287Z', 'Pending', 'bbbcc00e-d28d-42c7-9a13-aeba9f640cdb', '62c90967-39c0-4332-ac12-1b3acc65976e', 'bbd7a985-a71d-48dc-b228-7cd4410e0728', '3dee1d15-180f-4713-b728-33eacc15360d');
INSERT INTO "Booking" ("id", "bookingDate", "status", "userId", "flightId", "passengerId", "seatId") VALUES ('a8475219-6662-4810-b438-c37be11ed68f', '2024-03-21T20:35:19.826Z', 'Cancelled', '955a3a64-f4d0-4ff1-8972-8e27b98bcc6c', '2ec4c401-174a-4f2b-9dbf-2adace58ef2a', '26d141fe-0667-4834-97e5-097a8dc2e069', '427b6f10-7a36-400c-9cbc-b2e766395460');
INSERT INTO "Booking" ("id", "bookingDate", "status", "userId", "flightId", "passengerId", "seatId") VALUES ('76676036-04ba-405d-9481-9855b5ade25e', '2024-01-29T13:12:54.079Z', 'Confirmed', '40eb0ad2-fe7b-4975-acab-6e231d35a36c', 'b1e2f2d0-70c6-4b10-a056-28e4f93661c8', 'e02aabdb-9a6a-48f9-a3d8-a7d8a74ab978', '508c5bc2-0bf3-4007-832f-c9330bf1c9d9');
INSERT INTO "Booking" ("id", "bookingDate", "status", "userId", "flightId", "passengerId", "seatId") VALUES ('7fb2e078-8488-4d9f-ade7-13e037eef3e8', '2025-08-19T09:21:16.807Z', 'Confirmed', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '62c90967-39c0-4332-ac12-1b3acc65976e', '71ca9318-f034-4f4f-98e2-b8c9f043c658', '11af3974-684d-4e2e-9037-5cc588e51b16');
INSERT INTO "Booking" ("id", "bookingDate", "status", "userId", "flightId", "passengerId", "seatId") VALUES ('beb52fb5-0e80-498a-ad5b-f123ef394d9a', '2025-04-09T16:34:39.004Z', 'Cancelled', '89d61e3e-274c-48c9-bdd9-175a96a7f3f6', '6ad33e4f-4dab-4a7f-8cda-4c26b7d70688', 'a60ffdce-be02-42f3-bd6d-f840263f0b5f', '87278db6-0e15-430c-a586-8c4f8dbb7732');
INSERT INTO "Booking" ("id", "bookingDate", "status", "userId", "flightId", "passengerId", "seatId") VALUES ('5b2b922c-7132-4d44-b58a-71fdac99bb55', '2023-11-07T23:22:38.746Z', 'On Hold', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'a71db97a-b63f-4e11-8faa-31d7fe743aaa', 'd63dd7ad-4748-4c1d-8fff-a5e143d27f4f', '7dbdb2e7-62cc-4fd0-b19d-5aae4ce0d5a6');
INSERT INTO "Booking" ("id", "bookingDate", "status", "userId", "flightId", "passengerId", "seatId") VALUES ('513e4ea1-df4c-4bb5-8577-f5aaa9027c84', '2025-01-16T02:49:25.125Z', 'Cancelled', '923df93e-7ceb-4384-a995-65b5c40aeda3', 'a71db97a-b63f-4e11-8faa-31d7fe743aaa', 'bbd7a985-a71d-48dc-b228-7cd4410e0728', 'c2e6aa81-6d21-4028-a95b-99db4810bc9c');
INSERT INTO "Booking" ("id", "bookingDate", "status", "userId", "flightId", "passengerId", "seatId") VALUES ('a4d47996-fb5c-40d9-a863-e134b0739bb9', '2025-02-23T22:19:20.095Z', 'Confirmed', '4f2fab91-661a-43c0-a14e-a4f27b88d11e', '2ec4c401-174a-4f2b-9dbf-2adace58ef2a', '72462ec0-a8e0-4da8-aad0-1a4b9e26a513', '3dee1d15-180f-4713-b728-33eacc15360d');
INSERT INTO "Booking" ("id", "bookingDate", "status", "userId", "flightId", "passengerId", "seatId") VALUES ('6d2de90a-3378-496d-905c-5046d2992a95', '2024-10-18T06:42:24.027Z', 'On Hold', '40eb0ad2-fe7b-4975-acab-6e231d35a36c', '938ebb32-0b34-49a3-9567-d1e58bdceb02', 'fc49f2eb-18cc-4108-bd8f-a5230fe74c47', 'fbd00b0d-35be-4bd9-9b51-9f36869a8a06');
INSERT INTO "Booking" ("id", "bookingDate", "status", "userId", "flightId", "passengerId", "seatId") VALUES ('dfb6beab-9ada-40c2-b58c-bf2ebfb8b565', '2024-01-06T12:58:43.760Z', 'On Hold', 'd2675fa2-89d7-4004-83cd-16aeb19a54d4', 'a71db97a-b63f-4e11-8faa-31d7fe743aaa', '86525af5-8bd0-4a28-9032-f19a4b3e421f', '427b6f10-7a36-400c-9cbc-b2e766395460');

INSERT INTO "Payment" ("id", "amount", "paymentDate", "paymentMethod", "status", "bookingId") VALUES ('30791194-d9d4-4b47-89d5-8f218314ab80', '120.75', '2025-03-01T02:36:54.569Z', 'PayPal', 'Processing', '6d2de90a-3378-496d-905c-5046d2992a95');
INSERT INTO "Payment" ("id", "amount", "paymentDate", "paymentMethod", "status", "bookingId") VALUES ('384c4c74-1dfa-40c3-ae15-a98a5eeb7e37', '150.00', '2024-04-13T00:59:30.455Z', 'Apple Pay', 'Failed', '513e4ea1-df4c-4bb5-8577-f5aaa9027c84');
INSERT INTO "Payment" ("id", "amount", "paymentDate", "paymentMethod", "status", "bookingId") VALUES ('0af7a322-8dce-4608-9468-43c7075e720a', '300.00', '2024-07-15T23:44:43.052Z', 'PayPal', 'Completed', '513e4ea1-df4c-4bb5-8577-f5aaa9027c84');
INSERT INTO "Payment" ("id", "amount", "paymentDate", "paymentMethod", "status", "bookingId") VALUES ('99ea67d1-3337-4225-90c9-a59660195bbe', '120.75', '2024-05-14T12:13:33.980Z', 'Debit Card', 'Completed', '7fb2e078-8488-4d9f-ade7-13e037eef3e8');
INSERT INTO "Payment" ("id", "amount", "paymentDate", "paymentMethod", "status", "bookingId") VALUES ('6cdbfd33-9179-48ad-9c9f-19d65d3717d0', '200.50', '2024-01-03T14:02:42.657Z', 'Debit Card', 'Pending', 'a4d47996-fb5c-40d9-a863-e134b0739bb9');
INSERT INTO "Payment" ("id", "amount", "paymentDate", "paymentMethod", "status", "bookingId") VALUES ('80ee3b6c-9383-4168-913c-8d63595cb3dd', '120.75', '2024-01-13T01:21:35.796Z', 'Debit Card', 'Processing', 'a8475219-6662-4810-b438-c37be11ed68f');
INSERT INTO "Payment" ("id", "amount", "paymentDate", "paymentMethod", "status", "bookingId") VALUES ('32f1ba7e-ab32-4b55-9fde-92de6885566d', '120.75', '2025-05-28T13:48:47.690Z', 'Credit Card', 'Completed', '354359f4-f2f0-4324-84da-6c71bc4f247e');
INSERT INTO "Payment" ("id", "amount", "paymentDate", "paymentMethod", "status", "bookingId") VALUES ('32cc1810-23a7-4cf3-b91c-495586622115', '75.25', '2023-11-13T19:56:47.525Z', 'PayPal', 'Pending', 'dfb6beab-9ada-40c2-b58c-bf2ebfb8b565');
INSERT INTO "Payment" ("id", "amount", "paymentDate", "paymentMethod", "status", "bookingId") VALUES ('41d6a21d-5f2b-4fa7-896b-d75170453a3f', '75.25', '2025-09-25T07:25:23.898Z', 'Bank Transfer', 'Completed', 'dfb6beab-9ada-40c2-b58c-bf2ebfb8b565');
INSERT INTO "Payment" ("id", "amount", "paymentDate", "paymentMethod", "status", "bookingId") VALUES ('e4465097-52a2-446e-b8d0-815ad251ad37', '300.00', '2025-03-05T06:04:14.278Z', 'PayPal', 'Pending', 'dfb6beab-9ada-40c2-b58c-bf2ebfb8b565');

INSERT INTO "Notification" ("id", "message", "readAt", "userId") VALUES ('1eef2a0c-4f5b-47f1-90d8-9063e71c8a48', 'Your flight has been successfully booked.', '2024-01-09T22:44:55.450Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Notification" ("id", "message", "readAt", "userId") VALUES ('03dec802-5f54-44e3-a162-d38e4d6e47ec', 'Your payment for flight BB456 has been processed.', '2025-02-19T02:28:41.333Z', '955a3a64-f4d0-4ff1-8972-8e27b98bcc6c');
INSERT INTO "Notification" ("id", "message", "readAt", "userId") VALUES ('81329eef-f450-4a72-8db9-a7cb570f1420', 'Flight AA123 is delayed by 30 minutes.', '2025-01-01T08:22:30.860Z', '4f2fab91-661a-43c0-a14e-a4f27b88d11e');
INSERT INTO "Notification" ("id", "message", "readAt", "userId") VALUES ('7505750a-0798-4adb-a924-853bde5eaa75', 'Flight AA123 is delayed by 30 minutes.', '2025-05-29T00:48:23.271Z', '40eb0ad2-fe7b-4975-acab-6e231d35a36c');
INSERT INTO "Notification" ("id", "message", "readAt", "userId") VALUES ('7e5459a6-c03a-4391-85df-e795cf61f84d', 'Your payment for flight BB456 has been processed.', '2025-02-23T20:45:17.937Z', '923df93e-7ceb-4384-a995-65b5c40aeda3');
INSERT INTO "Notification" ("id", "message", "readAt", "userId") VALUES ('3ddadb89-9bff-4bb3-9b98-65d776e1a206', 'Checkin for flight CC789 is now open.', '2025-09-25T22:11:19.578Z', '015838f6-d6bf-4748-b105-be8560508d18');
INSERT INTO "Notification" ("id", "message", "readAt", "userId") VALUES ('6ccf9396-e0c3-4f0d-8e46-38028126d989', 'Your reservation for flight DD101 has been canceled.', '2024-06-08T21:09:53.280Z', '955a3a64-f4d0-4ff1-8972-8e27b98bcc6c');
INSERT INTO "Notification" ("id", "message", "readAt", "userId") VALUES ('4b3814ae-848c-4561-9616-fab68f20a4d3', 'Your payment for flight BB456 has been processed.', '2025-07-25T19:13:25.824Z', 'd2675fa2-89d7-4004-83cd-16aeb19a54d4');
INSERT INTO "Notification" ("id", "message", "readAt", "userId") VALUES ('e53f2319-7282-49ef-8cbf-8c198aec1b90', 'Flight AA123 is delayed by 30 minutes.', '2023-12-18T08:02:17.733Z', 'f0eba81d-5b42-435c-82c1-c8828c88095f');
INSERT INTO "Notification" ("id", "message", "readAt", "userId") VALUES ('98c7c691-0491-4e6a-a67c-0e7d5c7f6236', 'Flight AA123 is delayed by 30 minutes.', '2024-03-27T23:46:25.172Z', '015838f6-d6bf-4748-b105-be8560508d18');

INSERT INTO "SupportTicket" ("id", "subject", "description", "status", "userId") VALUES ('8d12175f-5fb7-4cbf-966a-1d5f62e05273', 'Payment Failure', 'My flight was delayed by 3 hours without any prior notice.', 'In Progress', '40eb0ad2-fe7b-4975-acab-6e231d35a36c');
INSERT INTO "SupportTicket" ("id", "subject", "description", "status", "userId") VALUES ('f9754705-e1f4-4d5e-8eeb-e61ec83c8a4f', 'Seat Selection Issue', 'The payment process failed multiple times.', 'In Progress', 'bbbcc00e-d28d-42c7-9a13-aeba9f640cdb');
INSERT INTO "SupportTicket" ("id", "subject", "description", "status", "userId") VALUES ('5aff6035-b414-4500-8c9f-44ded07a24c6', 'Payment Failure', 'The payment process failed multiple times.', 'In Progress', '923df93e-7ceb-4384-a995-65b5c40aeda3');
INSERT INTO "SupportTicket" ("id", "subject", "description", "status", "userId") VALUES ('cc65abfa-8de3-497e-a983-871792c51430', 'Lost Baggage', 'My baggage did not arrive at the destination.', 'In Progress', 'd2675fa2-89d7-4004-83cd-16aeb19a54d4');
INSERT INTO "SupportTicket" ("id", "subject", "description", "status", "userId") VALUES ('d31fcff5-b602-4e2a-bdc0-3623b3c4c3ca', 'Booking Confirmation Problem', 'My baggage did not arrive at the destination.', 'Closed', '4f2fab91-661a-43c0-a14e-a4f27b88d11e');
INSERT INTO "SupportTicket" ("id", "subject", "description", "status", "userId") VALUES ('a9ee9b3e-25eb-4438-a69b-d8fbd26f32b1', 'Flight Delay Issue', 'The payment process failed multiple times.', 'Closed', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "SupportTicket" ("id", "subject", "description", "status", "userId") VALUES ('31c10692-7e42-4a2c-9ca6-0c521a230f6b', 'Lost Baggage', 'I am unable to select my preferred seat.', 'Pending', '89d61e3e-274c-48c9-bdd9-175a96a7f3f6');
INSERT INTO "SupportTicket" ("id", "subject", "description", "status", "userId") VALUES ('d15493cc-7837-4bd5-8262-2d6ab1f3209d', 'Booking Confirmation Problem', 'My baggage did not arrive at the destination.', 'Resolved', '40eb0ad2-fe7b-4975-acab-6e231d35a36c');
INSERT INTO "SupportTicket" ("id", "subject", "description", "status", "userId") VALUES ('894e98e2-2f01-401d-8f48-a5a9e7d4c013', 'Payment Failure', 'My baggage did not arrive at the destination.', 'Pending', '89d61e3e-274c-48c9-bdd9-175a96a7f3f6');
INSERT INTO "SupportTicket" ("id", "subject", "description", "status", "userId") VALUES ('4b88059b-96ad-49b9-8766-f07a6300966c', 'Flight Delay Issue', 'I havent received a confirmation email for my booking.', 'Closed', '89d61e3e-274c-48c9-bdd9-175a96a7f3f6');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
