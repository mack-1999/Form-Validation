function clearErrors(){

    errors = document.getElementsByClassName('formerror');
    for(let item of errors)
    {
        item.innerHTML = "";
    }
}

function seterror(id, error) {
    //Sets error inside tag id
    element = document.getElementById(id);
    element.getElementsByClassName('formerror')[0].innerHTML = error;
}

function validateForm() {

    clearErrors(); // his funtion is use to clear error

    var returnvalue = true;
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
    var first_char = email.charAt(0);

    
    //Todo: Email Regular Expression
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(email.length>30){
        seterror("email", "*Email is to long!"); //! Length condition
        returnvalue = false;
    }
    else if(first_char == "@"||first_char == "!"||first_char == "#"||first_char == "$"||first_char == "%"||first_char == "&"||first_char == "*"){
        seterror("email", "*Special Symbol not allowed at first!");
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
    }
    else if(password == ""){
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

    var phone_pattern = /^[0-9]{10}$/;
    if(phone.match(phone_pattern)){
        returnvalue = true;
    }
    else{
        seterror("phone", "*Invalid Number!");
        returnvalue = false;
    }

    return returnvalue;
}

set_Data.onclick =  function () {

    let set_name = document.forms['myForm']["fname"].value;
    let set_email = document.forms['myForm']["femail"].value;
    let set_pass = document.forms['myForm']["fpass"].value;
    let set_phone = document.forms['myForm']["fnum"].value;
    let dis_email = localStorage.getItem("Email");

    if (set_name && set_email && set_pass && set_phone && set_email != dis_email) {
        localStorage.setItem("Name", set_name);
        localStorage.setItem("Email", set_email);
        localStorage.setItem("Pass", set_pass);
        localStorage.setItem("Phone", set_phone);
    }
}

const formEl = document.querySelector("form");
const tableEl = document.querySelector("table");
const tbodyEl = document.querySelector("tbody");

function database(e) {

    e.preventDefault();
    var name_dis = localStorage.getItem("Name");
    var email_dis = localStorage.getItem("Email");
    var pass_dis = localStorage.getItem("Pass");
    var phone_dis = localStorage.getItem("Phone");

    if(name_dis && email_dis && pass_dis && phone_dis){
        tbodyEl.innerHTML += `
            <tr>
                <td>${name_dis}</td>
                <td>${email_dis}</td>
                <td>${pass_dis}</td>
                <td>${phone_dis}</td>
                <td><button style="text-decoration: none; border: none;">
                <img src="./garbage.png" width="25px" class="deleteBtn" style="background-color: rgb(19 19 19);">
                </button></td>
            </tr>
        `;
    }

}

function onDeleteRow(e){
    if(!e.target.classList.contains("deleteBtn")){
        return;
    }
    const btn = e.target;
    btn.closest("tr").remove();
    localStorage.clear();
}

formEl.addEventListener("submit", database);
tableEl.addEventListener("click", onDeleteRow);
