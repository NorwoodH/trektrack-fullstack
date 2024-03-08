import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addTrip, editTrip, getTrip } from "../../Managers/TripManager";


export const TripEdit = () => {
    const localUser = localStorage.getItem("userProfile");
    const userObject = JSON.parse(localUser);
    const navigate = useNavigate();
    const {id} = useParams() 
    const [newTrip, setNewTrip] = useState({
        tripDate: "",
        details: "",
        imageLocation: "",
        publishDateTime: new Date().toISOString().slice(0, 16),
        userId: userObject.id,
    });

    useEffect(() => {
        getTrip(id)
        .then(trip => {
            console.log(trip)
            setNewTrip(trip)
        })

    }, [])

    const handleSaveButton = (e) => {
        e.preventDefault();

        const tripToSendToAPI = {
            ...newTrip,
            PublishDateTime: newTrip.publishDateTime === "" ? null : newTrip.publishDateTime,
        };

        return editTrip(tripToSendToAPI)
            .then(() => {
                navigate("/trip");
            });
    };

    return (
        <>
            <form className='trip-form'>
                <h2 className='trip-form-title'>Plan a New Trip</h2>
                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='tripDate'>Trip Date: </label>
                        <input
                            type='date'
                            id='tripDate'
                            value={newTrip.tripDate}
                            onChange={(event) => {
                                const copy = { ...newTrip };
                                copy.tripDate = event.target.value;
                                setNewTrip(copy);
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='details'>Details: </label>
                        <textarea
                            id='details'
                            value={newTrip.details}
                            onChange={(event) => {
                                const copy = { ...newTrip };
                                copy.details = event.target.value;
                                setNewTrip(copy);
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='imageLocation'>Image Location (URL): </label>
                        <input
                            type='text'
                            id='imageLocation'
                            value={newTrip.imageLocation}
                            onChange={(event) => {
                                const copy = { ...newTrip };
                                copy.imageLocation = event.target.value;
                                setNewTrip(copy);
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='publishDateTime'>Publish Date and Time: </label>
                        <input
                            type='datetime-local'
                            id='publishDateTime'
                            value={newTrip.publishDateTime}
                            onChange={(event) => {
                                const copy = { ...newTrip };
                                copy.publishDateTime = event.target.value;
                                setNewTrip(copy);
                            }}
                        />
                    </div>
                </fieldset>

                <button
                    onClick={handleSaveButton}
                    className='btn btn-primary'
                >
                    Submit Trip
                </button>
            </form>
        </>
    );
};
