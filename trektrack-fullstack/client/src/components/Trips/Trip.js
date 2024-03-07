import React, { useEffect, useState } from "react";
import { Card, CardImg, CardBody, Button, CardHeader } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

export const Trip = ({ trip }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userProfile"));

  let formattedDate = null;
  if (trip.publishDateTime) {
    const [date] = trip.publishDateTime.split("T");
    const [year, month, day] = date.split("-");
    formattedDate = `${month}/${day}/${year}`;
  }

  return (
    <Card className="m-4" style={{ width: "40rem" }}>
      <CardHeader className="d-flex justify-content-between">
        <div>{user.firstName} {user.lastName}</div>
        {formattedDate && <div>{formattedDate}</div>}
      </CardHeader>
      <CardImg top src={trip.imageLocation} alt="Trip Image" />
      <CardBody>
        <h5>
          <Link to={`/trip/${trip.id}`}>
            <strong>View Trip Details</strong>
          </Link>
        </h5>
        <p>{trip.details}</p>
      </CardBody>
      <Button
        outline
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/trip/${trip.id}`);
        }}
      >
        View Trip
      </Button>
      {user.id === trip.userId && (
        <Button
          outline
          color="secondary"
          className="mt-2"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/trip/edit/${trip.id}`);
          }}
        >
          Edit Trip
        </Button>
      )}
    </Card>
  );
};
