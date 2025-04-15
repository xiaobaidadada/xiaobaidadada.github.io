# runtime

运行时runtime或者execution time，其实一开始的定义都很简单，就是运行时间，程序运行的一个阶段,指的是程序运行的一个时间；[Runtime Definition - What does runtime mean? (techterms.com)](https://techterms.com/definition/runtime)这是一个计算机名词网站，我也查阅了维基，得出结论都是一个运行的时间。在知网上一些久远的有runtime词的论文，该词显示出的语境也是软件的运行时间，它更倾向于一个形容词。

在几乎所有的涉及到runtime词的权威网站上，都会看到这个词不会单独出现，比如jre java runtime Environment；C++ Runtime framework packages；![runtime](https://pica.zhimg.com/70/v2-3cd03bbad48bfa32ebf3da6e7c3024f8_1440w.image?source=172ae18b&biz_tag=Post)

这个图片是网上找的，是一个windows提示的错误，显然这里的runtime的含义只是c++运行期间出现了一个错误的含义，表示的是runtime，运行期间本身。



和它的搭配通常有，runtime Library,runtime system, runtime ,runtime Environment等。现在单独看这个词，runtime其实他其实代表了这所有的组合搭配，就像在java中的锁一样，不管是CAS机制也好，还是一个线程安全的集合类也好，AQS也好都被称为了锁，但是锁根本都不是锁，AQS是管程，CAS只是一个比较判断的思想，锁代表的资源只有一个，这些思想或者机制，类等，面临的资源大多都是一个对象，抢占一个对象，不让别的线程在自己执行期间方法使用。所以都被称为了锁，但是这是很不严谨的。大多数人其实并不理解这些东西的发展，实现细节，都只是看一些网上的博客为了面试应付一下，只是为了证明自己会，也由于这些东西自身并没有说自己是什么造成的。

很多设计模式，一般都会去问你会不会什么设计模式，但是其实，就算某个人不知道，其实已经在用了，设计模式也不是发明出来的，而是一个总结。

# runtime Environment

也叫runtime system。他是一个可执行程序的子系统。所有的语言构建的程序，除了机器语言，都有runtime system；比如go语言构建完一个五行代码的hello word程序。但是你会发现，它的大小有1MB多，这是因为go自动添加了对象内存管理子系统。而且每个高级语言程序的执行，是从main方法，也是由这个runtime system来调用引导执行的，java或者python，js，cmd，bash这种的动态脚本语言的runtime system是非常大的，因为对于二进制程序，它本身就已经被翻译成了操作系统支持的指令，但是对于高级动态脚本语言，它的所有指令语句，都不是操作系统所支持的，所以vm出现了，他就是runtime system，但是对于java而言，runtime system也不算完整的runtime system，因为java需要编译成字节码，字节码文件中也会添加很多的指令，这是因为jvm字节码，并不针对java语言，jpython，groovy等语言也可以编程成字节码运行在jvm上，但是这些语言都要和java带点关系。就算是汇编语言，它也有runtime system，比如汇编编译成指令码，`div`指令的前后会生成判断是否是0的指令，添加的这些代码虽然不多，但是也属于程序本身，所以也是runtime system；(这里说java是脚本语言是不合适的，java这种特性，目前还没抽象出一种专有名词)



所以现在我们可以下个定义了，runtime system指的是，一个程序，除了程序员自己写的代码逻辑以外，由语言编译环境生成的所有指令。对于非脚本语言，一般会内嵌进入程序本身，而对于java这样的语言则是通过vm来提供的。

runtime system也是runtime暗示最多的含义。所以很多时候一些很理解的概念都是文字游戏而已。