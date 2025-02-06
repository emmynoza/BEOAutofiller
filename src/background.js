chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "autofill") {
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            function: autofillForm,
            args: [message.data]
        });
        sendResponse({ status: "Autofill triggered" });
    }
});

chrome.action.onClicked.addListener(() => {
    chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"), // Load your existing popup
        type: "popup",
        width: 400,
        height: 600
    });
});
