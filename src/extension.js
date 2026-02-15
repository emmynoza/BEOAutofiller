const dropdownMenu= document.getElementById('ticketFunctions');
const orderID = document.querySelector('.breadcrumb').lastElementChild.textContent.split('#')[1]; // Extract order ID from breadcrumb
const link = `https://www.restaurantcateringsystems.com/admin/?form=accounting&tab=payments&oid=${orderID}` // Replace with dynamic invoice ID if needed
const newOption = document.createElement('option');

newOption.value = link;
newOption.text = "Go To Payments";

dropdownMenu.appendChild(newOption);

console.log( newOption, link)