import React from "react";
import "../styles/Home.css";
import TypeIt from "typeit-react";

function RegisterHeading() {
  const headingStyle = {
    fontFamily: "Major Mono Display",
    fontWeight: "bold",
    fontSize: "600%",
    margin: "auto", // Centers the element horizontally
    textAlign: "center",
    padding: "20px",
    marginBottom: "100px",
    color: "#D84040",
  };

  return (
    <div className="heading-container">
      <TypeIt
        options={{
          speed: 200,
          waitUntilVisible: true,
          afterComplete: (instance) => {
            // Hide the cursor after typing animation is complete
            const cursor = instance.cursor;
            if (cursor) {
              cursor.style.display = "none";
            }
          },
        }}
        getBeforeInit={(instance) => {
          instance
            .type("Regisoer")
            .move(-2)
            .delete(1)
            .type("t")
            .move(null, { to: "END" });
          return instance;
        }}
        style={headingStyle} // Apply styles directly to TypeIt component
      />
    </div>
  );
}

export default RegisterHeading;
