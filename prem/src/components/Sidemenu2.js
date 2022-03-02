import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsFillGridFill, BsCaretRightFill } from "react-icons/bs";

function Sidemenu2(props) {
  const classval = "list-group-item list-group-item-action";
  const [company, companyList] = useState(false);
  const [selfemployee, selfEmployeeList] = useState(false);
  const buttonHandler = () => {
    companyList((current) => !current);
  };
  const buttonHandler2 = () => {
    selfEmployeeList((current) => !current);
  };

  //   useEffect( () => {
  //     console.log(selfemployee);
  // }, [selfemployee]);

  return (
    <div className="col-md-2">
      <div className="list-group shadow">
        <li
          onClick={buttonHandler}
          //  onClick={() => handelClick()}
          className={`${classval} ${
            props.selected === "companyRequest" ? "text-primary" : props.selected ==="acceptedCompany"?"text-primary":" "
          }`}
        >
          <span className="icon-holder">
            <BsFillGridFill />{" "}
          </span>
          Company Details
        </li>

        <ul
          style={{
            display: company == true ? "block" : "none",
          }}
        >
          <li
            onClick={() => props.navigate("/companyRequest")}
            className={`${classval} ${
              props.selected === "companyRequest" ? " active" : ""
            }`}
          >
            <span className="icon-holder">
              <BsCaretRightFill />{" "}
            </span>
            Request List
          </li>
          <li
            onClick={() => props.navigate("/acceptedCompany")}
            className={`${classval} ${
              props.selected === "acceptedCompany" ? " active" : ""
            }`}
          >
            <span className="icon-holder">
              <BsCaretRightFill />{" "}
            </span>
            Partner's List
          </li>
        </ul>
        <li
          onClick={buttonHandler2}
          className={`${classval} ${
            props.selected === "selfEmployeeRequest" ? "text-primary" : props.selected ==="acceptedSelfEmployee1"?"text-primary":" "
          }`}
        >
          <span className="icon-holder ">
            <BsFillGridFill />{" "}
          </span>
          Self Employees
        </li>

        <ul style={{ display: selfemployee == true ? "block" : "none" }}>
          <li
            onClick={() => props.navigate("/selfEmployeeRequest")}
            className={`${classval} ${
              props.selected === "selfEmployeeRequest" ? " active" : ""
            }`}
          >
            <span className="icon-holder">
              <BsCaretRightFill />{" "}
            </span>
            Request List
          </li>
          <li
            onClick={() => props.navigate("/acceptedSelfEmployee1")}
            className={`${classval} ${
              props.selected === "acceptedSelfEmployee1" ? " active" : ""
            }`}
          >
            <span className="icon-holder">
              <BsCaretRightFill />{" "}
            </span>
            Employees List
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Sidemenu2;
