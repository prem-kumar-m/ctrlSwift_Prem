import React from "react";
import Header1 from "../components/header1";
import Sidemenu from "../components/sidemenu2";
import { Button,Table,Container ,Row,Col} from "react-bootstrap";
import {BsFillTrash2Fill, BsPencilSquare } from "react-icons/bs" ;
import Swal from "sweetalert2";
class userLists extends React.Component{
    constructor(props){
        super(props);
        this.state={
          tableData:[{employeeId:'123654', name:'alice',mobNo:'1234567890', email:'ertyu@gmail.com', },
        {employeeId:'789654', name:'bob',mobNo:'4567891230', email:'bnmkj@gmail.com',}]
        };
      }
    navigate = (url) => {
        this.props.history.push(url);
      };
    //   nextpath=() => {
    //       this.props.history.push('/onboardingEngineer')
    //   };
    nextPath(path) {
        this.props.history.push(path);
        };
    delete=()=>{
        Swal.fire({  
            title: "confirm to delete",      
            text:"Are You Sure Want to delete?",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ok ", 
            showCancelButton:"true",
            cancelButtonColor: '#d33',
            icon:"warning"           
          })

        }
    render(){
        return(
            <div className="page-container" style={{ paddingLeft: "0px" }}>
            <Header1 
            // navigate={(url) => this.navigate("/adminlogin")}
             />
             <main className="main-content bgc-grey-100">
             <div id="mainContent">
               <div className="row">

               
           <Sidemenu
                navigate={(url) => this.navigate(url)}
                selected="onboardingEngineer"
                className="sidemenu2"
              />
               <Container className="container-size"> 
               <Row>
                <Col>
                  <p style={{ fontSize: 26, color: "black" }}>
                   List Of Users
                  </p>
                </Col>
              </Row>
              <Table striped bordered hover>
              <thead className="thead-light" >
                <tr>
                <th className="head" scope="col" style={{ fontSize: 16, fontFamily: "Poppins", color: "black" }}> EMPLOYEE ID</th>
                  <th className="head" scope="col" style={{ fontSize: 16, fontFamily: "Poppins", color: "black" }}> NAME</th>
                  <th  className="head" scope="col" style={{ fontSize: 16, fontFamily: "Poppins", color: "black" }}>MOBILE NUMBER</th>
                  <th className="head" scope="col" style={{ fontSize: 16, fontFamily: "Poppins", color: "black" }}>EMAIL</th>
                  <th className="head" scope="col" style={{ fontSize: 16, fontFamily: "Poppins", color: "black" }}> EDIT</th>
                  <th className="head" scope="col" style={{ fontSize: 16, fontFamily: "Poppins", color: "black" }}>DELETE</th>                 
                </tr>
                </thead>
                <tbody>
                  {this.state.tableData &&
                  this.state.tableData.length>0 &&
                  this.state.tableData.map((user,userkey)=>(
                    <tr key={userkey} >
                      <th scope="row">
                        {user.employeeId}</th>
                        <td>{user.name}</td>
                        <td>{user.mobNo}</td>
                        <td>{user.email}</td>
                        
                        <td>
                          
                          <Button variant="outline-primary"
                          onClick={() => this.nextPath("/onboardingEngineer") }                          
                          ><BsPencilSquare /></Button></td>
                          <td>
                          <Button 
                          variant="outline-danger"
                          onClick={() =>this.delete()}
                          ><BsFillTrash2Fill /> </Button>
                       </td>
                       </tr>

                  ))}
                  </tbody>
                  </Table>
                  </Container>
              </div>
              </div>
              </main>
              </div>
        );
    }
}
export default userLists;