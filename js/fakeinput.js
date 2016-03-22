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

    // console.log(sel.getRangeAt(0).startContainer);
    var currentElement = lastFocus.startContainer.parentElement;


    if (currentElement.tagName == "DIV") {
        //console.log("DIV");
        var _span = null;
        var currentText = lastFocus.startContainer.textContent;
        var nextText = currentText.substring(lastFocus.startOffset);
        var preText = currentText.substring(0, lastFocus.startOffset);

        lastFocus.startContainer.parentElement.innerHTML = "";


        if (preText) {
            _span = document.createElement("SPAN");
            _span.innerHTML = preText;
            lastFocus.startContainer.appendChild(_span);
        }

        _span = document.createElement("SPAN");
        _span.innerHTML = " insert ";
        _span.setAttribute("contentEditable", "false");
        lastFocus.startContainer.appendChild(_span);

        if (nextText) {
            _span = document.createElement("SPAN");
            _span.innerHTML = nextText;
            lastFocus.startContainer.appendChild(_span);
        }


    } else if (currentElement.tagName == "SPAN") {
        //console.log("SPAN");
        var _span = null;
        var preElement = lastFocus.startContainer.parentElement.nextSibling; //前一個元素，定位點
        var currentRoot = lastFocus.startContainer.parentElement.parentElement;
        var currentText = lastFocus.startContainer.textContent;
        var nextText = currentText.substring(lastFocus.startOffset);
        var newElement = null;
        var preText = currentText.substring(0, lastFocus.startOffset);


        currentRoot.removeChild(lastFocus.startContainer.parentElement);


        if (preText) {
            _span = document.createElement("SPAN");
            _span.innerHTML = preText;
            newElement = currentRoot.insertBefore(_span, preElement);
        }

        _span = document.createElement("SPAN");
        _span.innerHTML = " 123456 ";
        newElement = currentRoot.insertBefore(_span, newElement.nextSibling);


        if (nextText) {
            _span = document.createElement("SPAN");
            _span.innerHTML = nextText;
            newElement = currentRoot.insertBefore(_span, newElement.nextSibling);
        }




        //console.log(lastFocus.startContainer.parentElement.parentElement.nodeName);

        /*
                if (preText) {
                    _span = document.createElement("SPAN");
                    _span.innerHTML = preText;
                    lastFocus.startContainer.appendChild(_span);
                }
        */

        // console.log(currentText);



        /*
        if(preElement){
            console.log("has");
        }else{
            console.log("not has");
        }
        */
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


        contentElement.className = "group first";

        var lastInsertElement = curElement.appendChild(contentElement);

        range.setStart(lastInsertElement, 0);

        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);



    }


    // console.log(sel.getRangeAt(0).startContainer.getAttribute("class"));


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


            //   var currentElemtnt = sel.getRangeAt(0).startContainer;
            //當下若選擇文字，文字沒有child
            var currentSelect = null;

            var baseElement = null;

            if (sel.getRangeAt(0).startContainer.hasChildNodes()) {
                currentSelect = sel.getRangeAt(0).startContainer;
            } else {
                currentSelect = sel.getRangeAt(0).startContainer.parentElement;
            }


            //  console.log(currentSelect.tagName);

            if (currentSelect.tagName == "DIV") {

                var currentText = currentSelect.textContent;
                var nextText = currentText.substring(sel.getRangeAt(0).startOffset);
                var preText = currentText.substring(0, sel.getRangeAt(0).startOffset);

                if (!preText || preText == "") {
                    preText = "<br/>";
                }

                if (!nextText || nextText == "") {
                    nextText = "<br/>";
                }

                currentSelect.innerHTML = preText;
                baseElement = currentSelect;
                dd.innerHTML = nextText;

            } else if (currentSelect.tagName == "SPAN") {
                //  console.log("SPAN");

                // get parent element

                var _textObj = {
                    pre: [],
                    next: []
                }

                var _k = false;

                var _parent = currentSelect.parentElement;



                for (var i = 0; i < _parent.childNodes.length; i++) {
                    if (_parent.childNodes[i] == currentSelect) {
                        _k = true;
                    }

                    if (_k) {
                        _textObj.next.push(_parent.childNodes[i]);
                    } else {
                        _textObj.pre.push(_parent.childNodes[i]);
                    }
                }

                // console.log(_textObj.next[0].textContent);

                var currentText = _textObj.next[0].textContent;
                var nextText = currentText.substring(sel.getRangeAt(0).startOffset);
                var preText = currentText.substring(0, sel.getRangeAt(0).startOffset);


                var _span = document.createElement("SPAN");
                _span.innerHTML = preText;
                _textObj.pre.push(_span);

                while (_parent.firstChild) {
                    _parent.removeChild(_parent.firstChild);
                }

                for (var i = 0; i < _textObj.pre.length; i++) {
                    _parent.appendChild(_textObj.pre[i]);
                }

                var _span = document.createElement("SPAN");
                _span.innerHTML = nextText;

                _textObj.next.splice(0, 1);

                _textObj.next.unshift(_span);

                var dd = document.createElement("DIV");

                for (var i = 0; i < _textObj.next.length; i++) {


                    dd.appendChild(_textObj.next[i]);
                }


                baseElement = _parent;


            }       

          

            if (curElement.childNodes.length == 1 || (baseElement == curElement.lastChild)) { //w
                console.log("first");
                var newLine = curElement.appendChild(dd);
            } else {
                console.log("normal");
                var newLine = curElement.insertBefore(dd, baseElement.nextSibling);
            }

            range.setStart(newLine, 0);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }


        if (keyCode === 8){
              if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
           console.log(sel.getRangeAt(0).startOffset);
           //backspace 
          
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