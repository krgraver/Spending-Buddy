function highlightHandler(e) {
	let savedWage,
		highlightMessage,
		highlight = document.getSelection().toString();

	if (highlight !== '') {
		highlight = filterHighlight(highlight);

		if (isNaN(highlight)) {
			console.log("Not a valid price");
		} else {
			chrome.storage.sync.get(['savedWage'], function(result) {
				if (result.savedWage) {
					savedWage = result.savedWage;

					let hoursWork = (highlight / savedWage).toFixed(2);

					highlightMessage = hoursWork + " hours of work";

					createHighlightWindow(highlightMessage);
				} else {
					highlightMessage = "Enter an hourly wage";

					createHighlightWindow(highlightMessage);
				}
			});
		}
	}
}

function filterHighlight(string) {
	let commasRemoved = string.replace(/,/g, '');

	if (commasRemoved.charAt(0) === '$') {
		return commasRemoved.slice(1);
	} else {
		return commasRemoved;
	}
}

function createHighlightWindow(message) {
	let messageWindow = document.createElement('div'),
		messageContent = document.createTextNode(message),
		body = document.getElementsByTagName("body")[0];

	messageWindow.id = "message-window";
	Object.assign(messageWindow.style, {zIndex: "1000000",
										position: "fixed",
										top: "20px",
										right: "20px",
										paddingLeft: "40px",
										paddingRight: "40px",
										textAlign: "center",
										background: "#FFF",
										border: "3px solid #44BF9B",
										borderRadius: "5px",
										fontSize: "18px",
										fontWeight: "bold",
										lineHeight: "60px"
										});
	messageWindow.appendChild(messageContent);
	body.appendChild(messageWindow);
	setTimeout(function() {messageWindow.remove()}, 5000);
}

document.onmouseup = highlightHandler;