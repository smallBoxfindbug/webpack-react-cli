# webpack-react-cli

#### 介绍
基于 webpack + ts + node 搭建的react 多页面脚手架

#### 安装教程
1.  git clone https://gitee.com/HY_QIN/webpack-react-cli.git
2.  yarn | npm i
3.  yarn start | yarn build

#### 使用说明

- 新增页面

在`/src/pages/` 下新增 index.tsx文件与App.tsx组件
```tsx
// index.tsx
import * as React from 'react'

import renderMain from '@/main'
import App from './App'

renderMain(<App />)


//  App .tsx
import React from 'react'

export default () => {
	return <div>App demo page</div>
}
```


#### History 与 Location
> 使用 useLocation 与 useHistory  用于跳转多个 pages
