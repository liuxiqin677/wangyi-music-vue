//实现自适应rem布局
function remSize(){
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    if(deviceWidth >= 750){
        deviceWidth = 750
    }
    if(deviceWidth <= 320){
        deviceWidth = 320
    }
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
    //设计稿是750px，设置一半的宽度就是375px
    //1rem == 100px
    //表达一半的宽度就是3.75rem
    document.querySelector('body').style.fontSize = 0.3 + 'rem'
}

remSize()
//窗口发生变化时
window.onresize = function(){
    remSize()
} 