<template lang="pug">
    .mail-cell
        .cell-container
            .top-block
                span.from {{ item.from }}
                span.date {{ item.date }}
            .subject {{ item.subject }}
            .content {{ item.content }}
</template>
<script>
    export default {
        props: ['item']
    }
</script>
<style scoped lang="scss">
    .mail-cell {
        padding: 10px 20px 0 20px;
        .cell-container {
            // background-color: beige;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            border-bottom: 1px solid #ccc;
            padding-bottom: 10px;
            .top-block {
                // background-color: aquamarine;
                display: flex;
                justify-content: space-between;
                color: black;
                font-size: 16px;
                .from {
                    font-weight: bold;
                }
                .date {
                    color: #9b9b9b;
                    font-size: 14px;
                }
            }
            .subject {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                color: black;
                font-weight: bold;
            }
            .content {
                overflow: hidden;
                text-overflow: ellipsis;
                display: box;
                display: -webkit-box;
                line-clamp: 3;
                -webkit-line-clamp: 3;
                box-orient: vertical;
                -webkit-box-orient: vertical;
                color: #9b9b9b;
            }
        }
    }
</style>