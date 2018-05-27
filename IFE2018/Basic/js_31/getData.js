function getData(region, product){
    for(var i = 0,len = sourceData.length;i < len;i++){
        if(sourceData[i].product === product && sourceData[i].region === region){
            if(checked_items.regions.length === 1){
                var dataItem = [sourceData[i].region, sourceData[i].product];
            }else {
                var dataItem = [sourceData[i].product, sourceData[i].region];
            }
            for(var j = 0;j < 12;j ++){
                dataItem.push(sourceData[i].sale[j])
            }
        }
    }
    return dataItem;
}

function getAllData(){
    var allData = [];
    for(var a = 0;a < checked_items.products.length;a++){
        for(var b = 0;b < checked_items.regions.length;b++){
            allData.push(getData(checked_items.regions[b],checked_items.products[a]));
        }
    }
    return allData;
}