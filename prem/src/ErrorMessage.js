export const errorMessages = (message) => {
  console.log(message);
  if (message === "E104") return "Email Seems to be new, Please Signup";
  if (message === "E108")
    return "Invalid Password. Please enter the correct password.";
  if (message === "E100")
    return "Due to some server Error. Your Request can't be process, so please try again";
  // if (message=== "E219") return 'You are not seems to admin for your organisation';
  if (message === "E101")
    return "Entered email is seems to be already registered. Please register";
  if (message === "E120")
    return "You are not seems to be Admin. Please check the mail.";
  if (message === "E102")
    return "Server error. OTP is not generated for given email.";
  if (message === "E103") return "Invalid OTP.Please provide the valide OTP ";
  if (message === "E109")
    return "You are already press resent two times. Please try Again.";
  // if (message=== "E219") return 'Entered email ID seems to be Admin for another organisation';
  if (message === "E105")
    return "You are already press resend two times. Please Register Again.";
  if (message === "E218")
    return "Email entered by Admin is not seems to be registered email. Please register user first.";
  if (message === "E232")
    return "Entered OTP number is Expired.Please try again";
  if (message === "E219")
    return "Entered email id seems to be Admin for another organisation. Please check it";
  if (message === "E245") return "Invalide OTP";
  if (message === "E200")
    return "You are not seems to be Sales Admin. Please check the credentials.";
  if (message === "E250")
    return "Plan is already taken. Please view in plan details page.";
  if (message === "E237")
    return "You are not seems to admin for your organisation.";
  if (message === "E114") return "Your Session Is Logged Off, Please Login";
  if (message === "E228")
    return "PPU model is only yearly payment. Please select payment term as yearly.";
  if (message === "E123") return "Employee ID already exist,Please Check!";
  if (message === "E124") return "Email Id Already Exist, Please Check!";
  if (message === "E125") return "Username Already Exist,Please Check!";
  if (message === "E131")
    return "This Action cannot be performed, Please delete the user and Create new user !";
  if (message === "E247") return "Entered country is already exists.";
  if (message === "E215")
    return "Unable to complete,Because ticket is not assigned.";
  if (message === "E244") return "Salesperson is already assigned to this demo";
  if (message === "E220")
    return "You are not yet selected any of plan, pls selecte the plan";
  if (message === "E225" || message === "E222")
    return "Chosen support time doesn't match our minimum requirement of 40 Hours";
  if (message === "E230")
    return "There is no plan available. Please customize your plan.";
  if (message === "E234") return "Demo session is not completed.";
  if (message === "E235") return "There is no demo id is presents.";
  if (message === "E233") return "Unable update feedback. Please try again.";
  if (message === "E236") return "already your feedback is updated.";
  if (message === "E266")
    return "Unable to Create Invoice, Please try again later";
  if (message === "E262")
    return "Your request failed due to technical issue please try after some time";
  if (message === "E270")
    return "There is no plans available for upgrade or degrade.";
  if (message === "E280") return "Customer has no active plans";
  if (message === "E284")
    return "You have already raised a request for a demo. Please try again After one day.";
  if (message === "E106") return "Given country has no list of city.";
  if (message === "E107") return "Given country is seems to be new.";
  if (message === "E110")
    return "Your Demo request is not placed. Please try again";
  if (message === "E111")
    return "Selected date time slots is already booked. Please choose another date.";
  if (message === "E112")
    return "Unable to get currency. Entered Country code is unvailable.";
  if (message === "E113")
    return "There is no customer is registered in CtrlSwift site";
  if (message === "E121") return "Invalid Credentials.";
  if (message === "E122") return "There is no user available.";
  if (message === "E126") return "Unable to insert the user. please try again";
  if (message === "E127")
    return "You are not add any employee to the CtrlSwift site";
  if (message === "E128") return "Employee is seems to be new.";
  if (message === "E129") return "Role is seems to be new.";
  if (message === "E130") return "Unable to delete the user.";
  if (message === "E131")
    return " Sales admin not able to update their profile";
  if (message === "E131")
    return " Sales admin not able to update their profile";
  if (message === "E131")
    return " Sales admin not able to update their profile";
  if (message === "E131")
    return " Sales admin not able to update their profile";
  if (message === "E131")
    return " Sales admin not able to update their profile";
  if (message === "E200") return " User is not seems to be Sales admin. ";
  if (message === "E201") return " No demos are placed now. ";
  if (message === "E202") return "Demo id is not presents.";
  if (message === "E203") return " Unable assign. Demo is Cancelled. ";
  if (message === "E205") return "Unable to assign. Demo is Completed. ";
  if (message === "E204") return " Unable to assign";
  if (message === "E206") return "Status is unavailable";
  if (message === "E207")
    return " Demo id is not yet assigned, please assign first. So that you can reassign";
  if (message === "E208") return " Employee is not added right now. ";
  if (message === "E209") return " Unable to Reassign. ";
  if (message === "E210")
    return " Status is already presented as per your request.";
  if (message === "E211") return " Cannot update status to this demo ID";
  if (message === "E212") return " Customer is not registered in CtrlSwift site";
  if (message === "E213") return " Customer is not logged in. ";
  if (message === "E214")
    return " Entered ticket volume is minimum of default ticket. Please enter volume more 50/month";
  if (message === "E215") return " Time slots is not available. ";
  if (message === "E216") return " Unable to update user profile. ";
  if (message === "E217")
    return " You are not seems to be admin, Unable to transfer admin access to other user. ";
  if (message === "E218")
    return " Email entered by Admin is not seems to be registered email. Please register user first. ";
  if (message === "E219")
    return " Admin entered email id seems to be admin for another organisation. ";
  if (message === "E220")
    return " You are not yet selected any of plan, pls enable toggle to customize your plan ";
  if (message === "E221")
    return " You are not selected any customize window option. Please choose window for better plan. ";
  if (message === "E222")
    return " Selected time is not satified the minimum requirement. ";
  if (message === "E223")
    return " Selected support window is wrong. Please select any of support and then customize your support window. ";
  if (message === "E224")
    return " You are crossing the limit to choose support window";
  if (message === "E225")
    return " Chosen start time and end time is not satisfies the choosed service support time";
  if (message === "E226")
    return " Chosen support is not eligible for customize. Please select 16*5 0r 8*5 support";
  if (message === "E227")
    return " Unable to insert given purchase order number. ";
  if (message === "E228")
    return " PPU model is only yearly payment. Please select payment term as yearly.";
  if (message === "E229") return " Unable to insert plan details.";
  if (message === "E230")
    return " There is no plan available. Please customize your plan. ";
  if (message === "E231") return " Unable to update status. ";
  if (message === "E232") return " Entered OTP number is Expired.";
  if (message === "E233") return " Unable update feedback. Server error. ";
  if (message === "E234") return " Demo session is not completed. ";
  if (message === "E235") return " There is no demo id is presents. ";
  if (message === "E236")
    return " Customer already given feedback to this demo id. ";
  if (message === "E237")
    return " You are not seems to admin for your organisation. ";
  if (message === "E238") return " Unable to insert records in database";
  if (message === "E239") return " There is no invoice is available for user. ";
  if (message === "E240")
    return " There is no price is calculated. Choose plan for customization. ";
  if (message === "E241") return " Unable to insert plan request. ";
  if (message === "E242") return " Unable to insert waive off code. ";
  if (message === "E243") return " Waive off is generated already. ";
  if (message === "E244")
    return " Salesperson is already assigned to this demo";
  if (message === "E245") return " Unable to generate waive off code. ";
  if (message === "E246")
    return "You crossed your limit to resend waive off code. Please go back and enter waive off again. ";
  if (message === "E247") return "Entered country is already exists. ";
  if (message === "E248") return "Unable to insert service tax details. ";
  if (message === "E249") return " There is no service tax detail listed. ";
  if (message === "E250")
    return " It seems to be plan is already taken. Please view in change plan page.  ";
  if (message === "E251")
    return " You are already ordered plan in given currency code . Please select the currency code and continue to order your plan. ";
  if (message === "E252")
    return "You are not seems to admin for your organisation.";
  if (message === "E253") return "Unable to Delete the country and Service Tax";
  if (message === "E254") return "Unable to Update the country and service Tax";
  if (message === "E255") return "Country doesn't exist";
  if (message === "E256")
    return " Unable to choose support window for selected option. ";
  if (message === "E257") return " GST number is required. ";
  if (message === "E258") return " Unable to generate invoice. ";
  if (message === "E259") return " Unable to delete invoice in zoho portal. ";
  if (message === "E260") return " Unable to get Invoice details.";
  if (message === "E261") return " Entered invoice number is seems to be new .";
  if (message === "E262") return "Unable to create order";
  if (message === "E263")
    return "Unable to get payment id from razor pay portal";
  if (message === "E264") return "Order id is not exists .";
  if (message === "E265")
    return "Tax percentage is not given for entered country. ";
  if (message === "E266") return "Unable to create invoice in zoho portal. ";
  if (message === "E267")
    return "Not yet selected any plan. Please customize your plan.";
  if (message === "E268") return "You do not have any active plans left";
  if (message === "E269")
    return "Entered seat count is minimum of recommended resources count. ";
  if (message === "E270")
    return " There is no plans available for upgrade or degrade. ";
  if (message === "E271") return " There is no changes from previous plan. ";
  if (message === "E272") return " Given plan is not active status plan. ";
  if (message === "E273") return " Unable to update status to plan. ";
  if (message === "E274") return " There is no registered users. ";
  if (message === "E275")
    return " There is currency code having exchange rate. ";
  if (message === "E276") return " Unable to update . ";
  if (message === "E277") return " Entered currency code is new. ";
  if (message === "E278") return " There is no list is available. ";
  if (message === "E279")
    return " This customer not having access to placing orders. ";
  //if (message ==="E280") return " This customer not yet raised any order till now. ";
  if (message === "E281") return " There is no plan for termination. ";
  if (message === "E282") return " Not yet placed any order. ";
  if (message === "E283")
    return " Entered email is not part of your organisation. ";
  if (message === "E284")
    return "You are already raised request for demo . Please raise Again After one day";
  if (message === "E289") return "There is no such plan detail avail. ";
  if (message === "E290") return "Country Not Found";
  if (message === "E296") return "No List Of Plan To Activate";
  if (message === "E306") return "Company name is Already registered . Entered details will send to your company admin ,After verified by your admin we will reach you through mail";
  if (message === "E307") return "Status already updated";
  if (message === "E308") return "contact person Id is null";
  if (message === "E309") return "status master is null";
  if (message === "E310") return "Token is Not Found";
  if (message === "E308") return "This Plan is already in Upgrade or Degrade status . you can't able to repeat this process again.";
  
  return "";
};
