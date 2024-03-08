
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
export const editTrip = (singleTrip) => { 
  return fetch(`${baseUrl}/${singleTrip.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(singleTrip),
  });
};

export const getTrip = (id) => {
    return fetch(`${baseUrl}/${id}`).then((res) => res.json());
};

export const deleteTrip = (id) => {
    return fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });
};