function init_checkBox(container, vals, checked_count, checked_item){
    var checkAll = '<input type="checkbox" value="全选" checkbox-type="all">全选';
    container.innerHTML += checkAll;
    for(var i = 0;i < vals.length;i++){
        var Ipt = document.createElement("input");
        Ipt.type = "checkbox";
        Ipt.value = vals[i];
        Ipt.setAttribute("checkbox-type", "child");
        container.appendChild(Ipt);
        container.innerHTML += vals[i];
    }
    container.addEventListener("click", function(event){
        var tar = event.target,
            checkbox_item = container.getElementsByTagName("input");
        if(tar.type === "checkbox"){
            for(var m = 1;m < checkbox_item.length;m++){
                checkbox_item[m].removeAttribute("disabled");
            }
            checked_item.length = 0;

            var attr = tar.getAttribute("checkbox-type");
            if(attr === "all"){
                for(var j = 0;j < checkbox_item.length;j++){
                    if(!checkbox_item[j].checked && checkbox_item[j].getAttribute("checkbox-type") !== "all"){
                        checkbox_item[j].checked = true;
                    }
                    if(j !== 0){
                        checked_item.push(checkbox_item[j].value);
                    };
                }
            }else if(attr === "child"){
                var status = [];
                for(var k = 1;k < checkbox_item.length;k++){
                    status.push(checkbox_item[k].checked);
                }
                var idx = 0,
                    pos = 0,
                    res = [];
                findAll(status, true, res);
                checked_count = res.length;
                if(res.length === checkbox_item.length - 1){
                    checkbox_item[0].checked = true;
                }else if(res.length === 1){
                    checkbox_item[res[0]+1].disabled = "disabled";
                }else if(res.length < checkbox_item.length - 1){
                    checkbox_item[0].checked = false;
                }

                function findAll(arr, tar, res){
                    idx = arr.indexOf(tar, pos);
                    if(idx > -1){
                        res.push(idx);
                        pos = idx + 1;
                        checked_item.push(checkbox_item[idx+1].value);
                    }else {
                        return false;
                    }
                    if(pos < arr.length){
                        findAll(arr, tar, res);
                    }
                }
            }
            var query = "regions=" + checked_items.regions + "&products=" +checked_items.products;
            history.pushState(checked_items,"",location.href.split("?")[0] + "?" + query);
        }

        render_table(getAllData());
    })
}

init_checkBox(region_radio_wrapper, region_checkbox_val, checked_count.regionChecked, checked_items.regions);
init_checkBox(product_radio_wrapper, product_checkbox_val, checked_count.productChecked, checked_items.products);
