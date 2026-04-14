// This script adds a "Go To Payments" option to the dropdown menu on the order page of the restaurant catering system admin panel. When selected, it redirects the user to the payments page for the specific order.
const dropdownMenu= document.getElementById('ticketFunctions');

if (!dropdownMenu){
    console.log("Dropdown menu not found!");
} else {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        const orderID = breadcrumb.lastElementChild.textContent.split('#')[1]; // Extract order ID from breadcrumb\
        const link = `https://www.restaurantcateringsystems.com/admin/?form=accounting&tab=payments&oid=${orderID}`; // Construct link with order ID
        const newOption = document.createElement('option');
        newOption.value = link;
        newOption.text = "Go To Payments";
        dropdownMenu.appendChild(newOption);
    }
}

// Content Script to open and close the questionnaire textarea on the BEO report page
const textAreaLabel = document.querySelector('.lbl');


if (textAreaLabel && textAreaLabel.textContent.split('review')[0].trim() === "Please take the time to") {
    const textArea = textAreaLabel.nextElementSibling.firstElementChild;
    const toggleButton = document.createElement('button');
    
    // Initial Button State
    toggleButton.classList.add('closed-textarea');
    toggleButton.textContent = 'O'; // O for Open

    // Button Styling (Positioning the button itself)
    toggleButton.style.cssText = `
        position: fixed;
        right: 76px;
        top: 100px;
        z-index: 1001;
        width: 30px; 
        height: 30px;
        cursor: pointer;
            background-color: #00ff00;
    `;

    toggleButton.onclick = () => {
        // Check if the text area is currently "open" based on the class
        const isOpen = textArea.classList.contains('open-textarea');

        if (!isOpen) {
            // --- OPEN IT ---
            textArea.classList.add('open-textarea');
            
            // Apply the fixed styles
            textArea.style.cssText = `
                position: fixed;
                right: 100px;
                top: 100px;
                width: 200px;
                height: 250px;
                padding: 5px;
                z-index: 1000;
                background-color: white; /* Ensure text is readable */
                border: 1px solid #5e5e5e;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            `;
            
            toggleButton.textContent = 'X'; // Change button to Close

        } else {
            // --- CLOSE IT (RESET) ---
            textArea.classList.remove('open-textarea');
            
            // clear the inline styles to revert to original position
            textArea.style.cssText = ''; 
            
            toggleButton.textContent = 'O'; // Change button back to Open
    
        }
    };

    textAreaLabel.appendChild(toggleButton);

} else {
    console.warn("Textarea label not found or does not match expected text.");
}