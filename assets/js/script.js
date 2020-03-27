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


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
