import React, { useState, useEffect } from "react";
import EmployeeItem from "./EmployeeItem";

export default function Employee() {
    const employeeEndpointURI =
        "https://run.mocky.io/v3/17d21aac-bb1e-4908-9cb9-93c845fa6f58";
    const [rawData, setRawData] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        fetch(employeeEndpointURI)
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                setRawData(res.data);
                setEmployees(res.data);
                console.log(res.data);
            });
    }, []);

    useEffect(() => {
        if (keyword) {
            const filtered = rawData.filter((employee) => {
                return employee.employee_name
                    .toLowerCase()
                    .includes(keyword.toLowerCase());
            });
            console.log(filtered);
            setEmployees(filtered);
        } else {
            setEmployees(rawData);
        }
        // eslint-disable-next-line
    }, [keyword]);

    const handleKeywordChange = (e) => {
        const newKeyword = e.target.value;
        console.log(newKeyword);
        setKeyword(newKeyword);
    };

    return (
        <div style={{ marginTop: "5rem" }}>
            <input
                placeholder="Search employee"
                value={keyword}
                onChange={(e) => handleKeywordChange(e)}
            />
            <br />
            {employees.map((employee) => {
                return (
                    <EmployeeItem
                        key={employee.id}
                        name={employee.employee_name}
                    />
                );
            })}
            <br />
            <button onClick={() => setKeyword("")}>Reset</button>
            <hr />
        </div>
    );
}
