# HashMap(version8)

## put方法原理

会省去一些不重要的细节讲解。源码查看方式采用idea自带的反编译功能。

1. 先对key值使用`hash`方法取一个hash值 B1(第一次hashcaode值减小操作)

   > 这个hash值只是对key对象的默认hashcode做取做右移，减小hashcode的值。对象的hashcode值是本地方法生成的，本地方法不是java代码而是二进制的。**这个值的作用就是一个不是很大的随机数**。

2. ok接下来就会拿目前hashmap的数组的大小，对前面的 B1进行 与运算，这样的运算结果 B2，这个值一定会在数组的坐标范围内；（第二次hash操作，拿到元素的数组坐标还有数组的大小）

   >    不知道原因的同学，建议了解一下二进制运算（很简单的不要想太多就是模运算）；
   >
   >    第一步和第二步其实就是hashmap的hash运算，hash运算就是是一种定向运算过程，无法逆向得到值，就是把一个任意的数字，按照一定的规律得到另一个数字。用在保存数据上，比如map对象的保存，这个规律就是第一步和第二步，生成一个数组下标。用在加密领域就是各种复杂的hash运算加密，比如md5，但是某些人会使用测试计算的方法检测是否是原文，所以一般还会进行加盐的操作（加个任意值）。
   >
   >   然后有了hash值（坐标），还可能会有数组下标冲突的情况，解决hash冲突的办法有很多，链地址法，再次hash法，再次地址探测方法，等等，hashmap使用的就是链地址法，所以hashmap的数据结构是数组加链表（链表树太大的时候会变成红黑树一种平衡二叉树，接下来会提到）。 

3. 拿到B2数组下标，如果这个地址的元素是空的，就把value值填到这个元素上。如果不是空的。（插入元素或者覆盖操作）

   1. 会先判断两个key对象的hashcode值是不是一样，且key的值key的值是否一样。也就是两个对象的hashcode和eaques的到的值要一样(基础类型Long这样的，只要值一样，这俩方法的默认是一样的)。然后就会用新的value值覆盖。

      > 判断的时候会同时使用hashcode和equels两个函数判断，这就是为啥很多时候判断两个对象是不是同一个，需要重写这两个函数，而不是只重写一个。

   2. 如果上一步没有判断成功，下一步就会继续判断，这个节点是不是树节点（红黑树），然后把value插入到红黑树上去。

      > 这里为啥是红黑树要说一下，关于红黑树的原理，我也不是很熟，这里不先不分析以后有时间再分析，但是他的特征是明显的。为啥链表不行呢，就是因为链表遍历起来太长了，采用二叉查找树（一种左小右大，或者左大右小的树），可以减少查询的时间， 不用全部遍历每个节点。但是二叉查找树，左右子树可能一个高度特别高，另一个可能只有一个节点，这又和链表差不多了，所以又了ALV平衡二叉树，他保证每个节点的左右子树高度不能相差为1，这种的查询效率应该是最高的，但是保证这种平衡的代价是插入更新节点操作会时间，需要做很多的节点平衡操作，可能要对很多个节点做操作，所以采用了红黑树，红黑树是一种不是绝对平衡的二叉排序树，允许左右子树高度相差不为1，但是由于保证了每个节点红黑两种状态的操作，会将树尽可能的保持平衡，但是更新和插入操作就会减少很多时间，所以从整体上来说，红黑树使用上比平衡二叉树更合适。因为hashmap的插入和更新操作比查找可能更多。

   3. 如果上一步又没有判断成功，那么这个节点肯定就是一个普通的节点，那么就是普通的链表结构了。插入到这个链表上就好了，在遍历这个链表的时候同样会做1的判断。或者链表上元素的key是相同的进行覆盖操作。

      > 在插入节点到普通链表节点的时候，会判断这个节点是不是大于等于8，如果长度达到了8，会把这个链表改为红黑树，变为红黑树是为了提高查找节点的效率，为什么变为8就要转红黑树，是因为，将一个对象丢进hashmap中是一个随机事件，因为对象的hashcode值是随机的，这个丢的行为是随机的，所以满足泊松分布，泊松分支指的是，一个事件进行无数次随机试验，求一个事件发生的特定结果概率公式；在haspmap的扩容机制，初始长度等因素的作用下（不谈这些无法谈概率，条件决定了概率模型），一个对象随机丢到一个数组且产生冲突，成为链表的第八个元素的概率是非常常常小的，7和8直接差了一个级别，当9，10...的时候已经和8差不多了，所以8是hashmap一些列操作下，概率近似最小的一个长度了。当这么小的概率多发生了的时候，说明haspmap中的元素数量有很大的概率是非常多的，为了提高put元素和get元素的速度，采用把这个链表改为红黑树的办法（其他节点链表不会）。以上结论来自于hashmap开头的英文解释，和我的猜想。
      >
      > 另外容器初始化的大小，不会是你定义的，比如你定义了3肯定会乘2，要保证是2的倍数。

4. 最后会进行整个hashmap的大小是否达到了阀值的扩容操作。（扩容判断）

   >   扩容相关的变量有两个个，
   >
   >   一个是`size`	它是整个hashmap的容器元素数量的多少，他的值等于hashmap元素节点数组含有的元素数量，加某个节点上的链表元素数量。
   >
   >   另一个变量是`threshold`它指的是当前数组长度*0.75，是更新阀值，容量*0.75 为啥是乘0.75，因为容量达到了0.75根据柏松分布，也就是四分之三的数组单位容量都已经满了，接下来会很容易发生hash冲突，这个时候可以扩容了，其实0.75-1之间都行，只是0.75再往后发生冲突的递进不大。
   >
   >   判断是否需要扩容，是拿size和threshold比较，所以，虽然节点链表数量大于8以后会变成红黑树，但是这个几率很小，除非对象的hashcode被改写了，是一个很不随机的算法，一直返回同一个值，在一个节点上拼命加元素。这就算扩容数组也不可能有啥用了，但是在hashcode是随机生成的情况下，一个节点上的链表的长度大于8的概率是很小的，hashmap的本质想法还是想让元素近可能的都保存在数组上，可以直接通过两次hash运算得到坐标，不要觉得红黑树查询效率高，节点多了也没事，其实不是，所有元素都在数组节点上效率才是最高的，如果出现一个节点上的链表节点数量很多，那么肯定会出现数组元素有很多的空位。**数组长度永远会大于整个容器的元素数量。**

5. 接下来会讲解hashmap put方法的源码。java的源码我觉得写的恶心，完全就是为了不想让别人好好的读，瞎求写，好的代码是思想好，而不是用编程语法的特点写这些骚操作。

   > ```java
   > 
   > 
   > /**
   > 这里的这一步hash是hashmap的哈希算法的第一步，可以把这个函数看作是hash函数，
   > 也可以看作只是一个 将key这个对象的hashcode的值变的小一点的一个减值函数。就是这么简单
   > **/ 
   > static final int hash(Object key) {
   >      int h;
   >   //这一步就很有意思，h=key.hashCode()；明明可以单独写一行，这非要到表达式里面，就这么省行数？但是也没省代码量啊
   >      return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
   >  }
   > 	//这就是put函数
   > public V put(K key, V value) {
   > 	  //参数会利用上一个函数，取一下对象的hashcode值，后面两个参数可以忽略一下
   >      return putVal(hash(key), key, value, false, true);
   >  }
   > 
   > final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
   >                 boolean evict) {
   > 		//tab是hashmap的节点数组 p是hash运算得到的数组元素（还能会作为临时节点有冲突的时候） n是数组的长度 i是根据hash运算得到的数组的节点的下标
   >      Node<K,V>[] tab; Node<K,V> p; int n, i;
   >      if ((tab = table) == null || (n = tab.length) == 0)
   > 			//这里给tab赋值并判断数组是否存在，这写的。。。，然后给n也赋值了。
   >          n = (tab = resize()).length;
   >      if ((p = tab[i = (n - 1) & hash]) == null)
   >        //这里的 & 操作又是一次hash运算，这次运算就得到了数组元素的坐标i和元素值p，并判断元素是否是空的，是空的就直接赋值一个普通元素节点。
   >          tab[i] = newNode(hash, key, value, null);
   >      else {
   >        //这里的运算是在数组节点元素上已经有元素的时候才会执行 
   >        //这里是e是个临时节点元素，用于old冲突节点，最后put会返回有冲突的节点的老节点对象，可能是树节点，也可能是数组元素节点，k就是此次插入元素的key值
   >          Node<K,V> e; K k;
   >          if (p.hash == hash &&
   >              ((k = p.key) == key || (key != null && key.equals(k))))
   >              e = p;
   >        			//这里的if是判断，当前数组元素节点，是不是同一个key（比较key对象的hashcode和equels方法）；如果是就将e节点修改为p，同时把k也赋值为最新的key对象。
   >          else if (p instanceof TreeNode)
   >            	//上一步判断有冲突的数组节点对象key是不是相同失败后，这里会判断该数组节点会不会是树节点（不是普通的链表节点），如果是树节点，那么就会调用红黑树putTreeVal方法，把节点创建上去。同时如果树上有相同key的话只是覆盖，然后返回老的节点的key值
   >              e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
   >          else {
   >            //这里是有冲突的数组元素节点是链表的。
   >              for (int binCount = 0; ; ++binCount) {
   >                //这里的循环就是用于遍历节点的数组的，第一个判断同时又会为e赋值当前遍历的节点（可读性很差）
   >                  if ((e = p.next) == null) {
   >                      p.next = newNode(hash, key, value, null);
   >                    //如果连链表的最后一个节点是空的，就添加一个节点用于保存这个新的k-v值
   >                      if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
   >                        //如果链表的长度大于8，TREEIFY_THRESHOLD的值是8，就会使用treeifyBin将链表变为红黑树
   >                          treeifyBin(tab, hash);
   >                      break;
   >                  }
   >                  if (e.hash == hash &&
   >                      ((k = e.key) == key || (key != null && key.equals(k))))
   >                    //如果已经存在的节点和hash值和某个链表上的节点的hash值相同，就不需要循环了
   >                      break;
   >                	//为了循环的临时赋值
   >                  p = e;
   >              }
   >          }
   >        //返回老的节点 如果e不是空的话，就说明是发生了元素值覆盖而不是新插入
   >          if (e != null) { // existing mapping for key
   >              V oldValue = e.value;
   >              if (!onlyIfAbsent || oldValue == null)
   >                  e.value = value;
   >            //如果继承了hashmap类，你是可以在这里写点put是覆盖后的操作方法的
   >              afterNodeAccess(e);
   >              return oldValue;
   >          }
   >      }
   >   	//累计被修改过的次数,这个东西在java集合中也能看到，他用于所有的非线程安全集合，如果别的线程在本地遍历集合的时候修改了集合，就会导致modCount的值和期待的不一样，会报错 能走到这里说明做的是新插入操作 
   >      ++modCount;
   >      if (++size > threshold)
   >        //如果整个容器的数量大于了阀值，需要对列表进行扩容，这个阀值是怎么来的呢，是通过 数组的长度 * 0.75来的。所以是拿整个容器的元素数量和数组的数量进行比较。
   >        //所以链表的长度大于8的几率是很小的，本质上hashmap还是希望元素都没有冲突，元素都保存在数组上。
   >          resize();
   > 	  //如果继承了hashmap类，你是可以在这里写点put是新插入后的操作方法的
   >      afterNodeInsertion(evict);
   >      return null;
   >  }
   > 
   > //这个函数是hashmap的重新计算大小函数，进行扩容大小，这个函数只要调用了，肯定会进行扩容
   > final Node<K,V>[] resize() {
   >   			//现在的元素数组
   >         Node<K,V>[] oldTab = table;
   >   			//现在的数组的长度
   >         int oldCap = (oldTab == null) ? 0 : oldTab.length;
   >   			//现在阶段的容量的阀值（容量大小 * 0.75)
   >         int oldThr = threshold;
   >         int newCap, newThr = 0;
   >         if (oldCap > 0) {
   >           //如果容量不是0
   >             if (oldCap >= MAXIMUM_CAPACITY) {
   >               //有个最大值(这个取值不了解，很有可能是经过实际的测试得到的结论)，如果容量超过了这个值就不再扩容了
   >                 threshold = Integer.MAX_VALUE;
   >                 return oldTab;
   >             }
   >             else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
   >                      oldCap >= DEFAULT_INITIAL_CAPACITY)
   >               		// 如果满足扩容的条件，就将数组的长度乘2，其实扩多少都无所谓，但是一定要是2的倍数，因为最大值是2的倍数，如果不按2的倍数进行扩，最后就不一定能扩到数组的最大值，不乘2乘1的话就不合理了，所以乘2是最小的。
   >                 newThr = oldThr << 1; // double threshold
   >         }
   >         else if (oldThr > 0) // initial capacity was placed in threshold
   >           //如果容量是0新容量和老容量就一样大，这应该是hashmap里简单的一个else if了吧
   >             newCap = oldThr;
   >         else {               // zero initial threshold signifies using defaults
   >           //如果还没有元素，但是数组大小不是空的就给个默认大小 16，为啥是16，18也行，这个最小值应该也是测试过的结果，只要是2的倍数就行
   >             newCap = DEFAULT_INITIAL_CAPACITY;
   >             newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
   >         }
   >   // 更新阀值，容量*0.75 为啥是乘0.75，因为容量达到了0.75根据柏松分布，也就是四分之三的数组单位容量都已经满了，接下来会很容易发生hash冲突，这个时候可以扩容了，其实0.75-1之间都行，只是0.75再往后发生冲突的递进不大。
   >         if (newThr == 0) {
   >             float ft = (float)newCap * loadFactor;
   >             newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
   >                       (int)ft : Integer.MAX_VALUE);
   >         }
   >   			//更新阀值容量
   >         threshold = newThr;
   >         @SuppressWarnings({"rawtypes","unchecked"})
   >         Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
   >         table = newTab;
   >         if (oldTab != null) {
   >           //接下来就是数组的创建复制与扩容
   >             for (int j = 0; j < oldCap; ++j) {
   >                 Node<K,V> e;
   >                 if ((e = oldTab[j]) != null) {
   >                     oldTab[j] = null;
   >                     if (e.next == null)
   >                         newTab[e.hash & (newCap - 1)] = e;
   >                     else if (e instanceof TreeNode)
   >                         ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
   >                     else { // preserve order
   >                         Node<K,V> loHead = null, loTail = null;
   >                         Node<K,V> hiHead = null, hiTail = null;
   >                         Node<K,V> next;
   >                         do {
   >                             next = e.next;
   >                             if ((e.hash & oldCap) == 0) {
   >                                 if (loTail == null)
   >                                     loHead = e;
   >                                 else
   >                                     loTail.next = e;
   >                                 loTail = e;
   >                             }
   >                             else {
   >                                 if (hiTail == null)
   >                                     hiHead = e;
   >                                 else
   >                                     hiTail.next = e;
   >                                 hiTail = e;
   >                             }
   >                         } while ((e = next) != null);
   >                         if (loTail != null) {
   >                             loTail.next = null;
   >                             newTab[j] = loHead;
   >                         }
   >                         if (hiTail != null) {
   >                             hiTail.next = null;
   >                             newTab[j + oldCap] = hiHead;
   >                         }
   >                     }
   >                 }
   >             }
   >         }
   >         return newTab;
   >     }
   > 
   > //这个是插入红黑树的算法，红黑树算法我目前还不熟，先不分析这部分代码了，以后有时间在分析
   > final TreeNode<K,V> putTreeVal(HashMap<K,V> map, Node<K,V>[] tab,
   >                                        int h, K k, V v) {
   >             Class<?> kc = null;
   >             boolean searched = false;
   >             TreeNode<K,V> root = (parent != null) ? root() : this;
   >             for (TreeNode<K,V> p = root;;) {
   >                 int dir, ph; K pk;
   >                 if ((ph = p.hash) > h)
   >                     dir = -1;
   >                 else if (ph < h)
   >                     dir = 1;
   >                 else if ((pk = p.key) == k || (k != null && k.equals(pk)))
   >                     return p;
   >                 else if ((kc == null &&
   >                           (kc = comparableClassFor(k)) == null) ||
   >                          (dir = compareComparables(kc, k, pk)) == 0) {
   >                     if (!searched) {
   >                         TreeNode<K,V> q, ch;
   >                         searched = true;
   >                         if (((ch = p.left) != null &&
   >                              (q = ch.find(h, k, kc)) != null) ||
   >                             ((ch = p.right) != null &&
   >                              (q = ch.find(h, k, kc)) != null))
   >                             return q;
   >                     }
   >                     dir = tieBreakOrder(k, pk);
   >                 }
   > 
   >                 TreeNode<K,V> xp = p;
   >                 if ((p = (dir <= 0) ? p.left : p.right) == null) {
   >                     Node<K,V> xpn = xp.next;
   >                     TreeNode<K,V> x = map.newTreeNode(h, k, v, xpn);
   >                     if (dir <= 0)
   >                         xp.left = x;
   >                     else
   >                         xp.right = x;
   >                     xp.next = x;
   >                     x.parent = x.prev = xp;
   >                     if (xpn != null)
   >                         ((TreeNode<K,V>)xpn).prev = x;
   >                     moveRootToFront(tab, balanceInsertion(root, x));
   >                     return null;
   >                 }
   >             }
   >         }
   > ```
   >

## hashmap其他

我们先对hashmap做个简短的总结：

1. hashmap是由，数组加链表（可能是红黑树）组成的。且容器元素数量永远不会超过数组元素的0.75倍。
2. hashmap的主要的操作方法是put和get，而put中也包含了get的过程，因为put也需要查找。我们通过对put的分析就可以得到hashmap的主要运行原理
3. 对象创建后容量不会是我们自己设置，肯定是2的倍数。put的时候，首先会进行两次hash运算，得到对象hashcode的数组下标，如果元素有冲突就会先进行查找，判断是key是不是同一个对象，是一个就覆盖，不是一个就插入，插入后会判断链表有没有大于8，是的话变为红黑树。最后再判断一下整体元素数量，是否达到了数组元素的0.75倍，是的话将数组乘2扩容。
4. python中的dict也是关联数组，和java中的mao作用一样，他的实现是采用开放定位法，它只采用了数组。目前看来java语言的关联数组实现的不管是从时间还是空间来看，都是不错的实现方式。不管采用的方式是啥，都是为了减小冲突，让尽量可以达到做最少的hash运算就得到元素的位置，最好是都在数组上。
5. 现在大多数java面试都必然会问这个你是否知道hashmap的原理，怎么说呢，我觉得毫无意义，我也被问过，我说没看过，面试官直接给我说，感谢你今天来面试。可以这样问其实还好，如果让你实现关联数组，你会怎么实现，然后根据hashmap中的技巧点问对方，遇见某个问题你会怎么解决，如果是直接问你讲一下hashmap原理吧，要么它她背面试题特别6，要么面试官自己也不怎么懂，或者觉得这个东西很厉害，能理解肯定还不错。但是这些东西拆解开来，只要一个人知道hash算法，知道怎么解决hash冲突，知道怎么对有权值的链表如何提高查询效率，就可以自己实现一个关联字典。要是真没看过源码，谁也不敢保证自己说的对啊，实现关联字典的方法多了去了。



# hashSet

hashset底层其实是hashmap，key用来保存所有的元素，value全部都是Object同一个对象。



# 其他集合

其实hashmap不属于集合，集合指的是元素集合，而hashmap是**关联字典**，hashset的实现就利用了hashmap。别的集合，实现其实都不是很复杂，你完全有能力自己写出更符合实际场景需要的集合工具。面试官要是问别的集合的原理实现，你直接别理他。或者你说，你觉得只有hashmap值得看，别的数据结构你自己也可以想出来实现的方案。

# 怎么实现随机从集合中取一个元素

目前并没一个集合，可以实现无序，set插入是无序的，但是遍历的时候，不管遍历几次都还是同一个顺序。

> 随机取元素，首先要解决的问题是怎么随机提供一个数字。随机这个事情，在计算领域，只能通过时间的任意来生成。java中的`rand.nextInt()`方法，实质上，是不断进行一个&取模运算，通过cas方法，判断是否这次计算能不能是一样的结果，返回的这个结果就是随机数字；效率仍然不够非常高吧这种方式。**这种方法只能用List集合来实现**，因为数组坐标可以提供唯一的定位，set和hashmap这种有链表需要二次定位无法获取数据类型内部元素的位置。
>
> ```java
> import java.util.ArrayList;
> import java.util.List;
> import java.util.Random;
> 
> public class RandomUtil {
> 
>     static   public <T> T randomGet(List<T> list) {
>         Random rand = new Random();
>         int len = list.size()-1;
>       //这里就是关键，我们进行安位与的操作，最后得到的值一定是在数组下标范围之内的，而且rand.nextInt()是个随机数，这样就满足的随机访问
>         int index = len & rand.nextInt();
>         return list.get(index);
>     }
> 
>     public static void main(String[] args) {
>         List list = new ArrayList();
>         list.add(1);
>         list.add(2);
>         list.add(3);
>         list.add(4);
>         System.out.println(randomGet(list));
>         System.out.println(randomGet(list));
>     }
> 
> }
> 
> 
> ```



对于别集合而言，set类型可以用于去重（前提是hashcode，eques方法有实现，基础数据类型都已经实现了）。list线性集合可以用于随机取元素。



# 集合的Fail-Fast机制

对于所有集合，或者Map数据类型而言，非线程安全的类中都有一个属性叫做`modCount`这个属性是在使用迭代器访问数据元素的时候，每一次访问元素，都会查看modCount值是否和预期的一样，再迭代器初始的时候会进行一次modCount值复制作为期待值。

每一次非线程安全集合的添加或者删除，都会对modCount值进行+-。所以在进行遍历的时候这样可以作为线程安全的一种方式，禁止别的线程修改，删除只能通过迭代器本身进行删除。**在迭代器遍历的时候，任何线程包括当前线程自己都不能删除或者添加元素，只能迭代器自己进行，否则迭代器会报错**。

所以遍历非线程安全的集合**采用迭代器模式**for in , foreach ， stream，等都是使用的迭代器。但是无法操作迭代器，让集合返回一个迭代器利用迭代器才进行删除添加操作。

使用数组下标位置遍历不会出现这个问题，但是要注意元素下标越界。这个要自己处理了。



