document.addEventListener("DOMContentLoaded",function () {
    var ds=document.querySelectorAll('.clickok');

    console.log(ds);
    for (var i = 0; i < ds.length; i++) {
        ds[i].onclick  = function(){
            console.log(this.id);

        }
    }

});