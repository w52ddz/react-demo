// 变量
var BANNER_NUM=3;//banner图片数
var ITEM_NUM=33;//列表图片数
var DATABASE=null;//储存数据

var Router = ReactRouter.Router;
var Route=ReactRouter.Route;
var IndexRoute=ReactRouter.IndexRoute; 

//header部分
var Header=React.createClass({
	goToSearch:function(e){
		if(e.keyCode==13){
			ReactRouter.hashHistory.replace("/search/"+e.target.value);
			console.log(e.target.value)
			e.target.value="";
		}
	},
	render:function(){
		return (
			<header>
				<div className="container">
					<h1><a href="/">魔客吧</a></h1>
					<ul className="clearfix nav">
						<li>
							<a href="/">首页</a>
						</li>
						<li>
							<a href="#/type/xueyuan">学院</a>{/*路径必须要以#开头,否则不是哈希*/}
						</li>
						<li>
							<a href="#/type/muban">模板</a>
						</li>
						<li>
							<a href="#/type/sucai">素材</a>
						</li>
						<li>
							<a href="#/type/jiaocheng">教程</a>
						</li>
						<li>
							<a href="#/type/xinshou">新手</a>
						</li>
						<li>
							<a href="javascript:;">论坛</a>
						</li>
						<li>
							<a target="_blank" href="javascript:;">更多</a>
						</li>
					</ul>
					<a href="javascript:;"><img className="peixun" src="img/peixun.png" alt=""/></a>
					<div className="login">
						<a href="">登录</a>
						<a href="">注册</a>
						<a className="searchA">
							<span>搜索</span>
							<div className="searchDiv">
								<input onKeyUp={this.goToSearch} type="text"placeholder="搜索模板素材"/ >
							</div>
						</a>
						<a href="">客服</a>
						
					</div>
				</div>
			</header>
		)
	}
})
/** 定义混合**/
var RenderList={
	// 组件中引入混合，就可以通过this.使用下面定义的方法
	createList:function(){
		return this.state.list.map(function(obj,index){
			return (
				<li key={index}>
					<a href={obj.site}>
						<div className="hoverM">
							<img src={"img/item/item"+index+".jpg"} alt=""/>
						</div>
						<span className="color" style={{background:obj.color}}>{obj.title}</span>
						<span className="name">{obj.name}</span>
						<p className="share">{obj.share}</p>
					</a>
				</li>
			)
		})
	}
}
//首页
var Home=React.createClass({
	mixins:[RenderList],
	getInitialState:function(){
		return {
			list:DATABASE
		}
	},
	render:function(){
		return (
			<div>
				<div className="banner">
					<div className="carousel">
						<ul>
							<li className="li1"><a href="#"><img src="img/banner/banner0.jpg" alt=""/></a></li>
							<li className="li2"><a href="#"><img src="img/banner/banner1.jpg" alt=""/></a></li>
							<li className="li3"><a href="#"><img src="img/banner/banner2.jpg" alt=""/></a></li>
							<a onClick={this.clickPrev} href="#" className="previous"></a>
							<a onClick={this.clickNext} href="#" className="next"></a>
						</ul>
					</div>
				</div>				
				<div className="home-item container">
					<div className="model-title">
						<h3>模板素材</h3>
					</div>
					{/*使用混合*/}
					<ul className="content clearfix">{this.createList()}</ul>
				</div>
			</div>

		)
	},
	clickPrev:function (e){
		// console.log($(e.target).parent().find("li"))
		// var ul = $(e.target).parent();
		// var lis = $(e.target).parent().find("li");
		// console.log(lis.eq(0))
		// lis.each (function (i){
		// 	$(this).animate
		// })
		

	}
})
// Reflux 1 创建消息
var TypeAction=Reflux.createActions(["changeType"]);
//Reflux 2 创建数据
var TypeStore=Reflux.createStore({
	listenables:[TypeAction],
	onChangeType:function(id){
		var result=[];
		DATABASE.forEach(function(obj,index){
			if(id==obj.type){
				result.push(obj)
			}
		})
		// 触发组件状态更新
		this.trigger(result);
	}
});
var Type=React.createClass({
	mixins:[RenderList,Reflux.connect(TypeStore,'list')],
	getInitialState:function(){
		// 返回的是对象，DATABASE后面不能加分号
		return {
			list:DATABASE
		}
	},
	/*getSubTitle:function(){
		this.state.list.map(function(obj,index){
			return obj.
		})
	},*/
	render:function(){
		return (
			<div className="type-item container2">
				<div className="adv">
					<a href="javascript:;">
						<img className="img1" src="../img/renwu.gif"  alt=""/>
					</a>
					<a href="javascript:;">
						<img className="img2" src="../img/zanzhu.gif"  alt=""/>
					</a>
				</div>
				{/*<div className="nav-msg">
					<a href=""></a>
					<b></b>
					<span>位置</span>
				</div>*/}
				{/*使用混合*/}
				<div className="home-item container">
					<div className="model-title">
						<h3>模板素材</h3>
					</div>
					{/*使用混合*/}
					<ul className="content clearfix">{this.createList()}</ul>
				</div>
				
			</div>
		)
	}
})
//Reflux for Search component
var SearchAction=Reflux.createActions(['changeSearch']);
var SearchStore=Reflux.createStore({
	listenables:[SearchAction],
	// 把query回传，用来过滤状态数据
	onChangeSearch:function(query){
		var newList=[]
		/*
		this.state.list.forEach(function(obj,index){
		Reflux在外部不能通过this.state.list直接访问状态数据	
		*/
		DATABASE.forEach(function(obj,index){
			for(var i in obj){
				if(obj[i]&&query&&obj[i].toLowerCase().indexOf(query.toLowerCase())>=0){
					newList.push(obj);
					return;
				}
			}
		})
		console.log(newList)
		this.trigger(newList)
	}
})
var Search=React.createClass({
	mixins:[RenderList,Reflux.connect(SearchStore,"list")],
	getInitialState:function(){
		return {
			list:DATABASE
		}
	},
	render:function(){
		return (
			<div className="type-item container2">
				<div className="adv">
					<a href="javascript:;">
						<img className="img1" src="../img/renwu.gif"  alt=""/>
					</a>
					<a href="javascript:;">
						<img className="img2" src="../img/zanzhu.gif"  alt=""/>
					</a>
				</div>
				{/*<div className="nav-msg">
					<a href=""></a>
					<b></b>
					<span>位置</span>
				</div>*/}
				{/*使用混合*/}
				<div className="home-item container">
					<div className="model-title">
						<h3>模板素材</h3>
					</div>
					{/*使用混合*/}
					<ul className="content clearfix">{this.createList()}</ul>
				</div>
				
			</div>
		)
	}
})
var Footer=React.createClass({
	render:function(){
		return (
			<footer></footer>
		)
	}
})
//定义应用程序
var App=React.createClass({
	render:function(){
		return (
			<div>
				{/*首页固定*/}
				<Header></Header>
				{/*其他页面用路由控制:1.首先要定义路由渲染容器*/}
				<div className="maincontent">
					{this.props.children}
				</div>
				<Footer></Footer>
			</div>
		)
	},
	checkRoute:function(){
		//type类
		if(this.props.location.pathname.indexOf("/type/")==0){
			// Reflux 4发送消息
			TypeAction.changeType(this.props.params.id)
		}else if(this.props.location.pathname.indexOf("/search/"==0)){
			SearchAction.changeSearch(this.props.params.query)
		}
	},
	componentDidMount:function(){
		/*console.log(this.props);
		parsms: => id:"muban"  因为路由设置为type/:id
		location: => pathname:"/type/muban"
		*/
		this.checkRoute();
	},
	componentDidUpdate:function(){
		this.checkRoute();
	}

})
// 定义路由规则
var routes=(
	<Router>
		<Route path="/" component={App}>
			<IndexRoute component={Home}></IndexRoute>
			<Route path="type/:id" component={Type}></Route>
			<Route path="search/:query" component={Search}></Route>
		</Route>
	</Router>
)


/*图片加载器部分*/
/*
加载器有三个函数参数，分别在图片加载完成，加载成功，加载失败时执行，
初始化方法将banner和list的图片数保存
loader方法根据图片减少的数量来获取图片地址并加载图片
*/
var ImageLoader=function(done,success,fail){
	this.done=done;
	this.success=success;
	this.fail=fail;
	//缓存数据
	this.init();
}
ImageLoader.prototype={
	init:function(){
		this.bannerNum=BANNER_NUM;
		this.itemNum=ITEM_NUM;
		this.total=this.bannerNum+this.itemNum;
		this.loader();
	},
	loader:function(){
		var bannerNum=this.bannerNum;
		var itemNum=this.itemNum;
		while(--bannerNum>=0){
			this.loadImage(this.getBannerUrl(bannerNum),true);
		}
		while(--itemNum>=0){
			this.loadImage(this.getItemUrl(itemNum),false)
		}
	},
	getBannerUrl:function(num){
		return 'img/banner/banner'+num+'.jpg'
	},
	getItemUrl:function(num){
		return 'img/item/item'+num+'.jpg'
	},
	loadImage:function(url,isBanner){
		//创建
		var img=new Image();
		img.onload=function(){
			//图片加载完成，原数量减少，封装方法
			this.dealNum(isBanner);//传入减少的是哪个数量
			this.success(this.total,this.total-this.bannerNum-this.itemNum);
			this.checkDone();
		}.bind(this);
		img.onerror=function(){
			this.dealNum(isBanner);
			this.fail(this.total,this.total-this.bannerNum-this.itemNum);
			this.checkDone();
		}.bind(this);
		//开始加载图片
		img.src=url;
	},
	dealNum:function(isBanner){
		if(isBanner){
			--this.bannerNum;
		}else{
			--this.itemNum;
		}
	},
	checkDone:function(){
		if(this.bannerNum==0&&this.itemNum==0){
			this.done();
		}
	}
}
new ImageLoader(function(){
	//加载完成
	//请求数据用来渲染页面
	$.get("data/sites.json",function(res){
		if(res&&res.errno==0){
			DATABASE=res.data;
			ReactDOM.render(routes,$("#app")[0]);
			// ReactDOM.render(<App></App>,app)
		}
	})
},function(total,num){
	//加载成功执行，参数是形参
	$(".loader-text span").html((num/total*100).toFixed(2))
},function(total,num){
	//加载失败执行，参数是形参
	$(".loader-text span").html((num/total*100).toFixed(2))
})


//没有在点击Header之后，将点击对应的版块标题传递给type组件来渲染