# 区别

- Nosql通常说的是非结构化查询数据库，一般指的是非关系数据库，这个关系也许是可以不止是关系数据库，树类数据库也是一种关系吧；严格结构化下的数据库，扩展很难，在处理大量数据的时候，由于插入和查询都需维护数据直接的关系，在**查询速度**，**插入更新速度**，**扩展性**，各个方面都出现了问题；
- 根据不同的需要常见出现了很多不同类型的数据，但是他们首先处理的是，数据结构的非关系化，目前统一的标准是json，这样扩展性是最强的；像redis,es,mongdb这些数据库就是为了解决这些问题的；



# redis

redis数据库是一种把数据关系极大的交给程序员管理的数据库，是最快速的数据操作数据库系统之一，它是利用了json键值对，让程序员自己定义数据保存在那个键哪个值的嵌套关系中，并需要程序员自己去访问这些数据，这样的话程序员的记忆量就比较大了，所以他不适合存储大量的数据，适合存储临时的，可以被分布式访问的，比如token，聊天信息等数据；顺便提一下，它是选择了json，但是这种层次的NoSql数据库，除了json用xml，yaml等都可以，只是它采用了json，不过一般不管什么层次的Nosql数据库都会采用json作为基本的数据存储单元；

# Mongodb

这种数据库，是为了**高速存储大量数据**而设计的，为了这个目标，数据库系统，支持分布式负载存储，维护了一定的数据关系；如果一点数据关系都不维护的话和redis一样，那么它的速度显然是更快的，但是这样大量的数据，程序员是无法记住的，所以为了存储大量数据这个目标，又要快，就以文档，也是json作为存储的基本单元，但是文档之间是没有关系的，mongo只提供文档的查找，不去维护他们之间的关系；

# Elasticsearch

这个数据库，和Mongodb类似，但是它维护的关系更多，他并不是一个为了高速操作数据而操作的数据库系统，它是一个为了可以模糊查询数据而设计的系统，所以它的速度与一般的Nosql数据库相比并不快；他需要下面这些概念：

1. 分词：
   - 把一个文档或者句子，按照一些词语，分离开一个数组，比如**红色的苹果**，可以把这个词分离成，[“红色”，“的”，“苹果”]，es就是用这样的分词，把一个基本的文档数据保存单元，中的词提取出来；这样就可以进行搜索的模糊匹配，分词需要分词库才可以建立；es需要安装汉语分词插件；
2. 倒排索引
   - 英文名字是Inverted index，并不是一个字面意思元素倒排的索引，而是一个这样的索引，索引是记录的内容是根据分词建立的，索引的值就记录的id；
   - 就是通过这个东西，从而实现了模糊匹配，这就是为啥在淘宝输入一长串字可以匹配到相关的，他会把你输入的句子自动拆分，用这些分词去匹配这个倒排索引数据库。