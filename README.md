# swipeable-cell

> A swipe cell imitate iOS style  

![](https://ws3.sinaimg.cn/large/006tNbRwly1fvmsow7o74g30a20hstau.gif)



### 1. installation

```bash
npm install swipeable-cell -S
```

### 2. how to use

1. import component in your project.

```js
improt SwipeableCell from 'swipeable-cell'
```

2. add to your component

```html
<swipeable-cell v-for="(item, index) in dataList", 
                :key="index", 
                :index="index",
                @swipeable-cell-delete="deleteItem">
  // ... your cell container dom
</swipeable-cell>
```

3. in your component's methods

```js
export default {
    ...
  	methods: {
  		// index: you just tapped cell
    	deleteItem(index) {
  			// remove from you list.
  			this.splice(index, 1);
		}
	}
}
```



### features

- supporting automatally fit your cell content's height.
- supporting embedded in pulling refresh component. 



if you like it, I'm warmly welcome your PR and issues.  ❤️  