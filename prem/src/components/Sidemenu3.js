import React from "react";

function Sidemenu(props) {
  const classval = "list-group-item list-group-item-action";

  return (
    <div className="col-md-2 ">
      <div className="list-group ">
        <li
          onClick={() => props.navigate("/companyEditProfile")}
          className={`${classval} ${
            props.selected === "companyEditProfile" ? " active" : ""
          }`}
        >
          <span className="icon-holder">
            <i className="c-blue-900 ti-user"></i>{" "}
          </span>{" "}
          Edit Profile
        </li>
        <li
          onClick={() => props.navigate("/onboardingEngineer")}
          className={`${classval} ${
            props.selected === "onBoardingEngineer" ? " active" : ""
          }`}
        >
          <span className="icon-holder">
            <i className="c-blue-900 ti-user"></i>{" "}
          </span>{" "}
          Add Employee
        </li>
        <li
          onClick={() => props.navigate("/employeeList")}
          className={`${classval} ${
            props.selected === "employeeList" ? " active" : ""
          }`}
        >
          <span className="icon-holder">
            <i className="c-blue-900 ti-user"></i>{" "}
          </span>{" "}
          Employee's List
        </li>

        {/* <li
          onClick={() => props.navigate("/onBoard")}
          className={`${classval} ${
            props.selected === "onBoard" ? " active" : ""
          }`}
        >
          <span className="icon-holder">
            <i className="c-blue-900 ti-onBoard"></i>{" "}
          </span>{" "}
          Users
        </li> */}
        {/* <li
          onClick={() => props.navigate("/user")}
          className={`${classval} ${
            props.selected === "user" ? " active" : ""
          }`}
        >
          <span className="icon-holder">
            <i className="c-blue-900 ti-user"></i>{" "}
          </span>{" "}
          Users
        </li> */}
      </div>
    </div>
  );
}
export default Sidemenu;
