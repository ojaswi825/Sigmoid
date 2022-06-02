import React from "react";

export default function EmployeeItem(props) {
    return (
        <div style={{ marginTop: "0.5rem" }}>
            {props.name}
            <hr />
        </div>
    );
}
