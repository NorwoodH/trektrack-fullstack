import { Container } from "reactstrap";
import { useEffect, useState } from "react";
import { TripList } from "./TripList";
import Trektrack from "../Trektrack"
import { getAllTrips } from "../../Managers/TripManager";

export const TripContainer = () => {
	const [trips, setTrips] = useState([]);
	const user = JSON.parse(localStorage.getItem("userProfile"));
	const getTrips = () => {
		return getAllTrips().then((allTrips) => setTrips(allTrips));
	};

	useEffect(() => {
		getTrips();
	}, []);

	if (window.location.pathname === "/") {
		if (!trips.length) {
			return <Trektrack />;
		} else {
			return (
				<Container fluid className='d-flex flex-column align-items-center my-2'>
					<h2>Your Trips</h2>
					<TripList trips={trips} />
				</Container>
			);
		}
	}
	else {
		return (
			<Container>
				<h2>All Trips</h2>
				<TripList trips={trips} />
			</Container>
		);
	}
};
