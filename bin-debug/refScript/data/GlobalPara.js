var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var GlobalPara = (function () {
    function GlobalPara() {
    }
    Object.defineProperty(GlobalPara, "localConfig", {
        /**声音配置信息 目前只有音乐配置*/
        get: function () {
            if (!this._localConfig)
                this._localConfig = new LocalConfigInfo();
            return this._localConfig;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalPara, "gameUiSTyle", {
        /**
        /**
         * 获取 游戏UI风格
        */
        get: function () {
            if (GlobalPara.CAN_CHANGE_UI_STYLE) {
                var style = egret.localStorage.getItem("ui_style");
                var str = GlobalPara.GAME_UI_STYLLE_2;
                if (style == "1") {
                    str = GlobalPara.GAME_UI_STYLLE_1;
                }
                else if (style == "2") {
                    str = GlobalPara.GAME_UI_STYLLE_2;
                }
                else if (style == "3") {
                    str = GlobalPara.GAME_UI_STYLLE_3;
                }
                else if (style == "4") {
                    str = GlobalPara.GAME_UI_STYLLE_4;
                }
                else if (style == "5") {
                    str = GlobalPara.GAME_UI_STYLLE_5;
                }
                return str;
            }
            else {
                // Utils.showLog("UISTYPE:", GlobalPara.UI_STYLE);
                return GlobalPara.UI_STYLE;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalPara, "packageState", {
        get: function () {
            if ([null, undefined, -1].indexOf(GlobalPara.packageStateTest) == -1) {
                return GlobalPara.packageStateTest;
            }
            if (GlobalPara.myip == "unknown" && GlobalPara.isNative) {
                return 2;
            }
            return GlobalPara._packageState; //包当前的状态 1表示测试 0表示发布 2表示审核等....;
        },
        set: function (value) {
            GlobalPara._packageState = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalPara, "skinPath", {
        // public static get cryptedSkinPath() : string {
        //     return Utils.cryptPath(GlobalPara.skinPath);
        // }
        get: function () {
            var str = "resource/";
            if (GlobalPara.gameUiSTyle == GlobalPara.GAME_UI_STYLLE_1) {
                str = "resource/lobby_qq_red/";
            }
            else if (GlobalPara.gameUiSTyle == GlobalPara.GAME_UI_STYLLE_2) {
                str = "resource/lobby_qq/";
            }
            else if (GlobalPara.gameUiSTyle == GlobalPara.GAME_UI_STYLLE_3) {
                str = "resource/lobby_class/";
            }
            else if (GlobalPara.gameUiSTyle == GlobalPara.GAME_UI_STYLLE_4) {
                str = "resource/lobby_joy/";
            }
            else if (GlobalPara.gameUiSTyle == GlobalPara.GAME_UI_STYLLE_5) {
                str = "resource/lobby_mj/";
            }
            else if (GlobalPara.gameUiSTyle == GlobalPara.GAME_UI_STYLLE_6) {
                str = "resource/lobby_class_mj/";
            }
            else if (GlobalPara.gameUiSTyle == GlobalPara.GAME_UI_STYLLE_7) {
                str = "resource/lobby_37_new/";
            }
            else if (GlobalPara.gameUiSTyle == GlobalPara.GAME_UI_STYLLE_8) {
                str = "resource/lobby_casino/";
            }
            return str;
        },
        enumerable: true,
        configurable: true
    });
    // 读取配置常量
    GlobalPara.initConstans = function () {
        // 读取localstorage 如果没有再读取配置文件
        GlobalPara.loginhost = GlobalPara.localconfigJson['localconfig']['loginhost'];
        GlobalPara.releaseloginhost = GlobalPara.localconfigJson['localconfig']['releaseloginhost'];
        GlobalPara.loginport = GlobalPara.localconfigJson['localconfig']['loginport'];
        GlobalPara.packageFlag = GlobalPara.localconfigJson['localconfig']['packageFlag'];
        // GlobalPara.STATIC_HEAD_URL = GlobalPara.localconfig['localconfig']['STATIC_HEAD_URL'];
        // GlobalPara.hotUpdateSwitch = GlobalPara.localconfig['localconfig']['hotUpdateSwitch'];
        GlobalPara.entryURLs = GlobalPara.localconfigJson['localconfig']['entryURLs'];
        if (!GlobalPara.isNative) {
            GlobalPara.entryURLs = [""];
        }
        GlobalPara.gateurl = GlobalPara.localconfigJson['localconfig']['gateurl'];
        GlobalPara.appID = GlobalPara.localconfigJson['localconfig']['appID'];
        GlobalPara.secret = GlobalPara.localconfigJson['localconfig']['secret'];
        GlobalPara.openurl = GlobalPara.localconfigJson["localconfig"]['openurl'];
        GlobalPara.checkShow = GlobalPara.localconfigJson["localconfig"]['checkShow'];
        GlobalPara.defaultRank = GlobalPara.localconfigJson['localconfig']['defaultrank'];
        GlobalPara.entryFileName = GlobalPara.localconfigJson['localconfig']['entryFileName'];
        // GlobalPara.releaseMode = GlobalPara.localconfig['localconfig']['releaseMode'];
        // GlobalPara.indexState=GlobalPara.localconfigJson['localconfig']['indexstate']; //——在entry中配置时,注释这一行
        // GlobalPara.gid=GlobalPara.localconfigJson['localconfig']['gid'];        //——在entry中配置时，注释这一行
        var reviewdays = GlobalPara.localconfigJson['localconfig']['reviewDate'].split(".");
        GlobalPara.reviewDateTime = new Date(parseInt(reviewdays[0]), parseInt(reviewdays[1]) - 1, parseInt(reviewdays[2])).getTime();
    };
    Object.defineProperty(GlobalPara, "isInReview", {
        get: function () {
            return new Date().getTime() < GlobalPara.reviewDateTime;
        },
        enumerable: true,
        configurable: true
    });
    // 根据本地时间和服务器时间差 以及本地当前时间来获取正确的时间
    GlobalPara.getLocalDateTime = function () {
        var now = new Date().getTime();
        var delta = now - (GlobalPara.lastLocalTime - GlobalPara.serverGameTime);
        var d = new Date(delta);
        // // Utils.showLog('-- the local t--time--', d);
        return d;
    };
    // 根据本地时间和服务器时间差 以及本地当前时间来获取正确的时间
    GlobalPara.getLocalTimeStamp = function () {
        return new Date().getTime() - (GlobalPara.lastLocalTime - GlobalPara.serverGameTime);
    };
    // 重置数据
    GlobalPara.resetGlobalData = function () {
        GlobalPara.roomsData = {};
    };
    GlobalPara.getGameInfoByKindId = function (kindID) {
        for (var key in GlobalPara.gamesconfig['games']) {
            if (GlobalPara.gamesconfig['games'][key]['kindID'] == kindID) {
                return { info: GlobalPara.gamesconfig['games'][key], name: key };
            }
        }
        return null;
    };
    GlobalPara.getGameInfoByName = function (game) {
        return GlobalPara.gamesconfig['games'][game];
    };
    return GlobalPara;
}());
// 游戏服务器时间
GlobalPara.serverGameTime = 0;
// public static serverGameTimeUpdated : any = 0;
GlobalPara.lastLocalTime = 0;
//登录服务器信息
GlobalPara.loginhost = "0.0.0.0";
GlobalPara.releaseloginhost = "";
GlobalPara.loginport = 7000;
//网关服务器信息
GlobalPara.gatehost = "";
GlobalPara.gateport = 0;
GlobalPara.packageFlag = "DW37_WEB_1";
GlobalPara.deviceUUID = "";
GlobalPara.releasegsafeUrls = [];
GlobalPara.STATIC_HEAD_URL = "http://192.168.11.107:8089";
// public static downloadURL : string = "";
GlobalPara.updateURL = "";
// public static updateURL2 : string = "";
GlobalPara.entryURLs = [""];
// public static entryURL2 : string = "";
GlobalPara.openurl = "https://itunes.apple.com/cn/app/id1252915029";
GlobalPara.token = "";
GlobalPara.reviewDateTime = null;
GlobalPara.isNative = false;
GlobalPara.webresver = "";
GlobalPara.releaseMode = 0;
GlobalPara.packageStateTest = -1;
GlobalPara._packageState = 2; //包当前的状态 1表示测试 0表示发布 2表示审核等....
GlobalPara.appID = 1; //appID
GlobalPara.secret = "123456"; //secret
GlobalPara.gateurl = "";
GlobalPara.myip = "unknown";
GlobalPara.entryFileName = "";
GlobalPara.bReleaseLobby = false; //是否释放大厅的资源
GlobalPara.currentDownloadGame = ""; //当前正在下载的更新游戏
GlobalPara.currentGameVersion = 100; //当前下载或者更新游戏的版本
GlobalPara.componentFullScreenOffset = 750; //全屏界面实际高度跟750的差
// public static screenRealHeight : number = 0;
GlobalPara.getLoginInfoCB = null;
GlobalPara.localconfigJson = {}; // 本地配置文件
GlobalPara.gamesconfig = {}; // 游戏配置
GlobalPara.configs = {}; //proto配置文件信息
GlobalPara.hotUpdateSwitch = true; //是否开启热跟新
GlobalPara.resRecycleTime = 600;
GlobalPara.loadedGames = {};
GlobalPara.loadedTheme = {};
GlobalPara.checkShow = []; //审核状态时才显示的
GlobalPara.defaultRank = [];
GlobalPara.roomsData = {};
GlobalPara.iRoomID = 0;
GlobalPara.INVALID_BYTE = 0xff; //无效数值
GlobalPara.INVALID_WORD = 0xffff; //无效数值
GlobalPara.INVALID_DWORD = 0xffffffff; //无效数值
//无效数值
GlobalPara.INVALID_TABLE = GlobalPara.INVALID_WORD; //无效桌子
GlobalPara.INVALID_CHAIR = GlobalPara.INVALID_WORD; //无效椅子
GlobalPara.gameType = "xzmj"; //游戏类型 表示用到那个protofile
// public static userInfo : UserData;
GlobalPara.gScrollerNotify = "";
GlobalPara.IS_LOADING_GAME = false;
GlobalPara.quickStartGameKindID = 0;
GlobalPara.unload_game_timeout = 0;
//游戏UI风格
GlobalPara.GAME_UI_STYLLE_1 = "lobby_qq_red"; // 红色UI 版本
GlobalPara.GAME_UI_STYLLE_2 = "lobby_qq"; // QQ UI
GlobalPara.GAME_UI_STYLLE_3 = "lobby_class"; // 古风 UI
GlobalPara.GAME_UI_STYLLE_4 = "lobby_joy"; // 欢乐棋牌 UI
GlobalPara.GAME_UI_STYLLE_5 = "lobby_mj"; // 欢乐棋牌 UI
GlobalPara.GAME_UI_STYLLE_6 = "lobby_class_mj"; // 万人街机 UI
GlobalPara.GAME_UI_STYLLE_7 = "lobby_37_new"; // 新版37 UI
GlobalPara.GAME_UI_STYLLE_8 = "lobby_casino"; // 赌场风
GlobalPara.CAN_CHANGE_UI_STYLE = false; // 测试版本使用，可以设置面板切换风格，为false时候，可以关闭设置界面切换风格功能
GlobalPara.UI_STYLE = GlobalPara.GAME_UI_STYLLE_2; //游戏UI风格 表示用到那个版本UI skin
//@author 刘念 2018/4/16  4种状态 0 测试 1 审核(商城走苹果内购&&收益无) 2 发布&&收益功能维护中 3发布&&收益正常
GlobalPara.indexState = 0;
//@author 刘念 2018/4/16  RMB与gold的汇率
GlobalPara.goldRatio = 1;
GlobalPara.gid = ""; //安防用到的一个参数
GlobalPara.vipchargestate = 0; //Vip充值是否显示 1 显示 0 不显示
// public static initConfigs() {
//     // 音效配置
//     var data = GlobalProtoClass.decode('MusicData_proto', "MusicData_ARRAY", RES.getRes("MusicData_bytes"));
//     GlobalPara.configs['musicconf'] = {};
//     for (var i = 0; data && i < data.items.length; ++i) {
//         GlobalPara.configs['musicconf'][data.items[i]['MusicID']] = [];
//         for (var n = 1; n <= 4; ++n) {
//             if (data.items[i]['filename' + n] != '0' && data.items[i]['filename' + n] != '0.0') {
//                 GlobalPara.configs['musicconf'][data.items[i]['MusicID']].push(data.items[i]['filename' + n]);
//             }
//         }
//     }
//     // 物品道具配置文件
//     GlobalPara.configs['props'] = {};
//     data = GlobalProtoClass.decode("PropEquip_proto", "PropEquip_ARRAY", RES.getRes("PropEquip_bytes"));
//     for (var i = 0; data && i < data.items.length; ++i) {
//         GlobalPara.configs['props'][data.items[i].ID] = data.items[i];
//     }
//     // 商店金币钻石
//     GlobalPara.configs['gift'] = {};
//     data = GlobalProtoClass.decode("dt_givegift_proto", "dt_givegift_ARRAY", RES.getRes("dt_givegift_bytes"));
//     for (var i = 0; data && i < data.items.length; ++i) {
//         GlobalPara.configs['gift'][data.items[i].id] = data.items[i];
//     }
//     // Utils.showLog("gameconfigs----", GlobalPara.configs);
//     //每日红包
//     GlobalPara.configs['dayred'] = {};
//     data = GlobalProtoClass.decode("dt_day_red_proto", "dt_day_red_ARRAY", RES.getRes("dt_day_red_bytes"));
//     for (var i = 0; data && i < data.items.length; ++i) {
//         GlobalPara.configs['dayred'][data.items[i].id] = data.items[i];
//     }
// }
//--------------------麻将番型相关---------------------------------------
GlobalPara.ACTION_NULL = 0x00;
GlobalPara.ACTION_LEFT = 0x01;
GlobalPara.ACTION_CENTER = 0x02;
GlobalPara.ACTION_RIGHT = 0x04;
GlobalPara.ACTION_PENG = 0x08;
GlobalPara.ACTION_GANG = 0x10;
GlobalPara.ACTION_LISTEN = 0x20;
GlobalPara.ACTION_CHI_HU = 0x40;
GlobalPara.ACTION_ZI_MO = 0x80;
GlobalPara.HU_TYPE_STRING = {
    "1": { name: "抢杠", type: 0, fan: 1 },
    "2": { name: "杠上炮", type: 0, fan: 1 },
    "4": { name: "杠上花", type: 0, fan: 1 },
    "8": { name: "天胡", type: 1, fan: 6 },
    "16": { name: "地胡", type: 1, fan: 6 },
    "32": { name: "大对子", type: 1, fan: 2 },
    "64": { name: "清一色", type: 1, fan: 3 },
    "128": { name: "暗七对", type: 1, fan: 3 },
    "256": { name: "带幺", type: 1, fan: 3 },
    "512": { name: "将对", type: 1, fan: 4 },
    "1024": { name: "素胡", type: 0, fan: 1 },
    "2048": { name: "清对", type: 1, fan: 4 },
    "4096": { name: "龙七对", type: 1, fan: 5 },
    "8192": { name: "清七对", type: 1, fan: 5 },
    "16384": { name: "清幺九", type: 1, fan: 5 },
    "32768": { name: "清龙七对", type: 1, fan: 6 },
    "65536": { name: "金勾吊", type: 1, fan: 3 },
    "131072": { name: "清勾吊", type: 1, fan: 6 }
};
GlobalPara.ACTION_HU_NULL = 0x00;
GlobalPara.ACTION_HU_CHIHU = 0x01;
GlobalPara.ACTION_HU_QIANG_GANG = 0x01;
GlobalPara.ACTION_HU_GANG_SHANG_PAO = 0x02;
GlobalPara.ACTION_HU_GANG_KAI = 0x04;
GlobalPara.ACTION_HU_TIAN_HU = 0x08;
GlobalPara.ACTION_HU_DI_HU = 0x10;
GlobalPara.ACTION_DA_DUI_ZI = 0x20;
GlobalPara.ACTION_HU_QING_YI_SE = 0x40;
GlobalPara.ACTION_HU_QI_XIAO_DUI = 0x80;
GlobalPara.ACTION_HU_DAI_YAO = 0x100;
GlobalPara.ACTION_HU_JIANG_DUI = 0x200;
GlobalPara.ACTION_HU_SHU_FAN = 0x400;
GlobalPara.ACTION_HU_QING_DUI = 0x800;
GlobalPara.ACTION_HU_LONG_QI_DUI = 0x1000;
GlobalPara.ACTION_HU_QING_QI_DUI = 0x2000;
GlobalPara.ACTION_HU_QING_YAO_QIU = 0x4000;
GlobalPara.ACTION_HU_QING_LONG_QI_DUI = 0x8000;
GlobalPara.ACTION_HU_JIN_GOU_DIAO = 0x10000;
GlobalPara.ACTION_HU_QING_JIN_GOU_DIAO = 0x20000;
//动作标志
GlobalPara.ACTION_WIK_0 = 0x00; //没有类型;
GlobalPara.YBMJ_ACTION_WIK_FEI = 0x01; //飞牌类型
GlobalPara.YBMJ_ACTION_WIK_PENG = 0x02; //碰牌类型
GlobalPara.YBMJ_ACTION_WIK_GANG = 0x04; //杠牌类型
GlobalPara.YBMJ_ACTION_WIK_TI = 0x08; //提牌类型
GlobalPara.YBMJ_ACTION_WIK_CHI_HU = 0x10; //吃胡类型
GlobalPara.YBMJ_GANG_0 = 0x00; //没有杠牌
GlobalPara.YBMJ_GANG_DG = 0x01; //点杠类型
GlobalPara.YBMJ_GANG_AG = 0x02; //暗杠类型
GlobalPara.YBMJ_GANG_BG = 0x03; //巴杠类型
//宜宾麻将胡牌定义
//基本牌型定义
GlobalPara.KD_0 = 0x00000000; //没有胡
GlobalPara.KD_PH = 0x00000001; //必缺+1
GlobalPara.KD_DZH = 0x00000002; //大对子+2
GlobalPara.KD_QYS = 0x00000004; //清一色+2
GlobalPara.KD_AQD = 0x00000008; //暗七对+2
GlobalPara.KD_DH = 0x00000010; //地胡+4
GlobalPara.KD_TH = 0x00000020; //天胡+4
GlobalPara.KD_HZ = 0x00000040; //花猪 5
GlobalPara.KD_CHZ = 0x00020000; //查花猪 6
GlobalPara.KD_ZMH = 0x00040000; //自摸胡
//附加番型定义
GlobalPara.KD_NTY = 0x00000080; //无听用+1
GlobalPara.KD_BJ = 0x00000100; //本金+1
GlobalPara.KD_JGD = 0x00000200; //金钩钓+1
GlobalPara.KD_JGP = 0x00000400; //金钩炮+1
GlobalPara.KD_GSH = 0x00000800; //杠上花、炮+1
GlobalPara.KD_GSP = 0x00001000; //杠上炮
GlobalPara.KD_DG1 = 0x00002000; //根1+1
GlobalPara.KD_DG2 = 0x00004000; //根2+2
GlobalPara.KD_DG3 = 0x00008000; //根3+3
GlobalPara.KD_DG4 = 0x00010000; //根4+4
//胡牌类型定义
GlobalPara.HU_KD_0 = 0x00; //未胡牌
GlobalPara.HU_KD_MYSELF = 0x01; //自摸
GlobalPara.HU_KD_OTHER = 0x02; //他人点炮
GlobalPara.HU_KD_YOUJIAO = 0x04; //查叫(有叫)
GlobalPara.HU_KD_WUJIAO = 0x08; //查叫(无叫)
GlobalPara.HU_KD_TAOPAO = 0x10; //查叫(逃跑)
GlobalPara.HU_KD_HUZHU = 0x11; //查叫(花猪)
GlobalPara.YB_HU_TYPE_STRING = {
    "0": { name: "没有胡", type: 0, fan: 1 },
    "1": { name: "必缺", type: 0, fan: 1 },
    "2": { name: "大对子", type: 0, fan: 2 },
    "4": { name: "清一色", type: 1, fan: 2 },
    "8": { name: "暗七对", type: 1, fan: 2 },
    "16": { name: "地胡", type: 1, fan: 4 },
    "32": { name: "天胡", type: 1, fan: 4 },
    "64": { name: "花猪", type: 1, fan: 5 },
    "128": { name: "无听用", type: 1, fan: 1 },
    "256": { name: "本金", type: 1, fan: 1 },
    "512": { name: "金钩钓", type: 1, fan: 1 },
    "1024": { name: "金钩炮", type: 1, fan: 1 },
    "2048": { name: "杠上花", type: 1, fan: 1 },
    "4096": { name: "杠上炮", type: 1, fan: 1 },
    "8192": { name: "1根", type: 1, fan: 1 },
    "16384": { name: "2根", type: 1, fan: 2 },
    "32768": { name: "3根", type: 1, fan: 3 },
    "65536": { name: "4根", type: 1, fan: 4 },
    "131072": { name: "查花猪", type: 1, fan: 6 },
    "262144": { name: "自摸胡", type: 1, fan: 1 }
};
__reflect(GlobalPara.prototype, "GlobalPara");
//# sourceMappingURL=GlobalPara.js.map