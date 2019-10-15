chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // if (request.contentText == "text") {
    //     var url = "http://dict.cn/" +
    //         encodeURIComponent(request.txt);
    //     fetch(url)
    //         .then(response => response.text())
    //         .then(result => sendResponse(result))
    //         .catch(error => console.log(error))
    //     return true;  // Will respond asynchronously.
    // }

    if (request.contentText == "text") {
            // var url = "https://tw.dictionary.search.yahoo.com/search;_ylt=AwrtXW_e_mtdSEYAvRV7rolQ;_ylu=X3oDMTBvYjg4OHI4BGNvbG8DBHBvcwMxBHZ0aWQDBHNlYwNzYw--?fr=sfp&p=" + encodeURIComponent(request.txt);
            // var url2 = "http://definition.org/define/" + encodeURIComponent(request.txt);
            var url = "http://dict.cn/" + encodeURIComponent(request.txt);
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
            // var res;
            // Promise.all(urls.map(url =>
            //     fetch(url)
            //         .then(response => response.text())
            //         .then(result => res += result)
            //         .catch(error => console.log(error))
            // ))
            // .then(data => {
            //     // do something with the data
            //     sendResponse(res);
            //     return true;
            // })
            
            // Promise.all([
            //     fetch(url),
            //     fetch(url2)
            // ])
            //     .then(response => response.text())
            //     .then(result => { sendResponse(result); })
            //     .catch(error => console.log(error));
            // return true;
    }
});
