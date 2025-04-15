# v8

我们都知道v8是js引擎，但是v8并不是一个二进制程序可以直接执行js，v8只是一个c++库，可以编译js代码成字节码，执行js字节码或者用即时编译执行js代码。

我们想要利用v8执行js代码就得调用v8得api来一步一步的执行。其中有一些概念。

1. isolate隔离环境，是一个独立的执行环境，就是一个堆内存管理器，浏览器一个页面一个隔离环境，nodejs主线程也是一个隔离环境。浏览器一个页面还是一个进程。
2. context上下文，一个隔离环境有多个上下文，**每个上下文就是很多函数指针组成的，比如给js提供全局对象**，函数。给上下文中添加一个函数或者对象，在js执行的时候就可以调用了，nodejs 就是采用这样的方法给js提供了很多的执行模块功能。比如定时器函数 os对象等。

我们需要创建这些对象才能执行js代码。值得注意的是，v8的js并没有任何库函数，就连console.log这样的函数也没有，它只执行js。nodejs就是给v8提供一个具有es规范的，具有es api能力的js执行环境。谷歌浏览器和最新的edge虽然都用的v8但是edge和谷歌浏览器对es实现的库代码并不是一样的。我们提供js的库函数，就是给context上下文提供函数，这些函数是c++实现的，但是可以用js调用。所有的可以执行js的环境都是这么做的。

# nodejs结构

我们可以用分层的角度去看。

## 底层api

最底层，是nodejs所使用的各种c++依赖库，包括核心的v8库，各种dns,ssl等库，还有一个异步事件循环库，这个库是nodejs自己实现的，用于实现事件循环，异步请求i/o，其实原理也不是很难理解，就是提供一个线程池，不断的排队队列中是否有堵塞完成的函数，或者未执行的函数，有的话调用提前准备好的js函数进行回调。

## 封装api层

这一层将底层的各种库封装起来，统一使用。但不是说底层的api一点不用了，这里只是整合一些工具函数。

## 实现层

1. 在执行一个js的时候，首先为这个js提供 一个合适上下文。就是各种系统api。
2. 每一个异步函数，不管是定时器还是一些异步文件操作，包括nodejs中有一个事件模块。他们执行以后，执行的是底层的c++代码，这里的c++代码会将这个js先进入一个事件队列。
3. 执行事件队列中的代码，依靠的是c++主线程，js代码已经执行完了，主线程c++依然会不断地轮训检查异步队列是否还有函数。有的话再次调用v8的执行js api取执行。整体就是这样的操作。



js中的各种变量，函数，真正执行的时候都只是c++中的一个对象。不管任何脚本语言，python，java，都是这么实现相关的功能的。

node中有一个数据类型叫buffer，虽然它的内存不受v8管理，由node线程自己创建的，但是node去管理他，还是要判断一下是否有v8类型的变量引用着。

# node addon

node 有一个非常好玩且有用的功能就是可以写c++插件，这个插件可以无缝和js代码进行对接。写这个可以体会到开发nodejs的感觉，js变量都是特殊的v8中c++变量而已。

1. 写node adddon 必须会c++
2. 需要先安装 node-gyp 编译器，这个是node 用来编译c++插件的。
3. 每个c++插件，都需要引用，相关的头文件，其中如果你要使用流行的 napi.h头文件，还需要安装 node-addon-api这个依赖。
4. 使用node-addon-api 还需要创建几个关键的配置文件，将node-addon-api目录引入进来。
5. 编写好后，编译一下，然后用require可以直接引入执行。

给个例子。

c++插件

```c++
// hello.cc
#include <node.h>
#include <node_api.h>


// 使一些v8命名空间中定义的对象
using v8::FunctionCallbackInfo;
// 隔离实例 每个实例都有自己的内存和状态，每个node程序启动就有一个这样Isolate，在这个里面创建的对象和在js中创建的一样，引用关系也一样，直接创建的c++变量是独立的不属于Isolate。
using v8::Isolate;
// 帮助管理c++创建的内存对象，有一个完整的内存周期，可以被收回。模板
using v8::Local;
using v8::Object;
using v8::String;
// 任意类型的值
using v8::Value;

// 第一个参数都是这个,返回类型只能是void，具体需要使用FunctionCallbackInfo来返回
void hello(const FunctionCallbackInfo<Value>& args) {

  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(
      isolate, "world").ToLocalChecked());
//      args.GetReturnValue().Set(42);
}

// 注册c++函数
void Initialize(Local<Object> exports) {
    // 将字符串绑定到一个具体的函数
  NODE_SET_METHOD(exports, "hello", hello);
}
// 封装为一个addon模块
NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)


  // 在模块加载时执行的 JavaScript 代码
//   v8::Local<v8::String> code = v8::String::NewFromUtf8(isolate, "console.log('Addon module loaded');").ToLocalChecked();

```

binding.gyp 构建文件

```json
{
  "targets": [
    {
     "target_name": "main",
     "sources": ["c/main.cc"],
     'includes': [
            './common.gypi'
          ]
    },
  ]
}

common.gypi 文件
{
# 为什么要这个配置  https://github.com/nodejs/node-gyp/issues/26
  'cflags!': ['-fno-exceptions'],
  'cflags_cc!': ['-fno-exceptions'],
      "include_dirs": [
             "<!@(node -p \"require('node-addon-api').include\")",
      ],
      "dependencies": [
         "<!(node -p \"require('node-addon-api').gyp\")"
      ],
  'conditions': [
    ['OS=="mac"', {
      'cflags+': ['-fvisibility=hidden'],
      'xcode_settings': {
        'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
        'CLANG_CXX_LIBRARY': 'libc++',
        'MACOSX_DEPLOYMENT_TARGET': '10.7',
        'GCC_SYMBOLS_PRIVATE_EXTERN': 'YES', # -fvisibility=hidden
      }
    }],
    ['OS=="win"', { 
      'msvs_settings': {
        'VCCLCompilerTool': {
          'ExceptionHandling': 1,
          'AdditionalOptions': ['/source-charset:utf-8']
        },
      },
      'defines':[
        '_HAS_EXCEPTIONS=1',
        'NOMINMAX'
      ]
    }]
  ]
}


```

这个common.gypi 挺坑的，别的就没啥了，看着官网走一遍就好了。

.... 

