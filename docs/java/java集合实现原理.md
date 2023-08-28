# HashMap

## put方法原理

会省去一些不重要的细节讲解。

1. 先对key值使用`hash`方法取一个hash值 B1

   > 这个hash值只是对key对象的默认hashcode做取做右移，减小hashcode的值。对象的hashcode值是本地方法生成的，本地方法不是java代码而是二进制的。**这个值的作用就是一个不是很大的随机数**。

2. ok接下来就会拿目前hashmap的数组的大小，对前面的 B1进行 与运算，这样的运算结果 B2，这个值一定会在数组的坐标范围内；

   >    不知道原因的同学，建议了解一下二进制运算（很简单的不要想太多就是模运算）；
   >
   >    第一步和第二步其实就是hashmap的hash运算，hash运算就是是一种定向运算过程，无法逆向得到值，就是把一个任意的数字，按照一定的规律得到另一个数字。用在保存数据上，比如map对象的保存，这个规律就是第一步和第二步，生成一个数组下标。用在加密领域就是各种复杂的hash运算加密，比如md5，但是某些人会使用测试计算的方法检测是否是原文，所以一般还会进行加盐的操作（加个任意值）。
   >
   >   然后有了hash值（坐标），还可能会有数组下标冲突的情况，解决hash冲突的办法有很多，链地址法，再次hash法，再次地址探测方法，等等，hashmap使用的就是链地址法，所以hashmap的数据结构是数组加链表（链表树太大的时候会变成红黑树一种平衡二叉树，接下来会提到）。 

3. 拿到B2数组下标，如果这个地址的元素是空的，就把value值填到这个元素上。如果不是空的。

   1. 会先判断两个key对象的hashcode值是不是一样，且key的值key的值是否一样。也就是两个对象的hashcode和eaques的到的值要一样(基础类型Long这样的，只要值一样，这俩方法的默认是一样的)。然后就会用新的value值覆盖。
   2. 如果上一步没有判断成功，下一步就会继续判断，这个节点是不是树节点（红黑树），然后把value插入到红黑树上去。
   3. 如果上一步又没有判断成功，那么这个节点肯定就是一个普通的节点，那么就是普通的链表结构了。插入到这个链表上就好了，在遍历这个链表的时候同样会做1的判断。

4. 接下来会讲解hashmap put方法的源码。java的源码我觉得写的恶心，完全就是为了不想让别人好好的读，瞎求写。

   > ```java
   > 
   > 
   > /**
   > 这里的这一步hash是hashmap的哈希算法的第一步，可以把这个函数看作是hash函数，
   > 也可以看作只是一个 将key这个对象的hashcode的值变的小一点的一个减值函数。就是这么简单
   > **/ 
   >  static final int hash(Object key) {
   >         int h;
   >      //这一步就很有意思，h=key.hashCode()；明明可以单独写一行，这非要到表达式里面，就这么省行数？但是也没省代码量啊
   >         return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
   >     }
   > 	//这就是put函数
   >   public V put(K key, V value) {
   > 	  //参数会利用上一个函数，取一下对象的hashcode值，后面两个参数可以忽略一下
   >         return putVal(hash(key), key, value, false, true);
   >     }
   >  
   >  final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
   >                    boolean evict) {
   > 		//tab是hashmap的节点数组 p是hash运算得到的节点的数组 n是数组的长度 i是
   >         Node<K,V>[] tab; Node<K,V> p; int n, i;
   >         if ((tab = table) == null || (n = tab.length) == 0)
   > 			//这里是
   >             n = (tab = resize()).length;
   >         if ((p = tab[i = (n - 1) & hash]) == null)
   >             tab[i] = newNode(hash, key, value, null);
   >         else {
   >             Node<K,V> e; K k;
   >             if (p.hash == hash &&
   >                 ((k = p.key) == key || (key != null && key.equals(k))))
   >                 e = p;
   >             else if (p instanceof TreeNode)
   >                 e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
   >             else {
   >                 for (int binCount = 0; ; ++binCount) {
   >                     if ((e = p.next) == null) {
   >                         p.next = newNode(hash, key, value, null);
   >                         if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
   >                             treeifyBin(tab, hash);
   >                         break;
   >                     }
   >                     if (e.hash == hash &&
   >                         ((k = e.key) == key || (key != null && key.equals(k))))
   >                         break;
   >                     p = e;
   >                 }
   >             }
   >             if (e != null) { // existing mapping for key
   >                 V oldValue = e.value;
   >                 if (!onlyIfAbsent || oldValue == null)
   >                     e.value = value;
   >                 afterNodeAccess(e);
   >                 return oldValue;
   >             }
   >         }
   >         ++modCount;
   >         if (++size > threshold)
   >             resize();
   >         afterNodeInsertion(evict);
   >         return null;
   >     }
   > ```
   >
   > 