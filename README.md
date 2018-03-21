# react轮播图组件
这是一个移动端轮播图组件

# 安装
下载组件依赖
```
npm install react
npm install better-scroll
npm install prop-types
```
## 使用
把slider文件克隆到本地，然后放到你指定的文件中，在其他文件中就可以使用该组件了
```react
    <div style={{position:'relative',width:'100%',overflow:'hidden'}}>
      <Slider>
        {data.map((item, index) => (
          <div key={index}>
            <a href='javascript:;'>
              <img src={item.picUrl} alt={item.Ftitle}/>
            </a>
          </div>
        ))}
      </Slider>
    </div>
```
## 要求
`<Slider></Slider>`组件内部表示要轮播的图片，该组件三个属性
```js
    auto: 布尔       ->表示是否自动播放默认自动播放
    loop: 布尔       ->表示是否自动播放默认循环播放
    interval: 数字   ->表示播放时间间隔默认时间3000
```
![photo](https://github.com/wuxianqiang/react-slider/blob/master/photo.png?raw=true)
