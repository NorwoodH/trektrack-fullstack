DROP TABLE IF EXISTS Users
DROP TABLE IF EXISTS Trip

CREATE TABLE [users] (
  [id] int PRIMARY KEY IDENTITY,
  [userName] nvarchar(255), 
  [userPassword] nvarchar(255),
  [FirstName] nvarchar(255),
  [LastName] nvarchar(255),
  [Email] nvarchar(255),
  [ImageLocation] nvarchar(255),
  [IsAdmin] bit
)
GO

CREATE TABLE [Trip] (
  [id] int PRIMARY KEY IDENTITY,
  [userId] int,
  [tripDate] datetime,
  [ImageLocation] nvarchar(255),
  [PublishDateTime] datetime,
  [details] nvarchar(255),
  FOREIGN KEY ([userId]) REFERENCES [users]([id])
)
GO
