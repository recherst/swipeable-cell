<template lang="pug">
    .home
        h3 Inbox
        .container
            swipeable-cell(v-for="(item, index) in dataList", 
                          :key="index", 
                          :data-index="index",
                          :options="options",
                          @swipeable-cell-actions="handleItemDelete")
              .mail-cell(:style="{ height: item.cellHeight }")
                .cell-container
                    .top-block
                        span.from {{ item.from }}
                        span.date {{ item.date }}
                    .subject {{ item.subject }}
                    .content {{ item.content }}
</template>
<script>
    import SwipeableCell from '../SwipeableCell.vue';
    
    export default {
        data() {
            return {
                dataList: [
                    {
                        from: 'Realm',
                        subject: 'Video: Operators and Strong Opinions with Erica Sadun',
                        content: 'Swift operators are flexible and powerful. They’re symbols that behave like functions, adopting a natural mathematical syntax, for example 1 + 2 versus add(1, 2). So why is it so important that you treat them like potential Swift Kryptonite? Erica Sadun discusses why your operators should be few, well-chosen, and heavily used. There’s even a fun interactive quiz! Play along with “Name That Operator!” and learn about an essential Swift best practice.',
                        date: '2018-10-04 >'
                    },
                    {
                        from: 'The Pragmatic Bookstore',
                        subject: `[Pragmatic Bookstore] Your eBook 'Swift Style' is ready for download`,
                        content: `Hello, The gerbils at the Pragmatic Book`,
                        date: '2018-10-02 >'
                    },
                    {
                        from: `Instagram`,
                        subject: `mrx, go live and send disappearing photos and videos`,
                        content: `Go Live and Send Disappearing Photos and Videos. We recently announced two updates:
                                 live video on Instagram Stories and disappearing photos 
                                and videos for groups and friends in Instagram Direct.`,
                        date: '2018-09-28 >'
                    },
                    {
                        from: `Apple News`,
                        subject: `New WordPress Site`,
                        content: `Your new WordPress site has been successfully set up at: http://example.com. 
                                You can log in to the administrator account with the following information:`,
                        date: '2018-09-17 >'
                    },
                    {
                        from: `Wordpress`,
                        subject: `How to Change Your Personality in 90 Days`,
                        content: `How to Change Your Personality. You are not stuck with yourself. New research shows 
                                that you can troubleshoot personality traits — in therapy.`,
                        date: '2018-06-04 >'
                    },
                    {
                        from: `IFTTT`,
                        subject: `See what’s new & notable on IFTTT`,
                        content: `See what’s new & notable on IFTTT.
                                 To disable these emails, sign in to manage your settings or unsubscribe.`,
                        date: '2018-02-28 >'
                    },
                ],
                options: {
                    width: 70,
                    // direction: 'horizontal',
                    actions: [
                        {
                            title: 'more',
                            image: require('../assets/more-circle.png'),
                            backgroundColor: '#c7c6cb',
                        },
                        {
                            title: 'flag',
                            image: require('../assets/flag-circle.png'),
                            backgroundColor: '#fd9502',
                        },
                        {
                            title: 'delete',
                            image: require('../assets/trash-circle.png'),
                            backgroundColor: '#fd3d30',
                        }
                    ]
                },
            }
        },
        methods: {
            handleItemDelete(o) {
                const { cellIndex, actionIndex } = o;
                console.log(cellIndex, actionIndex);
                switch (actionIndex) {
                case this.options.actions.length - 1:
                    console.log(`点击了删除按钮`)
                    this.dataList.splice(cellIndex, 1)
                    break
                default:
                    console.log(`点击了索引为 ${actionIndex} 的按钮`)
                    break
                }
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
        background-color: white;
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
        }
    }
    
</style>