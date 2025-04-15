// ==UserScript==
// @name         xbb_exam
// @namespace    https://pro.coolcollege.cn/*
// @version      1
// @description  exam
// @author       土豆
// @connect      *
// @require      https://cdn.bootcdn.net/ajax/libs/dayjs/1.10.6/dayjs.min.js
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@11
// @match        https://pro.coolcollege.cn/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==


wy = {
    '简答题': [{
        'timu': '你的代码只写了一半，但是有紧急bug需要你切到另一分支进行修复，这时你要如何妥善处理？',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:临时代码处理',
        'type': '简答题'
    }, {
        'timu': '代码越短越好吗？为什么？',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:编码经验',
        'type': '简答题'
    }, {
        'timu': '请分别解释 master、hotfix、feature、dev 几个分支组别所代表的含义',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:commit message 规范',
        'type': '简答题'
    }, {
        'timu': '项目发布前，作为开发者，我们应该做好哪些准备工作？',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:工作流程',
        'type': '简答题'
    }, {
        'timu': '你认为哪些代码是有必要添加注释的，为什么？',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:编码经验',
        'type': '简答题'
    }, {
        'timu': '遇到git合并冲突，正确的处理步骤是怎样的？请按照第一步、第二步...的格式来书写你的答案。',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:git文件冲突解决',
        'type': '简答题'
    }, {
        'timu': '提交git message时，会指定某个单词作为开头，用来明确本次提交的代码类型。请列举你了解的几个用作开头的单词，并解释他的作用。',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:commit message 规范',
        'type': '简答题'
    }, {
        'timu': '通过Arrays.asList()构造的数组，无法进行增删，原因是',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:没有实现add和remove方法',
        'type': '简答题'
    }, {
        'timu': '用stringBuilder拼接字符串为什么比string效率高',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:stringBuilder.append()直接操作char数组2:string操作每次都会返回一个新对象',
        'type': '简答题'
    }, {
        'timu': '用户使用企微版销帮帮，会安装2个应用三方应用、一个代开发自建应用在同步对接数据时，分别使用哪个应用同步哪些数据',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:代开发外部联系人 三方应用组织架构范围',
        'type': '简答题'
    }, {
        'timu': '企微的id经过了多次升级，请简述我们系统生产环境的公司加密情况',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:新公司三方密文，代开发自建密文 老公司三',
        'type': '简答题'
    }, {
        'timu': '什么是魔法值？为什么编码时不推荐书写魔法值？',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:编码经验',
        'type': '简答题'
    }, {
        'timu': 'List和Set的区别',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:list的特点2:set的特点3:list和set的不同4:list和set的相同',
        'type': '简答题'
    }, {
        'timu': 'HashSet是如何保证不重复的',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:hash算法2:equals方法的使用3:hashmap的add方法4:hashset的add逻辑',
        'type': '简答题'
    }, {
        'timu': '假设你所开发的功能在 feature/ding-crm分支，在把它合并到主干分之前，你应该做好哪些准备？',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:分之合并',
        'type': '简答题'
    }, {
        'timu': '通过网管的接口，如何跳过网管的登录校验？',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:GatewayConstant2:NO_FILTER_PATH_PREFIX',
        'type': '简答题'
    }, {
        'timu': '销帮帮的sql基本不使用联表查询的主要原因是什么？',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:查询效率2:笛卡尔乘积',
        'type': '简答题'
    }, {
        'timu': '系统中用户是怎么授予数据操作权限的',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:为角色分配表单权限2:给用户分配权限',
        'type': '简答题'
    }, {
        'timu': '实现一个对象的自定义排序',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:实现Comparable接口2:重写compareTo方法',
        'type': '简答题'
    }, {
        'timu': '请描述自定义图表的统计流程，并简单罗列流程内的核心类',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:新建图表2:数据来源3:图表类型4:图表设置5:统计6:解析封装数据',
        'type': '简答题'
    }, {
        'timu': '请描述一下系统图表与自定义图表的区别',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:表存储位置不同（tb_chart、tb_chart_custom）2:statisticsType不同3:规则固定与用户自定义4:数据源不同5:统计流程不同',
        'type': '简答题'
    }, {
        'timu': '请简单描述下编辑进审批和新建审批有哪些不同之处？',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:在新建页面或者编辑界面时，所使用的字段权限不一样2:在审批拒绝或者撤回时，操作逻辑不一样',
        'type': '简答题'
    }, {
        'timu': '请描述下现有web页面列表页面的方法执行逻辑，按顺序写出相关逻辑',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:获取团队权限2:封装条件查询3:获取表单4:获取表单解释5:获取数据6:列表页操作按钮7:字段解析8:顶部按钮9:底部按钮10:字段重排序11:表单列表冻结，隐藏列',
        'type': '简答题'
    }, {
        'timu': '销帮帮开发规范中分别从“性能规范”、“脚本规范”、“Sql规范”中分别列举一到两个案例',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:循环体内不允许出现数据库查询（特殊场景除外）2:可重复触发（中断后重复执行可续上）、慎用数据库事务3:表名、字段名必须使用小写字母或数字，禁止出现数字开头，禁止两个下划线中间只出现数字、delete 语句必须带有 corpid',
        'type': '简答题'
    }, {
        'timu': '销帮帮PRO项目Redis三个使用场景',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:网关token校验2:接口重复请求的校验3:常量数据存储比如白名单、corpid =0 的表单解析',
        'type': '简答题'
    }, {
        'timu': '分布式系统中的接口调用如何保证顺序性',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:内存队列2:MQ3:分布式锁 Reids ，基于 Zookeeper 基于数据库',
        'type': '简答题'
    }, {
        'timu': '简述mysql 子查询  和 elasticSearch  has_child   以及他们之间的联系和区别',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:mysql 子查询的特点、目的2:elasticSearch has_child 需要构建索引时设定join_field 映射关系3:独立性4:数据获取范围 elasticSearch只能获取父的5:结构性 mysql 两份数据结构可不同',
        'type': '简答题'
    }, {
        'timu': '描述线程池任务调度的过程',
        'opt1': 'wu',
        'opt2': 'wu',
        'opt3': 'wu',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': '1:比较工作线程和核心线程数量2:比较工作线程和最大线程3:查看任务队列4:拒绝策略',
        'type': '简答题'
    }],
    '单选题': [{
        'timu': '如果某个bug仅客户方可以复现，以下哪种排查路径是不推荐的？',
        'opt1': 'A. 让测试同学通过海量操作来触发问题',
        'opt2': 'B. 登录客户账号来复现问题（取得客户授权）',
        'opt3': 'C. 询问客户复现步骤和规律',
        'opt4': 'D. 使用日志打点的方式输出关键数据信息',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A',
        'type': '单选题'
    }, {
        'timu': '紧急bug原则上要做到？',
        'opt1': 'A. 当日修复',
        'opt2': 'B. 1小时内修复',
        'opt3': 'C. 当月修复',
        'opt4': 'D. 当周修复',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A',
        'type': '单选题'
    }, {
        'timu': '用户数据错乱(跨公司)；服务器宕机 属于几级故障？',
        'opt1': 'A. 二级',
        'opt2': 'B. 四级',
        'opt3': 'C. 三级',
        'opt4': 'D. 一级',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'D',
        'type': '单选题'
    }, {
        'timu': '哪一个commit message是不推荐的',
        'opt1': 'A. fix: bugid 47953 【决策树】决策信息默认值失效',
        'opt2': 'B. style: 优化没有符合eslint规范的代码',
        'opt3': 'C. fix: 新增产品模块',
        'opt4': 'D. fix: 【低代码】修复低代码在新建表单时给关联数据字段赋值后取不到值的问题',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'C',
        'type': '单选题'
    }, {
        'timu': '以下哪个分支合并，是不被允许的',
        'opt1': 'A. master => hotfix',
        'opt2': 'B. feature => master',
        'opt3': 'C. master => feature',
        'opt4': 'D. feature=> hotfix',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'B',
        'type': '单选题'
    }, {
        'timu': '以下几个分支命名中，哪个是不推荐的',
        'opt1': 'A. featureNew',
        'opt2': 'B. master',
        'opt3': 'C. hotfix/v4.12.12',
        'opt4': 'D. dev/v4.12-error-catch',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A',
        'type': '单选题'
    }, {
        'timu': '如果某个bug是因为产品设计不合理导致的，应当？',
        'opt1': 'A. 标记为设计如此',
        'opt2': 'B. 转成需求处理',
        'opt3': 'C. 不予处理',
        'opt4': 'D. 是bug就要修复它',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'B',
        'type': '单选题'
    }, {
        'timu': '组织架构中，员工姓名显示为userId，原因是',
        'opt1': 'A. 代开发应用可见范围不完整',
        'opt2': 'B. 没有授权代开发应用',
        'opt3': 'C. 三方应用权限不完整',
        'opt4': 'D. 用户就叫这个',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A',
        'type': '单选题'
    }, {
        'timu': 'company表中的代开发应用信息是在什么时候添加得',
        'opt1': 'A. 三方应用授权时',
        'opt2': 'B. 代开发应用授权时',
        'opt3': 'C. 用户自主上传',
        'opt4': 'D. 代开发应用开发上线成功时',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'B',
        'type': '单选题'
    }, {
        'timu': '钉钉、企微、飞书、独立版的corpid格式是各不相同的，有时我们可以直接观察corpid格式，来判断当前公司属于哪个平台，以下说法正确的是',
        'opt1': 'A. 钉钉xbb开头飞书数字开头、企微ww、wx、wp开头、独立版ding开头',
        'opt2': 'B. 钉钉ding开头、飞书数字开头、企微ww、wx、wp开头、独立版xbb开头',
        'opt3': 'C. 钉钉ding开头、飞书ww、wx、wp开头企微数字开头独立版xbb开头',
        'opt4': 'D. 钉钉ding开头、飞书数字开头、企微xbb开头独立版ww、wx、wp开头',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'B',
        'type': '单选题'
    }, {
        'timu': '如果一个个活码的在线员工设置了分时段上下线，当某个时间段，所有在线员工都下线后，此时扫码展示的是哪个员工的二维码',
        'opt1': 'A. 随机员工',
        'opt2': 'B. 备用员工',
        'opt3': 'C. 没有员工',
        'opt4': 'D. 最后下线的员工',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'B',
        'type': '单选题'
    }, {
        'timu': '在系统工作流中，哪个是我们不支持的节点',
        'opt1': 'A. 分支节点',
        'opt2': 'B. 抄送节点',
        'opt3': 'C. 审批节点',
        'opt4': 'D. 人员节点',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'D',
        'type': '单选题'
    }, {
        'timu': 'routing_key和binding_key的最大长度是多少？',
        'opt1': 'A. 64字节',
        'opt2': 'B. 128字节',
        'opt3': 'C. 256字节',
        'opt4': 'D. 225字节',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'D',
        'type': '单选题'
    }, {
        'timu': '在系统中，工作流中使用的rabbiitmq的并发消费相关正确的是',
        'opt1': 'A. 没有并发',
        'opt2': 'B. 不支持并发',
        'opt3': 'C. 设置了并发，在application.yml配置中',
        'opt4': 'D. 设置了并发在消费信息内',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'C',
        'type': '单选题'
    }, {
        'timu': '下面有关rabbitmq中的vhost的作用正确的是',
        'opt1': 'A. 只是用于区分，并无其他作用',
        'opt2': 'B. 不同的vhost权限相同',
        'opt3': 'C. 不同vhost的数据可以互通',
        'opt4': 'D. vhost可以理解为虚拟broker，即mini-RabbitMQserver',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'D',
        'type': '单选题'
    }, {
        'timu': '下面代码将输出（ ）行 &Welcome to Java&?。',
        'opt1': 'A. 9',
        'opt2': 'B. 11',
        'opt3': 'C. 10',
        'opt4': 'D. 1',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'B',
        'type': '单选题'
    }, {
        'timu': '销帮帮api项目的核心业务逻辑在哪个仓库的代码中实现的？',
        'opt1': 'A. xbongbong/xbb-dingtalk-api',
        'opt2': 'B. xbongbong/xbb-pro-open-api',
        'opt3': 'C. xbongbong/xbb-pro',
        'opt4': 'D. xbongbong/new-pro-admin',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'C',
        'type': '单选题'
    }, {
        'timu': '网管中请求登录校验时，是在哪个过滤器获取用户信息的？',
        'opt1': 'A. ModifyRequestBodyFilter',
        'opt2': 'B. AuthenticationFilter',
        'opt3': 'C. AuthorizationFilter',
        'opt4': 'D. CacheBodyGatewayFilter',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'C',
        'type': '单选题'
    }, {
        'timu': 'ArrayList list = new ArrayList(20);中的list扩充几次（）',
        'opt1': 'A. 1',
        'opt2': 'B. 2',
        'opt3': 'C. 3',
        'opt4': 'D. 0',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'D',
        'type': '单选题'
    }, {
        'timu': '线程通过（）方法可以休眠一段时间，然后恢复运行。',
        'opt1': 'A. sleep',
        'opt2': 'B. setPrority',
        'opt3': 'C. yield',
        'opt4': 'D. run',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A',
        'type': '单选题'
    }, {
        'timu': '以下关于字段回收站的说法哪些是正确的',
        'opt1': 'A. 回收站的字段会保留45天',
        'opt2': 'B. 回收站的字段删除是物理删除',
        'opt3': 'C. 系统字段删除以后会进入字段回收站',
        'opt4': 'D. 回收站的字段既可以手动删除，也支持系统自动删除',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A',
        'type': '单选题'
    }, {
        'timu': '关联列表最多启用多少个',
        'opt1': 'A. 25',
        'opt2': 'B. 10',
        'opt3': 'C. 15',
        'opt4': 'D. 20',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'D',
        'type': '单选题'
    }, {
        'timu': '系统中单行文本的最大长度是多少',
        'opt1': 'A. 100',
        'opt2': 'B. 20',
        'opt3': 'C. 2000',
        'opt4': 'D. 200',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'D',
        'type': '单选题'
    }, {
        'timu': '销帮帮基础套餐的有效时间存在哪张表中？',
        'opt1': 'A. tb_fee',
        'opt2': 'B. tb_company',
        'opt3': 'C. tb_fee_company',
        'opt4': 'D. tb_fee_log',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'C',
        'type': '单选题'
    }, {
        'timu': '表单解释中字段的isOpen属性等于2代表什么',
        'opt1': 'A. 字段设置为不可编辑',
        'opt2': 'B. 字段被删除进入回收站',
        'opt3': 'C. 字段设置为不可见',
        'opt4': 'D. 字段不必填',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'B',
        'type': '单选题'
    }, {
        'timu': '关于图表类型，哪种说法是错误的',
        'opt1': 'A. 柱形图、折线图、面积图、雷达图、饼图、双轴图都允许设置多个值',
        'opt2': 'B. 图表类型选择后，不允许更改',
        'opt3': 'C. 有的图表类型既有es实现又有ck实现，有的类型仅支持ck',
        'opt4': 'D. 系统内图表类型分为基础和高级，且高级图表类型只允许旗舰版使用',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'B',
        'type': '单选题'
    }, {
        'timu': '用户设置的目标值是存储到哪张表的',
        'opt1': 'A. tb_chart',
        'opt2': 'B. tb_performance',
        'opt3': 'C. tb_saas_contract_performance',
        'opt4': 'D. tb_chart_custom',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A',
        'type': '单选题'
    }, {
        'timu': '在套餐允许的情况下，我们系统内允许创建多少级图表分类（图表菜单/仪表盘）',
        'opt1': 'A. 只能创建1级分类',
        'opt2': 'B. 最多创建2级',
        'opt3': 'C. 不允许用户创建',
        'opt4': 'D. 可以创建n级分类，n跟随系统套餐不同而有所不同',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'B',
        'type': '单选题'
    }, {
        'timu': '目前我们的BI自定义图表底层主要是用哪种数据库进行实现',
        'opt1': 'A. MongoDB',
        'opt2': 'B. MySQL',
        'opt3': 'C. ElasticSearch',
        'opt4': 'D. Clickhouse',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'D',
        'type': '单选题'
    }, {
        'timu': '新建进审批时，默认获取字段权限是哪个选项？',
        'opt1': 'A. 第一个审批节点的字段权限',
        'opt2': 'B. 开始节点的字段权限',
        'opt3': 'C. 表单设计页的字段权限',
        'opt4': 'wu',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'B',
        'type': '单选题'
    }, {
        'timu': '请在下方选项中选择出初始化应用的方法',
        'opt1': 'A. appInit',
        'opt2': 'B. initApp',
        'opt3': 'C. initMenu',
        'opt4': 'D. open',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'B',
        'type': '单选题'
    }, {
        'timu': '请在下方选项中选择出初始化crm会初始化哪些应用',
        'opt1': 'A. crm、资金管理、产品',
        'opt2': 'B. crm、产品',
        'opt3': 'C. crm',
        'opt4': 'D. crm、资金管理',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A',
        'type': '单选题'
    }, {
        'timu': '请在下方选项中选择出“下拉框”字段的数据格式',
        'opt1': 'A. [{&text&: &&, &value&: &&, &color: &&}]',
        'opt2': 'B. [{&key&: &&}]',
        'opt3': 'C. {&key&: &&}',
        'opt4': 'D. {&text&: &&, &value&: &&, &color: &&}',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'D',
        'type': '单选题'
    }, {
        'timu': '以下Redis 的使用场景不合适的选项为？',
        'opt1': 'A. 计数器',
        'opt2': 'B. 消息队列',
        'opt3': 'C. 缓存',
        'opt4': 'D. 实时图表统计',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'D',
        'type': '单选题'
    }, {
        'timu': '跟进记录列表数据权限是根据什么来控制？',
        'opt1': 'A. 负责人',
        'opt2': 'B. 创建人',
        'opt3': 'C. 协同人',
        'opt4': 'D. 执行人',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'B',
        'type': '单选题'
    }, {
        'timu': '请在下方选项中选择出列表解析数据方法',
        'opt1': 'A. FormDataListAnalysisDataHelp#analysisData',
        'opt2': 'B. FormDataGetAnalysisDataHelp#analysisData',
        'opt3': 'C. FormDataDetailAnalysisDataHelp#analysisData',
        'opt4': 'D. FormDataUpdateGetAnalysisDataHelp#analysisData',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A',
        'type': '单选题'
    }, {
        'timu': '哪个选项对List操作不会产生异常？',
        'opt1': 'A. new ArrayList()返回的对象进行add操作',
        'opt2': 'B. Arrays.asList返回的对象进行clear操作',
        'opt3': 'C. for循环遍历删除操作',
        'opt4': 'D. Arrays.asList返回的对象进行add操作',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A',
        'type': '单选题'
    }, {
        'timu': '哪个选项不是ElasticSearch增删改数据之后数据立即刷新的策略？',
        'opt1': 'A. DEFAULT',
        'opt2': 'B. NONE',
        'opt3': 'C. IMMEDIATE',
        'opt4': 'D. WAIT_UNTIL',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A',
        'type': '单选题'
    }, {
        'timu': '下列哪个业务不是多模版的表单？',
        'opt1': 'A. 合同',
        'opt2': 'B. 客户',
        'opt3': 'C. 联系',
        'opt4': 'D. 机会',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'C',
        'type': '单选题'
    }, {
        'timu': '以下描述正确的是String a = &Java&;String b = &Java&;String c = &Ja&;String d = &va&;String e = c+d;',
        'opt1': 'A. a,b指向同一个对象，a,e 不指向同一个对象',
        'opt2': 'B. a,b不指向同一个对象，a,e 不指向同一个对象',
        'opt3': 'C.  a,b不指向同一个对象，a,e 不指向同一个对象',
        'opt4': 'D. a,b指向同一个对象，a,e 指向同一个对象',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A',
        'type': '单选题'
    }, {
        'timu': '请选择输出内容',
        'opt1': 'A. [0,1,2]',
        'opt2': 'B. [-3,-2,-1]',
        'opt3': 'C. [-2,-1,0]',
        'opt4': 'D. [-2,0,2]',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'D',
        'type': '单选题'
    }, {
        'timu': '如果去掉了\xa0main\xa0方法的\xa0static\xa0修饰符会怎样',
        'opt1': 'A. 程序能正常编译，正常运行',
        'opt2': 'B. 程序无法编译',
        'opt3': 'C. 程序能正常编译，正常运行一会会立刻退出',
        'opt4': 'D. 程序能正常编译，无法运行',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'D',
        'type': '单选题'
    }, {
        'timu': '新建合同有很多途径，哪个选项不能描述错误？',
        'opt1': 'A. 客户详情页新建合同',
        'opt2': 'B. 报价单详情页新建合同',
        'opt3': 'C. 机会详情页新建合同',
        'opt4': 'D. 线索详情页新建合同',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'D',
        'type': '单选题'
    }],
    '多选题': [{
        'timu': '企微好友可以被同步到哪个模块',
        'opt1': 'A. 供应商',
        'opt2': 'B. 联系人',
        'opt3': 'C. 线索',
        'opt4': 'D. 客户',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'C、D',
        'type': '多选题'
    }, {
        'timu': '关于企微接口账号说法正确的是',
        'opt1': 'A. 有账号的员工才能被同步到系统中',
        'opt2': 'B. 同个员工可以同时拥有基础和互通账号',
        'opt3': 'C. 接口账号可以被移交',
        'opt4': 'D. 有互通账号的员工的好友才能被同步到系统中',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'B、C、D',
        'type': '多选题'
    }, {
        'timu': '关于链接雷达、以下下说法正确的是',
        'opt1': 'A. 在微信中打开可以识别访客身份',
        'opt2': 'B. 在浏览器打开可以判断是否在具体企微群中予以拦截',
        'opt3': 'C. 可以保护原始链接不泄露',
        'opt4': 'D. 非好友打开链接，可以引导添加好友',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、C、D',
        'type': '多选题'
    }, {
        'timu': '员工添加好友成功，触发加好友回调，需要发送欢迎语，以下说法正确的是',
        'opt1': 'A. 欢迎语列表有多条符合要求的欢迎语，取更新时间最近的',
        'opt2': 'B. 如果是通过个活码添加的好友，要先校验个活码的欢迎语设置',
        'opt3': 'C. 如果在企微后台设置了欢迎语，回调无法触发欢迎语发送',
        'opt4': 'D. 如果是通过个活码添加的好友，活码开启了分时段欢迎语，当前时间没有合适的欢迎语就不会发送了',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、C',
        'type': '多选题'
    }, {
        'timu': 'synchronized可以修饰的作用域有哪些',
        'opt1': 'A. 静态方法',
        'opt2': 'B. 代码块',
        'opt3': 'C. 变量',
        'opt4': 'D. 非静态方法',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、C、D',
        'type': '多选题'
    }, {
        'timu': '以下关于drop,delete与truncate的描述正确的是',
        'opt1': 'A. delete会记录事务日志，truncate不会',
        'opt2': 'B. TRUNCATE只能对TABLE，DELETE可以是table和view',
        'opt3': 'C. drop会删除表的结构被依赖的约束',
        'opt4': 'D. delete会减少表或索引所占的空间',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、C',
        'type': '多选题'
    }, {
        'timu': '数据库事务transanction的基本要素',
        'opt1': 'A. 隔离性',
        'opt2': 'B. 原子性',
        'opt3': 'C. 一致性',
        'opt4': 'D. 持久性',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、C、D',
        'type': '多选题'
    }, {
        'timu': '以下哪个命名符合销帮帮表名？',
        'opt1': 'A. tb_data_table',
        'opt2': 'B. tb_dataTable',
        'opt3': 'C. dataTable',
        'opt4': 'D. data_table',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、D',
        'type': '多选题'
    }, {
        'timu': '以下哪几个属于Redis支持的数据类型？',
        'opt1': 'A. string',
        'opt2': 'B. date',
        'opt3': 'C. int',
        'opt4': 'D. zsetsorted set',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、D',
        'type': '多选题'
    }, {
        'timu': '使用rabbitmq的好处有什么',
        'opt1': 'A. 流量限制',
        'opt2': 'B. 消息分发',
        'opt3': 'C. 消息缓冲',
        'opt4': 'D. 异步处理',
        'opt5': 'E. 应用解耦',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、C、D、E',
        'type': '多选题'
    }, {
        'timu': '以下哪些操作可能更新客户的最后跟进时间',
        'opt1': 'A. 新建合同',
        'opt2': 'B. 新建销售机会',
        'opt3': 'C. 编辑客户',
        'opt4': 'D. 使用呼叫中心拨打电话',
        'opt5': 'E. 新建跟进记录',
        'opt6': 'F. 添加负责人',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、D、E',
        'type': '多选题'
    }, {
        'timu': '销帮帮CRM系统中哪些表单可以创建多个模板',
        'opt1': 'A. 联系人',
        'opt2': 'B. 合同',
        'opt3': 'C. 客户',
        'opt4': 'D. 报价单',
        'opt5': 'E. 供应商',
        'opt6': 'F. 销售线索',
        'opt7': 'G. 销售机会',
        'opt8': 'wu',
        'answer': 'B、C、F、G',
        'type': '多选题'
    }, {
        'timu': '以下关于阶段推进器的说法正确的是',
        'opt1': 'A. 结束阶段必须在普通阶段后面',
        'opt2': 'B. 普通阶段的阶段比例需要递增设置',
        'opt3': 'C. 必须包含普通阶段和结束阶段',
        'opt4': 'D. 阶段任务必须填写任务占比',
        'opt5': 'E. 阶段添加以后不能被删除',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、C、D、E',
        'type': '多选题'
    }, {
        'timu': '以下关于自定义图表统计数据量限制的说法，哪个是正确的',
        'opt1': 'A. 单表数据：表单数据超过30万条，该表单将不可用作数据源',
        'opt2': 'B. 部分公司有特殊要求或单独付费时，会给单家公司单独放开可统计的数据量',
        'opt3': 'C. BI可以支持大数据量统计，不用进行限制',
        'opt4': 'D. 多表关联：单个表单数据超过10万条，该表单将不可用作数据源',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、D',
        'type': '多选题'
    }, {
        'timu': 'BI图表的种类有哪些',
        'opt1': 'A. 首页图表和图表中心图表',
        'opt2': 'B. 数据集',
        'opt3': 'C. 系统图表',
        'opt4': 'D. 自定义图表',
        'opt5': 'E. 仪表盘',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'C、D',
        'type': '多选题'
    }, {
        'timu': '以下关于图表分类（仪表盘）的描述哪些是正确的',
        'opt1': 'A. 图表分类只允许用户创建',
        'opt2': 'B. 可以把整张仪表盘发布到首页，但是系统分类不允许发布到首页',
        'opt3': 'C. 系统内所有的图表都有所属的图表分类，且一张图表允许属于多个分类',
        'opt4': 'D. 图表分类也存在系统和自定义之分',
        'opt5': 'E. 图表分类下可以有0张图表，也可以有1张甚至多张图表',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'B、C、D、E',
        'type': '多选题'
    }, {
        'timu': '初始化应用时，需要新增哪些数据',
        'opt1': 'A. 应用',
        'opt2': 'B. 表单',
        'opt3': 'C. 表单解释',
        'opt4': 'D. 菜单',
        'opt5': 'E. 打印',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、C、D、E',
        'type': '多选题'
    }, {
        'timu': '列表页“单行文本”字段具有哪些筛选项',
        'opt1': 'A. 不包含',
        'opt2': 'B. 等于任意一个',
        'opt3': 'C. 不等于',
        'opt4': 'D. 包含',
        'opt5': 'E. 不为空',
        'opt6': 'F. 不等于任意一个',
        'opt7': 'G. 为空',
        'opt8': 'H. 等于',
        'answer': 'A、B、C、D、E、F、G、H',
        'type': '多选题'
    }, {
        'timu': '列表页“日期”字段具有哪些筛选项',
        'opt1': 'A. 小于',
        'opt2': 'B. 不为空',
        'opt3': 'C. 选择范围',
        'opt4': 'D. 大于等于',
        'opt5': 'E. 为空',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、C、D、E',
        'type': '多选题'
    }, {
        'timu': '哪种情形下的BI统计会按照多表处理',
        'opt1': 'A. 当图表类型选择数据统计表时，会按照多表处理',
        'opt2': 'B. 数据来源设置为单表数据，但是图表设计时选择负责人字段',
        'opt3': 'C. 数据来源设置为单表数据，但是图表设计时添加了计算字段',
        'opt4': 'D. 数据来源设置为单表数据，但是勾选了关联数据',
        'opt5': 'E. 数据来源设置为多表关联',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'B、D、E',
        'type': '多选题'
    }, {
        'timu': '为（a,b,c）添加一个联合索引 index_abc，下列索引失效的是？',
        'opt1': 'A. a = 1 and b=2 or c=3',
        'opt2': 'B. a=1 and b<>2 and c=3',
        'opt3': 'C. c= 1 and a =2',
        'opt4': 'D. a=1 and b= 2 and c<3',
        'opt5': 'E. b=2 anc c=3',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、E',
        'type': '多选题'
    }, {
        'timu': '合同表单中有很多金额计算字段，下列描述错误的是？',
        'opt1': 'A. 合同金额默认值=产品合计*整单折扣-优惠金额',
        'opt2': 'B. 合同成本= 合同产品总成本  + 其他费用',
        'opt3': 'C. 合同毛利率 = 合同毛利/合同金额*100%',
        'opt4': 'D. 现金毛利 = 合同已收款金额 - 合同成本',
        'opt5': 'E. 合同毛利= 合同金额 - 退货金额 - 合同成本',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B',
        'type': '多选题'
    }, {
        'timu': '创建线程的方法',
        'opt1': 'A. 通过继承 Thread 类创建线程类',
        'opt2': 'B.  实现 Runnable 接口创建线程类',
        'opt3': 'C. 通过 Executors 创建',
        'opt4': 'D. 通过 Callable 和 Future 接口创建线程',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、C、D',
        'type': '多选题'
    }, {
        'timu': '选出MySQL 有关权限的表',
        'opt1': 'A. tables_priv',
        'opt2': 'B. user',
        'opt3': 'C. db',
        'opt4': 'D. procs_priv',
        'opt5': 'E. columns_priv',
        'opt6': 'F. host',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、C、D、E、F',
        'type': '多选题'
    }, {
        'timu': '对于equals和hashcode的关系描述正确的是',
        'opt1': 'A.  如果equals为true，hashcode一定相等',
        'opt2': 'B. 如果hashcode值不等，equals一定不等',
        'opt3': 'C. 重写equals方法时，一定要重写hashcode方法',
        'opt4': 'D. 如果equals为false，hashcode不一定不相等',
        'opt5': 'E. 如果hashcode值相等，equals不一定相等',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、C、D、E',
        'type': '多选题'
    }, {
        'timu': '请选择MySQL 中 InnoDB 支持的事务隔离级别',
        'opt1': 'A. read uncommited ：读到未提交数据',
        'opt2': 'B. read committed：脏读，不可重复读',
        'opt3': 'C. repeatable read：可重读',
        'opt4': 'D.   serializable ：串行事物',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、C、D',
        'type': '多选题'
    }, {
        'timu': '选出MySQL 有关权限的表',
        'opt1': 'A. db',
        'opt2': 'B. procs_priv',
        'opt3': 'C. tables_priv',
        'opt4': 'D. user',
        'opt5': 'E. host',
        'opt6': 'F. columns_priv',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、C、D、E、F',
        'type': '多选题'
    }, {
        'timu': 'G1收集器的特点',
        'opt1': 'A. 分代收集',
        'opt2': 'B. 可预测的停顿',
        'opt3': 'C. 并行与并发',
        'opt4': 'D. 空间整合',
        'opt5': 'E. 标记-清理',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、C、D',
        'type': '多选题'
    }, {
        'timu': '请选择MySQL 中 InnoDB 支持的事务隔离级别',
        'opt1': 'A. read uncommited ：读到未提交数据',
        'opt2': 'B. repeatable read：可重读',
        'opt3': 'C. read committed：脏读，不可重复读',
        'opt4': 'D. serializable ：串行事物',
        'opt5': 'wu',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、C、D',
        'type': '多选题'
    }, {
        'timu': 'G1收集器的特点',
        'opt1': 'A. 分代收集',
        'opt2': 'B. 空间整合',
        'opt3': 'C. 可预测的停顿',
        'opt4': 'D. 并行与并发',
        'opt5': 'E. 标记-清理',
        'opt6': 'wu',
        'opt7': 'wu',
        'opt8': 'wu',
        'answer': 'A、B、C、D',
        'type': '多选题'
    }],
    '填空题': [{
        'timu': '素材库素材大小限制：图片\xa0(\xa0\xa0\xa0\xa0\xa0\xa0\xa0)\xa0、文件\xa0(\xa0\xa0\xa0\xa0\xa0\xa0\xa0)\xa0、视频\xa0(\xa0\xa0\xa0\xa0\xa0\xa0\xa0)\xa0、文章\xa0(\xa0\xa0\xa0\xa0\xa0\xa0\xa0)\xa0企微版语音录入\xa0(\xa0\xa0\xa0\xa0\xa0\xa0\xa0)\xa0',
        'opt1': 'option_length:5',
        'opt2': 'option_length:5',
        'opt3': 'option_length:5',
        'opt4': 'option_length:5',
        'opt5': 'option_length:5',
        'opt6': 'option_length:5',
        'opt7': 'option_length:5',
        'opt8': 'option_length:5',
        'answer': '10M#20M#10M#5000字#2M60s#',
        'type': '填空题'
    }]
}


//返回的答案是一个题，答案在题得字段中
function get_answer(timu, type) {
    if (type == '简答题') {
        list = wy.简答题;
        for (i = 0; i < list.length; i++) {
            if (timu == list[i].timu) return list[i];

        }
    } else if (type == '单选题') {
        list = wy.单选题;
        for (i = 0; i < list.length; i++) {
            if (timu == list[i].timu) return list[i];

        }
    } else if (type == '多选题') {
        list = wy.多选题;
        for (i = 0; i < list.length; i++) {
            if (timu == list[i].timu) return list[i];

        }
    } else if (type == '填空题') {
        list = wy.填空题;
        for (i = 0; i < list.length; i++) {
            if (timu == list[i].timu) return list[i];
        }
    }
}

status_show = {}

function add_div(q_p, q_da) {
    tishi_div = document.createElement('div');
    //添加8个元素
    for (i1 = 1; i1 <= 8; i1++) {
        linshi_div = document.createElement('div');
        linshi_div.innerText = q_da[`opt${i1}`];
        tishi_div.appendChild(linshi_div);
    }
    linshi_div = document.createElement('div');
    linshi_div.innerText = q_da['answer'];
    tishi_div.appendChild(linshi_div);

    //设置显示状态
    tishi_div.style.display = 'none'
    status_show[p] = false

    tishi_div.className = 'tishi'

    ti[q_p].addEventListener('click', function (event) {
        //currentTarget指的是哪个元素绑定的事件的标签，而不是当前触发的标签 debugger;
        a = event.currentTarget.getElementsByClassName('tishi')
        if (tishi_div[event.currentTarget.show] === false) {
            a[0].style.display = 'block'
            tishi_div[event.currentTarget.show] = true
        } else {
            a[0].style.display = 'none'
            tishi_div[event.currentTarget.show] = false
        }


    })
    //设置索引
    ti[q_p].show = q_p
    ti[q_p].appendChild(tishi_div)
}


function run() {
    ti = document.getElementsByClassName('question___2HZXG')

    for (p = 0; p < ti.length; p++) {


        if (ti[p].childNodes.length === 3 && ti[p].getElementsByClassName('options___1rHon')[0].childNodes[0].getAttribute('class') === 'ant-input-textarea ant-input-textarea-show-count'
        ) {
            timu = ti[p].getElementsByClassName('stem___3fAEe')[0].getElementsByClassName('subject___32LCG')[0].childNodes[3].textContent
            da = get_answer(timu.replaceAll('\n', ''), "简答题");
            if (da === undefined || da == null) {
                console.log("没找到答案：" + timu)
                da = get_answer(timu.replaceAll('\n', '').substring(1, 6), "简答题");
                add_div(p, da)
            } else {
                add_div(p, da)
            }


            // debugger;
        }
        // //单项选择题
        else if (ti[p].childNodes.length === 3 && ti[p].getElementsByClassName('options___1rHon')[0].childNodes[0].getAttribute('class') === 'ant-radio-group ant-radio-group-outline'
        ) {
            timu = ti[p].getElementsByClassName('stem___3fAEe')[0].getElementsByClassName('subject___32LCG')[0].childNodes[3].textContent

            da = get_answer(timu.replaceAll('\n', '').replaceAll("\"", '&'), "单选题");
            if (da === undefined || da == null) {
                console.log("没找到答案：" + timu)
                da = get_answer(timu.replaceAll('\n', '').substring(1, 6), "简答题");
                add_div(p, da)
            } else {
                add_div(p, da)
            }
        }

        // //多项选择题
        else if (ti[p].childNodes.length === 3 && ti[p].getElementsByClassName('options___1rHon')[0].childNodes[0].getAttribute('class') === 'ant-checkbox-group'
        ) {
            timu = ti[p].getElementsByClassName('stem___3fAEe')[0].getElementsByClassName('subject___32LCG')[0].childNodes[3].textContent
            da = get_answer(timu.replaceAll('\n', ''), "多选题");
            if (da === undefined || da == null) {
                console.log("没找到答案：" + timu)
                da = get_answer(timu.replaceAll('\n', '').substring(1, 6), "简答题");
                add_div(p, da)
            } else {
                add_div(p, da)
            }

        }

        // //填空题
        else if (ti[p].childNodes.length === 3 && ti[p].getElementsByClassName('options___1rHon')[0].childNodes[0].getAttribute('class') === 'blank-option___3IRUp '
        ) {
            timu = ti[p].getElementsByClassName('stem___3fAEe')[0].getElementsByClassName('subject___32LCG')[0].childNodes[3].textContent
            da = get_answer(timu.replaceAll('\n', ''), "填空题");
            if (da === undefined || da == null) {
                console.log("没找到答案：" + timu)
                da = get_answer(timu.replaceAll('\n', '').substring(1, 6), "简答题");
                add_div(p, da)
            } else {
                add_div(p, da)
            }

        }


    }


}


window.onload = function () {

    if_on = document.getElementById('question-list') != null || document.getElementById('question-list') != undefined;
    body_on = true;

    //手动运行测试 root---div 肯定存在，通过开发者工具，查看到window.onload执行完
    document.getElementById('root').addEventListener("click", () => {
        console.log(111)
        debugger;
        if ((!if_on && body_on)) {
            run()
            //界面 繁体字提示成功了
            document.querySelector("#root > div > div > div > div.exam-content___HH2QR > div.left___-ZZYO > div > div.order___3G7Me > div:nth-child(1) > h5").innerText = '单选題';
            body_on = false;

        }
    })

    //如果界面js还未渲染完（并非加载），用于非静态渲染网页，
    setTimeout(() => {
        if (!if_on) {
            if_on = document.getElementById('question-list') != null || document.getElementById('question-list') != undefined;
            if (if_on) {
                run()
                //界面 繁体字提示成功了
                document.querySelector("#root > div > div > div > div.exam-content___HH2QR > div.left___-ZZYO > div > div.order___3G7Me > div:nth-child(1) > h5").innerText = '单选題';
                body_on = false;
            }
        }
    }, 2000)


    console.log(if_on)
    if (if_on) {
        run()
        //界面 繁体字提示成功了
        document.querySelector("#root > div > div > div > div.exam-content___HH2QR > div.left___-ZZYO > div > div.order___3G7Me > div:nth-child(1) > h5").innerText = '单选題';
        body_on = false;
    }

}