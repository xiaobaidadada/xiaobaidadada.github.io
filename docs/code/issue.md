# 格式

一些格式要严格使用，不然无法养成一个良好的习惯，可能会在某个时候造成不必要的错误；IDEA可以每次都使用一下代码格式化；

# 关于对象

- 对于集合类型的对象，要注意判断泛型是否符合，还有怎么能保证顺序遍历，怎么保证元素去重，还有是否为null；
- 对于普通对象，不管是作为函数的参数，还是某个临时对象，都要判断一下是否可能出现null的情况，这个会导致程序无法运行，函数的参数是很有可能出现问题的地方；

# 数据库

- 索引失效的场景，我总结了这样的一个规律：**如果查询所使用的字段，包含了可能导致属性不唯一的情况就会失效**；

- 对于数据，要额外注意数据的字段，数据的删除标识，是否要显示被删除的数据等；



# 前端加密

虽然接口用了HASH加密内容，但是加密方式可以通过浏览器搜索到相关js代码，直接搜`sign`就搜出来了，可以在加密字段用字符串拼接的方式避免搜索，比如`"si"+"gn"`；

# 枚举和静态变量

当标识的属性不是一个时候用枚举，否则静态变量就够了；