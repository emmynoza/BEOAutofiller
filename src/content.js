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
        "Staff Parking Notes": "Staff Parking Notes"
    };

    for (const key of Object.keys(fieldMappings)) {
        console.log(`🔹 Searching for input with label: "${fieldMappings[key]}"`);
        const input = findInputByLabel(fieldMappings[key]);

        if (input) {
            console.log(`📝 Filling "${key}" with: "${data[key]}"`);

            // Simulate user typing
            input.focus();
            input.value = data[key] || "";
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));

            await new Promise(resolve => setTimeout(resolve, 500)); // Delay to let autosave trigger

            input.blur(); // Ensures field loses focus and autosave triggers
            console.log(`✅ Successfully filled "${key}"`);

            await new Promise(resolve => setTimeout(resolve, 300)); // Additional delay before next field
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
