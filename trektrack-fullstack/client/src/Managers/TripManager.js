
const baseUrl = 'https://localhost:5001/api/trip';

export const getAllTrips = () => {
  return fetch(baseUrl) 
    .then((res) => res.json())
};

export const addTrip = (singleTrip) => { 
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(singleTrip),
  });
};

export const getTrip = (id) => {
    return fetch(`/api/trip/${id}`).then((res) => res.json());
};