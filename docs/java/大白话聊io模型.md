# 操作系统怎么处理网络请求的

1. 操作系统内核线程：是操作系统的代码组成的线程，用户线程无法调用修改，内核代码在内存的位置是特定的，用户线程是操作系统设计的，操作操作系统不允许内核代码直接可以触及内核代码；
2. 用户线程：用户线程就是用户自己的线程；其实用户线程可以和一个内核线程绑定，就是将用户线程引用到内核线程上，但是并不是说这个时候用户线程就可以触及到内核代码了，用户线程在内存中依然和内核代码不再一个内存区域；
3. 网络请求首先会被某个专门处理网络的内核线程接收或者发送处理，然后再把数据复制给用户线程内存区域；

# 同步i/o模型

网络请求，两个异地的主机不可能建立一个真实的线路，所以同步还是异步只取决于线程开始传送数据这一块，就是假设当线程开始传送数据的时候两个主机已经建立了实际的线路连接；

同步i/o模式是说，用户线程在处理i/o数据的时候，是用户线程自己做的，用户线程需要自己消耗时间来做这个i/o数据传送；然后再去做其他事；

# 异步i/o模型

用户线程自己不去做i/o数据传送的事，把数据发送给内核线程，让内核线程来做，内核线程主动将数据复制到用户线程内，自己只接收数据；内核线程处理完数据会调用用户线程的回调函数；

# 同步堵塞模型

用户线程一直在等待内核线程提供连接；及时的获取数据，获取到了以后在做其他事；

# 同步非堵塞模型

用户线程，通过循环判断，如果有内核的请求来了就接收数据，如果没有就做自己的其他事，不断的循环检测，又同时做其他事，可能不会及时的接收到io消息；内核线程的数据积累比同步堵塞的要大；

# 同步多路复用模型

没有用户线程了，多有的socket网络连接用一个对象表示，内核线程不断的遍历是否有连接时某个对象的，然后调用这个对象的函数，并发性不强，但是由于没有很多个用户线程，连接只是对象，可以建立很多个连接，如果一个连接一个线程，就消耗太多cpu资源了；

连接对象：一个socket连接不管是线程，还是对象其实都是一个数据结构，他保存了这个连接的信息，两个主机建立了连接，其实是双方存储了连接约定，如果一个主机突然拔掉了网线，另一个主机其实还认为他们直接存在连接，如果长时间没有通信可能连接就会消失。

一个ip主机可也根据网络请求的端口不同，接收多个连接，一个端口的应用程序可以根据ip的不同也连接多个连接，所以一个用户程序可以建立无数个（多个ip就可以建立多少个只有服务器能承受）连接；

# 信号驱动模型

有点类似异步模型，也是用户线程自己做其他事，当内核线程接收到请求的时候来调用用户线程的回调函数，但是用户线程真正执行的时候用户线程要自己花时间将数据从内核复制到用户线程中；