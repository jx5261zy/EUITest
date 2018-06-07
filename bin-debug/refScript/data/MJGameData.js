var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//
//
//2017-2-28 20:13:31
//
var MJGameData = (function () {
    function MJGameData() {
    }
    MJGameData.getIdxByChairID = function (chairid) {
        var offset = UserData.chairID - chairid;
        var idx = 1;
        if (offset > 0) {
            idx += offset;
        }
        else if (offset < 0) {
            if (offset == -1) {
                idx = 4;
            }
            else if (offset == -2) {
                idx = 3;
            }
            else if (offset == -3) {
                idx = 2;
            }
        }
        return idx;
    };
    return MJGameData;
}());
// public static roomManagement : RoomManagement = null;
// public static user;	
MJGameData.turnIdx = 0; //代表当前人的椅子顺序
// public static turnDirection : number = 0; //代表当情人的方向顺序
MJGameData.cbLeftCardCount = 0;
MJGameData.queType = -1;
MJGameData.wBankerUser = -1;
MJGameData.readyTimeOut = 30; //准备倒计时
MJGameData.selectTimeOut = 5; //选择定缺倒计时
MJGameData.operateCardTimeOut = 8; //用户操作时间，比如碰、杠等操作
MJGameData.outCardTimeOut = 8; //出牌倒计时
MJGameData.giveupTimeOut = 8; //放弃的倒计时
MJGameData.TIME_OUT_TYPE_READY = 1;
MJGameData.TIME_OUT_TYPE_SELECTCARD = 2;
MJGameData.TIME_OUT_TYPE_OPERATE = 3;
MJGameData.TIME_OUT_TYPE_OUTCARD = 4;
MJGameData.TIME_OUT_TYPE_GIVEUP = 5;
MJGameData.CHAIRID = -1;
MJGameData.moTurn = 0; //该摸哪一个麻将了
MJGameData.diceValue = [];
MJGameData.UserBasicInfo = {}; //主要存储chairid对应的用户基本信息
MJGameData.inDismissState = 0;
// 根据chairid来定的 0 1 2 3
// 大概的格式为{idx: 1, scores:[1, 1, -1, -1]}
MJGameData.totalPPScores = []; // 积分场所有对局结算
MJGameData.blinkColor = new egret.ColorMatrixFilter([0.3, 0, 0, 0, 0,
    0, 0.3, 0, 0, 0,
    0, 0, 0.3, 0, 0,
    0, 0, 0, 1, 0]);
__reflect(MJGameData.prototype, "MJGameData");
//# sourceMappingURL=MJGameData.js.map