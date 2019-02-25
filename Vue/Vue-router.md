### Vue路由传参

#### params

##### 方案一: 

```
父组件中：直接在path实现携带参数的跳转
<router-link :to="'/describe/'+id"></router-link>
this.$router.push({path: `/describe/${id}`})

需要对应路由配置
{ path: '/describe/:id' }

在子组件中可以使用  this.$route.params.id 来获取传递的参数值

优点：
1.不会将参数显示在url地址中

缺点：
1.必须在路由中配置 '/url/:id'
2.刷新会掉参数
```

##### 方案二：

`````
父组件中：通过路由属性中的name来确定匹配的路由，通过params来传递参数。
<router-link :to="{ name:'Describe', params: { id:id } }"></router-link>
this.$router.push({ name: 'Describe', params: { id: id } })

在子组件中可以使用  this.$route.params.id 来获取传递的参数值

优点：
1.不会将参数显示在url地址中

缺点：
1.必须在路由中给对应的url设置name属性
2.刷新会掉参数
`````



#### query

````
父组件中：使用path来匹配路由，然后通过query来传递参数 query传递的参数会显示在url后面?id=xx
<router-link :to="{ path:'/describe', query: { id:id } }"></router-link>
this.$router.push({ path:'/describe', query: { id: id } })

在子组件中可以使用  this.$route.query.id 来获取传递的参数值

优点：
1.刷新不会掉参数
2.有hash记录

缺点：
1.会在url中显示传递的参数
````
