var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//
//
// 创建房间时的各种规则
// 
var GameRoomRule = (function () {
    function GameRoomRule() {
    }
    return GameRoomRule;
}());
GameRoomRule.RULE_TYPE_GAME_TYPE_XUEZHAN = 0x01;
GameRoomRule.RULE_TYPE_GAME_TYPE_XUELIU = 0x02;
// 大类
GameRoomRule.RULE_TYPE_TING = 0x00; //先自己加一下 表示几听麻将
GameRoomRule.RULE_TYPE_ZIMO_FANBEI = 0x06; //自摸加翻还是加倍
GameRoomRule.RULE_TYPE_ADDPIAO = 0x01; //是否加飘
GameRoomRule.RULE_TYPE_HUTYPE = 0x02; //胡牌类型 是自摸胡还是点炮胡
GameRoomRule.RULE_TYPE_MAXFAN = 0x03; //最大翻数
GameRoomRule.RULE_TYPE_GAMJUSHU = 0x04; //游戏最大局数
GameRoomRule.RULE_TYPE_OUTCARDTIME = 0x05; //是否出牌超时，是否托管
// public static RULE_TYPE_GAME_RULE_
// 小类
GameRoomRule.RULE_ADD_PIAO = 0x01;
GameRoomRule.RULE_NO_ADD_PIAO = 0x00;
GameRoomRule.RULE_HU_TYPE_ZIMO = 0x01;
GameRoomRule.RULE_HU_TYPE_DIANPAO = 0x00;
GameRoomRule.RULE_MAXFAN_4 = 0x04;
GameRoomRule.RULE_MAXFAN_6 = 0x06;
GameRoomRule.RULE_MAXFAN_0 = 0x00;
GameRoomRule.RULE_JUSHU_4 = 0x04;
GameRoomRule.RULE_JUSHU_8 = 0x08;
GameRoomRule.RULE_OUTCARD_TIME_0 = 0x00;
GameRoomRule.RULE_OUTCARD_TIME_1 = 0x01;
GameRoomRule.RULE_ZIMO_JIAFAN = 0x00;
GameRoomRule.RULE_ZIMO_JIADI = 0x01;
GameRoomRule.RULE_TING_4 = 0x04;
GameRoomRule.RULE_TING_8 = 0x08;
__reflect(GameRoomRule.prototype, "GameRoomRule");
//# sourceMappingURL=GameRoomRule.js.map