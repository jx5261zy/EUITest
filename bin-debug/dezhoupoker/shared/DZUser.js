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
        _this._isFaceGropuInited = false;
        return _this;
    }
    /** 初始化控件
     *  包括给所有成员变量赋值，以及头像框各控件的赋值
     */
    DZUser.prototype.Init = function (_component) {
        this.headComponent = _component;
        this.headComponent.visible = true;
        //初始化组件变量
        // this.img_bg = this.headComponent.getChildByName("img_bg") as eui.Image;
        this.img_bg = this.headComponent["img_bg"];
        this.lb_name = this.headComponent["lb_name"];
        this.lb_gold = this.headComponent["lb_gold"];
        this.img_faceID = this.headComponent["img_faceID"];
        this.img_operation_bar = this.headComponent["img_operation_bar"];
        //TODO ：倒计时条
        Utils.loadHeadImg(this.role.iFaceUrl, this.img_bg); //加载用户头像，这个方法不清楚怎么实现的
        this.headComponent.touchChildren = false;
        this.headComponent.touchEnabled = true;
        //TODO：给头像组件增加点击监听
        this.lb_name.text = Utils.cutStrWithDot(this.nickname, 8);
        this.ShowHeadGold();
        if (this.userID == UserData.userID) {
        }
    };
    /**初始化组件中的各个控件的数据 */
    DZUser.prototype.InitFaceGroup = function (_component) {
        this.Init(_component);
        if (this._isFaceGropuInited)
            return;
        this._isFaceGropuInited = true;
    };
    /**显示头像框中的金币数量 */
    DZUser.prototype.ShowHeadGold = function () {
        if (this.headComponent)
            this.lb_gold.text = Utils.numberFormat(this.gold, 2); //gold数据在第一次服务器发送时就已经存在了
    };
    /**头像框高亮动画 提醒玩家在桌子的哪个位置 */
    DZUser.prototype.ShowUserTablePosAnim = function () {
    };
    /**点击头像回调函数 */
    DZUser.prototype.OnHeadClick = function () {
    };
    /**显示头像遮罩 */
    DZUser.prototype.ShowHeadMask = function () {
    };
    /**隐藏头像遮罩 */
    DZUser.prototype.HideHeadMask = function () {
    };
    /**开始头像框操作进度条倒计时动画 */
    DZUser.prototype.StartOperationBarAnim = function () {
    };
    /**结束头像框操作进度条倒计时动画 */
    DZUser.prototype.EndOperationBarAnim = function () {
    };
    /**隐藏头像框操作进度条倒计时条 */
    DZUser.prototype.HideOperationBar = function () {
    };
    /**改变玩家的操作状态  弃牌，加注，跟注，让牌，全下 */
    DZUser.prototype.ChangeState = function () {
    };
    return DZUser;
}(GameUser));
__reflect(DZUser.prototype, "DZUser");
//# sourceMappingURL=DZUser.js.map