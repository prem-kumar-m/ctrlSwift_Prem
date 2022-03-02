import React, {Component} from "react";
import { Button, Form, Row, Col, Container, } from "react-bootstrap";
import Swal from "sweetalert2";



class terms extends Component {
  // constructor(props){
  //   super(props);
  //   this.state={
  //     isConfrim=false,
  //   }
  // }
  confirmation =() => {
   Swal.fire({
     text:"Successfully Registered!! your mail will be activated soon",
     confirmButtonText:"Ok",
   })
  }
    
    
    render() { 
        return (
            <div>
                <h1 style={{textAlign:"center"}}>TERMS AND CONDITIONS</h1>
                <Container>
                <p style={{textAlign:"center" }}>
                A Terms and Conditions agreement outlines the terms that visitors must agree to if they want to interact with your website. 
                 Essentially, if the visitor continues to use the website after accepting the Terms, they enter into a contract with you.
        
                </p>
                </Container>
                  
                 
                <Form.Row>
                      
                      <Form.Group as={Col} sm="10" />
                        <Button
                          className="genric-btn primary radius text-uppercase"
                          variant="success"
                          onClick={() => this.confirmation()}
                          
                        >
                          Register
                        </Button>
                      
                    </Form.Row>


            </div>
          );
    }
}
 
export default terms ;