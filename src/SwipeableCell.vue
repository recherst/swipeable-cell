<template lang="pug">
        .list-item(data-type="0",
                    @touchstart.capture="touchStart",
                    @touchend.capture="touchEnd",
                    @click.stop="tap",)
            slot
            .delete(@click="deleteCell", :data-index="index") 删除
</template>
<script>
    export default {
        props: ['index'],
        data() {
            return {
                // 记录初始位置
                startX: 0,
                // 记录结束位置
                endX: 0,
            }
        },
        methods: {
            touchStart(e) {
                // 记录初始位置
                this.startX = e.touches[0].clientX;
            },
            touchEnd(e) {
                // console.log('touch end');
                // 当前滑动的父元素
                let currentElement = e.currentTarget;
                // 记录结束位置
                this.endX = e.changedTouches[0].clientX;
                // 判断是左滑 还是 右滑
                if (currentElement.dataset.type == 0 && (this.startX - this.endX) > 50) {
                    this.resetSlide();
                    currentElement.dataset.type = "1";
                }
                if (currentElement.dataset.type == 1 && (this.startX - this.endX) < -50) {
                    this.resetSlide();
                    currentElement.dataset.type = "0";
                }
                this.startX = 0;
                this.endX = 0;
            },
            tap() {
                if (this.chechSlide()) {
                    this.resetSlide();
                }
            },
            resetSlide() {
                const listItems = document.querySelectorAll('.list-item');
                for (let i = 0; i < listItems.length; i++) {
                    listItems[i].dataset.type = '0';
                }
            },
            // 检查当前是否有item处于滑动状态
            chechSlide() {
                const listItems = document.querySelectorAll('.list-item');
                for (let i = 0; i < listItems.length; i++) {
                    if (listItems[i].dataset.type == 1) {
                        return true;
                    }
                }
                return false;
            },
            deleteCell(e) {
                const index = e.currentTarget.dataset.index;
                // 复位
                this.resetSlide();
                this.$emit('swipeable-cell-delete', index);
            }
        }
    }
</script>
<style scoped lang="scss">
    .list-item {
        position: relative;
        transition: all 0.2s;

        .delete {
            width: 6rem;
            height: 100%;
            background: #ff4949;
            font-size: 17px;
            color: #fff;
            margin-left: 6rem;
            position: absolute;
            top:0;
            right: -6rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .list-item[data-type="0"] {
        transform: translate3d(0, 0, 0);
    }
    .list-item[data-type="1"] {
        transform: translate3d(-6rem, 0, 0);
    }
</style>