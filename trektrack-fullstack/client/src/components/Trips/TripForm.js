/*
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTrip } from "../../Managers/TripManager";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const TripForm = () => {
    const localUser = localStorage.getItem("userProfile");
    const userObject = JSON.parse(localUser);
    const navigate = useNavigate();

    const [newTrip, setNewTrip] = useState({
        tripDate: "",
        details: "",
        imageLocation: "",
        publishDateTime: new Date().toISOString().slice(0, 16),
        userId: userObject.id,
    });

    const handleSaveButton = (e) => {
        e.preventDefault();

        const tripToSendToAPI = {
            ...newTrip,
            PublishDateTime: newTrip.publishDateTime === "" ? null : newTrip.publishDateTime,
        };

        addTrip(tripToSendToAPI)
            .then(() => {
                navigate("/trip");
            });
    };

    return (
        <Form onSubmit={handleSaveButton}>
            <h2>Plan a New Trip</h2>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="tripDate">Trip Date:</Form.Label>
                <Form.Control
                    type="date"
                    id="tripDate"
                    value={newTrip.tripDate}
                    onChange={(event) => {
                        const copy = { ...newTrip };
                        copy.tripDate = event.target.value;
                        setNewTrip(copy);
                    }}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="details">Details:</Form.Label>
                <Form.Control
                    as="textarea"
                    id="details"
                    rows={3}
                    value={newTrip.details}
                    onChange={(event) => {
                        const copy = { ...newTrip };
                        copy.details = event.target.value;
                        setNewTrip(copy);
                    }}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="imageLocation">Image Location (URL):</Form.Label>
                <Form.Control
                    type="text"
                    id="imageLocation"
                    value={newTrip.imageLocation}
                    onChange={(event) => {
                        const copy = { ...newTrip };
                        copy.imageLocation = event.target.value;
                        setNewTrip(copy);
                    }}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="publishDateTime">Publish Date and Time:</Form.Label>
                <Form.Control
                    type="datetime-local"
                    id="publishDateTime"
                    value={newTrip.publishDateTime}
                    onChange={(event) => {
                        const copy = { ...newTrip };
                        copy.publishDateTime = event.target.value;
                        setNewTrip(copy);
                    }}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit Trip
            </Button>
        </Form>
    );
};*/


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTrip } from "../../Managers/TripManager";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// Correctly import the background image
import backgroundImage from '../../images/trek-track-new-trip-page.jpeg';
import './TripForm.css';
import { Container } from "react-bootstrap";

export const TripForm = () => {
    const localUser = localStorage.getItem("userProfile");
    const userObject = JSON.parse(localUser);
    const navigate = useNavigate();

    const [newTrip, setNewTrip] = useState({
        tripDate: "",
        details: "",
        imageLocation: "",
        publishDateTime: new Date().toISOString().slice(0, 16),
        userId: userObject.id,
    });

    const handleSaveButton = (e) => {
        e.preventDefault();

        const tripToSendToAPI = {
            ...newTrip,
            PublishDateTime: newTrip.publishDateTime === "" ? null : newTrip.publishDateTime,
        };

        addTrip(tripToSendToAPI)
            .then(() => {
                navigate("/trip");
            });
    };

    return (
        <div className="form-container">
        <Form
            onSubmit={handleSaveButton}
            style={{ 
                background: `url(${backgroundImage}) no-repeat center center`, 
                backgroundSize: 'cover',
                // Optional: set a minimum height or other properties as needed
                //position: "fixed",
                minWidth: "100vw", // Ensure it covers the minimum viewport width
                minHeight: "100vh", // Ensure it covers the minimum viewport height
                width: "100%", // Stretch to cover the width
                height: "100%", // Stretch to cover the height
                objectFit: "fill", // Stretch the image to fit the content box, disregarding its aspect-ratio
                top: 0,
                left: 0,
                zIndex: -1, // Place it behind other content
                padding: '20px' // Add padding if needed
                
            }}
        >
            
            <h2 className="trip-form-header">Plan a New Trip</h2>
            
            <Form.Group className="mb-3">
                <Form.Label className="trip-form-header" htmlFor="tripDate">Trip Date:</Form.Label>
                <Form.Control
                    
                    className="date-form-input"
                    type="date"
                    id="tripDate"
                    value={newTrip.tripDate}
                    onChange={(event) => {
                        const copy = { ...newTrip };
                        copy.tripDate = event.target.value;
                        setNewTrip(copy);
                    }}
                />
            </Form.Group>
            

            <Form.Group className="mb-3">
                <Form.Label className="trip-form-header" htmlFor="details">Details:</Form.Label>
                <Form.Control
                    className="details-form-input"
                    as="textarea"
                    id="details"
                    rows={3}
                    value={newTrip.details}
                    onChange={(event) => {
                        const copy = { ...newTrip };
                        copy.details = event.target.value;
                        setNewTrip(copy);
                    }}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className="trip-form-header" htmlFor="imageLocation">Image Location (URL):</Form.Label>
                <Form.Control
                    style={{ maxWidth: '33vw' }}
                    type="text"
                    id="imageLocation"
                    value={newTrip.imageLocation}
                    onChange={(event) => {
                        const copy = { ...newTrip };
                        copy.imageLocation = event.target.value;
                        setNewTrip(copy);
                    }}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className="trip-form-header" htmlFor="publishDateTime">Publish Date and Time:</Form.Label>
                <Form.Control
                    className="date-form-input"
                    
                    type="datetime-local"
                    id="publishDateTime"
                    value={newTrip.publishDateTime}
                    onChange={(event) => {
                        const copy = { ...newTrip };
                        copy.publishDateTime = event.target.value;
                        setNewTrip(copy);
                    }}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit Trip
            </Button>
        </Form>
        </div>
    );
};
