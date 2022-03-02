import React from "react";
import { Pagination } from "react-bootstrap";

class pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listofpages: "",
      From: 0,
      To: 5,
      datalist: "",
      number: 0,
    };
    this.handlePage = this.handlePage.bind(this);
  }

  handlePage = (number) => {
    this.setState({ number: number });
    console.log("testing:" + number);
    let newdata = this.state.To;

    let From = (number - 1) * newdata;
    let To = From + newdata;

    let datashow = this.props.customer.slice(From, To);
    console.log("dd" + datashow);
    this.props.parentCallback(datashow);
  };

  componentDidMount() {
    console.log(this.props, "iiiiiiiiii");
    // this.props.customer.length && this.props.slice(5);
    console.log("....");
    if (this.props.customer) {
      let customerlength = this.props.customer.length;
      let pagecount = Math.ceil(customerlength / this.state.To);
      this.setState({ listofpages: pagecount });
      let datashow = this.props.customer.slice(this.state.From, this.state.To);
      this.props.parentCallback(datashow);
    }
  }
  componentDidUpdate(prevProps) {
    console.log("from:" + this.state.From);
  }
  Pagination1 = () => {
    let active = [];
    let items = [];
    for (let number = 1; number <= this.state.listofpages; number++) {
      items.push(
        <Pagination.Item
          onClick={() => this.handlePage(number)}
          key={number}
          active={number === active}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };
  render() {
    let items, number;
    return (
      <Pagination>
        <Pagination.First
          className={this.state.number === 0 ?"disabled" : this.state.number === 1 ?" disabled" : ""}
          onClick={() => this.handlePage(1)}
        />

        <Pagination.Prev
          className={this.state.number === 0 ?"disabled" : this.state.number === 1 ?" disabled" : ""}
          onClick={() => this.handlePage(this.state.number - 1)}
        />
        {this.Pagination1()}
        {/* <Pagination.Ellipsis /> */}
        <Pagination.Next
          className={
            this.state.listofpages === this.state.number ? "disabled" : ""
          }
          onClick={() => this.handlePage(this.state.number + 1)}
          // onClick={() => this.handlePageNext(this.state.number + 1)}
        />
        <Pagination.Last
          className={
            this.state.listofpages === this.state.number ? "disabled" : ""
          }
          onClick={() => this.handlePage(this.state.listofpages)}
        />
      </Pagination>
    );
  }
}
export default pagination;
