function showAll(){
    polyline.init();
    polyline.data = [];
    for(var i = 0;i < tby.children.length;i++){
        var tr_data = [];
        for(var j = 2;j < tby.children[i].children.length;j++){
            tr_data.push(Number(tby.children[i].children[j].textContent));
        };
        polyline.data.push(tr_data);
    }
    var xMargin = (polyline.def.cvs.width - polyline.def.cir.dia*polyline.def.xAxis.length)/(2*polyline.def.xAxis.length),
            ry = [],
            rx = [],
            row_max = [],
            max;
    for(var r = 0;r < polyline.data.length;r++){
        row_max.push(polyline.data[r].max());
    }
    max = row_max.max();

    for(var p = 0;p < polyline.data.length;p++){
        ry.push([]);
        for(var q = 0;q < polyline.data[p].length;q++){
            ry[p].push((polyline.def.cvs.height-polyline.def.cir.dia)*(polyline.data[p][q]/max) + polyline.def.cir.dia/2);
            if(p === 0)rx.push(xMargin*(2*q+1)+polyline.def.cir.dia/2+polyline.def.cir.dia*q);
        }
    }
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');
        for(var s = 0;s < polyline.data.length;s++){
            var lineColor = randomColor();
            for(var t = 0;t < polyline.data[s].length;t++){
                ctx.beginPath();
                ctx.strokeStyle = polyline.def.cir.color;
                ctx.arc(rx[t],polyline.def.cvs.height - ry[s][t], polyline.def.cir.dia/2,0, 2*Math.PI);
                ctx.stroke();
                ctx.closePath();
                if(t!== 0){
                    ctx.beginPath();
                    // ctx.strokeStyle = polyline.def.line.color;
                    ctx.moveTo(rec[0],rec[1]);
                    ctx.lineTo(rx[t],polyline.def.cvs.height - ry[s][t]);
                    ctx.strokeStyle = lineColor;
                    ctx.stroke();
                    ctx.closePath();
                }
                var rec = [rx[t], polyline.def.cvs.height - ry[s][t]];
            }
        }
    }
}

var randomColor = function(){
    return  '#' +
      (function(color){
      return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])
        && (color.length == 6) ?  color : arguments.callee(color);
    })('');
}