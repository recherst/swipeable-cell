<template lang="pug">
        .list-item(data-type="0",
                    @touchstart="touchStart",
                    @touchmove="touchmove",
                    @touchend="touchEnd")
            slot
            .delete(@touchstart.stop="deleteCell", :data-index="index") 删除
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
                currentSpreadNode: null
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
                // console.log('diff ---', this.delta);
                currentTarget.style.transform = `translate3d(${this.delta}px, 0, 0)`;
                deleteNode.style.right = `${this.delta}px`;
                deleteNode.style.width = `${-this.delta}px`;
            },
            touchEnd(e) {
                // console.log('touch end');
                // 当前滑动的父元素
                let currentElement = e.currentTarget;
                let deleteNode = currentElement.childNodes[1];
                // 记录结束位置
                this.endX = e.changedTouches[0].clientX;
                const offset = this.endX - this.startX;
                currentElement.childNodes[0].style.transition = `0.3s`;
                if (offset < -80) {
                    currentElement.style.transform = `translate3d(-80px, 0, 0)`;
                    deleteNode.style.right = `-80px`;
                    deleteNode.style.width = `80px`;
                    currentElement.dataset.type = '1';
                    this.delta = -80;
                } else {
                    currentElement.style.transform = `translate3d(0, 0, 0)`;
                    deleteNode.style.right = `0`;
                    deleteNode.style.width = `0`;
                    currentElement.dataset.type = '0';
                    this.delta = 0;
                    this.startX = 0;
                }
                setTimeout(() => {
                    currentElement.childNodes[0].style.transition = ``;
                }, 300);
                this.endX = 0;
            },
            tap() {
                console.log('sadsd');
                // this.resetSlide();
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
        }
    }
</style>