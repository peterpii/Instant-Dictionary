window.onload = function () {
    $(document).ready(function () {
        var selectedText;
        // Generate the speech bubble
        var $speechBubble = $('<div class="bubble"></div>');
        $speechBubble.appendTo('body');
        $speechBubble.hide();

        // Inner divs for English and Chinese
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
        // Different browsers
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
        
        // Helper function to get the English definition 
        function getSecondPart(str) {
            return str.split('divider__')[1];
        }

        // Text selected, triggers the search
        $(document).on('mouseup', 'div, span, p', function(event) {
            selectedText = getSelectedText();
            if (selectedText && selectedText.toString().trim().length > 0) {
                var eng_match = '';
                if(selectedText.toString().trim().length > 50) {
                    // Do nothing 
                }
                else {
                    let english = selectedText.toString().toLowerCase().trim()+'_eng';
                    let chinese = selectedText.toString().toLowerCase().trim()+'_ch';

                    // Check if the word exists in Chrome storage
                    chrome.storage.local.get({userKeyIds: []}, function (result) {
                        var userKeyIds = result.userKeyIds;
                        let obj_eng = userKeyIds.find(o => o[english]);
                        let obj_ch = userKeyIds.find(o => o[chinese]);
                        
                        // Retrieve value from Chrome storage
                        if(obj_eng !== undefined) {
                            let eng_def = obj_eng[selectedText.toString().toLowerCase().trim()+'_eng'];
                            let ch_def = obj_ch[selectedText.toString().toLowerCase().trim()+'_ch'];
                            engDiv.text(eng_def);
                            cnDiv.text(ch_def);
                            $speechBubble.css({top: event.pageY - ($speechBubble.height()/2), left: event.pageX});
                            $speechBubble.show();
                        }
                        // New word to search for
                        else {
                            chrome.runtime.sendMessage({
                                contentText: "text", txt: selectedText.toString().toLowerCase().trim()
                            }, function (result) {
                                // English
                                let def = '';
                                let eng_text = getSecondPart(result);
                                if (eng_text) {
                                    eng_match = /OOPS/g.exec(eng_text);
                                }
        
                                // English definition
                                if (eng_match == null || eng_match[0] != "OOPS") {
                                    def = eng_text.match(new RegExp("\"definition\": \"" + "(.*)" + ".\""))[1];
                                }
                                else {
                                    def = 'Could not translate the selected text';
                                }
        
                                // Traditional Chinese
                                var res = /<span class="trans dtrans dtrans-se.*?>(.*?)<\/span>/g.exec(result);
                                if(res) {
                                    res = res[1];
                                }
                                else {
                                    res = '很抱歉，字典搜尋不到您選取的字';
                                }
                                
                                // Traditional Chinese & English
                                engDiv.text(def);
                                cnDiv.text(res);
                                $speechBubble.css({top: event.pageY - ($speechBubble.height()/2), left: event.pageX});
                                $speechBubble.show();

                                var eng = selectedText.toString().toLowerCase().trim() + '_eng';
                                var ch = selectedText.toString().toLowerCase().trim() + '_ch';
                                
                                // store words in chrome storage
                                chrome.storage.local.get({userKeyIds: []}, function (result) {
                                    var userKeyIds = result.userKeyIds;
                                    let obj_eng = userKeyIds.find(o => o[eng]);
                                    let obj_ch = userKeyIds.find(o => o[ch]);
                                    if(obj_eng === undefined) {
                                        userKeyIds.push({[eng]: def});
                                        userKeyIds.push({[ch]: res});
                                        // set the new array value to the same key
                                        chrome.storage.local.set({userKeyIds: userKeyIds}, function () {});
                                    }
                                    else if(obj_eng == 'Could not Translate the selected text' && def != 'Could not Translate the selected text' ||
                                            obj_ch == '很抱歉，字典搜尋不到您選取的字' && res != '很抱歉，字典搜尋不到您選取的字') {
                                        userKeyIds.push({[eng]: def});
                                        userKeyIds.push({[ch]: res});
                                        // set the new array value to the same key
                                        chrome.storage.local.set({userKeyIds: userKeyIds}, function () {});
                                    }
                                });
                            });
                        }
                    });
                }
            }
            else {
                $speechBubble.hide();
            }
            event.stopPropagation();
        });

        // If no text has been selected, hide the speech bubble menu.
        $(document).mouseup(function () {
            if (getSelectedText() == '') {
                $speechBubble.hide();
            }
        });

    });
}

// Optional: with parts of speech (noun, verb, adjective, etc.)
// var htmlContent = '';
// var englishContent = '';
// var eng_dict = {};
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