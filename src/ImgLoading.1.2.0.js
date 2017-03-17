/*
	ImgLoading 1.2.0  图片预加载 
	作者：songyijian 
	发布：2017.3.17
	
	1.2.0 - 跟新内容 ： 第二个参数如果是fn 就被视作完成回调
	
	
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
			//完成回调
		})
	  	
	  	
	  	ATTR
		  	this.arrLength=this.arr.length;
		  	this.index=0;
			this.ratio='0%';
			
* */ 

!function(){
	function ImgLoading(arr,obj){
		if(arr && typeof arr === "object" && typeof arr.length === "number"){
			this.arr = arr;
		}else{
			console.log(" 'arr' not a array");
			return;
		}
		this.data={
			"initFn":obj.initFn || function(){},
			"goFn":obj.goFn || function(){},
			"overFn":obj.overFn || function(){},
			"errFn":obj.errFn || function(){},
			"okFn":obj.okFn || function(){}
		};
		
		if(arguments.length === 2 && typeof obj ==='function') {
			this.data.overFn=obj;
		}
		
	    this.arrLength=this.arr.length;
		this.index=0;
		this.ratio='0%';
		this.init();
	};
	
	ImgLoading.prototype.init = function(){
	    this.data.initFn(this)
	    var _this=this;
	    
	    (function loginGo(i){
			if(i >= _this.arrLength){
				_this.data.overFn(_this);
				return;
			}
			_this.oimg=new Image();
	        _this.oimg.src=_this.arr[i];

	        if(_this.oimg.complete){
	        	_this.data.goFn(_this);
	        	_this.data.okFn(_this.oimg);
	        	_this.index=i+1;
	        	loginGo(_this.index);
				_this.ratio=parseInt((_this.index/_this.arrLength)*100)+'%';
	        	return;
	        }
	        
	        _this.oimg.onload=function(){
	        	_this.data.okFn(this);
	        	_this.oimg.onload=null;
	        	_this.index=i+1;
	        	loginGo(_this.index);
				_this.ratio=parseInt((_this.index/_this.arrLength)*100)+'%';
	        };
	        
	        _this.oimg.onerror=function(){
	        	_this.data.errFn(this);
	        	_this.oimg.onerror=null;
	        	_this.index=i+1;
	        	loginGo(_this.index);
				_this.ratio=parseInt((_this.index/_this.arrLength)*100)+'%';
	        };
	        
	        _this.data.goFn(_this); 
		})(0);
	};
	
	
	window.ImgLoading = ImgLoading;
}()

if (typeof(module) !== 'undefined'){
    exports = window.ImgLoading;
}else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.ImgLoading;
    });
};



/*
 * 0.1.0 之前的异步版本
function ImgLoad(o,goFn,overFn){
    this.offon=0;
    this.ratio=0;
    this.o=o;
    this.goFn=goFn;
    this.overFn=overFn;
    this.init();
};
ImgLoad.prototype.init = function(){
    var This=this;
    for (var i=0; i<this.o.length; i++) {
        this.oimg=new Image();
        this.oimg.onload=function(){var _i=this; This.fnonload(_i);};
        this.oimg.onerror=function(){var _i=this; This.fnerror(_i);};
        this.oimg.src=this.o[i];
        this.oimg.index=i;
    };
};
ImgLoad.prototype.fnonload = function(_i){
    this.fnOk();
    console.log(this.ratio+'第:'+_i.index+' 正确  '+_i.src);
};
ImgLoad.prototype.fnerror=function(_i){
    this.fnOk();
    console.log('第:'+_i.index+' 加载错误  '+_i.src);
};
ImgLoad.prototype.fnOk = function(){
    this.offon++;
    this.ratio=Math.ceil(this.offon/this.o.length*100);
    this.goFn();
    if(this.offon >= this.o.length){ this.overFn();};
};
 * */