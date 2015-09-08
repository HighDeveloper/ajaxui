$(document).ready(function(){

    var ajaxui = new Ajaxui();
    ajaxui.settings({
        loaderClass: 'ball-scale-multiple'
    });
    ajaxui.callbacks({
        ajax: {
            success: function(data){
                alert(data);
            },
            complete: function(xhr, status){
                alert(status);
            }
        },
        actions: {
            nameFunc1: function(){
                console.log("sample1");
            },
            nameFunc2: function(){
                console.log('sample2')
            },
            nameFunc3: numFunc3
        }
    });
    ajaxui.startService();

});


function numFunc3(){
    alert("sample3");
}