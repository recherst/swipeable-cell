<template lang="pug">
    .home
        h2 滑动删除cell
        .container
            swipeable-cell(v-for="(item, index) in dataList", 
                          :key="index", 
                          :data-index="index",
                          :options="options",
                          @swipeable-cell-actions="handleItemDelete")
              .cell(:style="{ height: item.cellHeight }")
                img(:src="item.imgURL")
                .right-block
                    .title {{ item.title }}
                    .sub-title {{ item.subTitle }}
</template>
<script>
    import SwipeableCell from '../SwipeableCell.vue';
    
    export default {
        data() {
            return {
                dataList: [
                    {
                        imgURL: "https://image.baidu.com/search/detail?ct=503316480&z=&tn=baiduimagedetail&ipn=d&word=%E9%A3%8E%E6%99%AF&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&cs=2131205662,1725422972&os=937360927,3624280818&simid=1945580103,818753838&pn=0&rn=1&di=79372123950&ln=1974&fr=&fmq=1537879406188_R&ic=0&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=13&spn=0&pi=0&gsm=0&objurl=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F241f95cad1c8a786ff65052a6d09c93d70cf5042.jpg&rpstart=0&rpnum=0&adpicid=0",
                        title: '草原',
                        subTitle: '网络图片草原',
                        cellHeight: '100px'
                    },
                    {
                        imgURL: 'https://image.baidu.com/search/detail?ct=503316480&z=&tn=baiduimagedetail&ipn=d&word=%E9%A3%8E%E6%99%AF&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&cs=3701485667,96126389&os=3941740315,2637028390&simid=1965380979,589230612&pn=1&rn=1&di=40689355100&ln=1974&fr=&fmq=1537879406188_R&ic=0&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=13&spn=0&pi=0&gsm=0&objurl=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fc75c10385343fbf2618015f7ba7eca8064388fb2.jpg&rpstart=0&rpnum=0&adpicid=0',
                        title: '湖泊',
                        subTitle: '网络图片湖泊',
                        cellHeight: '80px'
                    },
                    {
                        imgURL: 'https://image.baidu.com/search/detail?ct=503316480&z=&tn=baiduimagedetail&ipn=d&word=%E9%A3%8E%E6%99%AF&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&cs=783178755,1828230642&os=2897032291,4092308435&simid=4062277603,624323440&pn=9&rn=1&di=50971677260&ln=1974&fr=&fmq=1537879406188_R&ic=0&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=13&spn=0&pi=0&gsm=0&objurl=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D6e75baf69858d109d0eea1f1b931a6ca%2Fb2de9c82d158ccbfdfa06cb213d8bc3eb135411e.jpg&rpstart=0&rpnum=0&adpicid=0',
                        title: '城堡',
                        subTitle: '网络图片城堡',
                        cellHeight: '150px'
                    }
                ],
                options: {
                    width: 40,
                    // direction: 'horizontal',
                    actions: [
                        {
                            title: '关注',
                            backgroundColor: '#8b7216',
                        },
                        {
                            // title: '删除',
                            image: require('../assets/search_delete.png'),
                            backgroundColor: '#cc0000',
                        }
                    ]
                },
                
            }
        },
        methods: {
            handleItemDelete(o) {
                const { cellIndex, actionIndex } = o;
                console.log(cellIndex, actionIndex);
                this.dataList.splice(cellIndex, 1);
                // if (actionIndex == this.options.actions.length - 1) {
                //     this.dataList.splice(cellIndex, 1);
                // } else {
                //     console.log('点击了其他按钮');
                // }
            }
        },
        components: {
            SwipeableCell
        }
    }
</script>
<style scoped lang="scss">
    .home {
        height: 100%;
        text-align: center;

        h2 {
            padding: 20px 0;
        }

        .container {
            height: inherit;
            overflow: hidden;

            .cell {
                padding: 0 10px;
                background-color: burlywood;
                margin-bottom: 10px;
                display: flex;
                justify-content: flex-start;
                align-items: center;

                img {
                    background-color: cadetblue;
                    width: 80px;
                    height: 80px;
                    margin-right: 10px;
                }
                .right-block {
                    text-align: left;

                    .title {
                        color: #4a4a4a;
                        font-size: 17px;
                    }
                }
            }
        }
    }
    
</style>