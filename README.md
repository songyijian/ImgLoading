# ImgLoading  1.2.0 图片预加载  

1.2.0 - 变化 ：
			第二个参数如果是fn 就被视作完成回调 （推荐试用最新版本）
			修复 ratio 有不存在 100% 的状态
	

```
API
	arr	//* array 必填 要加载图片的连数组
	
	new ImgLoading(arr,{
		"init":function(){},		//fn（_this） 初始化回调
		"errFn":function(img){},	//fn(img) ——返回加载错误  图片对象 
		"okFn":function(img){},		//fn(img) ——返回成功  图片对象 
		"goFn": function(_this){},	//fn(_this)——返回this 每张加载回调 	//this.index进度
		"overFn":function(_this){}  //fn(_this)——返回this 全部完成 
	})
	
	new ImgLoading(arr,function(){	
		//完成回调   1.2.0 
	})
	
	
	ATTR
	  	this.arrLength=this.arr.length;
	  	this.index=0;
		this.ratio='0%';

```




