chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.contentText == "englishText") {
            var url = "https://dictionary.cambridge.org/us/dictionary/english-chinese-traditional/" + encodeURIComponent(request.txt);
            var url2 = "https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(request.txt);
            var obj = {};
            fetch(url2)
                .then(response => response.json())
                .then(result => {
                    obj['english'] = result[0] && result[0]['meanings'] && result[0]['meanings'][0] && result[0]['meanings'][0]['definitions'] && 
                                     result[0]['meanings'][0]['definitions'][0] && result[0]['meanings'][0]['definitions'][0]['definition'] || '';
                })
                .catch(error => console.log(error))
            fetch(url)
                .then(response => response.text())
                .then(result => {
                    const doc = document.createElement("div");
                    doc.innerHTML = result;
                    let res = doc.querySelectorAll('.def-body')[0] && doc.querySelectorAll('.def-body')[0].firstElementChild && doc.querySelectorAll('.def-body')[0].firstElementChild.innerText || '';
                    obj['chinese'] = res
                    sendResponse(obj)
                })
                .catch(error => console.log(error))
            
            return true;
    }
});
