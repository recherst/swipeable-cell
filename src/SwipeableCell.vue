<template lang="pug">
        .list-item(data-type="0",
                    @touchstart="touchStart",
                    @touchmove="touchmove",
                    @touchend="touchEnd")
            slot
            .delete(:class="{ swipeabledelete: isActivated }", 
                    @touchstart.stop="deleteCell", 
                    :data-index="index") 删除
</template>
<script>
    export default {
        'name': 'swipeable-cell',
        props: {
            index: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                // 记录初始位置
                startX: 0,
                // 记录结束位置
                endX: 0,
                delta: 0,
                currentSpreadNode: null,
                isActivated: false
            }
        },
        methods: {
            touchStart(e) {
                // 记录初始位置
                this.startX = e.touches[0].clientX;
                const currentTarget = e.currentTarget;
                if (currentTarget.dataset.type != 1) {
                    this.resetSlide();
                }
            },
            touchmove(e) {
                // console.log('touch move');
                const startX = e.touches[0].clientX;
                const currentTarget = e.currentTarget;
                let deleteNode = currentTarget.childNodes[1];
                if (currentTarget.dataset.type == 1) { // 展开状态
                    this.delta = startX - this.startX - 80;
                } else {
                    this.delta = startX - this.startX;
                }
                console.log('diff ---', this.delta);
                if (this.delta < 0 && Math.abs(this.delta) > window.innerWidth * 0.6) {
                    this.isActivated = true;
                } else {
                    this.isActivated = false;
                }
                currentTarget.style.transform = `translate3d(${this.delta}px, 0, 0)`;
                deleteNode.style.right = `${this.delta}px`;
                deleteNode.style.width = `${-this.delta}px`;
            },
            touchEnd(e) {
                console.log('touch end');
                // 当前滑动的父元素
                let currentElement = e.currentTarget;
                let deleteNode = currentElement.childNodes[1];
                // 记录结束位置
                this.endX = e.changedTouches[0].clientX;
                const offset = this.endX - this.startX;
                currentElement.childNodes[0].style.transition = `0.3s`;
                const delta = Math.abs(offset);
                if (offset < 0 && delta > window.innerWidth * 0.6) {
                    // 删除
                    // console.log('-- shanchu ----');
                    currentElement.style.transform = `translate3d(0, 0, 0)`;
                    deleteNode.style.right = `0`
                    deleteNode.style.width = `0`
                    // 调用删除函数
                    console.log(deleteNode.dataset.index);
                    this.$emit('swipeable-cell-delete', deleteNode.dataset.index);
                } else if (offset < 0 && delta > 80 && delta < window.innerWidth * 0.6) {
                    currentElement.style.transform = `translate3d(-80px, 0, 0)`;
                    deleteNode.style.right = `-80px`;
                    deleteNode.style.width = `80px`;
                    currentElement.dataset.type = '1';
                    this.delta = -80;
                } else { // 复位
                    // console.log('-- 复位 --');
                    currentElement.style.transform = `translate3d(0, 0, 0)`;
                    deleteNode.style.right = `0`;
                    deleteNode.style.width = `0`;
                    currentElement.dataset.type = '0';
                    this.delta = 0;
                    this.startX = 0;
                }
                
                this.delta = 0;
                this.startX = 0;
                this.isActivated = false;
                setTimeout(() => {
                    currentElement.childNodes[0].style.transition = ``;
                    deleteNode.style.transition = ``;
                }, 300);
            },
            resetSlide() {
                const listItems = document.querySelectorAll('.list-item');
                for (let i = 0; i < listItems.length; i++) {
                    if (listItems[i].dataset.type == 1) {
                        listItems[i].style.transition = `0.3s`;
                        listItems[i].style.transform = `translate3d(0, 0, 0)`;
                        listItems[i].dataset.type = '0'
                        setTimeout(() => {
                            listItems[i].style.transition = ``;
                        }, 300);
                    }
                }
            },
            deleteCell(e) {
                const index = e.currentTarget.dataset.index;
                this.$emit('swipeable-cell-delete', index);
            }
        }
    }
</script>
<style scoped lang="scss">
    .list-item {
        position: relative;

        .delete {
            width: 0;
            height: 100%;
            background: #ff4949;
            font-size: 17px;
            color: #fff;
            margin-left: 6rem;
            position: absolute;
            top:0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            padding: 0;
        }

        .swipeabledelete {
            justify-content: flex-start;
            padding: 0 20px;
        }
        
    }
</style>