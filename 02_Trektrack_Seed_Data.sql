SET IDENTITY_INSERT [users] ON;
INSERT INTO[users] (id, userName, userPassword, FirstName, LastName, Email, ImageLocation) VALUES
(1, 'adminUser', 'pass123', 'Admin', 'User', 'admin@example.com', '/images/adminUser.png'),
(2, 'johnDoe', 'jdPassword', 'John', 'Doe', 'john.doe@example.com', '/images/johndoe.png'),
(3, 'janeDoe', 'jdPassword2', 'Jane', 'Doe', 'jane.doe@example.com', '/images/janedoe.png');
SET IDENTITY_INSERT[users] OFF;
GO

SET IDENTITY_INSERT [Trip] ON;
INSERT INTO[Trip] (id, userId, tripDate, ImageLocation, PublishDateTime, details) VALUES
(1, 2, '2023-05-15T08:00:00', '/trips/trip1.png', '2023-05-15T09:00:00', 'Trip to the Pit of Dispair'),
(2, 3, '2023-06-20T09:00:00', '/trips/trip2.png', '2023-06-20T10:00:00', 'Exploring the Capstone Mountains');
SET IDENTITY_INSERT[Trip] OFF;
GO