console.log("🚀 Script loaded successfully");

document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 DOM fully loaded and parsed");
    const dropdownOptions = {
        "Venue Notes": ["Indoor venue", "Outdoor venue", "Has stage", "Limited seating"],
        "Trash / Dumpster Notes": ["Dumpster on-site", "No dumpster available", "Requires special pickup"],
        "Water Source": ["Tap available", "Bring own water", "Water station nearby"],
        "Catering Van Parking": ["Street parking", "Parking lot available", "Reserved spot needed"],
        "Staff Parking Notes": ["On-site parking", "Street parking", "Limited availability"]
    };

    function createDropdown(textarea, label) {
        const existingDropdown = document.getElementById("custom-dropdown");
        if (existingDropdown) existingDropdown.remove();

        if (!dropdownOptions[label]) return;

        const dropdown = document.createElement("div");
        dropdown.id = "custom-dropdown";
        dropdown.style.position = "absolute";
        dropdown.style.top = `${textarea.getBoundingClientRect().bottom + window.scrollY}px`;
        dropdown.style.left = `${textarea.getBoundingClientRect().left}px`;
        dropdown.style.background = "white";
        dropdown.style.border = "1px solid #ccc";
        dropdown.style.padding = "8px";
        dropdown.style.zIndex = "1000";
        dropdown.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.2)";

        dropdownOptions[label].forEach(option => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = option;
            checkbox.id = `checkbox-${option}`;

            const labelElement = document.createElement("label");
            labelElement.htmlFor = `checkbox-${option}`;
            labelElement.textContent = option;

            const div = document.createElement("div");
            div.appendChild(checkbox);
            div.appendChild(labelElement);
            dropdown.appendChild(div);
        });

        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.style.marginTop = "8px";
        submitButton.onclick = () => {
            const selectedValues = Array.from(dropdown.querySelectorAll("input:checked"))
                .map(input => input.value)
                .join("\n");
            textarea.value = selectedValues;
            dropdown.remove();
        };
        dropdown.appendChild(submitButton);

        document.body.appendChild(dropdown);
    }

    function findLabelForTextarea(textarea) {
        const labelElement = textarea.closest(".form-group")?.querySelector("label");
        return labelElement ? labelElement.textContent.trim() : null;
    }

    function attachDropdownToTextareas() {
        document.querySelectorAll("textarea").forEach(textarea => {
            textarea.addEventListener("mouseenter", () => {
                const label = findLabelForTextarea(textarea);
                if (label) createDropdown(textarea, label);
            });
        });
    }

    // Initial binding
    attachDropdownToTextareas();

    // Observe dynamic changes in the DOM
    const observer = new MutationObserver(() => {
        attachDropdownToTextareas();
    });
    observer.observe(document.body, { childList: true, subtree: true });
});
