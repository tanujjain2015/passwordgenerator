// Assignment code here

/*  Problem Statement: 
1. Here are the password Criteria: 
    a.  Length of password should be between (Min 8 Char and Max 128 Char) 
    b.  Password could have Uppercase choice (Customer choice)
    c.  Password could have Lower Case
    d.  Password could have numbers
    e.  Password could have special Characters. 

2. Minimum one choice should be selected out of 1b, 1c, 1d and 1e.   
   If no choice selected then prompt user for re-select the choice.

3. Validate the generated password contains criteria selected by User. 

4. Display password written on the page. 
*/ 

"use strict";

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");
let newUser = new Array();
let appPasswordPolicy = new Array();

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


/* Define Profile Object for storing basic User Information. This info would be used to 
provide user option to generate user friendly secure password. */

let profile = {
  firstName : "",
  middleName : "",
  lastName : "",
  nickName : "",
  dateOfBirth : "" ,
  monthOfBirth : "",
  yearOfBirth : "",
  primaryCellNumber : "",
  secondaryCellNumber : "",
  primaryEmailId : "",
  secondaryEmailId : "",
  groudId : "",
  appId : [],
  passwordId : [],
  lastPassword : new Array(10),
  setPasswordId : function (passwdid){
    this.passwordId.push(passwdid);
  },
  setFirstName : function(name) {
       this.firstName = name;
  },
  setMiddleName : function(name) {
      this.middleName = name;
  },
  setLastName : function(name) {
    this.lastName = name;
  },
  setNickName : function(name) {
    this.nickName = name;
  },
  setDateOfBirth : function(date) {
    this.setDateOfBirth = date;
  },
  setMonthOfBirth : function(month) {
    this.monthOfBirth = month;
  },
  setYearOfBirth : function(year) {
    this.yearOfBirth = year;
  },
  setPrimaryCellNumber : function(number) {
    this.primaryCellNumber = number;
  },
  setSecondaryCellNumber : function(number) {
    this.secondaryCellNumber = number;
  },
  setPrimaryEmailId : function(emailid){
    this.primaryEmailId = emailid;
  },
  setSecondaryEmailId : function(emailid){
    this.secondaryEmailId = emailid;
  },
  setGroupId : function(groupid){
    this.groudId = groupid;
  },
  setLastPassword :  function(password) {
    this.lastPassword.push(password);
  },
  initiatePasswordPolicy : function (){
    declarePasswordPolicy();
  }
}

/*profile Object for holding passord information for future use*/
let password = {
  passwordId : "",
  appId : "",
  currentPassword : "",
  last10Passwd : new Array(10),
  setPasswdId : function (passwdid){
    this.passwordId = passwdid;
  },
  setAppId : function (appId){
    this.appId = appId;
  },
  setCurrentPasswd : function (passwd){
    this.currentPassword = passwd;
  },
  setLastTenPasswd : function (passwd) {
    this.setPasswdId.reverse();
    if (this.setPasswdId.length < 10){
      this.setPasswdId.push(passwd);
    } else {
      this.setPasswdId.pop();
      this.setPasswdId.push(passwd);
    }
    this.setPasswdId.reverse();
  }
}

let group = {
  id : "",
  name : "",
  appsId : [],
  setId : function (id){
    this.id = id;
  },
  setName : function (name){
    this.name = name;
  },
  setAppsId : function(appid) {
    this.appsId.push (appid);
  }
} 

let app = {
  id: "",
  name : "",
  passwordPolicy: [],
  loginId : "",
  password : "",
  setId : function (id) {
    this.id = id;
  },
  setName : function (appName){
    this.name = appName;
  },
  setLoginId : function (loginname){
    this.loginId = loginname;
  },
  setPassword : function (password){
    this.password = password;
  },
  setPasswordPly : function (policy){
    this.passwordPolicy.push(policy)
  }
}

/* Password Policy Object holds various policy crietria and holds password. It would be used for future use*/
let passwordPolicy = {
    name : "",  /* Name of the policy. It holds string value*/
    policyId : "", /*Unique 10 digit Policy ID Number. It is a string variable*/
    passwordLengthMin : 8, /* Variable to hold min length of password*/
    passwordLengthMax : 32, /* Variable to hold */
    numberAllowed : null, /* Boolean Variable to decide if Number should be part of password*/
    numberException : "", /*Holds the array of number's which should be excluded as part of password generation*/
    characterAllowed : null, /* Boolean Variable to decide if character should be part of password*/
    isCharUpperCaseAllowed : null, /*Booloean variable to decide if Upper case Char is allowed*/
    isCharLowerCaseAllowed : null, /*Booloean variable to decide if Lower case Char is allowed*/
    characterException : "", /*Holds the array of characters which should be excluded as part of password generation*/
    specialCharacterAllowed : null,  /* Boolean Variable to decide if Special Character should be part of password*/
    specialCharacterException : "", /*Holds the array of Special Character which should be excluded as part of password generation*/
    friendlyPassword : false, /*Boolean Variable to decide if friendly password should be part of password*/
    
    setName : function (name) {
      this.name = name;
    },
    setPolicyId : function (id){
      this.policyId = id;
    },
    setPasswordLengthMin : function(minlength){
      this.passwordLengthMin = minlength;
    },
    setPasswordLengthMax : function (maxlength){
      this.passwordLengthMax = maxlength;
    },
    setIsNumberAllowed : function (isNumberAllowed){
      this.numberAllowed = isNumberAllowed;
    },
    setNumberException : function (numberExceptionList) {
      this.numberException = numberExceptionList;
    },
    setIsCharacterAllowed : function (isCharacterAllowed){
      this.characterAllowed = isCharacterAllowed;
    },
    setCharacterException : function (characterExceptionList){
      this.characterException = characterExceptionList;
    },
    setIsSpecialCharacterAllowed : function (isSpecialAllowed){
      this.specialCharacterAllowed = isSpecialAllowed;
    },
    setSpecialCharacterException : function (specialCharacterExceptionList){
      this.specialCharacterException = specialCharacterExceptionList;
    },
    setIsFriendlyPassword : function (isFriendlyPassword){
      this.friendlyPassword = isFriendlyPassword;
    },
    setIsCharUpperCaseAllowed : function (uppercase){
      this.isCharUpperCaseAllowed = uppercase;
    },
    setIsCharLowerCaseAllowed : function (lowercase){
      this.isCharLowerCaseAllowed = lowercase;
    }
};
/* Initialize profile object for storing user information */
function initiateProfile (){
  let newUserLength = newUser.length;
  newUser[length] = profile;
  //newUserLength = newUser.length -1;
  console.log (newUserLength);

  while (newUser[newUserLength].firstName == "" || newUser[newUserLength].firstName == null){
    let yourName = window.prompt ("Please Enter Your first name?");
    if (yourName === null || yourName === ""){
      window.alert ("Please Enter Valid Name")
    } else {
      newUser[newUserLength].firstName = yourName;
      console.log (newUser[newUserLength].firstName);
    }
  }

  while (newUser[newUserLength].lastName == "" || newUser[newUserLength].lastName == null){
    let yourName = window.prompt ("Please Enter Your Last name?");
    if (yourName === null || yourName === ""){
      window.alert ("Please Enter Valid Last Name")
    } else {
      newUser[newUserLength].lastName = yourName;
      console.log (newUser[newUserLength].lastName);
    }
  }
  

  while (newUser[newUserLength].nickName == "" || newUser[newUserLength].nickName == null){
    let yourName = window.prompt ("Please Enter Your Nick name?");
    if (yourName === null || yourName === ""){
      window.alert ("Please Enter Valid Nick Name")
    } else {
      newUser[newUserLength].nickName = yourName;
      console.log (newUser[newUserLength].nickName);
    }
  }

  while (newUser[newUserLength].primaryCellNumber == "" || newUser[newUserLength].primaryCellNumber == null){
    let yourName = window.prompt ("Please Enter Your primary cell number?");
    if (yourName === null || yourName === ""){
      window.alert ("Cell number entered is not Valid. Please Enter Valid  numer")
    } else {
      newUser[newUserLength].primaryCellNumber = yourName;
    }
  }

  while (newUser[newUserLength].primaryCellNumber === "" || newUser[newUserLength].primaryCellNumber === null){
    let yourName = window.prompt ("Please Enter Your primary cell number?");
    if (yourName == null || yourName == ""){
      window.alert ("Cell number entered is not Valid. Please Enter Valid  numer")
    } else {
      newUser[newUserLength].primaryCellNumber = yourName;
    }
  }
};
/* Initialize Password Policy for storing the values. */
function declarePasswordPolicy (){

  let appPasswordPolicyArrayIndex = appPasswordPolicy.length;
  appPasswordPolicy[appPasswordPolicyArrayIndex] = passwordPolicy;

  console.log("Value of appPasswordPolicyArrayIndex post is = " + appPasswordPolicyArrayIndex);

  /* Prompt User to enter Password Policy Name*/
  while (appPasswordPolicy[appPasswordPolicyArrayIndex].name == "" || appPasswordPolicy[appPasswordPolicyArrayIndex].name == null){
    let policyName = window.prompt ("Enter the Password Policy Name");
    appPasswordPolicy[appPasswordPolicyArrayIndex].setName(policyName);
  }

  /* Prompt User to enter Password Policy Id*/
  while (appPasswordPolicy[appPasswordPolicyArrayIndex].policyId == "" || appPasswordPolicy[appPasswordPolicyArrayIndex].policyId == null){
    let policyId = uuidGenerator();
    appPasswordPolicy[appPasswordPolicyArrayIndex].setPolicyId(policyId);
  }
  
  /* Prompt User to enter Min Password Length*/
  let passwdLenMin = window.prompt ("Please enter minimum length of your password. Data entered should be in Numbers and should be >=8 and <=128. If no data entered then default minimum length would be set as 8");
  while (parseInt(passwdLenMin) < 8 || parseInt(passwdLenMin) >  128 || passwdLenMin == null || isNaN(passwdLenMin)){
    passwdLenMin = window.prompt ("Please enter valid value of minimum length of your password. Data entered should be in Numbers and should be >=8 and <=128.. If no data entered then default minimum length would be set as 8");
  }

  appPasswordPolicy[appPasswordPolicyArrayIndex].setPasswordLengthMin(parseInt(passwdLenMin));
  console.log ("Value of password Min length = " + appPasswordPolicy[appPasswordPolicyArrayIndex].passwordLengthMin);

  /* Prompt User to enter Max Password Length*/
  let passwdLenMax = window.prompt ("Please enter maximum length of your password. Data entered should be in Numbers and should be >" + appPasswordPolicy[appPasswordPolicyArrayIndex].passwordLengthMin + " and <= 128.");
  while (parseInt(passwdLenMax) <= appPasswordPolicy[appPasswordPolicyArrayIndex].passwordLengthMin || passwdLenMax == null || isNaN(passwdLenMax || parseInt(passwdLenMax) >128)){
        passwdLenMax = window.prompt ("Please enter valid value of maximum length of your password. Please enter maximum length of your password. Data entered should be in Numbers and should be >" + appPasswordPolicy[appPasswordPolicyArrayIndex].passwordLengthMin + " and <= 128.");
  }

  appPasswordPolicy[appPasswordPolicyArrayIndex].setPasswordLengthMax(parseInt(passwdLenMax));
  console.log ("Value of password Max length = " + appPasswordPolicy[appPasswordPolicyArrayIndex].passwordLengthMax);

  /* Prompt User to select Charcter, Special Number and Number*/
  while ((appPasswordPolicy[appPasswordPolicyArrayIndex].characterAllowed== null && appPasswordPolicy[appPasswordPolicyArrayIndex].specialCharacterAllowed == null && appPasswordPolicy[appPasswordPolicyArrayIndex].numberAllowed == null ) || (appPasswordPolicy[appPasswordPolicyArrayIndex].characterAllowed== false && appPasswordPolicy[appPasswordPolicyArrayIndex].specialCharacterAllowed == false && appPasswordPolicy[appPasswordPolicyArrayIndex].numberAllowed == false ))
  {
      let charAllowed = window.confirm ("Please confirm if characters are allowed as part of password?");
      appPasswordPolicy[appPasswordPolicyArrayIndex].setIsCharacterAllowed(charAllowed);
      if (charAllowed == true){
        let isUpperCase = window.confirm ("Please confirm if Upper Case Char's are allowed as part of Password?");
        let isLowerCase = window.confirm ("Please confirm if Lower Case Char's are allowed as part of Password?");
      // while ((appPasswordPolicy[appPasswordPolicyArrayIndex].isCharUpperCaseAllowed == null && appPasswordPolicy[appPasswordPolicyArrayIndex].isCharLowerCaseAllowed == null) || (appPasswordPolicy[appPasswordPolicyArrayIndex].isCharUpperCaseAllowed == false && appPasswordPolicy[appPasswordPolicyArrayIndex].isCharLowerCaseAllowed==false )) {
        while (isUpperCase == false && isLowerCase == false){
            window.alert (" Upper Case or LowerCase character needs to be selected. Please select a correct value " );
            isUpperCase = window.confirm ("Please confirm if Upper Case Char's are allowed as part of Password?");
      
            isLowerCase = window.confirm ("Please confirm if Lower Case Char's are allowed as part of Password?");
              
          }
          appPasswordPolicy[appPasswordPolicyArrayIndex].setIsCharUpperCaseAllowed(isUpperCase);
          appPasswordPolicy[appPasswordPolicyArrayIndex].setIsCharLowerCaseAllowed(isLowerCase);
          if (appPasswordPolicy[appPasswordPolicyArrayIndex].characterAllowed == true){
            let charException = window.prompt ("Please enter list of characters which should not be part of password.");
            if (charException == null){
              appPasswordPolicy[appPasswordPolicyArrayIndex].setCharacterException("");
            }else{
              appPasswordPolicy[appPasswordPolicyArrayIndex].setCharacterException(charException);
            }
          }
      }

      
    let specialCharAllowed = window.confirm ("Please confirm if Special Characters are allowed as part of Password?");
    appPasswordPolicy[appPasswordPolicyArrayIndex].setIsSpecialCharacterAllowed(specialCharAllowed);
    if (appPasswordPolicy[appPasswordPolicyArrayIndex].specialCharacterAllowed == true){
      let specialCharException = window.prompt ("Please enter list of special characters which should not be part of password.");
      if (specialCharException == null){
        appPasswordPolicy[appPasswordPolicyArrayIndex].setSpecialCharacterException("");
      }else {
        appPasswordPolicy[appPasswordPolicyArrayIndex].setSpecialCharacterException(specialCharException);
      }
    }

    let numberAllowed = window.confirm ("Please confirm if Number are allowed as part of Password?");
    appPasswordPolicy[appPasswordPolicyArrayIndex].setIsNumberAllowed(numberAllowed);
    if (appPasswordPolicy[appPasswordPolicyArrayIndex].numberAllowed == true){
      let numberCharException = window.prompt ("Please enter list of numbers which should not be part of password.");
      if (numberCharException == null){
        appPasswordPolicy[appPasswordPolicyArrayIndex].setNumberException("");
      }else {
        appPasswordPolicy[appPasswordPolicyArrayIndex].setNumberException(numberCharException);
      }
    }
  }

  /* If all three option is selected as false then make characterAllowed as false*/
  if (appPasswordPolicy[appPasswordPolicyArrayIndex].specialCharacterAllowed == false && appPasswordPolicy[appPasswordPolicyArrayIndex].characterAllowed == false && appPasswordPolicy[appPasswordPolicyArrayIndex].numberAllowed == false){
      appPasswordPolicy[appPasswordPolicyArrayIndex].characterAllowed = true;
  }
  console.log(appPasswordPolicy[appPasswordPolicyArrayIndex]);

  return passwordGenerator (appPasswordPolicy[appPasswordPolicyArrayIndex])
};
/* Function to generate Unique Id*/
function uuidGenerator (){
  var len = 20;
  parseInt((Math.random() * 20 + 1) * Math.pow(10,len-1), 10);   
  var uniquenumber = Date.now().toString(36) + ((Math.random() * 34 + 1) * Math.pow(10,len-1)).toString(36).substr(2,34).toUpperCase();
  return uniquenumber;
};
/* Function to generate random integer between two numbers*/
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};
/* Function to generate password and return the genrated password */
function passwordGenerator (passwdPolicy){

  var char = "";
  var upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowerCase = "abcdefghijklmnopqrstuvwxyz"
  var num = '0123456789';
  var sym = '!@#$%^&*=-_';
  
  var characters = "";
  console.log(passwdPolicy.characterException);

  if (passwdPolicy.characterAllowed == true){
    if (passwdPolicy.isCharUpperCaseAllowed == true){
      char += upperCase;
    }
    if (passwdPolicy.isCharLowerCaseAllowed == true){
      char += lowerCase;
    }
    if (passwdPolicy.characterException !== ""){
      for (let i =0; i < passwdPolicy.characterException.length; ++i){
        char = char.replace(passwdPolicy.characterException[i],"")
      }
    }
    characters += char;
  }

  if (passwdPolicy.specialCharacterAllowed == true){
    if (passwdPolicy.specialCharacterException !== ""){
      for (let i =0; i < passwdPolicy.specialCharacterException.length; ++i){
        sym = sym.replace(passwdPolicy.specialCharacterException[i],"")
      }
    }
    characters +=sym;
  }

  if (passwdPolicy.numberAllowed == true){
    if (passwdPolicy.numberException !== ""){
      for (let i =0; i < passwdPolicy.numberException.length; ++i){
        num = num.replace(passwdPolicy.numberException[i],"")
      }
    }
    characters +=num;
  }

  console.log (characters);

  let l = getRandomIntInclusive(passwdPolicy.passwordLengthMin, passwdPolicy.passwordLengthMax);
  let pwd = '';
    for(let i = 0; i<l; i++){
        pwd += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  console.log(pwd.length);
  return pwd;
};
/* Wrapper Function to pass into write password */
function generatePassword (){
   //initiateProfile();
   return declarePasswordPolicy();
};