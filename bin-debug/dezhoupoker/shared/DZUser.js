// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * class name : DZUser
 * description : 德州扑克玩家头像框皮肤控制脚本,以及相应的一些玩家信息保存
 * author : 杨浩然
 * time : 2018.5.22
 */
var DZUser = (function (_super) {
    __extends(DZUser, _super);
    function DZUser(_userID, _tableID, _chairID, _role) {
        var _this = _super.call(this, _userID, _tableID, _chairID, _role) || this;
        _this.isAbandon = false;
        _this.isBanker = false;
        /**一轮下注的金额  (一轮下注结束时记得要清零) */
        _this.betValue = 0;
        _this._isFaceGropuInited = false;
        return _this;
    }
    /** 初始化控件
     *  包括给所有成员变量赋值，以及头像框各控件的赋值
     */
    DZUser.prototype.Init = function (_component) {
        this.headComponent = _component;
        this.headComponent.visible = true;
        //初始化组件变量(多此一举)
        this.img_bg = this.headComponent["img_bg"];
        this.lb_name = this.headComponent["lb_name"];
        this.lb_gold = this.headComponent["lb_gold"];
        this.img_faceID = this.headComponent["img_faceID"];
        this.img_time_bar = this.headComponent["img_time_bar"];
        var barW = this.img_time_bar.width;
        var barH = this.img_time_bar.height;
        this._borderProgressBarDraw = new BorderProgressBarDraw(this.img_time_bar, barW, barH);
        Utils.loadHeadImg(this.role.iFaceUrl, this.img_bg); //加载用户头像，这个方法不清楚怎么实现的
        this.headComponent.touchChildren = false;
        this.headComponent.touchEnabled = true;
        this.headComponent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnHeadClick, this);
        this.lb_name.text = Utils.cutStrWithDot(this.nickname, 8);
        this.ShowHeadGold();
    };
    /**初始化组件中的各个控件的数据 */
    DZUser.prototype.InitFaceGroup = function (_component) {
        if (this._isFaceGropuInited)
            return;
        this._isFaceGropuInited = true;
        this.Init(_component);
    };
    /**显示头像框中的金币数量 */
    DZUser.prototype.ShowHeadGold = function () {
        if (this.headComponent)
            this.lb_gold.text = Utils.numberFormat(this.gold, 2); //gold数据在第一次服务器发送时就已经存在了
    };
    /**点击头像回调函数 */
    DZUser.prototype.OnHeadClick = function () {
        console.log("你点击了" + this.nickname + "的头像");
    };
    /**显示头像遮罩 */
    DZUser.prototype.ShowHeadMask = function () {
        this.headComponent["img_head_mask"].visible = true;
    };
    /**隐藏头像遮罩 */
    DZUser.prototype.HideHeadMask = function () {
        this.headComponent["img_head_mask"].visible = false;
    };
    /**下注 */
    DZUser.prototype.Bet = function (value) {
        if (this.gold < value) {
            console.log("金币不足");
            return;
        }
        if (this.chip != null) {
            this.lastChip = this.chip;
        }
        this.chip = DZChipController.UserBet(this);
        this.betValue += value;
        //更新最后一次的下注量
        DZPokerOnGameView.instance.lastBetValue = this.betValue;
        this.betPool["lb_chip_value"].text = this.betValue;
        this.chip.value = this.betValue;
        this.gold -= value;
        this.ShowHeadGold();
        this.chip.SetDisplay();
        this.HideOperationBar();
    };
    /**弃牌 */
    DZUser.prototype.Abandon = function () {
        this.ShowHeadMask();
        this.isAbandon = true;
        DZCardController.AbandonCardAnim(this);
        this.HideOperationBar();
    };
    /**开始头像框操作进度条倒计时动画 */
    DZUser.prototype.StartOperationBarAnim = function (_time) {
        this._borderProgressBarDraw.startDraw(_time);
        this.img_time_bar.visible = true;
    };
    /**结束头像框操作进度条倒计时动画 */
    DZUser.prototype.EndOperationBarAnim = function () {
        this._borderProgressBarDraw.clearDraw();
        this.img_time_bar.visible = false;
    };
    /**隐藏头像框操作进度条倒计时条 */
    DZUser.prototype.HideOperationBar = function () {
        this._borderProgressBarDraw.stopDraw();
        this.img_time_bar.visible = false;
    };
    /**改变玩家的操作状态  弃牌，加注，跟注，让牌，全下 */
    DZUser.prototype.ChangeState = function () {
    };
    return DZUser;
}(GameUser));
__reflect(DZUser.prototype, "DZUser");
var UserOp;
(function (UserOp) {
    UserOp[UserOp["ABANDON"] = 0] = "ABANDON";
    UserOp[UserOp["CINGL"] = 1] = "CINGL";
    UserOp[UserOp["ADD"] = 2] = "ADD";
})(UserOp || (UserOp = {}));
//# sourceMappingURL=DZUser.js.map