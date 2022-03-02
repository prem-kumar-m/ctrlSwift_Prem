import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./saga";
import rootReducer from "./reducer";
import Users from "./usermanagement";
import forgotpassword from "./forgotpassword/getmail";
import forgotOtp from "./forgotpassword/validate_otp";
import resetPassword from "./forgotpassword/restpassword";
import Request from "./requests";
import "./App.css";
import RegisterPage from "./register/RegisterPage";
import Login from "./login/Login";
import RequestDemo from "./requestdemo/RequestDemo";
import customizePage from "./customize/customizePage";
import details from "./details";
import ctrlSwiftEnterprisePlan from "./ctrlSwiftEnterprisePlan/ctrlSwiftEnterprisePlan";
import ctrlSwiftPremiumPlan from "./ctrlSwiftPremiumPlan/ctrlSwiftPremiumPlan";
import ctrlSwiftLitePlan from "./ctrlSwiftLitePlan/ctrlSwiftLitePlan";
import Feedbacks from "./feedbacks";
import AboutctrlSwift from "./aboutctrlSwift/AboutctrlSwift";
import WhatisctrlSwift from "./whatisctrlSwift/WhatisctrlSwift";
import WhyctrlSwift from "./whyctrlSwift/WhyctrlSwift";
import FAQ from "./faq/FAQ";
import AboutPlatform from "./aboutplatform/AboutPlatform";
import ServiceOfferings from "./serviceofferings/ServiceOfferings";
import PricePlans from "./priceplans/PricePlans";
import ServiceOrdering from "./serviceordering/ServiceOrdering";
import OrderProcessing from "./orderprocessing/OrderProcessing";
import ServiceConfig from "./serviceconfig/ServiceConfig";
import ContractRelated from "./contractrelated/ContractRelated";
import InvoiceRelated from "./invoicerelated/InvoiceRelated";
import PaymentRelated from "./paymentrelated/PaymentRelated";
import ServiceCharges from "./servicecharges/ServiceCharges";
import ReportFaq from "./reportfaq/ReoprtFaq";
import FeedBack from "./feedback/FeedBack";
import ContactUs from "./contactus/ContactUs";
import ctrlSwiftLite from "./ctrlSwiftlite/ctrlSwiftLite";
import ctrlSwiftEnterprise from "./ctrlSwiftenterprise/ctrlSwiftEnterprise";
import ctrlSwiftUltimate from "./ctrlSwiftultimate/ctrlSwiftUltimate";
import ctrlSwiftPremium from "./ctrlSwiftpremium/ctrlSwiftPremium";
import viewInvoice from "./myAccount/viewInvoice/viewInvoice";
import editProfile from "./myAccount/editProfile/editProfile";
import planDetailsList from "./myAccount/plandetails/planDetails";
import viewDMSA from "./myAccount/viewDMSA/viewDMSA";
import taxInvoice from "./myAccount/taxInvoice/taxInvoice";
import dmsa from "./dmsa";
import serviceTax from "./servicetaxfixation";
import starrating from "./starrating/StarRating";
import planDetails from "./customize_page2";
import waiveOff from "./waiveoff/waiveOff";
import waiveOffInvoice from "./waiveoffinvoiceid/waiveOffInvoice";
import waiveOffOtp from "./waiveoffotp/waiveOffOtp";
import invoiceCreate from "./myAccount/invoiceCreate";
import customizePage2 from "./upgrade/upgradeCustomizePage";
import modifiedplanDetails from "./ordersummary";
import registerCustomer from "./registercustomer";
import exchangeValue from "./exchangevalue";
import discount from "./discount";
import terminationOrder from "./terminationordersummary";
import commercialprice from "./commercialPrice";
import customerDetials from "./customerDetails";
import report from "./report";
import noticePeriod from "./noticePeriod";
import yetToInitiatePlan from "./projectManagerLogin/yetToInitiatePlan";
import dashBoard from "./registercustomer/dashBoard";
import userDashboard from "./myAccount/editProfile/userDashboard";
import AcceptOrDenyNewAdmin from "./AcceptOrDenyNewAdmin";
//partnerTermsPopUp
import popUp from "./partnerTermsPopUp";
import faqCard from "./faqCard/faqCard";
import pagination from "./pagination/pagination";
//import profile from "./registercustomer/profile";
import partnerLogin from "./partnerLogin";
import onboardingEngineer from "./onboardingEngineer/onboardingEngineer";
import employeeList from "./employeeList/employeeList";
import companyEditProfile from "./companyEditProfile/companyEditProfile";

//-------->Request and accepted company-
import companyRequest from "./companyRequest/companyRequest";
import acceptedCompany from "./acceptedCompany/acceptedCompany";

//--------->Request and accepted Self employee
import acceptedSelfEmployee1 from "./acceptedSelfEmployee1/acceptedSelfEmployee1";
import selfEmployeeRequest from "./selfEmployeeRequest/selfEmployeeRequest";

//--------->Partner Regitration
import partnerRegister from "./partnerRegister/partnerRegister";
import selfEmployedReg from "./selfEmployedReg/selfEmployedReg";

//------->partner Home
import partnerHome from "./partnerHome/partnerHome";
//-->company side Set New password
import setNewPassword from "./setNewPassword/setNewPassword";
//>partner faq
import partnerFaq from "./partnerFaq/partnerFaq";
//-->partnerReports
import ptReports from "./ptReports/ptReports";
import PartnerCard from "./components/PartnerCard/PartnerCard";
import Notfound from "./components/Notfound";
import terms from "./components/footerpart/terms";
import privacy from "./components/footerpart/privacy";
import pricing from "./components/footerpart/pricing";
import cancellation from "./components/footerpart/cancellation";
import gpstracking from "./components/Gps/gpstracking";
import Tickets from "./partners/tickets/Tickets";
import ServiceRecivedNote from "./partners/SRN/ServiceRecivedNote";
import commercialSRN from "./commercialModule/commercialSRN/commercialSRN";
import commercialTicket from "./commercialModule/commercialTicket/commercialTickets"
import coomercialLogin from "./commercialModule/commercialLogin/commercialLogin"


const HomePage = lazy(() => import('./home/HomePage'));
const adminLogin = lazy(() => import('./admin_login'));
const salesLogin = lazy(() => import('./sales_login'));
const smallMenu = lazy(() => import('./smallmenu/smallMenu'));
const projectManagerLogin = lazy(() => import('./projectManagerLogin'));


class App extends Component {
  render() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
      rootReducer,
      applyMiddleware(thunk, sagaMiddleware)
    );
    console.log(store.getState());
    sagaMiddleware.run(rootSaga());
    return (
      <Provider store={store}>
        <Router>

          <Suspense fallback={<div style={{ fontSize: "20px", color: "black" }}>

            <div className="text-center">
              <div className="spinner-border text-info  m-10" role="status">
              </div>
            </div></div>}>

            <Switch>
              <Route path="/" component={HomePage} exact />

              <Route
                path="/Users/:id/:name/:mobile/:email/:role"
                component={Users}
              />
              <Route path="/user" component={Users} exact />
              <Route path="/taxInvoice" component={taxInvoice} exact />
              <Route path="/viewInvoice" component={viewInvoice} exact />
              <Route path="/editProfile" component={editProfile} exact />
              <Route path="/planDetailsList" component={planDetailsList} exact />
              <Route path="/viewDMSA" component={viewDMSA} exact />
              <Route path="/customizePage" component={customizePage} exact />
              <Route path="/requestdemo" component={RequestDemo} exact />
              <Route path="/admin" component={adminLogin} exact />
              <Route path="/forgotpassword" component={forgotpassword} exact />
              <Route path="/request" component={Request} exact />
              <Route path="/forgotOtp" component={forgotOtp} exact />
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={Login} />
              <Route path="/sales" component={salesLogin} exact />
              <Route path="/resetPassword" component={resetPassword} exact />
              <Route path="/ctrlSwiftLitePlan" component={ctrlSwiftLitePlan} exact />
              <Route
                path="/ctrlSwiftEnterprisePlan"
                component={ctrlSwiftEnterprisePlan}
                exact
              />
              <Route
                path="/ctrlSwiftPremiumPlan"
                component={ctrlSwiftPremiumPlan}
                exact
              />
              <Route path="/Feedbacks" component={Feedbacks} exact />
              <Route path="/details" component={details} exact />
              <Route path="/whatisctrlSwift" component={WhatisctrlSwift} exact />
              <Route path="/whyctrlSwift" component={WhyctrlSwift} exact />
              <Route path="/faq" component={FAQ} exact />
              <Route path="/aboutplatform" component={AboutPlatform} exact />
              <Route path="/priceplans" component={PricePlans} exact />
              <Route path="/serviceofferings" component={ServiceOfferings} exact />
              <Route path="/serviceordering" component={ServiceOrdering} exact />
              <Route path="/OrderProcessing" component={OrderProcessing} exact />
              <Route path="/serviceconfig" component={ServiceConfig} exact />
              <Route path="/ContractRelated" component={ContractRelated} exact />
              <Route path="/InvoiceRelated" component={InvoiceRelated} exact />
              <Route path="/PaymentRelated" component={PaymentRelated} exact />
              <Route path="/ServiceCharges" component={ServiceCharges} exact />
              <Route path="/ReportFaq" component={ReportFaq} exact />
              <Route path="/FeedBack" component={FeedBack} exact />
              <Route path="/ContactUs" component={ContactUs} exact />
              <Route path="/ctrlSwiftLite" component={ctrlSwiftLite} exact />
              <Route path="/ctrlSwiftEnterprise" component={ctrlSwiftEnterprise} exact />
              <Route path="/ctrlSwiftPremium" component={ctrlSwiftPremium} exact />
              <Route path="/ctrlSwiftUltimate" component={ctrlSwiftUltimate} exact />
              <Route path="/aboutctrlSwift" component={AboutctrlSwift} exact />
              <Route path="/dmsa" component={dmsa} exact />
              <Route path="/serviceTax" component={serviceTax} exact />
              <Route path="/starrating" component={starrating} exact />
              <Route path="/planDetails" component={planDetails} exact />
              <Route path="/waiveoff" component={waiveOff} exact />
              <Route path="/waiveoffinvoiceid" component={waiveOffInvoice} exact />
              <Route path="/waiveoffotp" component={waiveOffOtp} exact />
              <Route path="/customizePage2" component={customizePage2} exact />
              <Route path="/modifiedplanDetails" component={modifiedplanDetails} exact />
              <Route path="/invoiceCreate" component={invoiceCreate} exact />
              <Route path="/registerCustomer" component={registerCustomer} exact />
              <Route path="/exchangeValue" component={exchangeValue} exact />
              <Route path="/discount" component={discount} exact />
              <Route path="/commercialprice" component={commercialprice} exact />
              <Route path="/terminationOrder" component={terminationOrder} exact />
              <Route path="/customerDetials" component={customerDetials} exact />
              <Route path="/report" component={report} exact />
              <Route path="/noticePeriod" component={noticePeriod} exact />
              <Route
                path="/pmlogin"
                component={projectManagerLogin}
                exact
              />
              <Route
                path="/yetToInitiatePlan"
                component={yetToInitiatePlan}
                exact
              />
              <Route path="/dashBoard" component={dashBoard} exact />
              <Route path="/userDashboard" component={userDashboard} exact />
              <Route path="/setPassword" component={forgotpassword} exact />
              <Route path="/partnerTermsPopup" component={popUp} exact />
              <Route path="/AcceptOrDenyNewAdmin" component={AcceptOrDenyNewAdmin} exact />
              <Route path="/faqCard" component={faqCard} exact />
              <Route path="/pagination" component={pagination} exact />
              {/* <Route path="/profile" component={profile} exact /> */}
              <Route path="/terms" component={terms} exact />
              <Route path="smallmenu" component={smallMenu} exact />
              <Route path="/privacy" component={privacy} exact />
              <Route path="/pricing" component={pricing} exact />
              <Route path="/cancellation" component={cancellation} exact />
              <Route path="/partnerLogin" component={partnerLogin} exact />

              <Route path="/onboardingEngineer" component={onboardingEngineer} exact />
              <Route path="/employeeList" component={employeeList} exact />
              <Route
                path="/companyEP"
                component={companyEditProfile}
                exact
              />

              <Route path="/companyRequest" component={companyRequest} exact />
              <Route path="/acceptedCompany" component={acceptedCompany} exact />
              <Route
                path="/acceptedSelfEmployee1"
                component={acceptedSelfEmployee1}
                exact
              />
              <Route
                path="/selfEmployeeRequest"
                component={selfEmployeeRequest}
                exact
              />
              <Route path="/partnerRegister" component={partnerRegister} exact />
              <Route path="/selfEmployedReg" component={selfEmployedReg} exact />
              <Route path="/partnerHome" component={partnerHome} exact />
              <Route path="/setNewPassword" component={setNewPassword} exact />
              <Route path="/partnerFaq" component={partnerFaq} exact />
              <Route path="/ptReports" component={ptReports} exact />
              <Route path="/partners" component={PartnerCard} exact />
              <Route path="/tickets" component={Tickets} exact/>
              <Route path="/SRN" component={ServiceRecivedNote} exact/>
              <Route path="/commercialSRN" component={commercialSRN} exact/>
              <Route path="/commercialTickets" component={commercialTicket} exact/>
               <Route path="/commercialLogin" component={coomercialLogin} exact/>
              <Route path="/gps" component={gpstracking} exact/>
              
              <Route path="*" component={Notfound} exact />

            </Switch>
          </Suspense>


        </Router>


      </Provider>
    );
  }
}

export default App;
