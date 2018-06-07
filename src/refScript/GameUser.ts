//
// 游戏用户
// created at 2017-2-28 16:52:53
// 
class GameUser {
	/**昵称*/
	public nickname : string = "";
	/**头像索引*/
	public faceid:any;
	/**用户性别*/
	public sex : number = 0;
	/**用户 ID*/
	public userID : number = 0;
	/**用户 别名ID*/
	public accID : number = 0; //用于显示的id
	/**用户彩票*/
	public iTicket:number = 0;
	/**金币数量*/
	public gold : number = 0;
	/**用户钻石*/
	public iDiamond:number = 0;
	/**注册日期*/
	public i64RegistDate:number = 0;
	/**个人说明*/
	public desc : string = "";
	public szImage:string = "";
	/**手机号*/
	public szMobile:string = "";
	/**桌子号码*/
	public tableID : number = 0;
	/**椅子位置*/
	public chairID : number = 0;
	/**用户状态*/
	public status : number = 0;
	public logonip:string = "";
	/**今日下注*/
	public lTodayChip:number = 0;

	/**房间id*/
	public roomID : number = 0;

	/**桌位的那个方向*/
	public direction : number = 1;//桌位的那个方向
	public score : number = 0; //一局里面获得的分数
	public role:any;
	constructor(userid : number, tableid : number, chairid : number,role?:any) {
        
        this.userID = userid;
        this.tableID = tableid;
        this.chairID = chairid;
		this.role = role;
        this.roomID = UserData.iRoomID;
    }
	public readData(data:any):void
	{
		var self = this;
		self.nickname = data.szNickName;
		self.faceid = data.iFaceUrl;
		self.sex = data.iGender;
		self.userID = data.iUserID;
		self.accID = data.iAccid;
		self.iTicket = data.iTicket;

		//@author 刘念 2018/5/4 进入游戏，玩家金币由分转换为元
		// self.gold = data.iGold.toNumber();
		self.gold =Utils.numberFormat3(data.iGold.toNumber()/100.00,2);
		
		self.iDiamond = data.iDiamond;
		self.i64RegistDate = data.i64RegistDate.toNumber();
		self.desc = data.szDescription;
		self.szImage = data.szImage;
		self.szMobile = data.szMobile;
		self.tableID = data.iTableID;
		self.chairID = data.iChairID;
		self.status = data.iUserStatus;
		self.logonip = data.logonip;
		if(data.lTodayChip != null) self.lTodayChip = data.lTodayChip.toNumber();

		self.role = data;
		self.role.iGold = self.gold;
		self.role.lTodayChip = self.lTodayChip;
	}

	public copyFrom(user:GameUser):void
	{
		if(!user) return;
		var self = this;
		self.nickname = user.nickname;
		self.faceid = user.faceid;
		self.sex = user.sex;
		self.userID = user.userID;
		self.accID = user.accID;
		self.iTicket = user.iTicket;
		self.gold = user.gold;
		self.iDiamond = user.iDiamond;
		self.i64RegistDate = user.i64RegistDate;
		self.desc = user.desc;
		self.szImage = user.szImage;
		self.szMobile = user.szMobile;
		self.tableID = user.tableID;
		self.chairID = user.chairID;
		self.status = user.status;
		self.logonip = user.logonip;
		self.lTodayChip = user.lTodayChip;
		self.role = user.role;
	}
	public dispose() : void {
		
	}

	public userLeave() : void {}
}