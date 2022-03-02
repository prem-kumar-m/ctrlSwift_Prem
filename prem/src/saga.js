import { fork } from "redux-saga/effects";
import acceptedPartnersSaga from "./acceptedCompany/saga";
//--------->self employee req and accept
import acceptedSelfEmployeeSaga from "./acceptedSelfEmployee1/saga";
import AcceptOrDenyNewAdminSaga from "./AcceptOrDenyNewAdmin/saga";
import adminloginSaga from "./admin_login/saga";
import priceSaga from "./commercialPrice/saga";
//--->company req and accept
import companyNewRequestsSaga from "./companyRequest/saga";
import newsLetterSaga from "./components/footer/saga";
//import validateOtpSage from './registerotp/saga';
//import registrationpasswordSaga from './registerpassword/saga';
import loginSaga from "./components/header/saga";
import logoutSaga from "./components/header_login/saga";
import SmallBannerSaga from "./components/smallBanner/saga";
import contactUsSaga from "./contactus/saga";
import ctrlSwiftLiteSaga from "./ctrlSwiftLitePlan/saga";
import customerDetailsSaga from "./customerDetails/saga";
import customizePageSaga from "./customize/saga";
import priceDetailsSaga from "./customize_page2/saga";
// import getmailcustomerSaga from "./forgotpasswordcustomer/getmailcustomer/saga";
// import forgotOtpCustomerSage from './forgotpasswordcustomer/validate_otp_customer/saga';
// import resetCustomerSaga from './forgotpasswordcustomer/resetpasswordcustomer/saga';
import detailsSaga from "./details/saga";
import discountSaga from "./discount/saga";
import dmasSaga from "./dmsa/saga";
import rateSaga from "./exchangevalue/saga";
import requestInquiryListSaga from "./faqCard/saga";
import feedbackSaga from "./feedbacks/saga";
import getmailSaga from "./forgotpassword/getmail/saga";
import resetSaga from "./forgotpassword/restpassword/saga";
import forgotOtpSage from "./forgotpassword/validate_otp/saga";
import editProfilesaga from "./myAccount/editProfile/saga";
import invoiceCreateSaga from "./myAccount/invoiceCreate/saga";
import changePlansaga from "./myAccount/plandetails/saga";
import taxInvoicesaga from "./myAccount/taxInvoice/saga";
import dmasAnnexureSaga from "./myAccount/viewDMSA/saga";
import viewInvoicesaga from "./myAccount/viewInvoice/saga";
import noticePeriodSaga from "./noticePeriod/saga";
import orderChangeSaga from "./ordersummary/saga";
//--------->Partner Login
import partnerLoginSaga from "./partnerLogin/saga";
//-------->Partner Registration
import partnerRegisterSaga from "./partnerRegister/saga";
import projectManagerLoginSaga from "./projectManagerLogin/saga";
import registrationSaga from "./register/saga";
import reguserSaga from "./registercustomer/saga";
import reportSaga from "./report/saga";
import requestDemoSaga from "./requestdemo/saga";
import requestSaga from "./requests/saga";
import salesAdminLoginSaga from "./sales_login/saga";
//-------->selfepm Registration
import selfepmRegisterSaga from "./selfEmployedReg/saga";
import requestedSelfEmployeeSaga from "./selfEmployeeRequest/saga";
import serviceTaxSaga from "./servicetaxfixation/saga";
//--------->set New password
import setNewPasswordSaga from "./setNewPassword/saga";
import terminateOrderSaga from "./terminationordersummary/saga";
//import updateSaga from './editprofileotp/saga';
import upgradeSaga from "./upgrade/saga";
import userSaga from "./usermanagement/saga";
//import choosePlanssaga from './myAccount/choosePlans/saga';
import invoiceNumberSaga from "./waiveoffinvoiceid/saga";
import invoiceOtpSaga from "./waiveoffotp/saga";
import TicketsSaga from "./partners/tickets/saga";
import SRNSaga from "./partners/SRN/saga";






// import partnerGetmailSaga from "./partnerResetPass/saga";

export const rootSaga = () =>
  function* root() {

    yield [fork(userSaga)];
    yield [fork(adminloginSaga)];
    yield [fork(getmailSaga)];
    yield [fork(forgotOtpSage)];
    yield [fork(resetSaga)];
    yield [fork(requestSaga)];
    yield [fork(salesAdminLoginSaga)];
    yield [fork(requestDemoSaga)];
    yield [fork(feedbackSaga)];
    yield [fork(registrationSaga)];
    //yield [fork(validateOtpSage )];
    //yield [fork(registrationpasswordSaga )];
    yield [fork(loginSaga)];
    // yield [fork(getmailcustomerSaga )];
    // yield[fork(forgotOtpCustomerSage)];
    // yield[fork(resetCustomerSaga)];
    yield [fork(detailsSaga)];
    yield [fork(serviceTaxSaga)];
    yield [fork(customizePageSaga)];
    yield [fork(editProfilesaga)];
    yield [fork(priceDetailsSaga)];
    yield [fork(dmasSaga)];
    yield [fork(changePlansaga)];
    yield [fork(viewInvoicesaga)];
    yield [fork(logoutSaga)];
    yield [fork(dmasAnnexureSaga)];
    //yield [fork(choosePlanssaga )];
    yield [fork(invoiceNumberSaga)];
    yield [fork(invoiceOtpSaga)];
    yield [fork(taxInvoicesaga)];
    yield [fork(contactUsSaga)];
    yield [fork(invoiceCreateSaga)];
    yield [fork(reportSaga)];
    //yield [fork(updateSaga )];
    yield [fork(upgradeSaga)];
    yield [fork(orderChangeSaga)];
    yield [fork(reguserSaga)];
    yield [fork(rateSaga)];
    yield [fork(discountSaga)];
    yield [fork(priceSaga)];
    yield [fork(terminateOrderSaga)];
    yield [fork(customerDetailsSaga)];
    yield [fork(noticePeriodSaga)];
    yield [fork(newsLetterSaga)];
    yield [fork(projectManagerLoginSaga)];
    yield [fork(AcceptOrDenyNewAdminSaga)];
    yield [fork(SmallBannerSaga)];
    yield [fork(requestInquiryListSaga)];
    yield [fork(ctrlSwiftLiteSaga)];

    yield [fork(partnerLoginSaga)];
    yield [fork(companyNewRequestsSaga)];
    yield [fork(acceptedPartnersSaga)];
    yield [fork(acceptedSelfEmployeeSaga)];
    yield [fork(requestedSelfEmployeeSaga)];
    yield [fork(partnerRegisterSaga)];
    yield [fork(selfepmRegisterSaga)];
    // yield [fork(partnerGetmailSaga)];
    yield [fork(setNewPasswordSaga)];
    yield[fork(TicketsSaga)];
    yield[fork(SRNSaga)];


  };
