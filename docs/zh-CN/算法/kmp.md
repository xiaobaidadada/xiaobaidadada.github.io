# 普通的字符串匹配方法

字符串匹配肯定需要两个字符串，一个文本T，一个需要被匹配是否存在的字符串m。

怎么匹配呢，不就是从前往后遍历 T 的每个字符，在遍历到 T 的一个位置下标的时候，需要将 T 这个位置后面的字符和 m 一个一个匹配。如果后面的都满足匹配，就等于这个位置的 T 的坐标匹配成功了。

如果这次匹配没有满足T 文本的这个下标后面的每个字符都能匹配上，就没有匹配成功，就会对T 文本的下一个位置的字符后面的字符做 m 每个字符的匹配操作；一直重复这个行为。



# 从前面的普通匹配方法可以看出

每个字符都要把后面每个字符进行匹配的操作。但是这些字符之前可能就已经匹配过了。能不能把匹配过的这个操作利用一下，节省匹配的次数？



# KMP算法

kmp 算法就是利用已经匹配过的字符节省匹配次数的。但是不是所有的字符匹配操作都能利用上（方案不同）。

T文本在匹配到一个字符的时候，要与 m 进行后面的字符匹配，假设又匹配上了4 个字符，4 个字符后面的字符就不能匹配了。此时，我们就可以利用 已经匹配上的 m 的前面这段字符串。T 文本下一次开始匹配的字符下标，根本不用回退到最开始匹配 m 的下一个，可以直接从与 m 匹配失败的这个坐标开始进行。

这是因为前面匹配的字符我们都已经匹配过了，从逻辑上来说，我们已经拿到了数据，所以肯定可以得出这些字符串哪些是可以进行与当前这个位置的 T 文本主串进行匹配。就是直接把 m 往前滑动一下。

从逻辑上来说，不管 T 文本哪个字符失去匹配，m 应该往前滑动多少个位置，其实都只和 m 本身有关，和 T 文本无关，因为 失去匹配的 m 的前面这段字符串是属于 m 的，T 文本这段匹配上的也是和 m 一样的，也等于属于 m 的，只要我们求出 m 每个字符失去匹配应该滑动多少，不就可以了吗。

# 实际的代码例子

这个例子是提前获取 m 的 next 不是在匹配过程中。适用于的场景是大量需要匹配的已知字符串，比如敏感词过滤。

```java
public class kmp {

    public static void main(String[] args) {


        //需要被匹配的字符串
        String m = "amjkamfesw";

        //这个就是 next 数组
        int [] next = new int[m.length()];
        //设置-1 说明 要往前移动一位了 不存在这个位置下标的元素
        next[0] = -1;

        //这里来求 next 数组的值 不采用实时的遍历获取 而是提前生成（提前滑动每一次，时间复杂度是O(m)）
        char [] m_len = m.toCharArray();
        for (int index = 1; index<m.length() ; index++) {
            //index 的含义是当前位置 出现了不匹配（也就是 index 的前一位还是匹配的）
            //剩下的字符是否全部匹配
            boolean is = true;
            for (int i_p = index-1; i_p >=0 ; i_p--) {
                //把数组开始往前滑动
                if (m_len[i_p]==m_len[index]) {
                    //找到在当前位置可以匹配的字符
                    //接下来验证，剩下的没一个字符是否都能匹配上
                    int i_p_p = i_p;
                    int index_p = index;

                    while (i_p_p>=0) {
                        if (m_len[i_p_p]!=m_len[index_p]) {
                            is = false;
                            break;
                        }
                        i_p_p--;
                        index_p--;
                    }
                    if (is) {
                        //这里刚刚好
                        next[index]=i_p;
                        break;
                    }
                }
            }
            if (!is) {
                next[index]=-1;
            }
        }


        //下面开始真正的匹配
        //准备的文本 匹配上的位置下标 正确的是 15
        String st = "amjkamhkldsdsasamjkamfeswvfnvuivfuhvfivhfuivhf";

        char [] st_len = st.toCharArray();
        int p = 0;
        boolean sucess = false;
        for(int index= 0 ; index<st_len.length; ) {
            if (p==-1) {
                index++;
                break;
            }
            if (st_len[index]==m_len[p]) {
                p++;
                index++;
                //开始从前往后一个一个匹配 index 不做后退的操作
                boolean is = true;
                for ( ; p<m_len.length && index<st_len.length ; p++,index++) {
                    if (st_len[index]!=m_len[p]) {
                        is = false;
                        break;
                    }
                }
                if (is) {
                    //匹配上了
                    System.out.println("匹配的下标是："+(index- m_len.length));
                    sucess = true;
                    break;
                } else {
                    //使用 next 数组 让匹配往前滑动一下 index 的值不做改变
                    p = next[p];
                    continue;
                }

            }
            index++;
        }
        System.out.println(!sucess?"没有匹配成功":"");


    }

}

```

# 使用场景

kmp 适用的场景，当然所有的字符串匹配都适用（实现难不难不在考虑范围内，java 的字符串查找基本库就是 kmp 的）。但是这种特点更适合的场景是，对于有很多个字符串，词语需要进行匹配的场景，比如敏感词过滤。我们可以提前把每个字符串，词语的 next 数组求出（字符串每个字符失去匹配滑动的值），省去了在运行期间进行匹配的过程。

对于敏感词过滤场景，还可以和前缀树进行结合。在每个节点上都挂在这个节点可能形成的整个字符串的 next 数组，在匹配到一个树的节点的时候下一步，我们提取这个节点的所有 next 对每个子节点进行滑动检测。当然叶子节点只有一个 next 数组。