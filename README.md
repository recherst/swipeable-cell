# swipeable-cell

**A vue component which imitates iOS  `UITableViewCell` and `UICollectionViewCell` swipe style** 


<div align="center"><img src="https://ws1.sinaimg.cn/large/006tNbRwgy1fvw8ei4cphg30a00hu10a.gif"/></div>


### features

it's so pretty easy to use, and it supports for:

- automatally fit your cell content's height.
- customized action buttons style with backgroundColor, text-font etc..
- one or more action buttons.
- action buttons with three styles:  text only, text and image, image only.
- specify action button's content direction: vertical or horizontal.
- embedded in pulling refresh component to load more data cells etc.. 

### Demo

**default style**

<div align="center"><img src="https://ws4.sinaimg.cn/large/006tNbRwgy1fvw8yex0grg309y03nwim.gif"/></div>


**more actions**

<div align="center"><img src="https://ws2.sinaimg.cn/large/006tNbRwgy1fvw91vzcksg309y03nq7y.gif"/></div>

**text only**

<div align="center"><img src="https://ws2.sinaimg.cn/large/006tNbRwgy1fvw943vvk8g309y03nwis.gif"/></div>

**image only**

<div align="center"><img src="https://ws2.sinaimg.cn/large/006tNbRwgy1fvw95viie2g309y03ndhm.gif"/></div>

**horizontal**

<div align="center"><img src="https://ws2.sinaimg.cn/large/006tNbRwgy1fvw98f211pg309y03ndij.gif"/></div>



> note: all of these styles support to swiping right to delete function. 



### installation

**npm package**

```bash
npm install swipeable-cell -S
```



### how to use

**the easiest way use is wrapping you cell content**

import it in your component header.

```js
improt SwipeableCell from 'swipeable-cell'
```

register into `components` object and add it in template like this

```html
<swipeable-cell v-for="(item, index) in dataList", 
                :key="index", 
                :data-index="index",
                :options="options",
                @swipeable-cell-actions="actionsHandler">
  // ... your cell container dom node
</swipeable-cell>
```

action buttons will give you a callback when user tapped,  in your component's methods

```js
export default {
  ...
  methods: {
  	// index: you just tapped cell
    actionsHandler(o) {
      // cellIndex: which is cell index in your dataList 
      // actionIndex： which is tapped action button's index if you have more,
      // and if only one the index is 0
      const { cellIndex, actionIndex } = o
      this.dataList.splice(cellIndex, 1)
    }
  }
}
```



**also support more style customized**

you can return a `options` object in your `data()` object like bellow

```js
data() {
  return {
    ...
    
    options: {
      // specify this action button's width, optional
  	  width: 90,
      // specify action contents direction, optional 
      direction: 'horizontal',
      // specify how many buttons would cell have, optional
      // note: if you didn't pass this array, cell will provide a delete button as default
      actions: [
        {
          text: 'more',
          image: require('../xxx/xxx.png'),
          backgroundColor: '#c7c6cb',
        },
        {
          text: 'flag',
          image: require('../xxx/xx.gif'),
          backgroundColor: '#fd9502',
        },
        {
          text: 'delete',
          image: require('../xx/xxx.jpg'),
          backgroundColor: '#fd3d30',
        }
      ]
    },
  }
}
```

**props**

prop of `data-index` is required. so you must pass it value  when you loop for cell

|  property  |     description     |  Type  | required |
| :--------: | :-----------------: | :----: | :------: |
| data-index | index of every cell | Number |   Yes    |

some configurable value in `options` object:

| property  |               description                |  Type  | default  |
| :-------: | :--------------------------------------: | :----: | :------: |
|   width   |          action button's width           | Number |    80    |
| direction | action button's content direction:  horizontal or vertical | String | vertical |
|  actions  | number of action buttons in every single cell | Array  |    -     |

for every action style you can pass

|    property     |             description             |  Type  |  default  |
| :-------------: | :---------------------------------: | :----: | :-------: |
|      text       |      the action button's title      | String |  delete   |
|      image      |   the action button's image icon    | String |     -     |
| backgroundColor | the action button's backgroundColor | String | '#fd3d30' |

only image actions data like 

```js
...
actions: [
  {
    image: require('your local image path here'),
    backgroundColor: '#c7c6cb',
  },
  ...
]
```

only text actions data like

```js
...
actions: [
  {
    text: 'some text here',
    backgroundColor: '#c7c6cb',
  },
  ...
]
```



**event**

|       event name       |               description                |
| :--------------------: | :--------------------------------------: |
| swipeable-cell-actions | when cell's action buttons were tapped, this will give you a object that contains current tapped index in your data list and current action button's index that you tapped. so you can make your own logic in your component's methods |

for more usage examples please see demo project. 



**warmly welcome your PR and issues.** ❤️  
