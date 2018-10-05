<template lang="pug">
    .home
        h3 Swipe Cell Demo
        .container
            .list(v-for="(item, index) in list", :key="index", @click="itemClick(index)") 
                span {{ item }}
                span >
</template>
<script>
    export default {
        data() {
            return {
                list: [
                    'default',
                    'more action',
                    'text only',
                    'image only',
                    'horizontal'
                ],
            }
        },
        methods: {
            itemClick(index) {
                switch (index) {
                case 0:
                    this.$router.push({ path: 'default' })
                    break
                case 1:
                    this.$router.push({ path: 'moreactions' })
                    break
                case 2:
                    this.$router.push({ path: 'textonly' })
                    break
                case 3:
                    this.$router.push({ path: 'imageonly' })
                    break
                case 4:
                    this.$router.push({ path: 'horizontal' })
                    break
                }
            }
        },
        
    }
</script>
<style scoped lang="scss">
    .home {
        height: 100%;
        background-color: #f7f7f7;

        h3 {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 64px;
            background-color: #f5f5f5;
            border-bottom: 1px solid #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 1;
            z-index: 10;
        }
        .container {
            height: inherit;
            overflow: hidden;
            margin-top: 64px;
            .list {
                height: 44px;
                line-height: 44px;
                background-color: #fff;
                margin-bottom: 5px;
                padding: 0 10px;

                display: flex;
                justify-content: space-between;
            }
        }
    }
    
</style>