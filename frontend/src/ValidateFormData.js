// Define the validation function
export const validateFormData = (formData ,regexes) => {
  
    for (let key in formData) {
      if (key !== "dob") {
        if (!regexes[key].test(formData[key])) {
          alert(`Please type the correct format of ${key}`);
          return false;
        }
      }
    }
    return true;
  };
  