export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email Id cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";
  return "";
};

export const passwordValidator = (password) => {
  if (!password || password.length <= 0) return "Password cannot be empty.";
  return "";
};

export const firstNameValidator = (firstName) => {
  const re = /^[A-Za-z_ ]+$/;
  if (!firstName || firstName.length <= 0) return " firstName cannot be empty.";
  if (!re.test(firstName)) return "We need a valid name.";
  return "";
};
export const lastNameValidator = (lastName) => {
  const re = /^[A-Za-z_ ]+$/;
  if (!lastName || lastName.length <= 0) return " lastName cannot be empty.";
  if (!re.test(lastName)) return "We need a valid name.";
  return "";
};

export const nameValidator = (name) => {
  const re = /^[A-Za-z_ ]+$/;
  if (!name || name.length <= 0) return " Name cannot be empty.";
  if (!re.test(name)) return "We need a valid name.";
  return "";
};

export const userNameValidator = (username) => {
  const re = /^[A-Za-z]+$/;
  if (!username || username.length <= 0) return " Name cannot be empty.";
  if (!re.test(username)) return "We need a valid name.";
  return "";
};
export const departmentValidator = (department) => {
  if (!department || department.length <= 0 || department == "Select")
    return "department cannot be empty.";
  return "";
};
export const mobileCountryCodeValidator = (mobileCountryCode) => {
  if (
    !mobileCountryCode ||
    mobileCountryCode.length <= 0 ||
    mobileCountryCode == "Select"
  )
    return "mobileCode cannot be empty.";
  return "";
};
export const countryValidator = (country) => {
  if (!country || country.length <= 0 || country == "Select")
    return "country cannot be empty.";
  return "";
};
export const cityValidator = (city) => {
  if (!city || city.length <= 0 || city == "Select")
    return "city cannot be empty.";
  return "";
};

export const addressValidator = (address) => {
  if (!address || address.length <= 0) return "Address cannot be empty.";
  return "";
};

export const companyValidator = (company) => {
  if (!company || company.length <= 0) return "company cannot be empty.";
  return "";
};

export const mobileValidator = (mobile) => {
  const re = /^[0-9]+$/;
  if (!re.test(mobile)) return "We need a valid mobileNumber.";

  if (!mobile || mobile.length <= 0) return "Mobile Number cannot be empty.";
  if (!mobile || mobile.length < 10) return "Your number is not valid.";
  if (!mobile || mobile.length > 15) return "Your number exceeds.";

  return "";
};

export const landlineValidator = (landLine) => {
  const la = /^[0-9]+$/;

  if (!landLine || landLine.length <= 0)
    return "landline Number cannot be empty.";

  return "";
};
export const otpValidator = (otp) => {
  if (!otp || otp.length <= 0) return "OTP cannot be empty.";
  return "";
};

export const newPasswordValidator = (newPassword) => {
  if (!newPassword || newPassword.length <= 0)
    return "New Password cannot be empty.";
  return "";
};

export const confirmPasswordValidator = (confirmPassword) => {
  if (!confirmPassword || confirmPassword.length <= 0)
    return "Confirm Password cannot be empty.";
  return "";
};

export const genderValidator = (gender) => {
  if (!gender || gender.length <= 0) return "Please Select the Gender.";
  return "";
};

export const dateValidator = (date) => {
  if (!date || date.length <= 0) return "Please select your Date of Birth.";
  return "";
};

export const reasonValidator = (reason) => {
  const re = /^[A-Za-z]+$/;
  if (!reason || reason.length <= 0) return "Reason cannot be empty.";
  if (!re.test(reason)) return "Please Enter the Valid Reason .";
  return "";
};

export const stateValidator = (state) => {
  if (!state || state.length <= 0) return "State cannot be empty.";
  return "";
};

export const planValidator = (plan) => {
  if (!plan || plan.length <= 0) return "Please select atleast one plan.";
  return "";
};

export const pincodeValidator = (pincode) => {
  if (!pincode || pincode.length <= 0) return "Pin Code cannot be empty.";
  return "";
};
