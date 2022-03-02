import { combineReducers } from "redux";
import acceptedPartnersReducer from "./acceptedCompany/reducer";
//------>self employee req and accept
import acceptedSelfEmployeereducer from "./acceptedSelfEmployee1/reducer";
import AcceptOrDenyNewAdminSagaReducer from "./AcceptOrDenyNewAdmin/reducer";
import adminloginreducer from "./admin_login/reducer";
import priceReducer from "./commercialPrice/reducer";
//------> company req and accept
import companyNewRequestsreducer from "./companyRequest/reducer";
import newsLetterReducer from "./components/footer/reducer";
//import validateOtpReducer from './registerotp/reducer';
//import registrationPasswordReducer from './registerpassword/reducer';
import loginReducer from "./components/header/reducer";
import logoutReducer from "./components/header_login/reducer";
import smallbannerRerducer from "./components/smallBanner/reducer";
import contactUsReducer from "./contactus/reducer";
import ctrlSwiftLiteReducer from "./ctrlSwiftLitePlan/reducer";
import customerDetailsReducer from "./customerDetails/reducer";
import customizePageReducer from "./customize/reducer";
import priceDetailsReducer from "./customize_page2/reducer";
// import getmailcustomerReducer from './forgotpasswordcustomer/getmailcustomer/reducer';
// import forgotOtpCustomerReducer from './forgotpasswordcustomer/validate_otp_customer/reducer';
// import resetCustomerReducer from './forgotpasswordcustomer/resetpasswordcustomer/reducer';
import detailsReducer from "./details/reducer";
import discountReducer from "./discount/reducer";
import dmsaReducer from "./dmsa/reducer";
import exchangeRateReducer from "./exchangevalue/reducer";
import requestInquiryListreducer from "./faqCard/reducer";
import feedbackReducer from "./feedbacks/reducer";
import getmailReducer from "./forgotpassword/getmail/reducer";
import resetReducer from "./forgotpassword/restpassword/reducer";
import forgotOtpReducer from "./forgotpassword/validate_otp/reducer";
import editprofileReducer from "./myAccount/editProfile/reducer";
import invoiceCreateReducer from "./myAccount/invoiceCreate/reducer";
import changePlanReducer from "./myAccount/plandetails/reducer";
import taxInvoiceReducer from "./myAccount/taxInvoice/reducer";
import dmasAnnexureReducer from "./myAccount/viewDMSA/reducer";
import viewInvoiceReducer from "./myAccount/viewInvoice/reducer";
import noticePeriodReducer from "./noticePeriod/reducer";
import orderChangeReducer from "./ordersummary/reducer";
import partnerLoginreducer from "./partnerLogin/reducer";
//------>Partner Registration
import partnerRegisterReducer from "./partnerRegister/reducer";
import projectManagerLoginreducer from "./projectManagerLogin/reducer";
import registrationReducer from "./register/reducer";
import registercustomerReducer from "./registercustomer/reducer";
import reportReducer from "./report/reducer";
import requestDemoReducer from "./requestdemo/reducer";
import requestreducer from "./requests/reducer";
import salesAdminLoginReducer from "./sales_login/reducer";
//------>self employee Registration
import selfempRegisterReducer from "./selfEmployedReg/reducer";
import requestedSelfEmployeereducer from "./selfEmployeeRequest/reducer";
import serviceTaxReducer from "./servicetaxfixation/reducer";
//--------->set New password
import setNewPasswordReducer from "./setNewPassword/reducer";
import terminateorderReducer from "./terminationordersummary/reducer";
//import updateReducer from './editprofileotp/reducer';
import upgradeReducer from "./upgrade/reducer";
import usersReducer from "./usermanagement/reducer";
// import choosePlansReducer from './myAccount/choosePlans/reducer';
import waiveoffReducer from "./waiveoffinvoiceid/reducer";
import waiveoffOtpReducer from "./waiveoffotp/reducer";
import TicketsReducer from "./partners/tickets/reducer";
import SRNReducer from "./partners/SRN/reducer";



const rootReducer = combineReducers({
  usersReducer,
  adminloginreducer,
  getmailReducer,
  forgotOtpReducer,
  resetReducer,
  requestreducer,
  salesAdminLoginReducer,
  requestDemoReducer,
  feedbackReducer,
  detailsReducer,
  serviceTaxReducer,
  customizePageReducer,
  registrationReducer,
  //validateOtpReducer,
  //registrationPasswordReducer,
  loginReducer,
  // getmailcustomerReducer,
  // forgotOtpCustomerReducer,
  // resetCustomerReducer,
  editprofileReducer,
  priceDetailsReducer,
  dmsaReducer,
  changePlanReducer,
  viewInvoiceReducer,
  logoutReducer,
  dmasAnnexureReducer,
  //choosePlansReducer,
  waiveoffReducer,
  waiveoffOtpReducer,
  taxInvoiceReducer,
  contactUsReducer,
  invoiceCreateReducer,
  // updateReducer,
  upgradeReducer,
  orderChangeReducer,
  registercustomerReducer,
  exchangeRateReducer,
  discountReducer,
  priceReducer,
  terminateorderReducer,
  customerDetailsReducer,
  reportReducer,
  noticePeriodReducer,
  newsLetterReducer,
  projectManagerLoginreducer,
  AcceptOrDenyNewAdminSagaReducer,
  smallbannerRerducer,
  requestInquiryListreducer,
  ctrlSwiftLiteReducer,
  partnerLoginreducer,
  companyNewRequestsreducer,
  acceptedPartnersReducer,
  acceptedSelfEmployeereducer,
  requestedSelfEmployeereducer,
  partnerRegisterReducer,
  selfempRegisterReducer,
  setNewPasswordReducer,
  TicketsReducer,
  SRNReducer,
});

export default rootReducer;
