chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.contentText == "text") {
            var url = "https://dictionary.cambridge.org/us/dictionary/english-chinese-traditional/" + encodeURIComponent(request.txt);
            var url2 = "https://googledictionaryapi.eu-gb.mybluemix.net/?define=" + encodeURIComponent(request.txt);
            var text = '';
            fetch(url)
                .then(response => response.text())
                .then(result => text += result + "divider__")
                .catch(error => console.log(error))
            fetch(url2)
                .then(response => response.text())
                .then(result => sendResponse(text + result))
                .catch(error => console.log(error))
            return true;
    }
});
