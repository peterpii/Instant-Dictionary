// setInterval(function(){ 
    // var text = window.getSelection().toString().trim();
    // if (text && text.length > 0) {
    //     if(text == 'interactive')
    //         console.log('entered');
    // }

    // document.addEventListener('selectstart', () => {
    //     var text = window.getSelection().toString().trim();
    //     if (text && text.length > 0) {
    //         console.log(text);
    //     }
    // });

    
    // document.addEventListener('selectionchange', () => {
    //     var text = window.getSelection().toString().trim();
    //     if (text && text.length > 0) {
    //         // PopupCenter('http://www.xtf.dk','xtf','900','500');  
    //         //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>

    //         // create speech bubble for dictionary definition
    //         // var bubble = document.createElement("div");
    //         // bubble.setAttribute("class", "speech-bubble");
    //         // bubble.innerHTML = text;
    //         // document.body.appendChild(bubble);

    //         // ------------------------------------------
    //         var newDiv = document.createElement('div');
    //         newDiv.setAttribute("id", "bubble");
    //         newDiv.setAttribute("style", "background-color: red;");
    //         var content = document.createTextNode("hi bubble");
    //         newDiv.appendChild(content);
    //         document.body.appendChild(newDiv);

    //         var selectedPosition = window.getSelection().getRangeAt(0).getBoundingClientRect()

    //         var d = document.getElementById('bubble');
    //         d.style.position = "absolute";
    //         d.style.left = selectedPosition.left +'px';
    //         d.style.height = selectedPosition.height + 'px';
    //         d.style.bottom = selectedPosition.bottom + 'px';
    //         d.style.right = selectedPosition.right + 'px';
    //         d.style.top = selectedPosition.top + 'px';
    //         d.style.width = selectedPosition.width + 'px';
    //         //-----------------------------------------------

    //         // put selected text into a div and also give it an ID
    //         var selectedText = document.createElement("div");
    //         selectedText.setAttribute("id", "selectedText");
    //         selectedText.innerHTML = text;
    //         document.body.appendChild(selectedText);

    //         // TODO: right now the <div> element with text is appended at the end of the <body> tag.
    //         // what I want to do is to actually get the position of the selected text and give it an ID
    //         // 1) find selected text
    //         // 2) give it an ID
    //         // 
    //         // Later, find using ID. if ('#ID').dblclick, then show popup tooltips




    //         // to get selected text position
    //         var s = window.getSelection();
    //         var oRange = s.getRangeAt(0); //get the text range
    //         var oRect = oRange.getBoundingClientRect();
    //     }
    // });

    //         // if (document.getElementById('selectedText')) {
    //         //     document.getElementById('selectedText').style.width = '50px';
    //         //     document.getElementById('selectedText').style.height = '100px';
    //         //     document.getElementById('selectedText').style.border = '1px solid #000';
    //         // }
    // document.onload = function() {

    //         // double click on
    //         $('#selectedText').dblclick(function(event) {
    //             createTooltip(event);               
    //         }).mouseout(function(){
    //             // create a hidefunction on the callback if you want
    //             //hideTooltip(); 
    //         });
            
    //         function createTooltip(event){          
    //             // $('<div class="tooltip" id="test">test</div>').appendTo('body');
    //             // var bubble = document.createElement("div");
    //             // bubble.setAttribute("class", "speech-bubble");
    //             // bubble.innerHTML = "inner bubble";
    //             var html = '<div class="speech-bubble">' + 'definition inner bubble' + '</div>';
    //             $('#selectedText').append(html);
    //             // document.body.appendChild(bubble);
                
    //             positionTooltip(event);        
    //         };

    //         function positionTooltip(event){
    //             var tPosX = event.pageX/2 + 'px';
    //             var tPosY = event.pageY-10 + 'px';
    //             // if (document.getElementById('test')) {
    //             //     document.getElementById('test').style.width = '100px';
    //             //     document.getElementById('test').style.height = '100px';
    //             //     document.getElementById('test').style.border = '1px solid #000';
    //             // }
    //             $('div.tooltip').css({'position': 'absolute', 'top': tPosY, 'left': tPosX});
    //         };
    // }

    
    // chrome.storage.sync.get('txt', function(result) {
    //     if (result.txt && result.txt != "") {
    //         chrome.storage.sync.set({'txt': result.txt});
    //     }
    // });
// }, 5000);



// Add bubble to the top of the page.
// var bubbleDOM = document.createElement('div');
// bubbleDOM.setAttribute('class', 'selection_bubble');
// document.body.appendChild(bubbleDOM);

// // Lets listen to mouseup DOM events.
// document.addEventListener('mouseup', function (e) {
//     var selection = window.getSelection().toString();
//     if (selection.length > 0) {
//         renderBubble(e.clientX, e.clientY, selection);
//     }
// }, false);


// // Close the bubble when we click on the screen.
// document.addEventListener('mousedown', function (e) {
//     bubbleDOM.style.visibility = 'hidden';
// }, false);

// // Move that bubble to the appropriate location.
// function renderBubble(mouseX, mouseY, selection) {
//     bubbleDOM.innerHTML = selection;
//     bubbleDOM.style.top = mouseY + 'px';
//     bubbleDOM.style.left = mouseX + 'px';
//     bubbleDOM.style.visibility = 'visible';
// }

// window.onload = function () {
//     console.log("loaded");
//     // $( "div" ).css( "border", "3px solid red" );
//         document.addEventListener('selectionchange', function (result) {
//             var text = window.getSelection().toString().trim();
//             console.log(text);
//             console.log(result);

//         });
// }



    // document.addEventListener('selectionchange', () => {
    //     var text = window.getSelection().toString().trim();
    //     if (text && text.length > 0) {
    //         // PopupCenter('http://www.xtf.dk','xtf','900','500');
    //         //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>

    //         // create speech bubble for dictionary definition
    //         // var bubble = document.createElement("div");
    //         // bubble.setAttribute("class", "speech-bubble");
    //         // bubble.innerHTML = text;
    //         // document.body.appendChild(bubble);
    //     }
    // }); 

    // Generate the speech bubble



window.onload = function () {
    $(document).ready(function () {
        var selectedText;
        // Generate the speech bubble
        var $speechBubble = $('<div class="bubble"></div>');
        $speechBubble.appendTo('body');
        $speechBubble.hide();

        // inner divs for English and Chinese
        var engDiv = $('<div class="english"></div>');
        engDiv.appendTo('.bubble');
        var hr = $('<hr>');
        hr.appendTo('.bubble');
        var cnDiv = $('<div class="chinese"></div>');
        cnDiv.appendTo('.bubble');
        
        // Updates the global variable mousePosition with the current location of the mouse
        var mousePosition;
        function updateMousePosition(event) {
            mousePosition = { left: event.pageX, top: event.pageY };
        }

        // update mouse position
        $(document).mousemove(updateMousePosition);

        // Return selected text 
        // Different browsers, different ways of getting the selected text.
        function getSelectedText() {
            if (window.getSelection) {
                return window.getSelection();
            }
            else if (document.getSelection) {
                return document.getSelection();
            }
            else if (document.selection) {
                return document.selection.createRange().text;
            }
            else {
                // This should normally never happen.
                alert('Could not get the selected text.')
                return false;
            }
        }
        
        // Check if the user has selected any text within div/span
        // If he has, show the speech bubble menu.
        // document.addEventListener('mouseup', function(event) {
        //     console.log (event.target.tagName);
        //     if (event.target.tagName == 'DIV' || event.target.tagName == 'SPAN') {
        //         callback();
        //     }
        // function callback() {
        // }
        function getSecondPart(str) {
            return str.split('divider__')[1];
        }

        $(document).on('mouseup', 'div, span, p', function(event) {
            selectedText = getSelectedText();

            if (selectedText && selectedText.toString().trim().length > 0) {
                var htmlContent = '';
                var englishContent = '';
                var eng_match = '';
                chrome.runtime.sendMessage({
                    contentText: "text", txt: selectedText.toString().trim()
                }, function (result) {
                    // English
                    let def = '';
                    var eng_dict = {};
                    let eng_text = getSecondPart(result);
                    if (eng_text) {
                        eng_match = /OOPS/g.exec(eng_text);
                    }

                    //English translation
                    if (eng_match == null || eng_match[0] != "OOPS") {
                        def = eng_text.match(new RegExp("\"definition\": \"" + "(.*)" + ".\""))[1];
                    }
                    else {
                        def = 'Could not translate the selected text';
                    }
                    
                    // Optional: with parts of speech (noun, verb, adjective, etc.)
                    // if (eng_match == null || eng_match[0] != "OOPS") {
                    //     //English translation
                    //     let english_text = JSON.parse(eng_text);
                    //     var eng_title = Object.keys(english_text[0].meaning)[0];
                    //     let eng_val = "";
                    //     if (english_text[0].meaning) {
                    //         if (english_text[0].meaning.noun) {
                    //             eng_val = english_text[0].meaning.noun[0].definition;
                    //         }
                    //         else if (english_text[0].meaning.verb) {
                    //             eng_val = english_text[0].meaning.verb[0].definition;
                    //         }
                    //         else if (english_text[0].meaning.adjective) {
                    //             eng_val = english_text[0].meaning.adjective[0].definition;
                    //         }
                    //         else if (english_text[0].meaning.pronoun) {
                    //             eng_val = english_text[0].meaning.pronoun[0].definition;
                    //         }
                    //         else if (english_text[0].meaning.adverb) {
                    //             eng_val = english_text[0].meaning.adverb[0].definition;
                    //         }
                    //         else if (english_text[0].meaning.preposition) {
                    //             eng_val = english_text[0].meaning.preposition[0].definition;
                    //         }
                    //         else if (english_text[0].meaning.abbreviation) {
                    //             eng_val = english_text[0].meaning.abbreviation[0].definition;
                    //         }
                    //         else if (english_text[0].meaning.conjunction) {
                    //             eng_val = english_text[0].meaning.conjunction[0].definition;
                    //         }
                    //         else if (english_text[0].meaning.exclamation) {
                    //             eng_val = english_text[0].meaning.exclamation[0].definition;
                    //         }
                    //         eng_dict[eng_title] = eng_val;
                    //     }
                    // }
                    // else {
                    //     englishContent = 'Could not translate the selected text';
                    // }

                    // Traditional Chinese
                    // cn_title_regex = /<div class=" pos_button fz-14 fl-l mr-12">(.*?)<\/div>/g;
                    // cn_val_regex = /<div class=" fz-16 fl-l dictionaryExplanation">(.*?)<\/div>/g;
                    // var cn_matches = {};
                    // var cn_title_match = cn_title_regex.exec(result);
                    // var cn_val_match = cn_val_regex.exec(result);

                    // while (cn_val_match != undefined) {

                    //     // Chinese translation
                    //     if (cn_title_match == undefined) {
                    //         cn_matches[""] = cn_val_match[1];
                    //         cn_title_match = cn_title_regex.exec(result);
                    //         cn_val_match = cn_val_regex.exec(result);
                    //     }
                    //     else {
                    //         cn_matches[cn_title_match[1]] = cn_val_match[1];
                    //         cn_title_match = cn_title_regex.exec(result);
                    //         cn_val_match = cn_val_regex.exec(result);
                    //     }
                    // }

                    // for (var key in cn_matches) {
                    //     // console.log(key, cn_matches[key]);
                    //     htmlContent += key + " " + cn_matches[key];
                    // }

                    // for (var key in eng_dict) {
                    //     englishContent += key + ". " + eng_dict[key];
                    // }

                    // Simplified Chinese
                    var res = /<strong>(.*?)<\/strong>/g.exec(result);
                    res = res[1];
                    if (res == '6秒之后自动跳转到首页') {
                        res = '很抱歉，字典搜寻不到您选取的字'
                    }

                    // Traditional Chinese
                    // if (Object.keys(cn_matches).length === 0 && htmlContent == '') {
                    //     htmlContent = "很抱歉，字典搜尋不到您選取的字";
                    // }

                    // Traditional Chinese & English
                    // cnDiv.text(htmlContent);
                    // engDiv.text(englishContent);

                    // Simplified Chinese & English
                    engDiv.text(def);
                    cnDiv.text(res);
                    $speechBubble.css({top: event.pageY - ($speechBubble.height()/2), left: event.pageX});
                    $speechBubble.show();
                });
            }
            else {
                $speechBubble.hide();
            }
            event.stopPropagation();
        });

        //If no text has been selected, hide the speech bubble menu.
        $(document).mouseup(function () {
            if (getSelectedText() == '') {
                $speechBubble.hide();
            }
        });

    });
}

// $('div, span').mouseup(function (event) {
        //     var selectedText = getSelectedText();

        //     if (selectedText != '') {
        //         // console.log(event.pageX, event.pageY);
        //         chrome.runtime.sendMessage({
        //             contentText: "text", txt: selectedText.toString().trim()
        //         }, function (result) {
        //             // res = /<strong>(.*?)<\/strong>/g.exec(result);
        //             // res = res[1];
        //             // console.log(result);
        //             // if (res == '6秒之后自动跳转到首页') {
        //             //     res = 'Could not translate the selected text'
        //             // }

        //             // cn_title_regex = /<div class=" pos_button fz-14 fl-l mr-12">(.*?)<\/div>/g;
        //             // cn_val_regex = /<div class=" fz-16 fl-l dictionaryExplanation">(.*?)<\/div>/g;
        //             // var cn_matches = {};
        //             // var cn_title_match = cn_title_regex.exec(result);
        //             // var cn_val_match = cn_val_regex.exec(result);

        //             // while (cn_title_match != null) {
        //             //     // cn_matches.push(match[1]);
        //             //     // match = cn_val_regex.exec(result);
        //             //     cn_matches[cn_title_match[1]] = cn_val_match[1];
        //             //     cn_title_match = cn_title_regex.exec(result);
        //             //     cn_val_match = cn_val_regex.exec(result);
        //             // }

        //             // for (var key in cn_matches) {
        //             //     // console.log(key, cn_matches[key]);
        //             //     htmlContent += key + " " + cn_matches[key] + "\r\n";
        //             // }

        //             $speechBubble.text(selectedText);
        //             $speechBubble.offset({ top: event.pageY, left: event.pageX });
        //             $speechBubble.show();
        //         });
        //     }

        // });
