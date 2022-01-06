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
        // function getSecondPart(str) {
        //     return str.split('divider__')[1];
        // }
        
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
                                contentText: "englishText", txt: selectedText.toString().toLowerCase().trim()
                            }, function (result) {
                                // English
                                let english = result['english'] || 'Could not translate the selected text';
                                let chinese = result['chinese'] || '很抱歉，字典搜尋不到您選取的字';
        
                                // Traditional Chinese & English
                                engDiv.text(english);
                                cnDiv.text(chinese);
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
                                        userKeyIds.push({[eng]: english});
                                        userKeyIds.push({[ch]: chinese});
                                        // set the new array value to the same key
                                        chrome.storage.local.set({userKeyIds: userKeyIds}, function () {});
                                    }
                                    else if(obj_eng == 'Could not Translate the selected text' && english != 'Could not Translate the selected text' ||
                                            obj_ch == '很抱歉，字典搜尋不到您選取的字' && chinese != '很抱歉，字典搜尋不到您選取的字') {
                                        userKeyIds.push({[eng]: english});
                                        userKeyIds.push({[ch]: chinese});
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