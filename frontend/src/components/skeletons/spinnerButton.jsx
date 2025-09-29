import React from "react";

const StretchSpinner = ({ size, color, stroke, _hidden }) => {
    return (
        <svg className={`animate-rotate overflow-visible ${_hidden}`}
            viewBox="0 0 40 40"
            height={size}
            width={size}
            style={{
                "--uib-color": color,
                "--uib-stroke": stroke,
            }}
        >
            {/* Background circle - Muốn hiển thị thì đổi opacity-[] */}
            <circle className="stroke-[--uib-color] opacity-0" cx="20" cy="20" r="17.5"
                pathLength="100"
                strokeWidth={stroke}
                fill="none"
            />
            {/* Circle đang quay */}
            <circle className="stroke-[--uib-color] animate-stretch" cx="20" cy="20" r="17.5"
                pathLength="100"
                strokeWidth={stroke}
                fill="none"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default StretchSpinner;
