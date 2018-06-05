if(window.localStorage){
    var storage = window.localStorage;
    if(storage.getItem("sourceData")){
        sourceData.length = 0;
        sourceData = JSON.parse(storage.getItem("sourceData"));
    }
}
var val = {
    init_val: null
},
submit = document.getElementById("submit"),
flag = true;
tby.addEventListener("click", function(event){
    var tar = event.target;
    if(tar.tagName === "TD"){
        if(tar.parentNode.children[0] === tar || tar.parentNode.children[1] === tar)return false;
        if(tar.textContent && tar.children.length === 0){
            val.init_val = tar.textContent;
        }else{
            val.init_val = tar.children[0].value;
        }
        if(tar.children.length === 0){
            var ipt = document.createElement("input");
            tar.innerHTML = "";
            ipt.type = "text";
            tar.appendChild(ipt);
            ipt.setAttribute("value", val.init_val);
            ipt.focus();
            ipt.selectionStart = ipt.value.length;
            var confirm = document.createElement("span"),
                cancel = document.createElement("span");
            confirm.setAttribute("id", "confirm");
            cancel.setAttribute("id", "cancel");
            confirm.textContent = "确认";
            cancel.textContent = "取消";
            tar.appendChild(confirm);
            tar.appendChild(cancel);
        }
    }
    if(tar.id === "cancel"){
        flag = false;
    }
})

tby.addEventListener("blur", function(event){
    var tar = event.target;
    if(tar.tagName === "INPUT"){
        setTimeout(function(){
            if(flag === true){
                var edit_val = tar.value;
            }else{
                var edit_val = val.init_val;
            }
            if(edit_val.trim() === "" || isNaN(Number(edit_val.trim())) || Number(edit_val.trim()) < 0 || Math.round(Number(edit_val.trim())) !== Number(edit_val.trim()) || (edit_val.trim().length > 1 && edit_val.trim()[0] === "0")){
                alert("请输入合法格式");
                edit_val = val.init_val;
            }
            var oTd = tar.parentNode;
            oTd.removeChild(tar);
            oTd.innerHTML = edit_val;
        },100)
    }
},true)


tby.addEventListener("keyup", function(event){
    var tar = event.target;
    flag = true;
    if(tar.tagName === "INPUT"){
        var key_code = event.keyCode;
        if(key_code === 27){
            flag = false;
        }
        if(key_code === 13 || key_code === 27){
            tar.blur();
        }
    }
})

tby.addEventListener("mouseover", function(event){
    var tar = event.target;
    if(tar.tagName === "TD"){
        if(tar.parentNode.children[0] !== tar && tar.parentNode.children[1] !== tar){
            tar.className = "edit-icon";
        }
    }
})

tby.addEventListener("mouseout", function(event){
    var tar = event.target;
    if(tar.tagName === "TD"){
        tar.className = "";
    }
})

submit.onclick = function(){
    var oTr = tby.children;
    for(var i = 0;i < oTr.length;i++){
        for(var j = 2;j < oTr[i].children.length;j++){
            for(var k = 0;k < sourceData.length;k++){
                if((sourceData[k].product === oTr[i].children[0].textContent && sourceData[k].region === oTr[i].children[1].textContent) || (sourceData[k].product === oTr[i].children[1].textContent && sourceData[k].region === oTr[i].children[0].textContent)){
                    sourceData[k].sale[j-2] = Number(oTr[i].children[j].textContent);
                }
            }
        }
    }
    if(window.localStorage){
        localStorage.setItem("sourceData",JSON.stringify(sourceData));
    }
}