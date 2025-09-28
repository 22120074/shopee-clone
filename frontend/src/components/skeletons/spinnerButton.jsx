import React from "react";

const TailSpinner = ({ size, color, stroke, _hidden }) => {
    return (
    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        flex items-center justify-start rounded-full animate-spin ${_hidden}`}
        style={{
            "--uib-size": size || "40px",
            "--uib-color": color || "black",
            "--uib-stroke": stroke || "5px",
            "--mask-size": "calc(var(--uib-size) / 2 - var(--uib-stroke))",
            height: "var(--uib-size)",
            width: "var(--uib-size)",
            WebkitMask: "radial-gradient(circle var(--mask-size), transparent 99%, #000 100%)",
            mask: "radial-gradient(circle var(--mask-size), transparent 99%, #000 100%)",
            backgroundImage: "conic-gradient(transparent 25%, var(--uib-color))",
        }}
    />
    );
};

export default TailSpinner;
