var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//
//游戏桌子 主要用来表现房间中桌子的信息
//created at 2017-2-28 16:57:35
//
var GameTable = (function () {
    function GameTable(tableid) {
        this.tableID = 0;
        this.users = {};
        this.tableID = tableid;
    }
    GameTable.prototype.existUser = function (userid) {
        return [null, undefined].indexOf(this.users['' + userid]) == -1;
    };
    GameTable.prototype.getUser = function (userid) {
        return this.users['' + userid];
    };
    GameTable.prototype.addUser = function (user) {
        if ([null, undefined].indexOf(this.users['' + user.userID]) != -1) {
            this.users['' + user.userID] = user;
            return true;
        }
        return false;
    };
    GameTable.prototype.deleteUser = function (userid) {
        if ([null, undefined].indexOf(this.users['' + userid]) == -1) {
            this.users['' + userid] = null;
            delete this.users['' + userid];
        }
    };
    GameTable.prototype.getUserCount = function () {
        var count = 0;
        for (var k in this.users) {
            count++;
        }
        return count;
    };
    GameTable.prototype.dispose = function () {
        for (var key in this.users) {
            delete this.users[key];
        }
        this.users = {};
    };
    return GameTable;
}());
__reflect(GameTable.prototype, "GameTable");
//# sourceMappingURL=GameTable.js.map