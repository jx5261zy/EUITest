/**
 *
 * @author fish-y9-h5
 *
 */
class UserData {

    public static userID: number;
    public static username: string;
    public static nickname: string;
    public static iGender : number = 0; // 性别 1male 2female
    public static szDescription : string = ""; //个人描述
    public static avatar: string;
    public static faceID : string = "0";
    public static gamepoint: number;
    public static gold: number;
    public static diamond : number = 0;
    public static mobile : string = "";
    public static userType : number = 0; //账号类型 0为普通用户 1为游客 2-微信用户
    public static account : string = "";
    public static safeGold:number = 0;
    public static iRoomID: number = 0;
    public static gameState : number = 0; //0表示未在游戏中 1表示在游戏中
    public static iAccID : number = 0; //用于显示的用户id
    public static newMail : boolean = false; //是否有新邮件

    public static loginIn : boolean = false;

    
    //@author 刘念 加绑定银行卡信息

    public static real_name:string="";
    public static idcard:string="";
    public static bank_account:string="";    
    public static bank_no:number=0;
    public static sub_bank:string="";
    public static province:string="";
    public static city:string="";

    //@author 刘念 加绑定支付宝信息  
    public static alipay_account:string="";  
    public static alipay_name:string="";

    /////

    public static uiSpread : number = 0; //推广id

    public static hasGameRoomView : boolean = false;
    public static roomPrivate : number = 0; //0表示大厅房 1表示自建房

    public static iModifyNickTimes : number = 0;

    public static  iGetRelifTimes : number = 0;						//今日已领取的救济金次数
	public static  iGetRelifTotalTimes : number = 0;					//总共领取的救济金次数
	public static  iMaxGetRelifTimes : number = 0;					//用户最大可领取次数


    public static SignCount  : number = 0;  //签到次数
	public static LastSignTime	 : number = 0;  //最后一次签到时间
	private static _signEnable  : number = 0;  //签到功能开关,1 开启，0 关闭。

    /**是有首充奖励*/
    public static isFistPay:boolean = false;
    /**是否开启了首充功能*/
    private static _firstPayEnabled:boolean = false;
    /**额外赠送功能*/
    private static _extraGiveEnabled:boolean = false;
    public static firstPayExtraNum:number;
    public static firstPayExtraType:number;
    public static isSignCloseOpenFirstPay:boolean;

    public static iKindID : number = 0;//520之类的值
    public static iRoomType : number = 2; //2表示普通 3表示比赛

    public static tableID : number = 0xffff;
    public static chairID: number = 0xffff;
    public static masterID : number = 0; //创建房间的用户ID
    public static PPRoomID : string = "00000"; //创建的房间
    public static roomRules : any = [];
    public static roomMembers : any = [];
    // public static roomMoneyNotEnough : boolean = false;

    //0表示未进入房间状态 1表示进入房间状态 2表示坐下 3表示游戏中
    public static userState : number = 0; 
    public static roomMoneyNotEnough : boolean = false;
    
    public static tableInfo : GameTable = null;

    public static scoreTableInfo : any = {}; //包括积分场的总积分记录
    public static scoreTableResult : any = {}; // 积分场总结算

    public static createdRoomInfo : any = {}; // 自己已经创建的房间
    public static changeTable : boolean = false;

    public static mails : any = {};

    public static isRoomLogon : boolean = false;

    public static bcbmIsPro:boolean = false;

    public static gameKindInfos = []; //所有可用的游戏列表
    public static loadedGames : any = {}; // 已经加载的游戏
    public static gameDownloaded = {}; //本地已经存在的游戏

    public static dismissRoomData = null; //断线重连返回的投票信息

    public static gameRoomRankData : any = null;

    //红包  //签到功能开关,1 开启，0 关闭。
    public static get SignEnable() : number {
        if(GlobalPara.packageState == 2){ //审核时
            return 0;
        }
        else{
            return this._signEnable;
        }
        
    }
    public static set SignEnable(v : number) {
        this._signEnable = v;
    }

     //首冲
    public static get firstPayEnabled() : boolean {
         if(GlobalPara.packageState == 2){ //审核时
            return false;
        }
        else{
            return this._firstPayEnabled;
        }
    }
    public static set firstPayEnabled(v : boolean) {
        this._firstPayEnabled = v;
    }

    //额外赠送
    public static get extraGiveEnabled() : boolean {
        if(GlobalPara.packageState == 2){ //审核时
            return false;
        }
        else{
            return this._extraGiveEnabled;
        }
    }
    public static set extraGiveEnabled(v : boolean) {
        this._extraGiveEnabled = v;
    }
    
    

    public static loadGame(game_name : string) : void {
        UserData.loadedGames[game_name] = true;
    }
    public static unloadGame(game_name : string) : void {
        delete UserData.loadedGames[game_name];
    }
    public static isGameLoaded(game_name : string) : boolean {
        return [null, undefined].indexOf(UserData.loadedGames[game_name]) == -1;
    }

    // 用户离开房间
    // 用户主动离开时，清楚这些信息
    public static userLeaveRoom() : void {
    	UserData.PPRoomID = "00000";
    	UserData.masterID = 0;
    	UserData.userState = 0;
    	UserData.roomRules = [];
    }

    public static resetUserData() : void {

        UserData.userID = 0;
        UserData.username = '';
        UserData.nickname = '';
        UserData.iAccID = 0;
        UserData.mails = {};
        UserData.createdRoomInfo = {};
        UserData.scoreTableInfo = {};
        UserData.scoreTableResult = {};
        UserData.roomMembers = [];
        UserData.roomRules = [];
        UserData.iRoomID = 0;
        UserData.gameState = 0;
        UserData.account = '';
        UserData.gameKindInfos = [];
        
        UserData.hasGameRoomView = false;
        UserData.isRoomLogon = false;
        UserData.loadedGames = {};

    }
    
    //判断用户是否已经坐下
    public static isUserSitSuccess() : boolean {
    	return UserData.userState >= 2;
    }

    // 麻将规则里面判断是否超时
    public static outCardTimeOut() : boolean {

        for (var i = 0; i < UserData.roomRules.length; ++i) {
            if (UserData.roomRules[i].iType == GameRoomRule.RULE_TYPE_OUTCARDTIME) {
                return UserData.roomRules[i].iValue == GameRoomRule.RULE_OUTCARD_TIME_1;
            }
        }
        return true;
    }

    //
    public static isInPrivateMode() : boolean {
        return UserData.roomPrivate == 1;
    }

    public static getRoomInfo() : any {

        if ([null, undefined].indexOf(GlobalPara.roomsData.mRoomList) != -1) {
            return null;
        }
        for (var i = 0; i < GlobalPara.roomsData.mRoomList.length; ++i) {
            if (GlobalPara.roomsData.mRoomList[i].iRoomID == UserData.iRoomID) {
                return GlobalPara.roomsData.mRoomList[i];
            }
        }

        return null;
    }

    // 根据score tableinfo 里面的数据 计算出来每局玩家的数据信息
    public static getPPRoomScoreInfo(data : any) : void {
        UserData.scoreTableInfo = data;

        // 计算出积分场每一局的积分情况
        MJGameData.totalPPScores = [];
        for (var i = 0; i < data.item.length; ++i) {
            for (var n = 0; n < data.item[i].ChangeScores.length; ++n) {
                if (MJGameData.totalPPScores.length <= n) {
                    MJGameData.totalPPScores.push({idx: n + 1, scores:[data.item[i].ChangeScores[n]]});
                } else {
                    MJGameData.totalPPScores[n].scores.push(data.item[i].ChangeScores[n]);
                }
            }
        }

        Utils.showLog('---MJGameData.totalPPScores---', MJGameData.totalPPScores);
    }
}