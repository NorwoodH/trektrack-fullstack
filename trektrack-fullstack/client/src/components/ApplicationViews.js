import React from "react";
import { Route, Routes } from "react-router-dom";
import Trektrack from "./Trektrack.js";
import { TripList }from "./Trips/TripList.js";
import TripDetails from "./Trips/TripDetails.js";
import { TripForm } from "./Trips/TripForm.js";
//import UserProfileList from "./UserProfile/UserProfileList";
import UserProfile from "./UserProfile/UserProfile.js";
import { TripContainer } from "./Trips/TripContainer.js";
import { TripEdit } from "./Trips/TripEdit.js";

export default function ApplicationViews({ isLoggedIn }) {
	const user = JSON.parse(localStorage.getItem("userProfile"));
	return (
		<Routes>
			<Route path='/' element={<Trektrack />} />
			<Route path='/trip' element={<TripContainer />} />
			<Route path='/trip/:id' element={<TripDetails />} />
			<Route path='/tripForm/' element={<TripForm />} />
			<Route path='/trip/edit/:id' element={<TripEdit />} />

			{user && user.userTypeId == 1 ? (
				<>
					{/*<Route path='/UserProfiles' element={<UserProfileList />} />  */}
					
				</>
			) : (
				""
			)}
			{user && user.userTypeId == 1 ? (
				<Route path='/UserProfiles/:id' element={<UserProfile />} />
			) : (
				""
			)}
		</Routes>
	);
}