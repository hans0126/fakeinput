var app = angular.module("invoice1", []);
app.controller('first', function() {
    var _self = this;
    _self.a = "ABCD";
    _self.b = {
        a: "A",
        b: "C"
    }


    var range = document.createRange();
    var sel = document.getSelection();

    var el = document.getElementById("base");
    //el.focus();

    el.onclick = function() {
        // var curElement = document.activeElement;
        var curElement = this;

        if (curElement.childNodes.length == 0) { //不準確判斷 空白也被當成一個節點
            var _d = document.createElement("DIV");
            var aa = curElement.appendChild(_d);
            range.setStart(aa, 0);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }

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

                // target.innerHTML = '';

                //  console.log(sel.getRangeAt(0).startContainer);
                //  console.log(e);
                var inserElement = document.createElement("DIV");
                inserElement.className = "a" + Math.floor(Math.random() * 5);
                //
                // console.log(sel.getRangeAt(0).startOffset);

                var currentText = sel.getRangeAt(0).startContainer.textContent;
                var nextText = currentText.substring(sel.getRangeAt(0).startOffset);
                currentText = currentText.substring(0, sel.getRangeAt(0).startOffset);
                sel.getRangeAt(0).startContainer.textContent = currentText;
                inserElement.textContent = nextText;

                // sel.getRangeAt(0).startContainer.innerHTML = "SSSS";

                var abc = curElement.insertBefore(inserElement, sel.getRangeAt(0).startContainer.nextSibling);

                //console.log(abc);
            }
        }




        return false;

    }

    /*
        var dd = el.getElementsByTagName("div")[1];


    var curElement = document.activeElement;

  
       

    */

    /*
       
        elem.focus();
        if (document.selection) {
          console.log("A");
        }else{
          console.log("B");
        }

    */
    //
    //console.log(elem.createTextRange());
    //
    //console.log(elem.selectionStart);


});