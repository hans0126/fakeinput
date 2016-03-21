function GetSelectedText() {
    if (window.getSelection) { // all browsers, except IE before version 9
        var range = window.getSelection();
        alert(range.toString());
    } else {
        if (document.selection.createRange) { // Internet Explorer
            var range = document.selection.createRange();
            alert(range.text);
        }
    }
}




var sel = window.getSelection();
var range = document.createRange();
var el = document.getElementById("base");
var btn = document.getElementById("b");

var count = 0;
var lastFocus = null
    //el.focus();



btn.onclick = function() {


    var currentElement = lastFocus.startContainer.parentElement;


    if (currentElement.tagName == "DIV") {
        console.log("DIV");
        var currentText = lastFocus.startContainer.textContent;
        var nextText = currentText.substring(lastFocus.startOffset);
        currentText = currentText.substring(0, lastFocus.startOffset);

        //console.log(currentText);
        //console.log(nextText);

        // console.log(lastFocus.startContainer.parentElement);
        lastFocus.startContainer.parentElement.innerHTML = "";

        var ia = document.createElement("SPAN");
        var ib = document.createElement("SPAN");
        var ic = document.createElement("SPAN");

        ia.innerHTML = currentText;
        ib.innerHTML = nextText;
        ic.innerHTML = " oh ";

        lastFocus.startContainer.appendChild(ia);
        lastFocus.startContainer.appendChild(ic);
        lastFocus.startContainer.appendChild(ib);
    } else if (currentElement.tagName == "SPAN") {
        console.log("SPAN");
        
        var preElement =lastFocus.startContainer.parentElement.previousSibling;

        console.log(preElement);
    }





    //  console.log(lastFocus.startContainer.parentElemen);
}


//sel.getRangeAt(0).startContainer 這是個node 無法用dom方式去做處理
//若要處裡則 sel.getRangeAt(0).startContainer.parentElement 到tag去做



var placeholderDiv = document.createElement("DIV");
placeholderDiv.textContent = el.getAttribute('placeholder') + "...";
placeholderDiv.className = "placeholder";
el.appendChild(placeholderDiv);


el.onclick = function() {
    // var curElement = document.activeElement;
    var curElement = this;

    var placeholder = curElement.querySelector('.placeholder');

    if (placeholder) {
        curElement.removeChild(placeholder);
        var contentElement = document.createElement("DIV");
        contentElement.appendChild(document.createElement("BR"));
        contentElement.className = "group";
        var lastInsertElement = curElement.appendChild(contentElement);

        range.setStart(lastInsertElement, 0);

        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }


    /*
        if (curElement.childNodes.length == 0) { //不準確判斷 空白也被當成一個節點
            var _d = document.createElement("DIV");
            var aa = curElement.appendChild(_d);
            range.setStart(aa, 0);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
*/


    curElement.onkeydown = function(e) {

        if (!e) {
            e = window.event;
        }
        var keyCode = e.which || e.keyCode,
            target = e.target || e.srcElement;

        if (keyCode === 13 && !e.shiftKey) {

            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }


            var dd = document.createElement("DIV");
            dd.className = "group";
            dd.appendChild(document.createElement("BR"));
            curElement.appendChild(dd);
            count++;

            var newLine = curElement.insertBefore(dd, sel.getRangeAt(0).startContainer.nextSibling);
            range.setStart(newLine, 0);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            /*

            // target.innerHTML = '';

            //  console.log(sel.getRangeAt(0).startContainer);
            //  console.log(e);
            var inserElement = document.createElement("DIV");
            var _br = document.createElement("BR");
            inserElement.className = "a" + Math.floor(Math.random() * 5);
            inserElement.appendChild(_br);

            //
            // console.log(sel.getRangeAt(0).startOffset);

            var currentText = sel.getRangeAt(0).startContainer.textContent;


            var nextText = currentText.substring(sel.getRangeAt(0).startOffset);
            currentText = currentText.substring(0, sel.getRangeAt(0).startOffset);
            sel.getRangeAt(0).startContainer.textContent = currentText;
            inserElement.textContent = nextText;

            var abc = curElement.insertBefore(inserElement, sel.getRangeAt(0).startContainer.nextSibling);


            range.setStart(abc, 0);

            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            //console.log(abc);

            */
        }
    }




    return false;

}

el.onblur = function() {

    var empty = false;
    var childElement = this.querySelectorAll('div');
    /*
        if (childElement.length == 1) {
            if (childElement[0].textContent === "") {
                empty = true;
            }
        } else if (childElement.length == 0) {
            empty = true;
        }

        if (empty) {

            while (this.firstChild) {
                this.removeChild(this.firstChild);
            }

            this.appendChild(placeholderDiv);
        }
    */
    // console.log( sel.getRangeAt(0).startContainer)

    lastFocus = sel.getRangeAt(0);
}