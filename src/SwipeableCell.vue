<template lang="pug">
        .list-item(@touchstart="touchStart",
                   @touchmove="touchmove",
                   @touchend="touchEnd")
            slot
            .warpper(:style="warpperStyle")
                .action(v-for="(item, index) in mergeOptions.actions", 
                        :key="index",
                        @touchstart.stop="tap(index, $event)",
                        :style="actionStyle(index)")
                    img(class="icon", v-if="item.hasOwnProperty('image')", :src="item.image")
                    span(v-if="item.hasOwnProperty('title')") {{ item.text }}
</template>
<script>
    export default {
        'name': 'swipeable-cell',
        props: {
            options: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                // 记录初始位置
                startX: 0,
                startY: 0,
                // 记录结束位置
                endX: 0,
                delta: 0,
                wrapperWidth: 0,
                mergeOptions: {},
                defaultOptions: {
                    width: 80,
                    swipeThreshold: window.innerWidth * 0.6,
                    backgroundColor: '#f1f1f1',
                    direction: 'vertical',
                    actions: [
                        {
                            title: 'delete',
                            backgroundColor: '#cc0000',
                        }
                    ]
                }
            }
        },
        created() {
            // 合并 options
            Object.assign(this.mergeOptions, this.defaultOptions, this.options)
        },
        computed: {
            warpperStyle() {
                let style = {}
                let totalWidth = 0
                this.mergeOptions.actions.forEach(element => {
                    totalWidth += parseInt(this.mergeOptions.width)
                })
                style.marginLeft = -totalWidth + 'px'
                this.wrapperWidth = totalWidth
                return style
            },
        },
        methods: {
            // 处理每个action的样式
            actionStyle(index) {
                const item = this.mergeOptions.actions[index]
                let style = {};
                if (item.hasOwnProperty('backgroundColor')) {
                    style.backgroundColor = item.backgroundColor
                } else {
                    style.backgroundColor = this.mergeOptions.backgroundColor
                }
                if (this.mergeOptions.direction == 'horizontal') {
                    style.flexDirection = 'row'
                    style.webkitFlexDirection = 'row'
                } else {
                    style.flexDirection = 'column'
                    style.webkitFlexDirection = 'column'
                }
                // console.log('样式 --->', style);
                return style;
            },
            touchStart(e) {
                // 记录初始位置
                this.startX = e.touches[0].clientX
                this.startY = e.touches[0].clientY
                const currentTarget = e.currentTarget
                if (currentTarget.dataset.type != 1) {
                    this.resetSlide()
                }
            },
            touchmove(e) {
                // console.log('touch move');
                const startX = e.touches[0].clientX
                const startY = e.touches[0].clientY
                // 如果是垂直移动，则返回
                if (Math.abs(startX - this.startX) < Math.abs(startY - this.startY)) return
                const currentTarget = e.currentTarget
                let wrapperNode = currentTarget.childNodes[1]
                if (currentTarget.dataset.type == 1) { // 展开状态
                    this.delta = startX - this.startX - this.wrapperWidth
                } else {
                    this.delta = startX - this.startX
                }
                // console.log('diff ---', this.delta);
                if (this.delta < 0) {
                    currentTarget.style.transform = `translate3d(${this.delta}px, 0, 0)`
                    wrapperNode.style.right = `${this.delta}px`
                    wrapperNode.style.width = `${-this.delta}px`
                }
                
            },
            touchEnd(e) {
                // 当前滑动的父元素
                let currentElement = e.currentTarget
                let wrapperNode = currentElement.childNodes[1]
                // // 记录结束位置
                this.endX = e.changedTouches[0].clientX
                let offset = 0;
                if (currentElement.dataset.type == 1) { // 展开状态
                    offset = this.endX - this.startX - this.wrapperWidth
                } else {
                    offset = this.endX - this.startX
                }
                // console.log('start --', this.startX)
                // console.log('end --', this.endX)
                const delta = Math.abs(offset)
                let threshold = (this.defaultOptions.swipeThreshold > this.wrapperWidth) ? 
                                this.defaultOptions.swipeThreshold 
                                : this.wrapperWidth + 30
                // console.log('总宽度 --', this.wrapperWidth, '阈值 -', threshold, '差 -', delta)
                // console.log(' offset --', offset)
                currentElement.childNodes[0].style.transition = `0.3s`
                if (this.startX > this.endX) { // 左滑
                    if (delta > threshold) { // 删除
                        currentElement.style.transform = `translate3d(0, 0, 0)`
                        wrapperNode.style.right = `0`
                        wrapperNode.style.width = `0`
                        // 调用删除函数
                        const deleteBtnIndex = this.mergeOptions.actions.length - 1
                        this.$emit('swipeable-cell-actions', {cellIndex: currentElement.dataset.index, actionIndex: deleteBtnIndex})
                    } else if (delta > this.wrapperWidth * 0.5 && delta < threshold) {
                        currentElement.style.transform = `translate3d(-${this.wrapperWidth}px, 0, 0)`
                        wrapperNode.style.right = `-${this.wrapperWidth}px`
                        wrapperNode.style.width = `${this.wrapperWidth}px`
                        currentElement.dataset.type = '1'
                        this.delta = -this.wrapperWidth
                    } else { // 复位
                        currentElement.style.transform = `translate3d(0, 0, 0)`
                        wrapperNode.style.right = `0`
                        wrapperNode.style.width = `0`
                        currentElement.dataset.type = '0'
                        this.delta = 0
                        this.startX = 0
                    }
                } else { // 右滑
                    // console.log('向右滑动---')
                    if (currentElement.dataset.type == 1) {
                        currentElement.style.transform = `translate3d(0, 0, 0)`
                        wrapperNode.style.right = `0`
                        wrapperNode.style.width = `0`
                        currentElement.dataset.type = '0'
                        this.delta = 0
                        this.startX = 0
                    }
                }
                
                this.delta = 0;
                this.startX = 0;
                setTimeout(() => {
                    currentElement.childNodes[0].style.transition = ``
                    wrapperNode.style.transition = ``
                }, 300)
            },
            resetSlide() {
                const listItems = document.querySelectorAll('.list-item')
                for (let i = 0; i < listItems.length; i++) {
                    if (listItems[i].dataset.type == 1) {
                        listItems[i].style.transition = `0.3s`
                        listItems[i].style.transform = `translate3d(0, 0, 0)`
                        listItems[i].dataset.type = '0'
                        setTimeout(() => {
                            listItems[i].style.transition = ``
                        }, 300)
                    }
                }
            },
            tap(index, e) {
                // console.log('actionindex --', index, e);
                const swipeableCell = e.currentTarget.parentNode.parentNode
                // console.log('suoyin ----', swipeableCell.dataset.index);
                this.$emit('swipeable-cell-actions', {cellIndex: swipeableCell.dataset.index, actionIndex: index})
            },
        }
    }
</script>
<style scoped lang="scss">
    .list-item {
        position: relative;
        
        .warpper {
            width: 0;
            height: 100%;
            font-size: 17px;
            color: #fff;
            position: absolute;
            top:0;
            right: 0;
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-around;
            overflow: hidden;
            padding: 0;
        }

        .action {
            display: flex;
            justify-content: center;
            align-items: center;
            height: inherit;
            flex-grow: 1;
            flex-basis: 0%;

            .icon {
                max-width: 40px; 
                max-height: 40px;
            }
        }

        .swipeabledelete {
            justify-content: flex-start;
            padding: 0 20px;
        }
    }
</style>