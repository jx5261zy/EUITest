var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//
// 游戏用户
// created at 2017-2-28 16:52:53
// 
var GameUser = (function () {
    function GameUser(userid, tableid, chairid, role) {
        /**昵称*/
        this.nickname = "";
        /**用户性别*/
        this.sex = 0;
        /**用户 ID*/
        this.userID = 0;
        /**用户 别名ID*/
        this.accID = 0; //用于显示的id
        /**用户彩票*/
        this.iTicket = 0;
        /**金币数量*/
        this.gold = 0;
        /**用户钻石*/
        this.iDiamond = 0;
        /**注册日期*/
        this.i64RegistDate = 0;
        /**个人说明*/
        this.desc = "";
        this.szImage = "";
        /**手机号*/
        this.szMobile = "";
        /**桌子号码*/
        this.tableID = 0;
        /**椅子位置*/
        this.chairID = 0;
        /**用户状态*/
        this.status = 0;
        this.logonip = "";
        /**今日下注*/
        this.lTodayChip = 0;
        /**房间id*/
        this.roomID = 0;
        /**桌位的那个方向*/
        this.direction = 1; //桌位的那个方向
        this.score = 0; //一局里面获得的分数
        this.userID = userid;
        this.tableID = tableid;
        this.chairID = chairid;
        this.role = role;
        this.roomID = UserData.iRoomID;
    }
    GameUser.prototype.readData = function (data) {
        var self = this;
        self.nickname = data.szNickName;
        self.faceid = data.iFaceUrl;
        self.sex = data.iGender;
        self.userID = data.iUserID;
        self.accID = data.iAccid;
        self.iTicket = data.iTicket;
        //@author 刘念 2018/5/4 进入游戏，玩家金币由分转换为元
        // self.gold = data.iGold.toNumber();
        self.gold = Utils.numberFormat3(data.iGold.toNumber() / 100.00, 2);
        self.iDiamond = data.iDiamond;
        self.i64RegistDate = data.i64RegistDate.toNumber();
        self.desc = data.szDescription;
        self.szImage = data.szImage;
        self.szMobile = data.szMobile;
        self.tableID = data.iTableID;
        self.chairID = data.iChairID;
        self.status = data.iUserStatus;
        self.logonip = data.logonip;
        if (data.lTodayChip != null)
            self.lTodayChip = data.lTodayChip.toNumber();
        self.role = data;
        self.role.iGold = self.gold;
        self.role.lTodayChip = self.lTodayChip;
    };
    GameUser.prototype.copyFrom = function (user) {
        if (!user)
            return;
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
    };
    GameUser.prototype.dispose = function () {
    };
    GameUser.prototype.userLeave = function () { };
    return GameUser;
}());
__reflect(GameUser.prototype, "GameUser");
//# sourceMappingURL=GameUser.js.map