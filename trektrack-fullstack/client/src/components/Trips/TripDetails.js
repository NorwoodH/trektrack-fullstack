import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Trip } from "./Trip";
import { getTrip, deleteTrip } from "../../Managers/TripManager";

const TripDetails = () => {
    const [trip, setTrip] = useState();
    const { id } = useParams();

    useEffect(() => {
        getTrip(id).then(setTrip);
    }, [id]);

    const handleDelete = () => {
        deleteTrip(id)
        .then(() => {
            setTrip(null);
        })
    }

    if (!trip) {
        return null;
    }

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-sm-12 col-lg-6'>
                    <Trip trip={trip} />
                    <button onClick={handleDelete}>Delete Trip</button>
                </div>
            </div>
        </div>
    );
};

export default TripDetails;
