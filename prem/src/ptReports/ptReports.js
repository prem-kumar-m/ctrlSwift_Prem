import React from "react";
import { Table } from "react-bootstrap";
import PartnerHeader1 from "../components/partnerHeader1";

class ptReports extends React.Component {
  render() {
    return (
      <div>
        <header>
          <PartnerHeader1 />
        </header>
        <main className="main-content bgc-grey-100 ">
          <section className="onboard">
            {/* <div className="row">
              <div className="col-12">
                <Card>
                  <div className="row">
                    <div className="col-12">Ticket rise</div>
                  </div>
                </Card>
              </div>
            </div> */}

            <div className="row">
              <div className="col-xl-3  ">
                <div className="card border-primary ">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div className="align-self-center">
                        <i
                          className="fa fa-ticket text fa-4x"
                          id="ptreport"
                          aria-hidden="true"
                        ></i>
                        {/* <i className="fas fa-pencil-alt text-info fa-3x">aaa</i> */}
                      </div>
                      <div className="align-text-center">
                        <h3>Ticket Rise</h3>
                        <p className="ptreportno">0</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="p-50">
              <Table>
                <thead>
                  <th>Ticket number</th>
                  <th>Assigned to</th>
                  <th>status</th>
                  <th>requested Demo</th>
                  <th>closed time</th>
                </thead>
                <tbody>
                  <tr></tr>
                </tbody>
              </Table>
            </section>
          </section>
        </main>
      </div>
    );
  }
}

export default ptReports;
