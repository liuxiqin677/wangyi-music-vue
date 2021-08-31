# vue-music

## Project setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```


## 实现自适应rem布局
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

## 实现首页导航和布局
    ### 顶部导航栏
    
    ### 轮播图
        -导入swiper插件
        -首页使用swiper插件

## 实现发现歌单

## 歌单页面、歌单详情

## 播放列表

## 音乐播放与暂停

## 切换歌曲、播放界面实现

## 歌词获取、歌词随时间滚动

## 上一首、下一首切换

## 搜索功能

## 根据历史搜素

## 登录页

## 个人中心

## vue.config.js配置部署

## 编译打包到云端服务器

