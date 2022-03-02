import React from "react";
import { Modal } from 'react-bootstrap';
import { BsFillCloudArrowUpFill, BsFillCloudDownloadFill, BsInfoCircleFill, BsPencilSquare } from "react-icons/bs";
import Footer from "../../components/footer";
import Header1 from "../../components/header1";
import Partnersidemenu from "../../components/partnersidemenu/partnerSidemenu";
import Pagination from "../../pagination/pagination";
import {SRNRequest} from "./action";
class ServiceRecivedNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketsstatus: "",
            selectopen: true,
            viewdata: false,
            selectdata: "",
            viewfilemodal: false,
            ticketslist: [
                { srnid: "2001", invoice_no: "cs00012", status: "Release Order", SRN_no: "xxxxxx" },
                { srnid: "2001", invoice_no: "cs00013", status: "waithing for Approvel", SRN_no: "xxxxxx" },
                { srnid: "2001", invoice_no: "cs00014", status: "waithing for Approvel", SRN_no: "xxxxxx" },
                { srnid: "2001", invoice_no: "cs00015", status: "Release Order", SRN_no: "xxxxxx" },
                { srnid: "2001", invoice_no: "cs00016", status: "waithing for Approvel", SRN_no: "xxxxxx" }

            ],

        }

    }
    opedetails = () => {
        this.setState({
            viewdata: true,
            viewfilemodal: false,
        });
    }
    closemodal = () => {
        this.setState({
            viewdata: false,
        });
    }
    handleCountryChange = (event) => {
        const { ticketsstatus, value } = event.target;
        this.setState({
            ticketsstatus: value,
        });


    }
    openfile = () => {
        this.setState({
            viewdata: true,
        });
    }
    openfilemodal = () => {
        this.setState({
            viewdata: true,
            viewfilemodal: true,
        })
    }
    filter = () => {
        this.setState({
            selectopen: !false,
        });
    }
    callbackFunction = (childData) => {
        if (this.state.ticketslist) {
            this.setState({ datalist1: childData });
        } else {
            this.setState({ datalist1: childData });
        }
    };
    componentDidMount() {
        //    this.props.SRNRequest();
    }
    componentDidUpdate() {

    }
    navigate = (url) => {
        this.props.history.push(url);
    };
    render() {
        const { ticketsstatus, viewdata, selectopen, selectdata } = this.state;
        return (
            <div className="page-container" style={{ paddingLeft: "0px" }}>
                <Header1 />
                <main className="main-content bgc-grey-100">
                    <div id="mainContent container ">
                        <div className="row p-2">
                            <Partnersidemenu
                                navigate={(url) => this.navigate(url)}
                                selected="SRN"
                            />

                            <div className="col-md-9">
                                <div className="row ">
                                    <div className="col-md-12">
                                        <div
                                            className="bgc-white p-20"
                                            style={{ paddingBottom: "0px" }}
                                        >
                                            <div className="row">
                                                <h4 className="c-grey-900 f700 col-md-9">Service Received Note</h4>
                                                <div className="col-md-3">
                                                    <div className="d-flex justify-content-center ">
                                                        <button className="btn shadow btn-download text-grey fz-18 border border-secondary"
                                                            onClick={this.openfilemodal}
                                                        >
                                                            File Upload {" "}
                                                            <BsFillCloudArrowUpFill />
                                                        </button>
                                                        {/* <button className="btn shadow btn-upload text-grey fz-18 border border-secondary">
                                                            <input type="file" accept=".pdf" />Upload File <BsFillCloudArrowUpFill />
                                                        </button> */}
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                        <br /><br />
                                        <div className="bgc-white bd bdrs-3 p-20">

                                            <table className="table table-hover text-nowrap"
                                                style={{ textAlign: "center" }}
                                            >
                                                <thead className="table-primary">
                                                    <tr>
                                                        <th scope="col">SRN No</th>
                                                        <th scope="col">Invoice No</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">SRN Value</th>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.datalist1 && this.state.datalist1.length > 0 &&
                                                        this.state.datalist1.map((listdata, datakey) => (
                                                            <tr key={datakey}>
                                                                <td className=" text-primary" role="button">{listdata.srnid}</td>
                                                                <td>{listdata.invoice_no}</td>
                                                                <td>
                                                                    <select
                                                                        type="dropdown"
                                                                        className="form-control"
                                                                        name="ticketsstatus"
                                                                        value={selectdata}
                                                                        id="cs-rs-country"
                                                                        disabled={selectopen}
                                                                        placeholder="select"
                                                                        onClick={this.filter}
                                                                        onChange={this.filter}
                                                                    >
                                                                        <option value="All">{listdata.status}</option>
                                                                        <option value="Open">Approvel</option>
                                                                        <option value="Close">Release Order</option>
                                                                        <option value="Cancel">Cancel</option>
                                                                    </select>
                                                                </td>
                                                                <td>{listdata.SRN_no}</td>
                                                                {listdata.status === "waithing for Approvel" ?
                                                                    <td><button className="btn shadow btn-download text-grey fz-18 border border-secondary" onClick={this.opedetails}>
                                                                        <BsPencilSquare />
                                                                    </button></td>
                                                                    : <td></td>}
                                                                <td><button className="btn shadow btn-download text-grey fz-18 border border-secondary">
                                                                    Preview
                                                                </button></td>
                                                                <td><button className="btn shadow btn-download text-grey fz-18 border border-secondary">
                                                                    <span><BsFillCloudDownloadFill /></span>{"  "}
                                                                    Download</button>  </td>
                                                            </tr>
                                                        ))
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="row">
                                            <div className="cs-align-center" >
                                                <div className="col-12" style={{ margin: "auto" }}>
                                                    {this.state.ticketslist && (

                                                        <Pagination
                                                            parentCallback={this.callbackFunction}
                                                            customer={this.state.ticketslist}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </main>
                <Footer />
                <Modal
                    show={viewdata}
                    onHide={this.closemodal}
                    size="lg"
                    keyboard={false}
                    style={{ width: "100%" }}
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    {this.state.viewfilemodal === false ?
                        <div>
                            <Modal.Header closeButton>
                                <Modal.Title id="example-custom-modal-styling-title">
                                    Ticket Details
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

<div className="d-flex justify-content-center shadow">
    <div className="row">

        <form>

            <div className="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">SRN: </label>
<div class="col-sm-3">
<input type="text" readonly class="form-control-plaintext" id="staticEmail" value="10000"/>
</div>
<div class="col-sm-6">
<label for="staticEmail" class="col-sm-2 col-form-label">Status: </label>
<div class="col-sm-12">
<select
                                                                        type="dropdown"
                                                                        className="form-control"
                                                                        name="ticketsstatus"
                                                                        value={selectdata}
                                                                        id="cs-rs-country"
                                                                        placeholder="select"
                                                                        onClick={this.filter}
                                                                        onChange={this.filter}
                                                                    >
                                                                        <option value="All">All</option>
                                                                        <option value="Open">Approvel</option>
                                                                        <option value="Close">Release Order</option>
                                                                        <option value="Cancel">Cancel</option>
                                                                    </select>
</div>
</div>


            </div>
            <div className="form-group">
                <label for="exampleFormControlInput1">Invoice Number: </label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" readOnly/>
            </div>
            <div className="form-group">
                <label for="exampleFormControlInput1">SRN Value: </label>
                <input type="email" className="form-control-plaintext" id="exampleFormControlInput1" readOnly placeholder="1000$" />
            </div>
            <div className="form-group">
                <label for="exampleFormControlInput1">Invoice Amount: </label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="1000$" readOnly/>
            </div>
            <div className="form-group">
                <button className="btn shadow btn-upload text-grey fz-18 border border-secondary">
                    <input type="file" accept=".pdf" />Upload File <BsFillCloudArrowUpFill />
                </button>
            </div>
            <div className="col-md-12">
                <button className="btn btn-primary" width="100%"> Submit</button>
            </div>
        </form>

    </div>
</div>
</Modal.Body>
                        </div>
                        :
                        <div>
                            <Modal.Header closeButton>
                                <Modal.Title id="example-custom-modal-styling-title">
                                    SRN Upload
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <div className="d-flex justify-content-center shadow">
                                    <div className="row">

                                        <form>

                                            <div className="form-group row">
                                            <label for="staticEmail" class="col-sm-2 col-form-label">SRN: </label>
    <div class="col-sm-3">
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="10000"/>
    </div>
    <div class="col-sm-6">
     <a href="" className="viewdata"><BsInfoCircleFill /></a>
    <div className="viewdata-1">
        <text>Peroid From : 22-02-2022 </text><br/>
        <text>To : 22-02-2022 </text><br/>
        <text>Total Tickets : 22 </text>

    </div>
    </div>


                                            </div>
                                            <div className="form-group">
                                                <label for="exampleFormControlInput1">Invoice Number: </label>
                                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                            </div>
                                            <div className="form-group">
                                                <label for="exampleFormControlInput1">SRN Value: </label>
                                                <input type="email" className="form-control-plaintext" id="exampleFormControlInput1" readOnly placeholder="1000$" />
                                            </div>
                                            <div className="form-group">
                                                <label for="exampleFormControlInput1">Invoice Amount: </label>
                                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="1000$" />
                                            </div>
                                            <div className="form-group">
                                                <button className="btn shadow btn-upload text-grey fz-18 border border-secondary">
                                                    <input type="file" accept=".pdf" />Upload File <BsFillCloudArrowUpFill />
                                                </button>
                                            </div>
                                            <div className="col-md-12">
                                                <button className="btn btn-primary" width="100%"> Submit</button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </Modal.Body>
                        </div>
                    }

                </Modal>

            </div>
        )
    }

}
export default ServiceRecivedNote;