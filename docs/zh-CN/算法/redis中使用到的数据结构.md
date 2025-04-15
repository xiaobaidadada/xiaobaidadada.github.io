# 字符串

字符串是redis中key和value的唯一数据类型，基本数据类型只有字符串。但是有一些可以将字符串转为字符类型的函数操作。

```c
struct sds {
  int len; buf中已用的长度
  int free; 可用剩余字节大小
  char buf [];
}
```



# 跳表

跳跃表就是多路排序树的变体，用于有序查找的结构。保证每个节点的高度，的左右节点（取最高层）也是左大右小的规律就好了。且没有统一的规则，每个节点的高度也可以任意，跳表比排序树容易实现，但是空间利用更多，高度越接近树的结构查询效率越高，但是没用特别规定，所以redis中节点的高度是1-64随机的。最后的效率肯定比链表快得多。因为插入更新的效率比红黑树这样的结构也要快。

```c
//节点
“typedef struct zskiplistNode {
    sds ele;
    double score;
    struct zskiplistNode *backward;
    struct zskiplistLevel {
        struct zskiplistNode *forward;
        unsigned int span;
    } level[];
} zskiplistNode;
”
  
  //管理节点的跳跃表
“typedef struct zskiplist {
    struct zskiplistNode *header, *tail;
    unsigned long length;
    int level;
} zskiplist;”



```

# 压缩列表

当有序数据结构元素较少的时候，这个可以用于替代数组，用链表由于数据地址空间可能距离较远所以遍历速度不如连续的，对于结构体元素的保存，这个场景是就像java中的需要定义数组，数组的元素类型不是固定的，可以设置成object，但是不同的类型的对象，大小不一样，数组元素都设置成一样大小的空间会浪费。

但是redis是使用c语言开发的，可以直接操作内存字节，所以redis的压缩列表这个结构，并不是用数组实现的，而是直接申请一块内存区域，通过定义数组元素的整体大小，元素也进行定义，每个元素都要指明上一个元素的字节大小，这样就可以在遍历的时候知道这块元素的内存范围是多少，然后通过类型转换使其具有数据类型进行操作。

redis申请的这块地址，前10个字节，和最后一个字节的含义都是确定的，提供了数组信息。每个元素，长度不固定，但是前几个字节的含义是确定的（前一个元素的大小，类型（int,long等），实际内容字节数组）。

# 字典

这个是redis基本的数据类型工具，因为整个redis就是提供一个k-v服务的。也就是关联数组，就是map的k-v数据类型，关联数组指的是不仅可以用元素下标索引元素，还可以用字符串等别的数据索引下标。实现原理是数组+跳表。过程几乎也和java中的hashmap差不多。[java集合原理分析](/java/java集合实现原理.md)这个文章里面可以看hashmap的解析。至于为啥redis不用红黑树，跳表也会比红黑树占空间，这个只能说redis作者可能不熟悉红黑树，我也不熟悉，由于跳表已经大量使用，重构代码也没这么多时间，就像redis至今还没有用多线程来处理i/o一样，但是性能已经够用了没有别的竞争对手，也可能有很多的公司有比redis更好的工具在内部使用，实现一个缓存服务，不在乎内存的话只从效率上还是容易实现的。

对于字典的遍历redis不需要担心遍历的时候数据丢失，因为同一个时间内，只能执行一个命令，redis是单进程单线程的对外处理模型，执行的时候如果删除了可以做处理，不影响另一个请求的遍历。所以如果支持了多线程，仅仅是遍历字典的操作都是复杂的。

# 整数集合

这是一个简单的数据结构，用于集合数据类型的实现。他的函数会避免有重复的元素出现。

```c
“typedef struct intset {
    uint32_t encoding;//编码类型
    uint32_t length;//元素个数
    int8_t contents[];//柔性数组,根据encoding字段决定几个字节表示一个元素
} intset”
```

# 快表

List类型的底层实现。采用双向链表+压缩列表的形式；这里的压缩链表可能和前面的有细微区别？链表上的每个节点都是一个压缩列表，所以一个元素的查找是在某个节点上查找压缩列表，没有换下一个列表。这样避免了数据量过大的时候内存频繁分配，又避免了全部链表查询没有连续内存空间的元素快。

```c
//节点
“typedef struct quicklistNode {
    struct quicklistNode *prev;
    struct quicklistNode *next;
    unsigned char *zl; //如果当前的数据没有压缩，那么它指向一个ziplist结构；否则，它指向一个quicklistLZF结构。
    unsigned int sz;             /* ziplist size in bytes */
    unsigned int count : 16;     /* count of items in ziplist */
    unsigned int encoding : 2;   /* RAW==1 or LZF==2 */
    unsigned int container : 2;  /* NONE==1 or ZIPLIST==2 */
    unsigned int recompress : 1; /* was this node previous compressed? */
    unsigned int attempted_compress : 1; /* node can't compress; too small */
    unsigned int extra : 10;     /* more bits to steal for future usage */
} quicklistNode;”
  
  //快表
  “typedef struct quicklist {
    quicklistNode *head;
    quicklistNode *tail;
    unsigned long count;        /* total count of all entries in all ziplists */
    unsigned long len;          /* number of quicklistNodes */
    int fill : 16;              /* fill factor for individual nodes */
    unsigned int compress : 16; /* depth of end nodes not to compress;0=off */
} quicklist;”


```

# Stream

- **listpack**是与压缩列表同样功能的列表，只不过元素的大小不在依靠下一个元素的声明了，而是通过节点上的类型字节部分直接判断出当前元素的大小，类型只能是字符或者数字。这样元素大小改变以后空间改变了不用更新下一个元素中上一个元素的大小。查询效率不高了需要不断判断元素大小。
- **Rax**：是一种前缀树的优化，一个节点只保存一个字符有点浪费了，把一个树的分叉，如果是一个直线，那么就可以把这个直线变成一个字符串，保存到一个节点内。但是这样如果进行一些插入删除操作是麻烦的，但是这样节省了空间，对于查询是没有影响的。
- Stream：是一个消息流，也就是一个频道，消费者订阅不同的频道；使用多个liastpack保存多个消息，通过rax来索引消息。所以一个listpack上的多个元素是消息体也是rax的节点。rax是用listpack来保存的而不是链表。



# geohash算法

从名字也能看出这是一个hash算法；它的作用是计算两个二维坐标上的点。

他是z阶空间填充曲线的一个应用，对于二维或者多位空间的点，怎么进行进行索引方便这些点之间的查找与计算，就是空间索引问题，这个问题的解决办法有很多，可以用网格，可以用树来划分网格，也可以用曲线来填充这个多维坐标，这里的z阶填充曲线就是这个方式，除此之外还有皮亚诺曲线、希尔伯特曲线等。

曲线是通过点连接起来的，我们根据坐标通过一些手段为点赋值，然后按这些点的值的大小，顺序自增的把他们连接起来，如果他们是有规律的，能够满足，多维距离越近的点，值越接近，这就是有意义的手段，能够将空间索引起来，用于表达点之间的距离关系。

z阶曲线的坐标取值手段：将二维坐标，比如经纬度，一个维度上的点（看精度怎么划分了）用非坐标轴的进制标识，规定基数大小。比如十进制的坐标系，用二进制三位基数，交叉组合表示每个点的值，最后把这些值的点按大小连接起来就是z形曲线。。。感觉好神奇，想不明白原理，我觉得发明它的人估计也想不明白；这种现象很有可能是，思维工具还不够丰富，但是发现了一些现象，无法用现有的思维工具解释，但是结果是符合的。比如在没有现在医学之前，我们生病知道吃一些中药，我们知道什么病用什么药，但是身体为什么能好是不知道的，有了现代医学才能明白。

geohash算法，就是利用实现了z阶曲线，然后把每个点的值用base32或者base64表示成一个字符串。于是每个二维坐标都通过这样的hash计算变成了一个值，又变成了一个字符串。这样前缀字符相同的越多，两个点就越接近；值和字符串可以用于不同的计算。



redis就支持这样的功能，可以添加一个key为geo坐标，进行位置的计算。



# HyperLogLog算法

计数统计：是对于一个数值，统计多少个不同的id数据访问。

这样的场景可以是，数值是网页浏览次数，统计的是多少个不同的人去访问，在一个时间内。又或者是，一个用户的搜索次数，统计的是一个时间内不同内容的次数。如果只是统计访问量而不统计是不是同一个id的数据访问，只需要用incr等什么的命令去做就行了。

解决办法有，可以用一个set保存不同的id数据，多个统计对象（比如页面）就多个set对象，但是如果用户很多几万，几百万个用户这肯定不行。如果使用redis的bitmap，每一位的地址都可以根据hash代表一个id数据，但是这样依然架不住要统计的对象多。目前并没有可以百分比准确率又能解决内存的办法。

HyperLogLog是一种概率统计方法，所有的概率统计方法都是用小内存保存id数据是否在一个时间内访问，然后估算在总的用户体量里面可能会有多少，以小见大的估计而不是实时计算，这要求一个平均的hash算法才行，这个实现还是挺麻烦的，以后有时间我在分析一下redis是怎么实现的吧。

