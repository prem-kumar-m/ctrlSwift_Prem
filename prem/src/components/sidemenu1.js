import React from "react";

function Sidemenu(props) {
  const classval = "list-group-item list-group-item-action shadow";
  return (
    <div className="col-md-2" style={{left:"10px"}}>
      <div className="list-group">
        <li
          onClick={() => props.navigate("/exchangeValue")}
          className={`${classval} ${
            props.selected === "exchangeValue" ? " active" : ""
          }`}
        >
          <span className="icon-holder">
            <i className="c-blue-900 ti-user"></i>{" "}
          </span>{" "}
          Exchange Value
        </li>
        <li
          onClick={() => props.navigate("/discount")}
          className={`${classval} ${
            props.selected === "discount" ? " active" : ""
          }`}
        >
          <span className="icon-holder">
            <i className="c-blue-900 ti-receipt"></i>{" "}
          </span>{" "}
          Discount
        </li>
        <li
          onClick={() => props.navigate("/commercialprice")}
          className={`${classval} ${
            props.selected === "commercialprice" ? " active" : ""
          }`}
        >
          <span className="icon-holder">
            <i className="c-blue-900 ti-file"></i>{" "}
          </span>
          Commercial Price
        </li>
        <li
          onClick={() => props.navigate("/noticePeriod")}
          className={`${classval} ${
            props.selected === "noticePeriod" ? " active" : ""
          }`}
        >
          <span className="icon-holder">
            <i className="c-blue-900 ti-notepad"></i>{" "}
          </span>
          Notice Period
        </li>
      </div>
    </div>
  );
}
export default Sidemenu;
