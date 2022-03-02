import { PropTypes } from 'prop-types';
import React from "react";
import { Button, ButtonGroup, ButtonToolbar, Modal } from "react-bootstrap";
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import Footer from "../components/footer/Footer";
import HeaderLogin from "../components/header_login/HeaderLogin";
import * as Constants from '../constants';
import { agreementUpdate, fileUpload } from './action';
class dmsa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          poNumber:'',
          gstNumber:'',
          files:null,
          checkbox:false,
          plansList:'',
          annexure:["flase","false","false"],
          annexureA:false,
          annexureB:false,
          annexureC:false,
          annexureACheck:false,
          annexureBCheck:false,
          annexureCCheck:false,
          data:'',
          clickSubmit:false,
          clickFileUpload:false,
        }
        this.handleChange = this.handleChange.bind(this);
    }


    handleInputChange =()=>{
      this.setState({
        clickSubmit:true,
      })
      const data ={
        "email":window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
        "gstNumber":this.state.gstNumber,
        "plansList":this.state.plansList,
        "isTollFreeNumber":this.props.dataCustomizePage1.isTollFreeNumber,
          "contractDuration":this.props.dataCustomizePage1.contractDuration,
          "payment":this.props.dataCustomizePage1.payment,
          "serviceInitializationDate":this.props.dataCustomizePage1.serviceInitializationDate,
          "currencyCode":this.props.dataCustomizePage.currency==="$"?"USD":"INR",
      }
           console.log("data \n \n"+JSON.stringify(data));

             this.state.data=data;

      if(!!window.sessionStorage.getItem(Constants.ACCESS_EMAIL)){
      var count=0
     for(var i=0;i<this.state.annexure.length;i++){
      if(this.state.annexure[i]=="true"){
        count=count+1;
      }
     }
     if(this.state.gstNumber ){
      if(count===1){
        if(this.state.annexureACheck === true){
         this.setState({checkbox: !this.state.checkbox,clickSubmit:true})
         this.props.agreementUpdate(this.state.data)
        }else{
         Swal.fire({
           title: "",
           text: "Please click the I Agree in Annexure.",
           icon: 'warning',
           showCancelButton: false,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'OK'
       })
       }
      }

      if(count===2){
       if(this.state.annexureACheck === true && this.state.annexureBCheck === true){
        this.setState({checkbox: !this.state.checkbox,clickSubmit:true})
        this.props.agreementUpdate(this.state.data)
       }else{
         Swal.fire({
           title: "",
           text: "Please click the I Agree in Annexure.",
           icon: 'warning',
           showCancelButton: false,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'OK'
       })
       }
     }

     if(count===3){
       if(this.state.annexureACheck === true && this.state.annexureBCheck === true && this.state.annexureCCheck === true){
        this.setState({checkbox: !this.state.checkbox,clickSubmit:true})
        this.props.agreementUpdate(this.state.data)
       }else{
         Swal.fire({
           title: "",
           text: "Please click the I Agree in Annexure.",
           icon: 'warning',
           showCancelButton: false,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'OK'
       })
       }
     }
   }else{
     Swal.fire({
         title: "",
         text: "Please fill the Registered Tax ID.",
         icon: 'warning',
         showCancelButton: false,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'OK'
     })
 }

     }else{
      Swal.fire({
          title: "",
          text: "Please login before proceeding.",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
      })
  }
  }

    annexureACheck =(event)=>{

      this.setState({
        annexureACheck: !this.state.annexureACheck,
        annexureA:false
      })
          }

          annexureBCheck =(event)=>{

            this.setState({
              annexureBCheck: !this.state.annexureBCheck,
              annexureB:false
            })
                }

                annexureCCheck =(event)=>{

                  this.setState({
                    annexureCCheck: !this.state.annexureCCheck,
                    annexureC:false
                  })
                      }

    handleChange = (event) => {
      const {name, value} = event.target;
      this.setState({
          [name]: value
      });}

      handleCloseEnterprise =()=>{
        this.setState({
          annexureA:false,
          annexureB:false,
          annexureC:false,
        })
      }

      annexureA =()=>{
        this.setState({
          annexureA:true
        })
      }

      annexureB =()=>{
        this.setState({
          annexureB:true
        })
      }

      annexureC =()=>{
        this.setState({
          annexureC:true
        })
      }


      file = (e)=>{
         let file=e.target.files[0]
         console.log("e.target.files[0]\n"+JSON.stringify(e.target.files[0]))
        this.setState({file:file})
      }


      fileUpload=(e)=>{
        this.setState({clickFileUpload:true})
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('number', this.state.poNumber);
        formData.append('email', window.sessionStorage.getItem(Constants.ACCESS_EMAIL));
        console.log("formData\n"+JSON.stringify(formData.getAll('email')));
        if(window.sessionStorage.getItem(Constants.ACCESS_EMAIL)){
          if(this.state.file&&this.state.poNumber){
            this.props.fileUpload(formData);
          }else{
            Swal.fire({
              title: "",
              text: "Please fill all the required fields.",
              icon: 'warning',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'OK'
          })
          }
        }else{
          Swal.fire({
            title: "",
            text: "Please login before proceeding",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        })
        }
      }


  componentDidMount() {
    if( window.sessionStorage.getItem(Constants.ACCESS_INVOICENUMB) !== undefined && window.sessionStorage.getItem(Constants.ACCESS_INVOICENUMB) != null) {
      console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_INVOICENUMB));
     // this.props.clearTokensCustomer();
  }
  if( window.sessionStorage.getItem(Constants.ACCESS_COUNTRY) !== undefined && window.sessionStorage.getItem(Constants.ACCESS_COUNTRY) != null) {
    console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_COUNTRY));
   // this.props.clearTokensCustomer();
}
if( window.sessionStorage.getItem(Constants.ACCESS_INVOICEDATE) !== undefined && window.sessionStorage.getItem(Constants.ACCESS_INVOICEDATE) != null) {
    console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_INVOICEDATE));
   // this.props.clearTokensCustomer();
}

if( window.sessionStorage.getItem(Constants.ACCESS_PAYMENTTERMS) !== undefined && window.sessionStorage.getItem(Constants.ACCESS_PAYMENTTERMS) != null) {
  console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_PAYMENTTERMS));
 // this.props.clearTokensCustomer();
}
if( window.sessionStorage.getItem(Constants.ACCESS_DUEDATE) !== undefined && window.sessionStorage.getItem(Constants.ACCESS_DUEDATE) != null) {
  console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_DUEDATE));
 // this.props.clearTokensCustomer();
}

if( window.sessionStorage.getItem(Constants.ACCESS_ITEM) !== undefined && window.sessionStorage.getItem(Constants.ACCESS_ITEM) != null) {
  console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_ITEM));
 // this.props.clearTokensCustomer();
}

if( window.sessionStorage.getItem(Constants.ACCESS_SUBTOTAL) !== undefined && window.sessionStorage.getItem(Constants.ACCESS_SUBTOTAL) != null) {
  console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_SUBTOTAL));
 // this.props.clearTokensCustomer();
}

if( window.sessionStorage.getItem(Constants.ACCESS_TOTAL) !== undefined && window.sessionStorage.getItem(Constants.ACCESS_TOTAL) != null) {
  console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_TOTAL));
 // this.props.clearTokensCustomer();
}
if( window.sessionStorage.getItem(Constants.ACCESS_BALANCEDUE) !== undefined && window.sessionStorage.getItem(Constants.ACCESS_BALANCEDUE) != null) {
  console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_BALANCEDUE));
 // this.props.clearTokensCustomer();
}
if( window.sessionStorage.getItem(Constants.ACCESS_TOTALINWORDS) !== undefined && window.sessionStorage.getItem(Constants.ACCESS_TOTALINWORDS) != null) {
  console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_TOTALINWORDS));
 // this.props.clearTokensCustomer();
}
if( window.sessionStorage.getItem(Constants.ACCESS_ADDRESS) !== undefined && window.sessionStorage.getItem(Constants.ACCESS_ADDRESS) != null) {
  console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_ADDRESS));
 // this.props.clearTokensCustomer();
}

if( window.sessionStorage.getItem(Constants.ACCESS_CITY) !== undefined && window.sessionStorage.getItem(Constants.ACCESS_CITY) != null) {
  console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_CITY));
 // this.props.clearTokensCustomer();
}

if( window.sessionStorage.getItem(Constants.ACCESS_COMPANY) !== undefined && window.sessionStorage.getItem(Constants.ACCESS_COMPANY) != null) {
  console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_COMPANY));
 // this.props.clearTokensCustomer();
}
if( window.sessionStorage.getItem(Constants.ACCESS_PINCODE) !== undefined && window.sessionStorage.getItem(Constants.ACCESS_PINCODE) != null) {
  console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_PINCODE));
 // this.props.clearTokensCustomer();
}



    console.log("this.props.recommendedPrice \n"+JSON.stringify(this.state.gstNumber));
    if(this.state.poNumber.length<4){this.setState({file:''})}
     console.log("this.props.recommendedPrice \n"+JSON.stringify(this.props.recommendedPrice));
     console.log("this.props.priceByTerms \n"+JSON.stringify(this.props.priceByTerms));
     console.log("this.props.pricedetails \n"+JSON.stringify(this.props.pricedetails));
     console.log("this.props.dataCustomizePage \n"+JSON.stringify(this.props.dataCustomizePage));
     console.log("this.props.dataCustomizePage1 \n"+JSON.stringify(this.props.dataCustomizePage1));
    // console.log("this.props.dataCustomizePage1 \n"+JSON.stringify(this.props.dataCustomizePage1.plansList.length));
if(this.props.dataCustomizePage1 !==undefined && this.props.dataCustomizePage1 !== null &&this.props.dataCustomizePage1.plansList.length>0 &&
  this.props.recommendedPrice !==undefined && this.props.recommendedPrice !== null &&this.props.recommendedPrice.modelList.length>0 &&
  this.props.dataCustomizePage !==undefined && this.props.dataCustomizePage !== null &&this.props.dataCustomizePage.data.length>0 && !this.state.gstNumber){
if( this.props.dataCustomizePage1.plansList.length===1){
  this.setState({ annexure:["true","false","false"]})
}else if( this.props.dataCustomizePage1.plansList.length===2){
  this.setState({ annexure:["true","true","false"]})
}else if( this.props.dataCustomizePage1.plansList.length===3){
  this.setState({ annexure:["true","true","true"]})
}

  const plansList= this.props.dataCustomizePage1.plansList.map((row,rowkey)=>{
    return{
     "plan":row.plan,
     "commericialModel":row.commericialModel,
     "recommendSeat":row.recommendSeat,
     "ticket":row.ticket,
     "serviceSupport":row.serviceSupport,
     "supportWindow":row.supportWindow ,
     "recommendPrice": this.props.recommendedPrice.modelList[rowkey].recommendPrice,
     "recommendModel": this.props.recommendedPrice.modelList[rowkey].recommendModel,
     "userEnteredSeatCount":this.props.recommendedPrice.modelList[rowkey].userEnteredSeatCount,
     "recommendSeat": this.props.recommendedPrice.modelList[rowkey].recommendSeat,
     "selectedModelPrice":this.props.recommendedPrice.modelList[rowkey].selectedModelPrice,
     "paymentTerms":this.props.dataCustomizePage.data[rowkey].paymentTerms,
     "individualPrice":this.props.dataCustomizePage.data[rowkey].individualPlanPrice,
    }
  })
  console.log("plansList \n"+JSON.stringify(plansList));
  this.state.plansList=plansList;

}
}

componentDidUpdate(prevProps, prevState, snapshot) {
  //console.log("--this.state.poNumber------->"+this.state.poNumber+"---this.state.gstNumber---------->"+this.state.gstNumber)
console.log("this.state.annexure \n"+JSON.stringify(this.state.annexure))
  // if(this.state.checkbox === true){
  //   this.props.agreementUpdate(this.state.data)

  // }
  console.log("this.props.recommendedPrice \n"+JSON.stringify(this.state.gstNumber));



  if(this.props.dataCustomizePage1 !==undefined && this.props.dataCustomizePage1 !== null &&this.props.dataCustomizePage1.plansList.length>0 &&
    this.props.recommendedPrice !==undefined && this.props.recommendedPrice !== null &&this.props.recommendedPrice.modelList.length>0 &&
    this.props.dataCustomizePage !==undefined && this.props.dataCustomizePage !== null &&this.props.dataCustomizePage.data.length>0 && !this.state.gstNumber){

    }



  if(this.props.fileUploadresponces !== undefined && this.props.fileUploadresponces !== null){
    if(this.props.fileUploadresponces !== prevProps.fileUploadresponces){
      if(this.props.fileUploadresponces.success == true&& this.state.clickFileUpload){
        this.state.clickFileUpload=false;
        Swal.fire({
          title: "",
          text: "File uploaded is successfully",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
      })
      }
    }
  }

if(this.props.updateAgreement!==undefined && this.props.updateAgreement !== null ){

  if(this.props.updateAgreement !== prevProps.updateAgreement){
    if(this.props.updateAgreement.success == true&& this.state.clickSubmit){
      window.sessionStorage.setItem(Constants.ACCESS_INVOICENUMB, this.props.updateAgreement.invoiceNumber);
      window.sessionStorage.setItem(Constants.ACCESS_COMPANY, this.props.updateAgreement.company);
      window.sessionStorage.setItem(Constants.ACCESS_CITY, this.props.updateAgreement.city);
      window.sessionStorage.setItem(Constants.ACCESS_ADDRESS, this.props.updateAgreement.address);
      window.sessionStorage.setItem(Constants.ACCESS_PINCODE, this.props.updateAgreement.pincode);
      window.sessionStorage.setItem(Constants.ACCESS_COUNTRY, this.props.updateAgreement.country);

      window.sessionStorage.setItem(Constants.ACCESS_INVOICEDATE, this.props.updateAgreement.invoiceDate);
      window.sessionStorage.setItem(Constants.ACCESS_PAYMENTTERMS, this.props.updateAgreement.paymentTerms);
      window.sessionStorage.setItem(Constants.ACCESS_DUEDATE, this.props.updateAgreement.dueDate);
      window.sessionStorage.setItem(Constants.ACCESS_ITEM, this.props.updateAgreement.lineItems[1].itemAndDescription);
      window.sessionStorage.setItem(Constants.ACCESS_SUBTOTAL, this.props.updateAgreement.subtotal);
      window.sessionStorage.setItem(Constants.ACCESS_BALANCEDUE, this.props.updateAgreement.balanceDue);
      window.sessionStorage.setItem(Constants.ACCESS_TOTAL, this.props.updateAgreement.total);
      window.sessionStorage.setItem(Constants.ACCESS_TOTALINWORDS, this.props.updateAgreement.totalInWords);
      this.props.history.push('/taxInvoice');
      this.state.clickSubmit=false;
      this.state.checkbox = false;
    }else if(this.props.updateAgreement.success == false&& this.state.clickSubmit){

        this.state.clickSubmit=false;
        this.state.checkbox = false;

      Swal.fire({
        title: "",
        text: this.props.updateAgreement.message,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
    })
    }
  }
}

}

render() {
    const{poNumber,gstNumber,files}=this.state

    return(

        <div>
             <HeaderLogin />
             <section className="relative banner-area-inner16" style={{paddingTop: '200px', textAlign:'center'}}>
				<div className="overlay overlay-bg overlay-bg-blk"></div>
				<div className="container">
					<div className="row height align-items-center justify-content-center">
						<div className="col-lg-10">
							<div className="generic-banner-content">
								<h2 className="head2-inner">One Process - One Tool</h2>
								<p className="text-white" style={{opacity: 0.5}}>B1-DeskTM comprises of a robust maturity assessment methodology and transformation cookbooks to progressively drive the Service Desk transformation to the desired end-state.</p>
							</div>
						</div>
					</div>
				</div>
			</section>
           <br/>





           <main className="main-content bgc-grey-100">
                    <div id="mainContent">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                <div className="col-md-1"/>
                                    <div className="col-md-10">
                                        <div className="bgc-white p-20" style={{paddingBottom: "0px"}}>
                                            <div className="row">
                                                <h4 className="c-grey-900 col-md-6">Digital Master Service Agreement</h4>
                                            </div>
                                            <br/>
                                          <div className="mT-3">
                                                <form name="form" onSubmit={this.handleSubmit}>
                                                    <div className="form-row col-md-12">

                                                        <div className={"form-group col-md-5" }>
                                                            <label htmlFor="examplepoNumber">PO Number</label>
                                                            <input type="text" ref={input => this.poNumber = input}
                                                                   className="form-control" id="examplepoNumber"
                                                                   name="poNumber" value={poNumber} disabled={this.state.mode === 'edit'}
                                                                   onChange={this.handleChange}/>
                                                           {this.state.clickFileUpload && !this.state.poNumber && <div style ={{fontSize:12,color:"red"}}>This field is required</div>  }
                                                        </div>
                                                        <div className="col-md-2"/>
                                                          <div className={"form-group col-md-5" }>
                                                            <label htmlFor="gstNumber">Registered Tax ID<span style={{color:"red"}}>*</span></label>
                                                            <input type="text" ref={input => this.gstNumber = input}
                                                                   type="text" required pattern="[0-9a-zA-Z_.-]*"
                                                                   className="form-control" id="gstNumber"
                                                                   name="gstNumber" value={gstNumber}
                                                                   onChange={this.handleChange}/>
                                                            {this.state.clickSubmit && !this.state.gstNumber && <div style ={{fontSize:12,color:"red"}}>This field is required</div>  }
                                                        </div>
                                                    </div>
                                                    <div className="form-row col-md-12">

                                                      <div  className="form-group col-md-12">

    <label for="exampleFormControlFile1">Upload PO file</label>

    <input type="file" disabled={this.state.poNumber.length>=4?false:true} className="form-control-file" id="exampleFormControlFile1" name="file" style={{borderBlockStyle:'outset'}} onChange={(e)=>this.file(e) }/>
    {this.state.clickFileUpload && !this.state.file && <div style ={{fontSize:12,color:"red"}}>This field is required</div>  }

  </div>
</div>
<br/>
<div className="form-row col-md-12">
<div className={"form-group col-md-12"}>
        <div >
  <ButtonToolbar aria-label="Toolbar with button groups">
  <ButtonGroup className="mr-2" >
  <Button className="genric-btn primary radius text-uppercase" variant="success" onClick={(e)=>this.fileUpload(e)}>Upload</Button>
  </ButtonGroup>
  </ButtonToolbar>
  </div>
       </div>
       </div>
       <br/>
       <br/>
       <div className="form-row col-md-12">
          <div >
  <h4>Instructions of MSA contents are present here</h4>
       </div></div>
       <br/>  <br/>
       <div className="form-group col-md-12">
       <div className=" col-md-12" style={{borderBottomStyle:'initial'}}>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="15" disabled="true">
    Lorem ipsum dolor sit amet, ut agam bonorum pertinacia qui, per debet dicit te. Cu aperiam labores vis, ei partem primis melius est, cu tantas vulputate definitionem usu. Eros aliquam sea ne, his iuvaret blandit ut, causae option temporibus est ea. Ius an cibo virtute suscipit, et habeo inani dolor sit, delenit tacimates complectitur his ei. No vel meis atqui consectetuer. Ex posse aliquid forensibus vel, pro atomorum consetetur voluptatum ea.

Pro iudico constituto incorrupte ea. Vim ut simul adipisci, electram convenire hendrerit mea cu. No iudico explicari his. Duo offendit ponderum mandamus ex, ne modus maluisset pri.

Qui ei dicat meliore. Atqui veniam eum no, vis at quando recteque. Quo ut paulo eruditi. Errem vocibus suscipiantur eos no.

Eum elitr habemus in, inermis invidunt voluptaria duo cu. Facilisi sapientem consetetur usu an, populo mollis cu vis. Cu quo ignota doming doctus. Ius quot meliore civibus an, ius vidisse oporteat philosophia an. Dictas facilisi ad mea, sit et tollit fabulas, mei eu sensibus complectitur.

Ad sea solum nobis blandit, te eos laudem aliquando quaerendum. Est ne postulant gubergren persecuti, eu percipit verterem efficiantur eum. Natum imperdiet ex mel. Soleat vocent tacimates ad vix, quo putant invenire partiendo ex, est et corpora assueverit. Nec ipsum viderer in, te iuvaret contentiones vim, quo sanctus atomorum eleifend an.
Lorem ipsum dolor sit amet, ut agam bonorum pertinacia qui, per debet dicit te. Cu aperiam labores vis, ei partem primis melius est, cu tantas vulputate definitionem usu. Eros aliquam sea ne, his iuvaret blandit ut, causae option temporibus est ea. Ius an cibo virtute suscipit, et habeo inani dolor sit, delenit tacimates complectitur his ei. No vel meis atqui consectetuer. Ex posse aliquid forensibus vel, pro atomorum consetetur voluptatum ea.

Pro iudico constituto incorrupte ea. Vim ut simul adipisci, electram convenire hendrerit mea cu. No iudico explicari his. Duo offendit ponderum mandamus ex, ne modus maluisset pri.

Qui ei dicat meliore. Atqui veniam eum no, vis at quando recteque. Quo ut paulo eruditi. Errem vocibus suscipiantur eos no.

Eum elitr habemus in, inermis invidunt voluptaria duo cu. Facilisi sapientem consetetur usu an, populo mollis cu vis. Cu quo ignota doming doctus. Ius quot meliore civibus an, ius vidisse oporteat philosophia an. Dictas facilisi ad mea, sit et tollit fabulas, mei eu sensibus complectitur.

Ad sea solum nobis blandit, te eos laudem aliquando quaerendum. Est ne postulant gubergren persecuti, eu percipit verterem efficiantur eum. Natum imperdiet ex mel. Soleat vocent tacimates ad vix, quo putant invenire partiendo ex, est et corpora assueverit. Nec ipsum viderer in, te iuvaret contentiones vim, quo sanctus atomorum eleifend an.
Lorem ipsum dolor sit amet, ut agam bonorum pertinacia qui, per debet dicit te. Cu aperiam labores vis, ei partem primis melius est, cu tantas vulputate definitionem usu. Eros aliquam sea ne, his iuvaret blandit ut, causae option temporibus est ea. Ius an cibo virtute suscipit, et habeo inani dolor sit, delenit tacimates complectitur his ei. No vel meis atqui consectetuer. Ex posse aliquid forensibus vel, pro atomorum consetetur voluptatum ea.

Pro iudico constituto incorrupte ea. Vim ut simul adipisci, electram convenire hendrerit mea cu. No iudico explicari his. Duo offendit ponderum mandamus ex, ne modus maluisset pri.

Qui ei dicat meliore. Atqui veniam eum no, vis at quando recteque. Quo ut paulo eruditi. Errem vocibus suscipiantur eos no.

Eum elitr habemus in, inermis invidunt voluptaria duo cu. Facilisi sapientem consetetur usu an, populo mollis cu vis. Cu quo ignota doming doctus. Ius quot meliore civibus an, ius vidisse oporteat philosophia an. Dictas facilisi ad mea, sit et tollit fabulas, mei eu sensibus complectitur.

Ad sea solum nobis blandit, te eos laudem aliquando quaerendum. Est ne postulant gubergren persecuti, eu percipit verterem efficiantur eum. Natum imperdiet ex mel. Soleat vocent tacimates ad vix, quo putant invenire partiendo ex, est et corpora assueverit. Nec ipsum viderer in, te iuvaret contentiones vim, quo sanctus atomorum eleifend an.
    </textarea>
  </div></div>
  <br/>
  <br/>
  {/* <div className="form-row col-md-12">
  <div className={"col-md-3"}/>
<div className={"form-group col-md-6"}>
        <div >
  <ButtonToolbar aria-label="Toolbar with button groups">
  {(this.state.annexure[0]=="true"&&this.state.annexure[1]=="false"&& this.state.annexure[2]=="flase")?
  <ButtonGroup className="mr-4" style={{alignSelf:"center"}}>
  <Button className="genric-btn primary radius text-uppercase" variant="success" onClick={this.annexureA}>Annexure A</Button>
  </ButtonGroup>:null}
  {this.state.annexure[1]=="true"?<ButtonGroup className="mr-2" >
  <Button className="genric-btn primary radius text-uppercase" variant="success" onClick={this.annexureB}>Annexure B</Button>
  </ButtonGroup>:null}
  {this.state.annexure[2]=="true"?<ButtonGroup className="mr-2" >
  <Button className="genric-btn primary radius text-uppercase" variant="success"onClick={this.annexureC}>Annexure c</Button>
  </ButtonGroup>:null}
  </ButtonToolbar>
  </div>
  <div className={"col-md-3"}/>
       </div>
       </div> */}

     { (this.state.annexure[0]=="true"&&this.state.annexure[1]=="false"&& this.state.annexure[2]=="false")?  <div className="form-row col-md-12">
  <div className={"col-md-5"}/>
<div className={"form-group col-md-2"}>
        <div >
  <ButtonToolbar aria-label="Toolbar with button groups">
  <ButtonGroup className="mr-2" >
  <Button className="genric-btn primary radius text-uppercase" variant="success" onClick={this.annexureA}>Annexure A</Button>
  </ButtonGroup>
  </ButtonToolbar>
  </div>
  <div className={"col-md-5"}/>
       </div>
       </div>:(this.state.annexure[0]=="true"&&this.state.annexure[1]=="true"&& this.state.annexure[2]=="false")?  <div className="form-row col-md-12">
  <div className={"col-md-4"}/>
<div className={"form-group col-md-4"}>
        <div >
  <ButtonToolbar aria-label="Toolbar with button groups">
  <ButtonGroup className="mr-2" >
  <Button className="genric-btn primary radius text-uppercase" variant="success" onClick={this.annexureA}>Annexure A</Button>
  </ButtonGroup>
  <ButtonGroup className="mr-2" >
  <Button className="genric-btn primary radius text-uppercase" variant="success" onClick={this.annexureB}>Annexure B</Button>
  </ButtonGroup>
  </ButtonToolbar>
  </div>
  <div className={"col-md-4"}/>
       </div>
       </div>:(this.state.annexure[0]=="true"&&this.state.annexure[1]=="true"&& this.state.annexure[2]=="true")?  <div className="form-row col-md-12">
  <div className={"col-md-3"}/>
<div className={"form-group col-md-6"}>
        <div >
  <ButtonToolbar aria-label="Toolbar with button groups">
  <ButtonGroup className="mr-2" >
  <Button className="genric-btn primary radius text-uppercase" variant="success" onClick={this.annexureA}>Annexure A</Button>
  </ButtonGroup>
  <ButtonGroup className="mr-2" >
  <Button className="genric-btn primary radius text-uppercase" variant="success" onClick={this.annexureB}>Annexure B</Button>
  </ButtonGroup>
  <ButtonGroup className="mr-2" >
  <Button className="genric-btn primary radius text-uppercase" variant="success"onClick={this.annexureC}>Annexure c</Button>
  </ButtonGroup>
  </ButtonToolbar>
  </div>
  <div className={"col-md-3"}/>
       </div>
       </div>:null}

       <div className="form-row col-md-12">
       <div className="col-md-5"/>
       <div className="col-sm-2">
       {/* <input
            name="isGoing"
            type="checkbox"
            checked={this.state.checkbox}
            onChange={this.handleInputChange}
            /> <text>I Agree</text> */}
              <Button className="genric-btn primary radius text-uppercase" variant="success"onClick={this.handleInputChange}>I Agree</Button>
              <div className="col-md-5"/>
</div>

            </div>

                                                </form>

                                            </div>
                                        </div>
                                        <div className="col-md-1"/>
                                        </div>  </div>  </div>

                                         </div> </div>

                </main>

                <Modal show={this.state.annexureA} onHide={ this.handleCloseEnterprise} backdrop={'static'}>
                    <Modal.Header closeButton>
                    <h5 className="text-center" >
                          <span >Annexure A</span>
                         </h5>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="form-group">

                          File will be update
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                    <div className="col-sm-3">
       {/* <input
            name="isGoing"
            type="checkbox"
            checked={this.state.annexureACheck}
            onChange={this.annexureACheck}
            /> <text>I Agree</text> */}
            <Button className="genric-btn primary radius text-uppercase" variant="success"onClick={this.annexureACheck}>I Agree</Button>

</div>

                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.annexureB} onHide={ this.handleCloseEnterprise} backdrop={'static'}>
                    <Modal.Header closeButton>
                    <h5 className="text-center" >
                          <span >Annexure B</span>
                         </h5>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="form-group">

                          File will be update
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                    <div className="col-sm-3">
       {/* <input
            name="isGoing"
            type="checkbox"
            checked={this.state.annexureBCheck}
            onChange={this.annexureBCheck}
            /> <text>I Agree</text> */}
  <Button className="genric-btn primary radius text-uppercase" variant="success"onClick={this.annexureBCheck}>I Agree</Button>

</div>
                    </Modal.Footer>
                </Modal>


                <Modal show={this.state.annexureC} onHide={ this.handleCloseEnterprise} backdrop={'static'}>
                    <Modal.Header closeButton>
                    <h5 className="text-center" >
                          <span >Annexure C</span>
                         </h5>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="form-group">

                          File will be update
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                    <div className="col-sm-3">
       {/* <input
            name="isGoing"
            type="checkbox"
            checked={this.state.annexureCCheck}
            onChange={this.annexureCCheck}
            /> <text>I Agree</text> */}
   <Button className="genric-btn primary radius text-uppercase" variant="success"onClick={this.annexureCCheck}>I Agree</Button>

</div>
                    </Modal.Footer>
                </Modal>


           <br/>
     <Footer />
     </div>
    )
}
}
dmsa.propTypes = {

   recommendedPrice:PropTypes.func,
   updateAgreement:PropTypes.func,
   fileUploadresponces:PropTypes.func,
};


const mapStateToProps = state => {
  console.log(state, 'feedback list');
  return {
      pricedetails: state.priceDetailsReducer.pricedetails,
       recommendedPrice:state.customizePageReducer.recommendedPrice,
       dataCustomizePage1:state.customizePageReducer.dataCustomizePage1,
       dataCustomizePage:state.priceDetailsReducer.dataCustomizePage,
       priceByTerms:state.priceDetailsReducer.priceByTerms,
       updateAgreement:state.dmsaReducer.updateAgreement,
       fileUploadresponces:state.dmsaReducer.fileUploadresponces,
  };
};
const mapDispatchToProps = dispatch => ({

  agreementUpdate: data => dispatch(agreementUpdate(data)),
  fileUpload:data => dispatch(fileUpload(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(dmsa);
