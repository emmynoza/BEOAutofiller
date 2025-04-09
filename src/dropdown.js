let activeTextarea = null;

const dropdownOptions = {
  "Who is providing NA beverages?": [
    "<u>DRR Providing</u>",
    "Water",
    "Sweet Tea",
    "Unsweet Tea",
    "Lemonade",
    "<u>Client-provided</u>",
    "Coffee",
    "Juice",
    "Sodas",
    "Bottled Water",
  ],
  "NA Location(s)": [],
  "NA Beverage Notes": [
    "DRR Icing & Watering Water Glasses",
    "Icing Down Sodas",
    "Moving from cocktail hour to reception",
    "DRR providing water for entire event",
    "DRR providing dispenser(s) for client-provided drinks",
    "Client providing coffee station; DRR to set-up and maintain",
    "DRR providing extra galvanized containers",
  ],
  "Who is bartending?": [
    "DRR Bartending",
    "Venue Bartending",
    "Vendor",
    "Friend/Family",
    "None, Dry Event",
    "Self-Serve",
  ],
  "Alcohol Notes": [
    "Beer",
    "Wine",
    "Seltzer",
    "Signature Drinks",
    "DRR providing dispenser(s) for signature drink(s)",
    "Full Bar",
  ],
  "Bar Location(s)": [
    "Usual location(s)",
    "Two bars; one for cocktail hour, one for reception",
  ],
  "Appetizer Location/Notes": [
    "Usual Location",
    "Caterer's preference",
    "Split appetizer stations",
    "Client providing additional apps",
  ],
  "Buffet Location/Notes": [
    "Usual Location",
    "Self-Serve Buffet",
    "Two Buffet Lines",
    "Along the wall near kitchen/prep space",
  ],
  "Dessert Notes? Cake Topper?": [
    "<u>Pearls</u>",
    "<u>DRR</u>",
    "<u>Client-Provided</u>",
    "Tiered Cake",
    "Small Cutting Cake",
    "Cupcakes",
    "Assorted desserts",
    "Saving top tier; serving the rest",
    "Saving cutting cake",
    "Cutting entire cake",
    "DRR to set up dessert station",
    "DRR bringing white platters",
    "DRR delivering",
    "Pearl's Delivering",
  ],
  "Who/Where are we leaving leftovers and Honey Moon Plate?": [
    "In fridge at venue",
    "Notify coordinator",
    "Not saving leftovers",
    "DRR providing extra to-go boxes for guests",
  ],
  "How are the bride and groom going to be served?": [
    "Come through the buffet",
    "Plated & served",
    "Check with coordinator day-of",
  ],
  "Appetizer Plates and Utensils": [
    "DRR <b>Basic Black</b> disposables",
    "DRR <b>Silver</b> disposables",
    "DRR <b>Gold/b> disposables",
    "Client-provided disposables",
    "Rented",
  ],
  "Entree Plates and Utensils": [
    "DRR <b>Basic Black</b> disposables",
    "DRR <b>Silver</b> disposables",
    "DRR <b>Gold/b> disposables",
    "Client-provided disposables",
    "Rented",
  ],
  "Dessert Plates and Utensils": [
    "DRR <b>Basic Black</b> disposables",
    "DRR <b>Silver</b> disposables",
    "DRR <b>Gold/b> disposables",
    "Client-provided disposables",
    "Rented",
  ],
  "Drinkware": [
    "DRR 12oz plastic tumblers",
    "Client-provided disposables",
    "Rented water goblets",
    "Rented wine glasses",
    "Rented Bar Glasses",
  ],
  "Table Cloths, What type?": [
    "DRR Black Spandex Linens",
    "Venue-provided",
    "Client-provided",
    "Rented",
  ],
  "Full List of Rented Items": [
    "Appetizer Plates",
    "Appetizer Forks/Utensils",
    "Dinner Plates",
    "Dinner Utensils",
    "Chargers",
    "Water Goblets",
    "Wine Glasses",
    "Bar Glasses",
    "Dessert Plates",
    "Dessert Forks/Utensils",
    "Linen Napkins",
    "Linen Tablecloths",
  ],
  "Name of Rental Company": [
    "Party Perfect",
    "Classic Party Rentals",
    "Rent-E-Quip",
    "Client-provided",
  ],
  "Who is setting up guest tables and chairs?": ["DRR", "Venue", "Client"],
  "Who is responsible for final clean-up after guest departure?": [
    "DRR staying 30 minutes past guest departure to do final clean-up of our stations",
    "Extensive cleaning/breakdown guidelines: see venue requirements",
    "DRR departing early",
    "Venue",
    "Client",
    "DRR assisting with full-breakdown until our departure time",
  ],
  "Are there any other services that Roadhouse is responsible for?": [
    "DRR filling water goblets",
    "Room flip; see layout",
    "DRR moving ceremony chairs",
    "DRR doing full breakdown",
    "DRR setting tables",
  ],
  "Who is the DRR staff checking out with at end of night?": [
    "Coordinator",
    "Venue",
    "Client",
  ],
};document.addEventListener("focusin", (event) => {
  if (event.target.tagName === "TEXTAREA") {
    const textarea = event.target;
    const label = findLabelForTextarea(textarea);

    // If no matching label or no options, exit
    if (!label || !dropdownOptions[label] || dropdownOptions[label].length === 0) return;

    // Remove existing dropdown if any
    document.getElementById("custom-dropdown")?.remove();

    // Create dropdown with matching checkbox options
    const dropdown = createCheckboxDropdown(dropdownOptions[label], textarea);

    // Position dropdown below the textarea
    const rect = textarea.getBoundingClientRect();
    dropdown.style.top = `${rect.bottom + window.scrollY}px`;
    dropdown.style.left = `${rect.left + window.scrollX}px`;

    document.body.appendChild(dropdown);
  }
  document.addEventListener("click", (event) => {
    const dropdown = document.getElementById("custom-dropdown");
    if (dropdown && !dropdown.contains(event.target) && !event.target.matches("textarea")) {
        dropdown.remove();
    }
});
  
});

// Function to find the correct label for each textarea
function findLabelForTextarea(textarea) {
  const contentRow = textarea.closest(".content-row");
  if (!contentRow) return null;

  const labelElement = contentRow.querySelector(".lbl");
  return labelElement ? labelElement.textContent.trim().replace(":", "") : null; 
}

// Function to create the checkbox dropdown
function createCheckboxDropdown(options, textarea) {
  const dropdown = document.createElement("ul");
  dropdown.id = "custom-dropdown";
  

  options.forEach(option => {
   
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.display ="inline-block";
    checkbox.value = option;
    checkbox.id = `checkbox-${option}`;
    checkbox.className = "dropdown-checkbox";
    checkbox.style.visibility = "hidden";
    
    const label = document.createElement("label");
    label.htmlFor = `checkbox-${option}`;
    label.style.display = "inline-block";
    label.textContent = option;

    const list = document.createElement("li");
    list.className = "dropdown-list-item";
    list.appendChild(checkbox);
    list.appendChild(label);

    list.addEventListener("click", (e) => {
      console.log(e.target)
      if (e.target.tagName == "input") {
        checkbox.checked = !checkbox.checked;
      }
      if (checkbox.checked) {
        list.classList.add("selected");
      } else {
        list.classList.remove("selected");
      }
    })

    dropdown.appendChild(list);
  });

  

  // Submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.style.marginTop = "8px";
  submitButton.onclick = () => {
    
    const selectedValues = Array.from(dropdown.querySelectorAll("input:checked"))
      .map(input => input.value)
      .join("\n");

    let currentValue = textarea.value;
    textarea.value = `${currentValue}\n${selectedValues}`;
    
    textarea.focus();
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    // textarea.value= selectedValues || currentValue;
    
    textarea.dispatchEvent(new Event("change", { bubbles: true }));
    
    dropdown.remove();
  };

  dropdown.appendChild(submitButton);
  return dropdown;
}


