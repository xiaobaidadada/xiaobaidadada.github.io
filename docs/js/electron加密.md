# electron

electron是nodejs和浏览器，win32三个东西的组合。本质上还是个nodejs插件。所以electron就可以看作一个具有很有node插件的nodejs项目。

目前流行的软件有哪些是electron做的呢：qq最新版，vscode,  typora , clash, postman ....

electron官网并没有加密js代码的方式，就一个asar，但是不是加密的，可以很容易发编译回来。

所以electron的软件很难做成收费软件，太容易被修改源码破解了。



# 加密思路

electron项目，就是nodejs项目，就是怎么对js代码加密。一些加密思路为

1. 代码混淆，用各种语法树，混淆变量，不改变语义，从而影响阅读与修改源码，这个方法很有用，但是如果使用的网上免费的方法，或者库，很容易被破解。。。自己解析语法树混淆代码，也是可以行的，自己创建一个私密的方法。
2. 将js转成字节码文件，运行字节码文件，但是这些文件也是很容易被反编译回去，这种最不安全。
3. 使用二进制node addon插件，将源码加密执行。有一定难度，其实也容易被反编译，难度比字节码高点，和第一种一样，看具体怎么做了。
4. 修改electron源码，自己构建electron，从而加密项目。难度太大了。

这里推荐使用第三种方法：

首先，你必须会c++，还要了解v8机制，node addon的一些api。nodejs 我们使用node 可以直接执行一个js文件，就也可以执行一个node二进制插件，这是一个非常重要的功能。

我们的目的是：

1. 让项目启动执行的代码，第一步就是二进制的，因为二进制的反编译有一定难度。
2. 提前把js代码用对称或者非对称，或者其它算法加密。既然是加密，不管怎么解，解的方式肯定是唯一的，不管是代码，还是key我们统一说这个是密钥。
3. 将密钥写在c++二进制代码中，再次加密密钥。甚至可以做成启动后请求服务器临时获取密钥。
4. 二进制插件一启动就执行解码方法，解密后的js代码，放在内存中，直接执行。

这样一来，用户就很难看到源码，必须采用二进制反编译软件去分析了。最有价值的是，二进制的话我们的可操作性会更强了。

其中有几个点，这里做一下demo

1. 在内存中执行js代码，我们可以利用 `napi_run_script` ，但是node api提供的env环境，简直了，除了reqiure函数什么都有，但是这个又是用来加载依赖的，所以没他不行，所以我们要自己往env中添加require函数。

   ```c++
   
   napi_value GetRequireFunction(const Napi::Env& env) {
       // 获取全局对象
       napi_value global;
       napi_get_global(env, &global);
   
       // 获取process属性
       napi_value process;
       napi_get_named_property(env, global, "process", &process);
       // 获取mainModule
       napi_value mainModule;
       napi_get_named_property(env, process, "mainModule", &mainModule);
       // 获取mainModule_children
       napi_value mainModule_children;
       napi_get_named_property(env, mainModule, "children", &mainModule_children);
       // 测试查看当前模块的路径
   //     napi_value mainModule_path;
   //     napi_get_named_property(env, mainModule, "path", &mainModule_path);
   //     std::cout << "开始路径" << get_string_by_node_str(env,mainModule_path)<<std::endl;
       // 遍历拿到当前的插件的Module和其中的require函数
       napi_value require;
       uint32_t arrayLength;
       napi_get_array_length(env, mainModule_children, &arrayLength); // 获取数组长度
       if (arrayLength>0) {
           for (uint32_t i = 0; i < arrayLength; ++i) {
                   napi_value element;
                   napi_get_element(env, mainModule_children, i, &element); // 获取数组元素
                   napi_value id;
   
                   napi_get_named_property(env, element, "id", &id);
                   size_t strSize = 0;
                   napi_get_value_string_utf8(env, id, nullptr, 0, &strSize);
                   std::string str(strSize + 1, '\0');
                   napi_get_value_string_utf8(env, id, &str[0], strSize + 1, nullptr);
                   str.resize(strSize); // 将 napi_value 字符串转换为 std::string
                   // 使用 std::string 的 find 方法来检查子串是否存在于字符串中
                   if (str.find("napi.node") != std::string::npos) {
                       // 子串存在于字符串中
                        napi_get_named_property(env, element, "require", &require);
                   }
   
           }
       } else {
           napi_get_named_property(env, mainModule, "require", &require);
   
       }
   
   
       return require;
   }
   ```

   

上面的这个方法就可以拿到require函数。具体为什么可以拿到，你要去了解一下node的模块，每个文件都有一个模块，每个模块都会有一个require函数继承的父模块的，所以虽然没有直接给，我们可以自己拿。

然后设置到全局变量中，就等于给env添加了

```c++
        napi_value global;
        napi_get_global(env, &global);
        // 将函数附加到全局对象上
        napi_set_named_property(env, global, "getRequireFunction", require);
```



2. 下一步就是解密加密了，假设我们已经加密好了，现在我们要解密，在c++插件中使用json等操作并不简单，所以如果要求不高，我们还可以用`napi_run_script`执行解密方法，然后给c++变量。从而执行下一步。但这样编译二进制代码后，会很容易看到这些js代码。





