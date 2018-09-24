let hourlyWage = document.getElementById("hourly-wage");

chrome.storage.sync.get(['savedWage'], function(result) {
	if (result.savedWage !== '') {
		hourlyWage.value = result.savedWage;
	}
});	

document.getElementById("save-btn").addEventListener("click", function() {
	if (hourlyWage.value > 0) {
		chrome.storage.sync.set({savedWage: hourlyWage.value}, function() {
			document.getElementById("error-message").setAttribute("style", "display: none");
			document.getElementById("success-message").setAttribute("style", "display: block");
		});
	} else {
		document.getElementById("success-message").setAttribute("style", "display: none");
		document.getElementById("error-message").setAttribute("style", "display: block");
	}
})

