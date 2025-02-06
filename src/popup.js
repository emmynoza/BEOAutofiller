document.getElementById("file-upload").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
      console.error("No file selected.");
      document.getElementById("status").textContent = "Error: No file selected.";
      return;
  }

  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  reader.onload = (e) => {
      try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          if (!workbook || !workbook.SheetNames.length) {
              throw new Error("Invalid or empty Excel file.");
          }

          // Store workbook globally
          window.venueWorkbook = workbook;
          console.log("Workbook successfully loaded:", workbook);

          // Enable venue dropdown
          const venueSelect = document.getElementById("venue-select");
          venueSelect.innerHTML = ""; // Clear previous options
          venueSelect.disabled = false;

          // Populate dropdown with sheet names
          workbook.SheetNames.forEach(sheetName => {
              if (sheetName !== "Master") { // Exclude "Master" sheet
                  const option = document.createElement("option");
                  option.value = sheetName;
                  option.textContent = sheetName;
                  venueSelect.appendChild(option);
              }
          });

          console.log("Sheet names detected:", workbook.SheetNames);
          document.getElementById("status").textContent = "Excel file loaded successfully.";
      } catch (error) {
          console.error("Error reading file:", error);
          document.getElementById("status").textContent = "Error: Invalid file format.";
      }
  };

  reader.onerror = (error) => {
      console.error("Error reading file:", error);
      document.getElementById("status").textContent = "Error: Failed to read file.";
  };
});

document.getElementById("autofill-button").addEventListener("click", function () {
  const selectedVenue = document.getElementById("venue-select").value;
  const status = document.getElementById("status");

  if (!selectedVenue) {
      status.textContent = "Please select a venue.";
      return;
  }

  if (!window.venueWorkbook) {
      console.error("Error: Workbook is not loaded.");
      status.textContent = "Error: No Excel file loaded.";
      return;
  }

  const workbook = window.venueWorkbook;

  if (!workbook.Sheets[selectedVenue]) {
      console.error(`Error: Sheet "${selectedVenue}" not found.`);
      status.textContent = "Error: Venue sheet not found.";
      return;
  }

  const sheet = workbook.Sheets[selectedVenue];
  const jsonArray = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

if (jsonArray.length < 1) {
    console.error("⚠️ No data extracted from sheet.");
    return;
}

// Convert column data to key-value pairs
const rowData = {};
jsonArray.forEach(row => {
    if (row.length >= 2) { // Ensure there is both a header and a value
        const key = row[0]?.trim();  // First column is the header
        const value = row[1]?.trim(); // Second column is the value
        if (key) {
            rowData[key] = value;
        }
    }
});

console.log("🔄 Converted Column Data Object:", rowData);



  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;

      chrome.scripting.executeScript(
          {
              target: { tabId },
              files: ["src/content.js"], // Inject content script dynamically
          },
          () => {
              if (chrome.runtime.lastError) {
                  console.error("Error injecting content script:", chrome.runtime.lastError.message);
                  status.textContent = "Error: Could not inject content script.";
                  return;
              }

              console.log("✅ Content script injected. Sending autofill message...");

              // Send the message AFTER ensuring content.js is injected
              setTimeout(() => {
                
                  chrome.tabs.sendMessage(tabId, { action: "autofill", data: rowData }, (response) => {
                      if (chrome.runtime.lastError) {
                          console.error("Error sending message:", chrome.runtime.lastError.message);
                          status.textContent = "Error: Could not send autofill message.";
                      } else {
                          console.log("✅ Autofill response received:", response);
                          

                          status.textContent = "Autofill completed!";
                      }
                  });
              }, 500); // Small delay to ensure injection before sending
          }
      );
  });
});



