/*import React from "react";

export default function Trektrack() {
  return (
    <span style={{
      position: "fixed",
      left: 0,
      right: 0,
      top: "50%",
      marginTop: "-0.5rem",
      textAlign: "center",
      color: "#228B22",
    }}>Trek Track</span>
  );
}*/

/*import React, { useEffect } from "react";

export default function Trektrack() {
  useEffect(() => {
    // Set the background color of the page
    document.body.style.backgroundColor = "#228B22"; // Forest green color

    // Optional: Clean up function to reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = ""; // Reset to default or previous color
    };
  }, []); // Empty dependency array means this effect runs only once after initial render

  return (
    <span style={{
      position: "fixed",
      left: 0,
      right: 0,
      top: "50%",
      marginTop: "-0.5rem",
      textAlign: "center",
      color: "#FFFFFF", // Changing text color for contrast
    }}>Trek Track</span>
  );
}*/

/*import React, { useEffect } from "react";

export default function Trektrack() {
  useEffect(() => {
    // Set the background color of the page
    document.body.style.backgroundColor = "#228B22"; // Forest green color

    return () => {
      document.body.style.backgroundColor = ""; // Reset to default or previous color
    };
  }, []);

  return (
    <img
      src="https://ibb.co/cDvfvhc"
      alt="Map - Trek Track"
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)", // Center the image on the page
        maxWidth: "90%", // Ensures the image is responsive and fits within the viewport
        maxHeight: "90%",
      }}
    />
  );
}*/

import React, { useEffect } from "react";
import trekTrackImage from '../images/trek-track-homepage.jpeg'; // Corrected path

export default function Trektrack() {
  useEffect(() => {
    document.body.style.backgroundColor = "dark"; // Background color as a fallback

    return () => {
      document.body.style.backgroundColor = ""; // Reset to default or previous color
    };
  }, []);

  return (
    <img
      src={trekTrackImage}
      alt="Trek Track Home Page"
      style={{
        position: "fixed",
        minWidth: "100vw", // Ensure it covers the minimum viewport width
        minHeight: "100vh", // Ensure it covers the minimum viewport height
        width: "100%", // Stretch to cover the width
        height: "100%", // Stretch to cover the height
        objectFit: "fill", // Stretch the image to fit the content box, disregarding its aspect-ratio
        top: 0,
        left: 0,
        zIndex: -1, // Place it behind other content
      }}
    />
  );
}
