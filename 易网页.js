var 易网页=function(){
	var 
	预转换标签={
		'如何做爱':'html',
		'大标题':'h1',
		'标题一':'h1',
		'副标题':'h2',
		'标题二':'h2',
		'二标题':'h2',
		'标题三':'h3',
		'三标题':'h3',
		'标题四':'h4',
		'标题五':'h5',
		'标题六':'h6',
		'标题七':'h7',
		'块':'div',
		'段落':'p',
		'着重':'strong',
		'引用':'blockquote',
		'删除':'del',
		'头部':'header',
		'尾部':'footer',
		'源代码':'pre',
		'代码':'code',
		'列表':'ul',
		'无序列表':'ul',
		'有序列表':'ol',
		'列表项':'li',
		'链接':'link',
		'网页标题':'title',
		'超链接':'a',
		'图像':'img',
		'样式':'style',
		'样式表':'link rel="stylesheet"'
	},
	预转换参数名={
		'唯一名称':'id',
		'类':'class',
		'目标':'href',
		'地址':'src',
		'关系':'rel',
		'方式':'target'
	},
	已打开的标签们=[],
	转换=function(文本){
		return 文本.replace(/(【[。、]】)|(【)(、?)([\u4e00-\u9fa5]+)(。?)(.*?)(】)/g,function(整段文本,强制闭合,开始标签,是否结束标签,中文标签名,是否结束标签二,参数字段,结束标签,预输出的标签名,长度){
			预输出的标签名='div'
			if(强制闭合)
				return '</'+已打开的标签们.pop()+'>'

			if(预转换标签[中文标签名])
				预输出的标签名=预转换标签[中文标签名]

			if(!(是否结束标签||是否结束标签二)){
				已打开的标签们.push(预输出的标签名)
				return '<'+预输出的标签名+' '+参数字段转换(参数字段,中文标签名)+'>'
			}else{
				长度=已打开的标签们.length+1
				while(已打开的标签们[--长度]!=预输出的标签名);
				
				已打开的标签们.splice(长度,1)

				return '</'+预输出的标签名+'>'
			}	
		})
	},
	参数字段转换=function(参数字段,中文标签名){
		参数字段=参数字段.replace(/([\u4e00-\u9fa5]+?)：?「(.+?)」/g,function(整段文本,中文参数名,值,预输出的参数名){
			预输出的参数名=中文参数名

			if(预转换参数名[中文参数名])
				预输出的参数名=预转换参数名[中文参数名]

			if(预输出的参数名=='class')
				值=中文标签名+' '+值

			return 预输出的参数名+'="'+值+'"'
		})

		if(!参数字段.match(/class/))
			return 参数字段+=' class='+中文标签名

		return 参数字段
	},
	变身=function(网页标签){
		if(!(网页标签=网页标签.getElementsByTagName('xmp')))
			return console.log('请在标签内通过<xmp>标签包裹易网页语言');

		网页标签.innerHTML=转换(网页标签[0].innerHTML)
	}

	return {
		转换:转换,
		变身:变身
	}
}()
