// How to use:  val(element id, class, or name);

function val(element) {
    var attribType = checkAttribType(element);

    if(attribType == "id")  return getIdValue(element);
    else if(attribType == "class") return getClassValue(element); 
    else if(attribType == "name") return getNameValue(element);
    else false;
}

function elem(element) {
    var attribType = checkAttribType(element);
    return getElement(element, attribType);
}

function edit(element) {        
    var built_element = buildElement(element, checkAttribType(element));    
    built_element.setAttribute("contentEditable", true); // HTML5
}

function checkAttribType(element) {
    if(checkClass(element) === true) return "class";  
    else if(checkId(element) === true) return "id"; 
    else if(checkName(element) === true) return "name"; 
    else return false;
}

function buildElement(element, attribType) {
    if(attribType == "id") return getElement(element, attribType);
    else if(attribType == "class") return getElement(element, attribType)[0];
    else if(attribType == "name") return getElement(element, attribType)[0];
}

function getElement(element, attribType) {
    if(attribType == "id") return document.getElementById(element);
    else if(attribType == "class") return document.getElementsByClassName(element);
    else if(attribType == "name") return document.getElementsByName(element);
}

function checkId(element) {
    if(getElement(element, "id") == null) return false;
    else return true;
}

function checkClass(element) {    
    if(getElement(element, "class").length > 0) return true;
    else return false;
}

function checkName(element) {    
    if(getElement(element, "name").length > 0) return true;
    else return false;
}

function getIdValue(element) {
    return getElementVal(buildElement(element, "id"));
}

function getClassValue(element) {
    return getElementVal(buildElement(element, "class"));
}

function getNameValue(element) {        
    return getElementVal(buildElement(element, "name"));
}

function getElementVal(element) {  
    switch(element.tagName.toLowerCase()) {
        case "input":
            if(element.type == "radio") {
                let elem = getElement(element.name, "name");
                for(i = 0; i < elem.length; i++) {
                    if(elem[i].checked)                  
                        return(elem[i].value);
                }
            } else if(element.type == "checkbox") {
                let elem = getElement(element.name, "name");
                let values = [];
                for(i = 0; i < elem.length; i++) {
                    if(elem[i].checked) {                        
                        values.push(elem[i].value)                                                
                    }
                }                
                return values;
            } else return (element.value);            
            break;            
        case "div":
        case "span":         
        case "button":
        case "textarea":
            return (element.innerHTML);
            break;
        case "select":
            return (element.options[element.selectedIndex].text);
            break;            
        case "radio":
            return (element.value);
            break;                        
        case "ul":
            if(element.id !== "") { // if ID
                var listItems = getElement(element.id, "id").getElementsByTagName('li');
            } else {
                var listItems = getElement(element.id, "id").getElementsByTagName('li');               
            }  
            var values = [];
            for (let i = 0; i < listItems.length; i++) {
                values.push(listItems[i].textContent);
            }    
            return (values);          
            break;
        default:
            break;
    }    
}

function generateTextBoxJson(containerid, textJson) {
    var arr = JSON.parse(textJson);    
    var keys = Object.keys(arr);
    var textarr = [];
    
    for (let i = 0; i < keys.length; i++) {     
        var item = arr[keys[i]];
        var keys2 = Object.keys(item);
        var textobj = {};

        for (var j = 0; j < keys2.length; j++) {
            let keyname = Object.keys(item)[j];            
            textobj[j] = "<input type='text' class='" + keyname + "' value='"+ item[keyname] +"' />";            
        }
        textarr.push(textobj);
    }
   
    createTextBox(containerid, textarr);
}

function createTextBox(containerid, textarr) {
    for(i = 0; i < textarr.length; i++) {
        buildElement(containerid, "id").innerHTML += "<div>";
        for(j = 0; j < Object.keys(textarr[i]).length; j++) {
            buildElement(containerid, "id").innerHTML += textarr[i][j];
        }
        buildElement(containerid, "id").innerHTML += "</div>";
    }
}

function urlFull() {
    return (window.location.href).replace(/^(.+?)\/*?$/, "$1"); // remove trailing slashes
}

function urlProtocol() {
    return window.location.protocol;
}

function urlPath() {
    return window.location.pathname;
}

function urlparameters() {
    var paramarray = (window.location.search).split("&");
    var jsonparam = "["; 
    paramarray[0] = paramarray[0].replace("?","");
    
    for(var i = 0; i < paramarray.length; i++) {
        let splitparam = paramarray[i].split("=");
        jsonparam += '{"' + splitparam[0] + '":"' + splitparam[1] + '"}';
        if(i <  paramarray.length-1) {
            jsonparam += ',';
        }
    }
    jsonparam += ']';
    return JSON.parse(jsonparam);
}