//
// 游戏资源Group管理
// pujunji
// created at 2017-7-31 15:51:49
// 
class ResGroupManage {
	
	public static games = {};

	/**音乐加载配置*/
	public static loadGameResInBackground : any = {
		"xzmj": ["mjbackground"],
		"ybmj": ["mjbackground"],
		"xlmj": ["mjbackground"],
		"laba": ["lababackground"],
		"shuihuzhuan":["shzwintexture","shuihuzhuanbackground","shzwinend","shzline"],
		"LoginView": ["loginbackground"],
		"IndexView": ["indexbackground"],
		"bcbm": ["bcbmbackground"],
		"newlaba":["newlababackstage","newlababackground"],
		"yuelongmen":["ylmbackground"],
		"duofuduocai":["dfdcsound"],
		"lianhuanduobao":["sound"]
	}

	/**资源加载配置*/
	public static ClassMapGroup = {
		"index": {
			"IndexView": "index",
			"IndexViewReview": "index",
			"CreateRoomView": "createroom",
			"EnterRoomView": "enterroom",
			"MailView": "mail",
			"RankView": "rank",
			"SafeBoxView": "safebox",
			"SettingView": "setting",
			"ShopView": "shop",
			"UserCenterView": "usercenter",
			"GameRoomView": "room",
			"GameRoomYBView": "room"
		},		
		///////////////mj的资源映射//////////
		"mj": {
			"CurrentCashInfoView": "mjui",
			"GameEndGoldView": "mjui",
			"GameEndHistoryView": "mjui",
			"GameHupaiSelfView": "mjui",
			"MJDismissView": "mjui",
			"MJHelpView": "mjui",
			"MJSettingView": "mjui",
			"PPGameEndView": "mjui",
			"RechargeView": "mjui"
		},
		/////////////////////////////////////
		//////////////laba的资源映射/////////
		"laba": {
			"BigWinView": "lababigwin",
			"FruitSmallGameView": "labamingame",
			"LabaHelpView": "labahelp",
			"LabaWinView": "labahugewin",
			"MageWinView": "labahugewin",
			"JackPotView": "labahugewin",
			"WinIngView": "labarank",
			"LabaSetIngView": "labaset"
		},
		/////////////////////////////////////
		//////////////水浒传的资源映射/////////
		"shuihuzhuan":{
			"SHZMaryGameOnView":"shzmarry",
			"SHZThanGameOnView":"shzmingame",
			"SHZHelpOnView":"shehelp",
			"SHZSetingOnView":"shzset"
		},
		/////////////////////////////////////
		//////////////奔驰宝马的资源映射/////////
		"bcbm":{
			"BCBMStartView":"bcbmgd",
			"BCBMHelpView":"bcbmhelp",
			"BCBMBelanceView":"bcbmbelance",
			"BCBMSetView":"bcbmset"
		},
		/////////////////////////////////////
		//////////////新水果机的资源映射/////////
		"newlaba":{
			"NewLabaHelpView":"newlabahelp",
			"NewLabaFruitSmallGameView":"newlabamingame",
			"NewLabaSetIngView":"newlabaset",
		},
		/////////////////////////////////////
		//////////////跃龙门的资源映射/////////
		"yuelongmen":{
			"YLMHelpOnView":"ylmhelp",
			"YLMRankOnView":"ylmrank",
			"YLMSetOnView":"ylmset",
			"YLMMinGameOnView":"ylmmingame"
		},
		/////////////////////////////////////
		//////////////多福多财的资源映射/////////
		"duofuduocai":{
			"DFDCMinGameOnView":"dfdcmin",
			"DfdcHelpOnView":"dfdchelp",
			"DFDCRankOnView":"dfdcrank",
			"DFDCWinOnView":"dfdcwin",
		},
		/////////////////////////////////////
		//////////////连环夺宝的资源映射/////////
		"lianhuanduobao":{
			"LHDBMinGameOnView":"lhdbmin",
		}
	}

	/**删除所有资源*/
	public static deleteResGroups(gameType:string):void
	{
		var arr:Array<string> = this.loadGameResInBackground[gameType];
		this.destroyResGroups(arr);
		arr = this.getClassIncludeGroupNames(gameType);
		this.destroyResGroups(arr);
	}
	private static destroyResGroups(arr:Array<string>):void
	{
		if(!arr) return;
		var l:number = arr.length;
		var groupName:string;
		for(var i:number  = 0;i<l;i++)
		{
			groupName = arr[i];
			this.destroyResGroup(groupName);
		}
	}
	private static destroyResGroup(groupname:string):void
	{
		if(RES["configInstance"].getRawGroupByName(groupname))
		{
			RES.destroyRes(groupname);
		}
	}
	public static getClassIncludeGroupNames(gameType:string):Array<string>
	{
		var obj:any = this.ClassMapGroup[gameType];
		if(obj)
		{
			var groupName:string  ="";
			var arr:Array<string> = [];
			for(var k in obj)
			{
				groupName = obj[k];
				if(arr.indexOf(groupName) == -1 && RES["configInstance"].getRawGroupByName(groupName))
				{
					arr.push(groupName);
				}
			}
			return arr;
		}
		return null;
	}
	//
	// 在低配机器上面释放大厅
	//
	public static releaseLobby() : void {

	}

	//
	// 从游戏返回后重新加载大厅
	//
	public static loadLobby() : void {

	}

	//
	// 加载某个view对应的资源group
	//
	public static loadViewGroup(classname : string, cb : Function, thisobj : any, kindID : any = null) : void {

		var returned = false;
		var groupname = null;

		for (var key in ResGroupManage.ClassMapGroup) {
			var gamemap = ResGroupManage.ClassMapGroup[key];
			for (var key2 in gamemap) {
				if (key2 == classname) {
					groupname = gamemap[key2];
				}
			}
		}
		
		if ([null, undefined].indexOf(groupname) == -1) {

			if (groupname == "room") {
				groupname = "room" + kindID;
			}

			var items = RES.getGroupByName(groupname);
			if (items.length > 0 && !RES.isGroupLoaded(groupname)) {

				// var loading = new LoadingGameView(groupname, cb, true, "资源加载中", thisobj);

				// returned = true;
				// if (loading.needAdd) {
				// 	Main.getInstance().addTopTopUi(loading);
				// }
			}
		}

		if (!returned) {
			cb.call(thisobj, null, null);
		}
	}

	public static loadGameResBackground(gamename : string) : void {
		var groupname = ResGroupManage.loadGameResInBackground[gamename];
		if(!groupname)return;
		for(var i=0; groupname && i <groupname.length;i++){

			if ([null, undefined].indexOf(groupname[i]) == -1) {
				ResGroupManage.loadResBackground(groupname[i]);
			}
		}
	}

	//
	// 后台偷偷加载一下资源
	// 不用管进度啥的 直接加载就ok
	public static loadResBackground(groupname : string, cb : Function = null, thisobj : any = null) : void {

		var items = RES.getGroupByName(groupname);
		if (RES.isGroupLoaded(groupname) || items.length == 0) {
            if (cb != null) {
                if (thisobj) {
                    cb.call(thisobj, null, groupname);
                } else {
                    cb(null, groupname);
                }                
            }
        } else {
        	RES.loadGroup(groupname);
        }
	}
}