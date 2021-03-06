var canvas = document.getElementById("canvas"),
            regionText = document.getElementById("region-text"),
            productText = document.getElementById("product-text");

Array.prototype.max = function(){
    return Math.max.apply({},this)
};

var polyline = {
    data:null,

    def:{
        cvs:{
            width:500,
            height:300
        },
        cir:{
            dia:6,
            color:"#444"
        },
        line:{
            color:"#09e",
            width:"2px"
        },
        bar:{
            width:20,
            bgColor:"#50b7c1"
        },
        xAxis:[1,2,3,4,5,6,7,8,9,10,11,12]
    },

    init: function(){
        canvas.width = this.def.cvs.width;
        canvas.height = this.def.cvs.height;
        if(canvas.getContext){
            var ctx = canvas.getContext('2d');
            ctx.moveTo(0,0);
            ctx.lineTo(0,this.def.cvs.height);
            ctx.lineTo(this.def.cvs.width,this.def.cvs.height);
            ctx.stroke();
        }
    },

    graph: function(){
        var xMargin = (this.def.cvs.width - this.def.cir.dia*this.def.xAxis.length)/(2*this.def.xAxis.length),
            max = this.data.max(),
            ry = [],
            rx = [],
            xScale = [];
        for(var i = 0;i < this.data.length;i++){
            ry.push((this.def.cvs.height-this.def.cir.dia)*(this.data[i]/max) + this.def.cir.dia/2);
            rx.push(xMargin*(2*i+1)+this.def.cir.dia/2+this.def.cir.dia*i);
        }
        if(canvas.getContext){
            var ctx = canvas.getContext('2d');
            for(var j = 0;j < this.data.length;j++){
                ctx.beginPath();
                ctx.strokeStyle = this.def.cir.color;
                ctx.arc(rx[j],this.def.cvs.height - ry[j], this.def.cir.dia/2,0, 2*Math.PI);
                ctx.stroke();
                ctx.rect(rx[j] - this.def.bar.width/2, this.def.cvs.height - ry[j], this.def.bar.width, ry[j]-2);
                ctx.fillStyle = this.def.bar.bgColor;
                ctx.strokeStyle = "#fff";
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
                if(j!== 0){
                    ctx.beginPath();
                    ctx.strokeStyle = this.def.line.color;
                    ctx.moveTo(rec[0],rec[1]);
                    ctx.lineTo(rx[j],this.def.cvs.height - ry[j]);
                    ctx.stroke();
                    ctx.closePath();
                }
                var rec = [rx[j], this.def.cvs.height - ry[j]];
            }
        }
    }
}

tby.onmouseover = function(event){
    polyline.init();
    var tar = event.target,
        oTr = tar.parentNode;
        polyline.data = [];
    if(tar !== oTr.children[0]){
        for(var i = 2;i < oTr.children.length;i++){
            polyline.data.push(Number(oTr.children[i].textContent));
        }
        polyline.graph();
        regionText.innerHTML = oTr.children[0].textContent;
        productText.innerHTML = oTr.children[1].textContent;
    }
}

tby.onmouseout = function(event){
    regionText.innerHTML = "";
    productText.innerHTML = "";
    showAll();
}

region_radio_wrapper.onclick = function(event){
    var tar = event.target;
    if(tar.type === "checkbox"){
        showAll();
    }
}

product_radio_wrapper.onclick = function(event){
    var tar = event.target;
    if(tar.type === "checkbox"){
        showAll();
    }
}