import axios from 'axios'

let baseUrl = 'http://localhost:3000'
//获取轮播图的api type为设备类型：如 pc=0 android=1 iphone=2 ipad=3
export function getBanner(type=0){
    return axios.get(`${baseUrl}/banner?type=${type}`)
}

//获取推荐歌单：limit: 取出数量 , 默认为 30 (不支持 offset)
export const getMusicList = function(limit=30){
    return axios.get(`${baseUrl}/personalized?limit=${limit}`)
}

//获取歌单详情: id:歌单列表的id
export const getPlayListDetail = function(id){
    return axios.get(`${baseUrl}/playlist/detail?id=${id}`)
}

//获取歌词: id: 音乐 id
export const getLyric = function(id){
    return axios.get(`${baseUrl}/lyric?id=${id}`)
}

//搜索歌曲
export const serachMusic = function(keyword){
    return axios.get(`${baseUrl}/search?keywords=${keyword}`)
}

//手机登录
export const phoneLogin = function(phone,password){
    return axios.get(`${baseUrl}/login/cellphone?phone=${phone}&password=${password}`)
}
 
//获取用户详情
export const userDetail = function(uid){
    return axios.get(`${baseUrl}/user/detail?uid=${uid}`)
}

export default {
    userDetail
}