<template>
  <!-- 整体的头部预览描述部分 -->
  <div class="listViewTop">
      <img class="bg" :src="playlist.coverImgUrl" alt="">
      <!-- 头部Nav部分 -->
      <div class="listViewTopNav">
        <!-- 左边返回部分 -->
        <div class="back" @click="$router.back()">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zuojiantou1"></use>
            </svg>
            <div class="title">
                歌单
            </div>
        </div>
        <!-- 右边搜索部分 -->
        <div class="right">
            <svg class="icon serach" aria-hidden="true">
                <use xlink:href="#icon-sousuo3"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao1"></use>
            </svg>
        </div>

      </div>
      <!-- 中间部分 -->
      <div class="content">
          <div class="contentLeft">
              <img :src="playlist.coverImgUrl" alt="">
              <div class="count">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofang"></use>
                    </svg>
                    <span>{{changeValue(playlist.playCount)}}</span>
              </div>

          </div>
          <div class="contentRight">
              <h3>{{playlist.name}}</h3>
              <div class="author">
                  <img :src="playlist.creator.avatarUrl" class="authorAvatar">
                  <span>{{playlist.creator.nickname}}</span>
              </div>
              <div class="description">
                  {{playlist.description}}
              </div>
          </div>
      </div>
      <!-- 底部部分 -->
      <div class="iconList">
          <div class="iconItem">
              <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liaotian1"></use>
              </svg>
              <span>{{playlist.commentCount}}</span>
          </div>
          <div class="iconItem">
              <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
              </svg>
              <span>{{playlist.shareCount}}</span>
          </div>
          <div class="iconItem">
              <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-download-1-copy"></use>
              </svg>
              <span>下载</span>
          </div>
          <div class="iconItem">
              <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-duoxuan"></use>
              </svg>
              <span>多选</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:['playlist'],
    methods: {
        changeValue(num){
            let res = 0
            if(num>=100000000){
                res = num/100000000
                res = res.toFixed(2) + '亿'//拿小数点后两位
            }else if(num > 10000){
                res = num/10000
                res = res.toFixed(2) + '万'
            }
            return res
        }
    },
}
</script>

<style lang="less" scoped>
.listViewTop{
    width: 7.5rem;
    padding: 0 0.4rem;
    .bg{
        position: fixed;
        left: 0;
        top: 0;
        width: 7.5rem;
        height: auto;
        z-index: -1;
        filter: blur(20px);
    }
    .listViewTopNav{
        display: flex;
        justify-content: space-between;
        height: 1.2rem;
        align-items: center;
        font-size: 0.35rem;
        .icon{
            width: 0.5rem;
            height: 0.5rem;
            // 填充icon是用fill
            fill: #fff;
        }
        .title{
            margin-left: 0.4rem;
        }
        .serach{
            margin-right: 0.5rem;
        }
    }
    .back,.right{
        display: flex;
        color:#fff;
        align-items: center;
    }
    .content{
        display: flex;
        justify-content: space-between;
        padding: 0.6rem 0;
        .contentLeft{
            position: relative;
            img{
                width: 2.8rem;
                height: 2.8rem;
                border-radius: 0.1rem;
            }
            .count{
                position: absolute;
                right: 0.1rem;
                top: 0.1rem;
                color: #ccc;
                font-size: 0.24rem;
                display: flex;
                align-items: center;
                .icon{
                    fill: #ccc;
                }
            }
        }
        .contentRight{
            width: 3.5rem;
            h3{
                color: #fff;
            }
            .author{
                display: flex;
                align-items: center;
                margin: 0.3rem 0;
                img{
                    width: 0.6rem;
                    height: 0,6rem;
                    border-radius: 0.3rem;
                    margin-right: 0.2rem;
                }
                span{
                    color: #ccc;
                }
            }
            .description{
                font-size: 0.24rem;
                color: #ccc;
                overflow: hidden;
                text-overflow: ellipsis;
                // 显示是box
                display: -webkit-box;
                // 显示两行
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
    .iconList{
        display: flex;
        justify-content: space-around;
        .iconItem{
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon{
                width: 0.6rem;
                height: 0.6rem;
                fill: #fff;
            }
            span{
                font-size: 0.28rem;
                color: #fff;
                padding-top: 0.2rem;
            }
        }
    }
}
</style>