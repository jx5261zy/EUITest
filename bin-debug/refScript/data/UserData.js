var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author fish-y9-h5
 *
 */
var UserData = (function () {
    function UserData() {
    }
    Object.defineProperty(UserData, "SignEnable", {
        //红包  //签到功能开关,1 开启，0 关闭。
        get: function () {
            if (GlobalPara.packageState == 2) {
                return 0;
            }
            else {
                return this._signEnable;
            }
        },
        set: function (v) {
            this._signEnable = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData, "firstPayEnabled", {
        //首冲
        get: function () {
            if (GlobalPara.packageState == 2) {
                return false;
            }
            else {
                return this._firstPayEnabled;
            }
        },
        set: function (v) {
            this._firstPayEnabled = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData, "extraGiveEnabled", {
        //额外赠送
        get: function () {
            if (GlobalPara.packageState == 2) {
                return false;
            }
            else {
                return this._extraGiveEnabled;
            }
        },
        set: function (v) {
            this._extraGiveEnabled = v;
        },
        enumerable: true,
        configurable: true
    });
    UserData.loadGame = function (game_name) {
        UserData.loadedGames[game_name] = true;
    };
    UserData.unloadGame = function (game_name) {
        delete UserData.loadedGames[game_name];
    };
    UserData.isGameLoaded = function (game_name) {
        return [null, undefined].indexOf(UserData.loadedGames[game_name]) == -1;
    };
    // 用户离开房间
    // 用户主动离开时，清楚这些信息
    UserData.userLeaveRoom = function () {
        UserData.PPRoomID = "00000";
        UserData.masterID = 0;
        UserData.userState = 0;
        UserData.roomRules = [];
    };
    UserData.resetUserData = function () {
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
    };
    //判断用户是否已经坐下
    UserData.isUserSitSuccess = function () {
        return UserData.userState >= 2;
    };
    // 麻将规则里面判断是否超时
    UserData.outCardTimeOut = function () {
        for (var i = 0; i < UserData.roomRules.length; ++i) {
            if (UserData.roomRules[i].iType == GameRoomRule.RULE_TYPE_OUTCARDTIME) {
                return UserData.roomRules[i].iValue == GameRoomRule.RULE_OUTCARD_TIME_1;
            }
        }
        return true;
    };
    //
    UserData.isInPrivateMode = function () {
        return UserData.roomPrivate == 1;
    };
    UserData.getRoomInfo = function () {
        if ([null, undefined].indexOf(GlobalPara.roomsData.mRoomList) != -1) {
            return null;
        }
        for (var i = 0; i < GlobalPara.roomsData.mRoomList.length; ++i) {
            if (GlobalPara.roomsData.mRoomList[i].iRoomID == UserData.iRoomID) {
                return GlobalPara.roomsData.mRoomList[i];
            }
        }
        return null;
    };
    // 根据score tableinfo 里面的数据 计算出来每局玩家的数据信息
    UserData.getPPRoomScoreInfo = function (data) {
        UserData.scoreTableInfo = data;
        // 计算出积分场每一局的积分情况
        MJGameData.totalPPScores = [];
        for (var i = 0; i < data.item.length; ++i) {
            for (var n = 0; n < data.item[i].ChangeScores.length; ++n) {
                if (MJGameData.totalPPScores.length <= n) {
                    MJGameData.totalPPScores.push({ idx: n + 1, scores: [data.item[i].ChangeScores[n]] });
                }
                else {
                    MJGameData.totalPPScores[n].scores.push(data.item[i].ChangeScores[n]);
                }
            }
        }
        Utils.showLog('---MJGameData.totalPPScores---', MJGameData.totalPPScores);
    };
    return UserData;
}());
UserData.iGender = 0; // 性别 1male 2female
UserData.szDescription = ""; //个人描述
UserData.faceID = "0";
UserData.diamond = 0;
UserData.mobile = "";
UserData.userType = 0; //账号类型 0为普通用户 1为游客 2-微信用户
UserData.account = "";
UserData.safeGold = 0;
UserData.iRoomID = 0;
UserData.gameState = 0; //0表示未在游戏中 1表示在游戏中
UserData.iAccID = 0; //用于显示的用户id
UserData.newMail = false; //是否有新邮件
UserData.loginIn = false;
//@author 刘念 加绑定银行卡信息
UserData.real_name = "";
UserData.idcard = "";
UserData.bank_account = "";
UserData.bank_no = 0;
UserData.sub_bank = "";
UserData.province = "";
UserData.city = "";
//@author 刘念 加绑定支付宝信息  
UserData.alipay_account = "";
UserData.alipay_name = "";
/////
UserData.uiSpread = 0; //推广id
UserData.hasGameRoomView = false;
UserData.roomPrivate = 0; //0表示大厅房 1表示自建房
UserData.iModifyNickTimes = 0;
UserData.iGetRelifTimes = 0; //今日已领取的救济金次数
UserData.iGetRelifTotalTimes = 0; //总共领取的救济金次数
UserData.iMaxGetRelifTimes = 0; //用户最大可领取次数
UserData.SignCount = 0; //签到次数
UserData.LastSignTime = 0; //最后一次签到时间
UserData._signEnable = 0; //签到功能开关,1 开启，0 关闭。
/**是有首充奖励*/
UserData.isFistPay = false;
/**是否开启了首充功能*/
UserData._firstPayEnabled = false;
/**额外赠送功能*/
UserData._extraGiveEnabled = false;
UserData.iKindID = 0; //520之类的值
UserData.iRoomType = 2; //2表示普通 3表示比赛
UserData.tableID = 0xffff;
UserData.chairID = 0xffff;
UserData.masterID = 0; //创建房间的用户ID
UserData.PPRoomID = "00000"; //创建的房间
UserData.roomRules = [];
UserData.roomMembers = [];
// public static roomMoneyNotEnough : boolean = false;
//0表示未进入房间状态 1表示进入房间状态 2表示坐下 3表示游戏中
UserData.userState = 0;
UserData.roomMoneyNotEnough = false;
UserData.tableInfo = null;
UserData.scoreTableInfo = {}; //包括积分场的总积分记录
UserData.scoreTableResult = {}; // 积分场总结算
UserData.createdRoomInfo = {}; // 自己已经创建的房间
UserData.changeTable = false;
UserData.mails = {};
UserData.isRoomLogon = false;
UserData.bcbmIsPro = false;
UserData.gameKindInfos = []; //所有可用的游戏列表
UserData.loadedGames = {}; // 已经加载的游戏
UserData.gameDownloaded = {}; //本地已经存在的游戏
UserData.dismissRoomData = null; //断线重连返回的投票信息
UserData.gameRoomRankData = null;
__reflect(UserData.prototype, "UserData");
//# sourceMappingURL=UserData.js.map