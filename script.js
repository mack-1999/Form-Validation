function clearErrors(){

    errors = document.getElementsByClassName('formerror');
    for(let item of errors)
    {
        item.innerHTML = "";
    }
}

function seterror(id, error) {
    //Set error inside tag id
    element = document.getElementById(id);
    element.getElementsByClassName('formerror')[0].innerHTML = error;
}

function validateForm() {

    var returnvalue = true;
    clearErrors(); // his funtion is use to clear error

    //! Name Validation Code
    var name = document.forms['myForm']["fname"].value; //Getting value

    //Todo: Name Regular Expression
    var name_pattern = /^[a-zA-Z .]+$/; 

    if(name == ""){
        seterror("name", "*Please enter a name!"); //! Null Condition
        returnvalue = false;
    }
    else if(name.length<5){
        seterror("name", "*Length of name must be atleast 5 characters!"); //! Length condition
        returnvalue = false;
    }
    else if(name.length>20){
        seterror("name", "*Length of name must be less than 20 characters!"); //! Length condition
        returnvalue = false;
    }
    else if (name.match(name_pattern)) {
        returnvalue = true;
    } 
    else {
        seterror("name", "*Only alphabets allowed")
        returnvalue = false;
    }

    //! Email Validation Code !//
    var email = document.forms['myForm']["femail"].value;
    
    //Todo: Email Regular Expression
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(email.length>30){
        seterror("email", "*Email is to long!"); //! Length condition
        returnvalue = false;
    }
    else if(email == ""){
        seterror("email", "*Please enter a email!"); //! Null condition
        returnvalue = false;
    }
    else if(email.match(pattern)){
        returnvalue =  true; //! Email Pattern condition
    }
    else{
        seterror("email", "*Enter a valid email!");
    }

    //! Password Validations !//
    var password = document.forms['myForm']["fpass"].value;
    if(password.length < 6){
        seterror("pass", "*Password must me atleast 6 digit!");
        returnvalue = false;
    }else if(password == ""){
        seterror("pass", "*Password must me atleast 6 digit!");
        returnvalue = false;
    }

    var con_password = document.forms['myForm']["fcpass"].value;
    if(con_password != password){
        seterror("con_pass", "*Password dose not match!");
        returnvalue = false;
    }

    //! Contact Validation !//
    var phone = document.forms['myForm']["fnum"].value;

    var phone_pattern = /^[0-9]{10}$/
    if(phone.length != 10){
        seterror("phone", "*Invalid Number!");
        returnvalue = false;
    }

    return returnvalue;
}

function setlocalstorage() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    var phone = document.getElementById("phone").value;

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("pass", pass);
    localStorage.setItem("phone", phone);
}

const tbodyEl = document.querySelector("tbody");
const formEl = document.querySelector("form");
const tableEl = document.querySelector("table");

function database(e) {
    e.preventDefault();
    var name = document.forms['myForm']["fname"].value;
    var phone = document.forms['myForm']["fnum"].value;
    var password = document.forms['myForm']["fpass"].value;
    var email = document.forms['myForm']["femail"].value;

    tbodyEl.innerHTML += `
        <tr>
            <td>${name}</td>
            <td>${email}</td>
            <td>${password}</td>
            <td>${phone}</td>
            <td><button style="text-decoration: none; border: none;"><img src="./delbtn.png" width="30px" alt="Delete" class="deleteBtn" srcset=""></button></td>
        </tr>
    `;
}

function onDeleteRow(e){
    if(!e.target.classList.contains("deleteBtn")){
        return;
    }
    const btn = e.target;
    btn.closest("tr").remove();
}

formEl.addEventListener("submit", database);
tableEl.addEventListener("click", onDeleteRow);