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
 * class name : DZCardController
 * description : 德州扑克 扑克牌控制模块 初步决定这个类不放大量的成员变量，主要负责卡牌的控制，单例模式调用
 * author : 杨浩然
 * time : 2018.5.28
 */
var DZCardController = (function (_super) {
    __extends(DZCardController, _super);
    function DZCardController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // private static _instance:DZCardController;
    // private static _isInstantation:boolean = false;
    // public static get instance():DZCardController
    // {
    //     if(!this._instance && !this._isInstantation)
    //     {
    //         this._isInstantation = true;
    //         this._instance = new DZCardController();
    //     }
    //     return this._instance
    // }
    /**播放发所有玩家手牌的动画 */
    DZCardController.prototype.SendUsersCardsAnim = function () {
    };
    /**翻单个用户的手牌动画
     * @param _user : 需要翻牌的用户
     */
    DZCardController.prototype.TurnCardAnim = function (_user) {
    };
    /**往公共牌区域发一张牌的动画 */
    DZCardController.SendPubCard = function () {
    };
    /**单张翻公共牌动画
     * @param index : 在Group中的下标
     * @param
     */
    DZCardController.prototype.TurnPubCardAnim = function (index) {
    };
    /**弃牌动画
     * @param _user : 需要弃牌的用户
     */
    DZCardController.prototype.AbandonCardAnim = function (_user) {
    };
    /**获得卡牌值资源 */
    DZCardController.GetValueRes = function (value, type) {
        var outStr = "dz_r_";
        if (type == CardType.SPADE || type == CardType.CLUB)
            outStr = "dz_b_";
        return outStr + value + "_png";
    };
    /**获得卡牌花色资源 */
    DZCardController.GetTypeRes = function (value, type) {
        var outStr = "dz_type";
        if (value > 10) {
            return outStr + type + "_" + value + "_png";
        }
        return outStr + "_" + type + "_png";
    };
    DZCardController.CreatePokerFormPool = function () {
        return pool.ObjectPool.instance.getObj(DZCardController.DZ_CARD_POOLNAME);
    };
    DZCardController.RecyclePokerToPool = function (obj) {
        pool.ObjectPool.instance.pushObj(DZCardController.DZ_CARD_POOLNAME, obj);
    };
    return DZCardController;
}(egret.EventDispatcher));
//对象池相关
DZCardController.DZ_CARD_POOLNAME = "DZ_CARD_POOLNAME";
__reflect(DZCardController.prototype, "DZCardController");
//# sourceMappingURL=DZCardController.js.map