# BEOAutofiller

This project is a Chrome extension designed to autofill forms on web pages based on user-saved data. It provides a simple and efficient way to manage form inputs, enhancing user experience and productivity.

## Features

- Autofill forms with saved data
- User-friendly popup interface for managing autofill data
- Background script for handling events and managing the extension lifecycle

## Project Structure

```

├── src
│   ├── background.js        # Background script for managing extension lifecycle
│   ├── content.js          # Content script for interacting with web pages
│   ├── popup
│   │   ├── popup.html      # HTML structure for the popup interface
│   │   ├── popup.js        # JavaScript logic for the popup
│   │   └── popup.css       # Styles for the popup interface
└── manifest.json       # Configuration file for the Chrome extension
├── package.json             # npm configuration file
└── README.md                # Documentation for the project
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd chrome-autofill-extension
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage

1. Load the extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `src` directory
2. Click on the extension icon to open the popup interface.
3. Use the interface to save and manage autofill data.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.