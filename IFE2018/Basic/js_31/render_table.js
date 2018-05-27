function render_table(data){
    thWrapper.innerHTML = "";
    if(checked_items.regions.length === 1){
        var theader = ["地区","商品","1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
    }else{
        var theader = ["商品","地区","1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
    }

    for(var i = 0,len = theader.length;i < len;i++){
        var oTh = document.createElement("th");
        oTh.innerHTML = theader[i];
        thWrapper.appendChild(oTh);
    }

    tby.innerHTML = "";

    for(var j = 0;j < data.length;j++){
        var oTr = document.createElement("tr");
        for(var k = 0;k < theader.length;k ++){
            var oTd = document.createElement("td");
            oTd.innerHTML = data[j][k];
            oTr.appendChild(oTd);
        }
        tby.appendChild(oTr);
    }

    for(var r = 0;r < data.length;r++){
        for(var s = r+1;s < data.length;s++){
            if(tby.children[r].children[0].innerText === tby.children[s].children[0].innerText){
                tby.children[s].children[0].style.display = "none";
                tby.children[r].children[0].rowSpan += 1;
            }else{
                break;
            }
        }
        r = s - 1;
    }

}