# 矩阵组件

## 事件 event

```js
  /**
   * # 单元格点击事件
   * @cellClick="onCellClick"
   */
  onCellClick({ from, to, row, column }) { }
  /**
   * # 关系变更事件
   * @change="onChange"
   */
  onChange({ from, to, value }) { }
```

## props参数

| treeData | 树形数组 | Array |

```js
  // 传一维数组就默认普通矩阵,传树形数组就自动合并单元格成树形矩阵
  const treeData = [
    {
      name: '侦查能力',
      id: 'a1',
      children: [
        {
          name: '对海侦查',
          id: 'a1-1',
          children: [
            {
              name: '定位精度',
              id: 'a1-1-1',
            },
            {
              name: '侦查范围',
              id: 'a1-1-2',
            },
          ],
        },
      ]
    }
  ]
```

| data | 关系数据 | Array |

```js
  // 描述矩阵关系,形成表格值
  const data = [
    {
      from: 'a2-1-2',
      to: 'a1-2-2',
      value: 'icon-block',
      readOnly: true, // 如果为true,则为只读属性,不允许修改
    },
  ]
```

| readOnly | 是否可读 | Boolean |

| relationList | 关系列表 | Array |

```js
  // 描述几种关系
  const relationList = [
    {
      id: 'qiangguanxi',
      value: 'icon-block',
      name: '强关系',
    },
    {
      id: 'ruoguanxi',
      value: 'icon-circle1',
      name: '弱关系',
    },
  ]
```

| type | 矩阵类型 | String |

```js
  // 矩阵类型
  const MatrixType = Object.freeze({
    relation: 'relation', // 关系矩阵, 默认为图标
    default: 'default', // 普通矩阵,默认为文字
  })
```

| headerData | 表格头部 | Array |

```js
  // 可以不传,如果矩阵左侧和头部数据不一样则需要传这个参数,默认根据treeData形成对称矩阵
  const headerData =  [{
    name: '侦查能力',
    id: 'a1',
    children: []
  }]
```
