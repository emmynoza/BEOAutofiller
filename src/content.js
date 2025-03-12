console.log("Content script is running.");
function findInputByLabel(labelText) {
  const labels = [...document.querySelectorAll(".lbl")];
  for (const label of labels) {
      const labelTextCleaned = label.textContent.trim().replace(/\s+/g, " ").replace(/:$/, ""); // Remove extra spaces and colon
        // console.log('labelTextCleaned', labelTextCleaned)
      if (labelTextCleaned === labelText) {

          let valueContainer = label.nextElementSibling;
          
          if (!valueContainer || !valueContainer.classList.contains("value")) {
              valueContainer = label.parentElement.querySelector(".value");
          }

          if (valueContainer) {
            //   console.log(`📌 Found value container for "${labelText}"`);
              const inputElement = valueContainer.querySelector("input, textarea"); // Include textareas
              if (inputElement) {
                //   console.log(`🎯 Found Input for: "${labelText}"`, inputElement);
                  inputElement.style.border = "2px solid green"; // Highlight input in green
                  return inputElement;
              } else {
                  console.warn(`⚠️ No input/textarea found inside value container for "${labelText}"`);
              }
          } else {
              console.warn(`⚠️ No value container found for "${labelText}"`);
          }
      }
  }

  console.warn(`⚠️ Could not find label: "${labelText}"`);
  return null;
}
  
async function autofillForm(data) {
    console.log("🧐 Raw data received (object format):", data);

    
    if (typeof data !== "object" || data === null) {
        console.error("⚠️ Data is not in the expected object format!", data);
        return;
    }

    const fieldMappings = {
        "Venue Name": "Venue Name",
        "Address": "Address",
        "Distance from Roadhouse": "Distance from Roadhouse",
        "Venue Notes": "Venue Notes",
        "Trash / Dumpster Notes": "Trash / Dumpster Notes",
        "Water Source": "Water Source",
        "Catering Van Parking": "Catering Van Parking",
        "Staff Parking Notes": "Staff Parking Notes",
        "NA Location(s)": "NA Location(s)",
        "Who is bartending?": "Who is bartending?",
        "Bar Location(s)": "Bar Location(s)",
        "Who is providing ice?": "Who is providing ice?",
        "Appetizer Location/Notes": "Appetizer Location/Notes",
        "Buffet Location/Notes": "Buffet Location/Notes",
        "Buffet Tables": "Buffet Tables",
        "Appetizer Table": "Appetizer Table",
        "NA Beverage Table": "NA Beverage Table",
        "Bar Tables": "Bar Tables",
        "Dessert Table": "Dessert Table",
        "Who is setting up guest tables and chairs?": "Who is setting up guest tables and chairs?",
        "Who is responsible for final clean-up after guest departure?:": "Who is responsible for final clean-up after guest departure?:",
        "Are there any other services that Roadhouse is responsible for?": "Are there any other services that Roadhouse is responsible for?"


    };

    for (const key of Object.keys(fieldMappings)) {
        console.log(`🔹 Searching for input with label: "${fieldMappings[key]}"`);
        const input = findInputByLabel(fieldMappings[key]);
    
        if (input) {
            let currentValue = input.value.replace(/\s/g, ""); // Remove all spaces and hidden characters
            console.log(`🔍 Checking "${key}" - Cleaned Current Value: "${currentValue}"`);
    //This will skip the field if it already has content eventually
            // if (currentValue !== "") {
            //     console.log(`⏩ Skipping "${key}" (already filled: "${input.value.trim()}")`);
            //     continue; // Skip this field if it already has content
            // }
    
            console.log(`📝 Filling "${key}" with: "${data[key]}"`);
    
            // Simulate user typing
            input.focus();
            
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.value = data[key] || currentValue;
            input.dispatchEvent(new Event("change", { bubbles: true }));
            

            // if (["Venue Name", "Address", "Distance from Roadhouse", "Water Source"].includes(key)) {
            //     input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
            //     await new Promise(resolve => setTimeout(resolve, 1200));
            //     input.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
            // }
            
    
            await new Promise(resolve => setTimeout(resolve, 600)); // Allow autosave time
    
            input.blur(); // Ensures autosave triggers
            console.log(`✅ Successfully filled "${key}"`);
    
            await new Promise(resolve => setTimeout(resolve, 300)); // Extra delay before next field
        } else {
            console.warn(`⚠️ Could not find input for "${key}"`);
        }
    }
    console.log("✅ Autofill process completed.");
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("📩 Message received in content.js:", message);

    if (message.action === "autofill") {
        autofillForm(message.data);
        sendResponse({ status: "success" }); // Send a response to avoid "port closed" error
    }
});
