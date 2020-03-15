
//Other job role variables
const showOther = document.getElementById('other-title');
const jobSelection = document.getElementById('title');

//t-shirt selection variables
const designSelection = document.getElementById('design');
const colorDiv = document.getElementById('colors-js-puns');
const colorSelection = document.getElementById('color');

//activities variables 
const activities = document.querySelector('.activities');
const costMsg = document.createElement('element');
activities.appendChild(costMsg);
let totalCost = 0;

//payment variables
const payment = document.querySelector('#payment');
const paymentMethod = document.querySelector('#payment option[value="select method"]');

const creditcard = document.querySelector('#credit-card');
const creditcardOption = document.querySelector('#payment option[value="credit card"]');
const creditcardValue = document.querySelector('#payment option[value="credit card"]').getAttribute('value');

const paypal = document.querySelector('#paypal');
const paypalOption = document.querySelector('#payment option[value="paypal"]');
const paypalValue = document.querySelector('#payment option[value="paypal"]').getAttribute('value');

const bitcoin = document.querySelector('#bitcoin');
const bitcoinOption = document.querySelector('#payment option[value="bitcoin"]');
const bitcoinValue = document.querySelector('#payment option[value="bitcoin"]').getAttribute('value');

//Job Role

showOther.style.display = 'none';

jobSelection.addEventListener('change', () => {
    if (jobSelection.value === 'other'){
        showOther.style.display = 'block';
    } else {
        showOther.style.display = 'none';
    }
})

//T-Shirt Info

//until a theme is selected from the t-shirt Design menu, no color options appear 

//event listener for design selection menu

designSelection.addEventListener('change', () => {
    if (designSelection.value === 'js puns'){
        colorSelection.options[0].style.display = '';
        colorSelection.options[1].style.display = '';
        colorSelection.options[2].style.display = '';
        colorSelection.options[3].style.display = 'none';
        colorSelection.options[4].style.display = 'none';
        colorSelection.options[5].style.display = 'none';
    }
    if (designSelection.value === 'heart js'){
        colorSelection.options[0].style.display = 'none';
        colorSelection.options[1].style.display = 'none';
        colorSelection.options[2].style.display = 'none';
        colorSelection.options[3].style.display = '';
        colorSelection.options[4].style.display = '';
        colorSelection.options[5].style.display = '';
    }
});

//Register for Activities

//user cannot select two activities that are at the same time
//Total cost is calculated and displayed 

activities.addEventListener('change', (e) => {

    const inputClicked = event.target;
    const inputAtt = inputClicked.getAttribute('data-cost');
    const inputCost = parseInt(inputAtt);
    
    if( inputClicked.checked ){
        totalCost += inputCost;
    } else {
        totalCost -= inputCost;
    }
    costMsg.innerHTML = 'Total : $' + totalCost;

    const dayAndTime = inputClicked.getAttribute('data-day-and-time');
    const checkboxes = document.querySelectorAll('.activities input');

    for ( let i = 0; i < checkboxes.length; i ++ ){

        const currentCheckbox = checkboxes[i].getAttribute('data-day-and-time');

        if( dayAndTime === currentCheckbox && inputClicked !== checkboxes[i] ){
            if( inputClicked.checked ){
                checkboxes[i].disabled = true;
            } else {
                checkboxes[i].disabled = false;
            }
        }
    }
});

//Payment Section

// Hide the “Select Payment Method” option so it doesn’t show up in the drop down menu

paymentMethod.hidden = true;
paypal.style.display = 'none';
bitcoin.style.display = 'none';

// show credit card payment section, and hide the other two options

payment.addEventListener('change', () => {

    if( creditcardOption.selected ){
        creditcard.style.display = 'block';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if ( paypalOption.selected ) {
        paypal.style.display = 'block';
        creditcard.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if ( bitcoinOption.selected ){
        bitcoin.style.display = 'block';
        creditcard.style.display = 'none';
        paypal.style.display = 'none';
    }

});

//Form Validation and Validation Messages

//Name validation

const nameValidator = () => {

    const nameValue = name.value;
    let nameLabel = document.querySelector('label[for="name"]');
    
    if( /^\D+$/.test(nameValue) ){
        name.style.border = '';
        nameLabel.style.color = '';
        nameLabel.textContent = "Name:";
        return true;
    } else {
        name.style.border = "3px solid red";
        nameLabel.style.color = "red";
        nameLabel.innerHTML = "<strong>Please enter your name</strong>";
        return false;
    }
    
}

//email validation

const emailValidator = () => {

    const emailValue = email.value;
    const emailLabel = document.querySelector('label[for="mail"]');
    
    if( /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue)){
        email.style.border = '';
        emailLabel.style.color = '';
        emailLabel.textContent = "Email:";
        return true;
    } else {
        email.style.border = "3px solid red";
        emailLabel.style.color = "red";
        emailLabel.innerHTML = "<strong>Please enter your email address</strong>";
        return false;
    }  
}

// activity validation

const activityValidator = () => {

    const activityLegend = document.querySelector('.activities legend');
    const checkboxes = document.querySelectorAll('.activities input');

    for( let i = 0; i < checkboxes.length; i ++ ){
        if(checkboxes[i].checked){
            activityLegend.style.color = '';
            activityLegend.textContent = "Register for Activities";
            return true;
        }
    }
    activityLegend.style.color = 'red';
        activityLegend.innerHTML = "<strong>Please choose at least one activity</strong>"
        return false;
}

// credit card number validation

const ccNumvalidator = () => {

    const creditcardNumber = document.querySelector('#cc-num');
    const ccNumValue = creditcardNumber.value;
    const ccNumLabel = document.querySelector('label[for="cc-num"]');

    if( creditcardOption.selected || paymentMethod.selected ){

        if( /^\d{13,16}$/.test(ccNumValue)){
            creditcardNumber.style.border = '';
            ccNumLabel.style.color = '';
            ccNumLabel.textContent = "Card Number:";
            return true;
        } else {
            creditcardNumber.style.border = '3px solid red';
            ccNumLabel.style.color = 'red';
            ccNumLabel.textContent = "Unvalid Card Number";
            return false;
        }
    } else {
        return true;
    }
}

// zip code validation

const ccZipValidator = () => {

    const creditcardZip = document.querySelector('#zip');
    const ccZipValue = creditcardZip.value;
    const ccZipLabel = document.querySelector('label[for="zip"]');

    if( creditcardOption.selected || paymentMethod.selected ){

        if( /^\d{5}$/.test(ccZipValue)){
            creditcardZip.style.border = '';
            ccZipLabel.style.color = '';
            ccZipLabel.textContent = "Zip Code:";
            return true;
        } else {
            creditcardZip.style.border = '3px solid red';
            ccZipLabel.style.color = 'red';
            ccZipLabel.textContent = "Unvalid Zip Code";
            return false;
        }
    } else {
        return true;
    }  
}

// CVV validation

const cvvValidator = () => {

    const creditcardCvv = document.querySelector('#cvv');
    const cvvValue = creditcardCvv.value;
    const cvvLabel = document.querySelector('label[for="cvv"]');

    if( creditcardOption.selected || paymentMethod.selected ){

        if( /^\d{3}$/.test(cvvValue)){
            creditcardCvv.style.border = '';
            cvvLabel.style.color = '';
            cvvLabel.textContent = "CVV:";
            return true;
        } else {
            creditcardCvv.style.border = '3px solid red';
            cvvLabel.style.color = 'red';
            cvvLabel.textContent = "Unvalid CVV";
            return false;
        }

    } else {
        return true;
    }     
}

// Master validation function
// If all the individual validation functions return true, master validation function returns true

form.addEventListener('submit', (e)=> {
    
    if( ! nameValidator() ){
        e.preventDefault();
    } 
    
    if( ! emailValidator() ){
        e.preventDefault();
    } 
    
    if( ! activityValidator() ){
        e.preventDefault();
    } 
    
    if( ! ccNumvalidator() ){
        e.preventDefault();
    } else {
        return true;
    }
    
    if( ! ccZipValidator() ){
        e.preventDefault();
    } else {
        return true;
    }
    
    if( ! cvvValidator() ){
        e.preventDefault();
    } else {
        return true;
    }
});