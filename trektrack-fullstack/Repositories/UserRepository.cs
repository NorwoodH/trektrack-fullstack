
using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using trektrack_fullstack.Models;
using trektrack_fullstack.Utils;
using trektrack_fullstack.Repositories;

namespace trektrack_fullstack.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAllProfiles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT [Id], [FirstName], [LastName], [UserName], 
                               [Email], [CreateDateTime], [ImageLocation], [IsAdmin]
                         FROM [Users]
                         ORDER BY [UserName]";

                    var reader = cmd.ExecuteReader();

                    var profiles = new List<UserProfile>();
                    while (reader.Read())
                    {
                        profiles.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),                 
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            IsAdmin = DbUtils.GetBool(reader, "IsAdmin")
                        });
                    }
                    reader.Close();

                    return profiles;
                }
            }
        }

        public List<UserProfile> GetByStatusId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT [Id], [FirstName], [LastName], [UserName], 
                               [Email], [ImageLocation], [IsAdmin]
                         FROM [UserProfile]
                         ORDER BY [UserName]";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    var profiles = new List<UserProfile>();
                    while (reader.Read())
                    {
                        profiles.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            IsAdmin = DbUtils.GetBool(reader, "IsAdmin")
                        });
                    }
                    reader.Close();

                    return profiles;
                }
            }
        }

        public UserProfile GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT [Id], [FirstName], [LastName], [UserName], 
                               [Email], [ImageLocation], [userPassword]
                        FROM [Users]
                        WHERE [Email] = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserPassword = DbUtils.GetNullableString(reader, "userPassword")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public UserProfile GetById(int Id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT [Id], [FirstName], [LastName], [UserName], 
                               [Email], [ImageLocation], [userPassword]
                        FROM [UserProfile]
                        WHERE [Id] = @Id";

                    DbUtils.AddParameter(cmd, "@Id", Id);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),                          
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserPassword = DbUtils.GetNullableString(reader, "userPassword")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [Users] ([FirstName], [LastName], [UserName], 
                                                                    [Email], [ImageLocation], [userPassword], [IsAdmin])
                                            OUTPUT INSERTED.ID
                                            VALUES (@FirstName, @LastName, @UserName, 
                                                    @Email,@ImageLocation, @userPassword, @IsAdmin)";
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@UserName", userProfile.UserName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email); ;
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@IsAdmin", userProfile.IsAdmin);
                    DbUtils.AddParameter(cmd, "@userPassword", userProfile.UserPassword);
                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
