CREATE TABLE [admin] (
  [id] int PRIMARY KEY,
  [userName] nvarchar(255), 
  [userPassword] nvarchar(255)
)
GO

CREATE TABLE [users] (
  [id] int PRIMARY KEY,
  [userName] nvarchar(255), 
  [userPassword] nvarchar(255),
  [FirstName] nvarchar(255),
  [LastName] nvarchar(255),
  [Email] nvarchar(255),
  [ImageLocation] nvarchar(255),
  [UserTypeId] int 
)
GO

CREATE TABLE [Trip] (
  [id] int PRIMARY KEY,
  [userId] int,
  [tripDate] datetime,
  [ImageLocation] nvarchar(255),
  [PublishDateTime] datetime,
  [details] nvarchar(255),
  FOREIGN KEY ([userId]) REFERENCES [users]([id])
)
GO
