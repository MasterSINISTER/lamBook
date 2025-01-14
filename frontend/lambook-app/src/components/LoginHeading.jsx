import React from "react";
import "../styles/Home.css";
import TypeIt from "typeit-react";

function Heading() {
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
          speed: 100,
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
            .type("Lameook")
            .move(-3)
            .delete(1)
            .type("b")
            .move(null, { to: "END" });
          return instance;
        }}
        style={headingStyle} // Apply styles directly to TypeIt component
      />
    </div>
  );
}

export default Heading;
