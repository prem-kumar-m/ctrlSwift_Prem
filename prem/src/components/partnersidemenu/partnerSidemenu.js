import React, { useState, useEffect } from "react";
import {Card} from "react-bootstrap"


function Sidemenu(props) {
  const classval = "list-group-item list-group-item-action shadow";
  const [reports, reportsList] = useState(false);
  const [myAccount, myAccountList] = useState(false);
  // const [menu, menuList] = useState(false);
  // const menuHandle = () => {
  //   menuList((current) => !current);
  // };
  const buttonHandler1 = () => {
    reportsList((current) => !current);
  };
  const buttonHandler2 = () => {
    myAccountList((current) => !current);
  };

  return (
    <div className="col-md-3">
      <div className="list-group ">
      <li
          onClick={() => props.navigate("#")}
          className={`${classval} ${
            props.selected === "#" ? " active" : ""
          }`}
        >
          <span className="icon-holder">
          <i class="fa fa-line-chart" aria-hidden="true"></i>{" "}
          </span>{" "}
         DashBoard
        </li>
        <li
            onClick={() => props.navigate("/employeeList")}
            className={`${classval} ${
              props.selected === "employeeList" ? " active" : ""
            }`}
          >
            <span className="icon-holder">
            <i class="fa fa-users" aria-hidden="true"></i>{" "}
            </span>
           Employees
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
        name="myAccount"

           onClick={buttonHandler2}
           className={`${classval} ${
            props.selected === "companyEditProfile" ? "text-primary" :" "
          }`}
        >
          <span className="icon-holder">
          <i class="fa fa-cog" aria-hidden="true"></i>{" "}
          </span>{" "}
          Settings

          { myAccount == true ?
          <span className="partnerSidemenu"><i class="fa fa-angle-down  " aria-hidden="true"></i></span>
          :<span className="partnerSidemenu"><i class="fa fa-angle-up  " aria-hidden="true"></i></span> }


        </li>
        <li style={{ display: myAccount == true ? "block" : "none" }}>
          <li
            onClick={() => props.navigate("/companyEP")}

            className={`${classval} ${
              props.selected === "companyEditProfile" ? " active" : ""
            }`}
          >
            <span className="icon-holder">
            <i class="fa fa-user" aria-hidden="true"></i>{" "}
            </span>
            Organisation Profile
          </li>

          <li
            onClick={() => props.navigate("#")}
            className={`${classval} ${
              props.selected === "#" ? " active" : ""
            }`}
          >
            <span className="icon-holder">
            <i class="fa fa-sign-out" aria-hidden="true"></i>
            </span>
            Log out
          </li>

        </li>

        <li
        name="reports"
        onClick={buttonHandler1}

          className={`${classval} ${
            props.selected === "reportByTickets" ? "text-primary" : props.selected ==="effectiveResource"?"text-primary":" "
          }`}
          // style={{reports===true}}
        >
          <span className="icon-holder">
          <i class="fa fa-file" aria-hidden="true"></i>{" "}
          </span>{" "}
          Reports
          { reports == true ?
          <span className="partnerSidemenu1 "><i class="fa fa-angle-down  " aria-hidden="true"></i></span>
          :<span className="partnerSidemenu1"><i class="fa fa-angle-up  " aria-hidden="true"></i></span> }

        </li>
        <li style={{ display: reports == true ? "block" : "none" }}>
          <li
            onClick={() => props.navigate("#")}
            className={`${classval} ${
              props.selected === "#" ? " active" : ""
            }`}
          >
            <span className="icon-holder">
            <i class="fa fa-user" aria-hidden="true"></i>{" "}
            </span>
           Reports by tickets
          </li>
          <li
          class="border-bottom-0"
            onClick={() => props.navigate("#")}
            className={`${classval} ${
              props.selected === "#" ? " active" : ""
            }`}
          >
            <span className="icon-holder ">
            <i class="fa fa-users" aria-hidden="true"></i>{" "}
            </span>
           Effective Resource Utilization
          </li>

        </li>

        {/* </li> */}

      </div>
    </div>
  );
}
export default Sidemenu;
