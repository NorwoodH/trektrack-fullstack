import { Trip } from "./Trip.js";
import { Container } from "reactstrap";

export const TripList = ({ trips }) => {
  return (
    <Container fluid className='d-flex flex-column align-items-center'>
      {trips.map((trip) => (
        <Trip
          key={trip.id}
          trip={trip}
        />
      ))}
    </Container>
  );
};
