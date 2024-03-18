import { useEffect, useState } from "react";
import { getUserTrips } from "../../Managers/TripManager";
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row } from "reactstrap";
import { Trip } from "./Trip";


export const UserTrips = () => {
    const [userTrips, setUserTrips] = useState([]);

    const localUser = localStorage.getItem("userProfile");
    const localUserObject = JSON.parse(localUser);

    useEffect(() => {
        getUserTrips(localUserObject.id)
        .then((data) => {
            setUserTrips(data);
        })
        .catch((error) => {
            console.log("Can't fetch user trips:", error);
        });
    }, [localUserObject.id]);

    return (
        <>
            <div className="trip-list">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {userTrips.map((trip) => {
                            return <Trip key={trip.id} trip={trip} /> 
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};
