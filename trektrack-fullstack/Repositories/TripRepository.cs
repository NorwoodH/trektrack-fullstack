using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using trektrack_fullstack.Models;
using trektrack_fullstack.Utils;
using static trektrack_fullstack.Repositories.TripRepository;
using Microsoft.Extensions.Hosting;
using Microsoft.Data.SqlClient;
using Azure;
using trektrack_fullstack.Repositories;
using Microsoft.Identity.Client;

namespace trektrack_fullstack.Repositories
{
    public class TripRepository : BaseRepository, ITripRepository
    {
        public TripRepository(IConfiguration configuration) : base(configuration) { }

        public List<Trip> GetAll()
        {
            using (var conn = Connection)
            {

                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT t.id, t.details, t.ImageLocation, t.PublishDateTime, t.tripDate, t.userId as TripUserId,
                           u.id AS UserId, u.userName, u.FirstName,
                           u.LastName, u.Email, u.ImageLocation AS UserImageLocation
                    FROM TRIP t
                    JOIN Users u ON t.userId = u.id
                    ORDER BY t.PublishDateTime DESC;
                    ";


                    var reader = cmd.ExecuteReader();

                    var trips = new List<Trip>();
                    while (reader.Read())
                    {
                        trips.Add(new Trip()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            details = DbUtils.GetString(reader, "details"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            tripDate = DbUtils.GetDateTime(reader, "tripDate"),
                            userId = DbUtils.GetInt(reader, "TripUserId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                UserName = DbUtils.GetString(reader, "UserName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                ImageLocation = DbUtils.GetString(reader, "UserImageLocation")
                            }
                        });
                    }
                    reader.Close();

                    return trips;
                }
            }
        }

        public Trip GetById(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT t.id, t.details, t.ImageLocation, t.PublishDateTime, t.tripDate, t.userId as TripUserId,
                           u.id AS UserId, u.userName, u.FirstName,
                           u.LastName, u.Email, u.ImageLocation AS UserImageLocation
                    FROM TRIP t
                    JOIN Users u ON t.userId = u.id
                    WHERE t.Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Trip trip = null;
                    if (reader.Read())
                    {
                        trip = new Trip()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            details = DbUtils.GetString(reader, "details"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            tripDate = DbUtils.GetDateTime(reader, "tripDate"),
                            userId = DbUtils.GetInt(reader, "TripUserId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                UserName = DbUtils.GetString(reader, "UserName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                ImageLocation = DbUtils.GetString(reader, "UserImageLocation")
                            }
                        };
                    }
                    reader.Close();
                    return trip;
                }
            }
        }
        public void Add(Trip trip)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Trip (UserId, details, ImageLocation, tripDate, PublishDateTime)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @Details, @ImageLocation, @tripDate, @PublishDateTime)";

                    cmd.Parameters.AddWithValue("@UserId", trip.userId);
                    cmd.Parameters.AddWithValue("@details", trip.details);
                    cmd.Parameters.AddWithValue("@ImageLocation", trip.ImageLocation);
                    cmd.Parameters.AddWithValue("@tripDate", trip.tripDate);
                    cmd.Parameters.AddWithValue("@PublishDateTime", trip.PublishDateTime);

                    trip.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Trip trip)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Trip
                        SET
                            UserId = @UserId,
                            details = @Details,
                            ImageLocation = @ImageLocation,
                            tripDate = @TripDate,
                            PublishDateTime = @PublishDateTime
                        WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@id", trip.Id);
                    cmd.Parameters.AddWithValue("@UserId", trip.userId);
                    cmd.Parameters.AddWithValue("@Details", trip.details);
                    cmd.Parameters.AddWithValue("@ImageLocation", trip.ImageLocation);
                    cmd.Parameters.AddWithValue("@TripDate", trip.tripDate);
                    cmd.Parameters.AddWithValue("@PublishDateTime", trip.PublishDateTime);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Trip
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
