import React, { useState, useEffect } from "react";
import { BsFillGridFill, BsCaretRightFill } from "react-icons/bs";

function Commercialsidemenu(props) {
  const classval = "list-group-item list-group-item-action";
  const [company, companyList] = useState(false);
  const [selfemployee, selfEmployeeList] = useState(false);
  const buttonHandler = () => {
    companyList((current) => !current);
  };
  const buttonHandler2 = () => {
    selfEmployeeList((current) => !current);
  };
  return (
    <div className="col-md-12" style={{left:"10px"}}>
      <div className="list-group shadow">
        <li
          onClick={() => props.navigate("#")}
          className={`${classval} ${
            props.selected === "CMdashBoard" ? " active" : ""
          }`}
        >
          <span className="icon-holder">
            <i className="c-blue-900 ti-receipt"></i>{" "}
          </span>
          DashBoard
        </li>
        <li
          onClick={() => props.navigate("/report")}
          className={`${classval} ${
            props.selected === "report" ? " active" : ""
          }`}
        >
          <span className="icon-holder">
            <i className="c-blue-900 ti-receipt"></i>{" "}
          </span>{" "}
          Reports
        </li>
   
        <li
          onClick={() => props.navigate("/tickets")}
          className={`${classval} ${
            props.selected === "tickets" ? " active" : ""
          }`}
        >
          <span className="icon-holder">
          <i class="fa fa-ticket" aria-hidden="true"></i>{" "}
          </span>{" "}
          Tickets
        </li>
        <li
          onClick={() => props.navigate("/SRN")}
          className={`${classval} ${
            props.selected === "SRN" ? " active" : ""
          }`}
        >
          <span className="icon-holder">
          <i class="fa fa-clipboard" aria-hidden="true"></i>{" "}
          </span>{" "}
          SRN
        </li>
        <li
          onClick={() => props.navigate("/registerCustomer")}
          className={`${classval} ${
            props.selected === "registerCustomer" ? " active" : ""
          }`}
        >
          <span className="icon-holder">
            <i className="c-blue-900 ti-receipt"></i>{" "}
          </span>
          Registered Customer
        </li>
        <li
          onClick={buttonHandler}
          className={`${classval} ${
            props.selected === "companyRequest" ? " active" : ""
          }`}
        >
          <span className="icon-holder">
            <BsFillGridFill />{" "}
          </span>
          Company Details
        </li>

        <ul style={{ display: company == true ? "block" : "none" }}>
          <li
            onClick={() => props.navigate("/companyRequest")}
            className={`${classval} ${
              props.selected === "companyRequest" ? " active" : ""
            }`}
          >
            <span className="icon-holder">
              <BsCaretRightFill />{" "}
            </span>
            Company Request List
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
            Partner's Company List
          </li>
        </ul>
        
        <li
          onClick={buttonHandler2}
          //  onClick={() => props.navigate("/partnerRequestList")}
          className={`${classval} ${props.selected === "" ? " active" : ""}`}
        >
          <span className="icon-holder">
            <BsFillGridFill />{" "}
          </span>
          Self Employee
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
            Request
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
            Self Employee Company List
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Commercialsidemenu;
