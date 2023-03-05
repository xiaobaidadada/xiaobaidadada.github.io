直接说吧，国家化在spring中，就是你提供多个配置文件(yml或者properties)，然后利用spring的`context.getMessage("address", null, Locale.CHINA));`函数功根据字符串参数的不同，读取不同配置文件中的语言值；如果使用了jsp或者thymeleaf那么在生成的html界面中展示的非数据库内容值，就可以是不同的语言值了；

