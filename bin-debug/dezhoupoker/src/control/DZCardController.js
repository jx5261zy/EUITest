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
    /**播放发玩家手牌的动画 */
    DZCardController.SendUserCardsAnim = function (start, target) {
        var firstCard = DZCardController.CreatePokerFormPool();
        firstCard.x = start.x;
        firstCard.y = start.y;
        firstCard.alpha = 0;
        firstCard.scaleX = firstCard.scaleY = 0.01;
        var secondCard = DZCardController.CreatePokerFormPool();
        secondCard.x = start.x;
        secondCard.y = start.y;
        secondCard.alpha = 0;
        secondCard.scaleX = secondCard.scaleY = 0.01;
        firstCard.isFront = secondCard.isFront = false;
        firstCard.isAction = secondCard.isAction = false;
        DZCardController.tableComponent.addChild(firstCard);
        DZCardController.tableComponent.addChild(secondCard);
        var userCard = [firstCard, secondCard];
        firstCard.isAction = secondCard.isAction = true;
        egret.Tween.get(firstCard).to({ x: target.x, y: target.y, rotation: DZDefine.firstCardAngle, scaleX: DZDefine.b_scale, scaleY: DZDefine.b_scale, alpha: 1 }, DZDefine.sendCardTime)
            .call(function () { firstCard.isAction = false; });
        egret.Tween.get(secondCard).to({ x: (target.x + DZDefine.cardDis), y: target.y, rotation: DZDefine.secondCardAngle, scaleX: DZDefine.b_scale, scaleY: DZDefine.b_scale, alpha: 1 }, DZDefine.sendCardTime)
            .call(function () { secondCard.isAction = false; });
        return userCard;
    };
    /**为玩家的手牌赋值 */
    DZCardController.SetUserCardData = function (user, cardValue, cardType) {
        if (user == null)
            return;
        var userCardArr = user.cardArr;
        if (userCardArr == null)
            return;
        var firstCard = userCardArr[0];
        var secondCard = userCardArr[1];
        if (firstCard == null || secondCard == null)
            return;
        firstCard.SetData(cardValue[0], cardType[0], false);
        firstCard.SetDisplay();
        secondCard.SetData(cardValue[1], cardType[1], false);
        secondCard.SetDisplay();
    };
    /**翻单个用户的手牌动画
     * @param user : 需要翻牌的用户
     * @param turnPoint : 翻牌的坐标点
     */
    DZCardController.TurnCardAnim = function (user, turnPoint) {
        if (user == null)
            return;
        var userCardArr = user.cardArr;
        if (userCardArr == null)
            return;
        //拿到两张牌
        var firstCard = userCardArr[0];
        var secondCard = userCardArr[1];
        if (firstCard == null || secondCard == null)
            return;
        if (firstCard.isFront || secondCard.isFront)
            return;
        firstCard.isFront = true;
        secondCard.isFront = true;
        firstCard["gp_poker"].skewY = 180;
        secondCard["gp_poker"].skewY = 180;
        firstCard.x = turnPoint.x;
        firstCard.y = turnPoint.y;
        secondCard.x = turnPoint.x + DZDefine.cardDis;
        secondCard.y = turnPoint.y;
        //由于背面显示时是斜着的并且scale尺寸不合适，故调整
        firstCard.rotation = secondCard.rotation = 0;
        firstCard.scaleX = firstCard.scaleY = DZDefine.f_scale;
        secondCard.scaleX = secondCard.scaleY = DZDefine.f_scale;
        if (firstCard.isAction || secondCard.isAction)
            return;
        firstCard.isAction = secondCard.isAction = true;
        console.log("1:" + firstCard.isFront + "  2:" + secondCard.isFront);
        egret.Tween.get(firstCard["gp_poker"]).to({ skewY: 270 }, DZDefine.turnCardTime, egret.Ease.quadOut)
            .call(function () { firstCard["gp_poker_forward"].visible = true; firstCard["img_poker_back"].visible = false; })
            .to({ skewY: 360 }, DZDefine.turnCardTime, egret.Ease.quadOut)
            .call(function () { firstCard.isAction = false; firstCard.isFront = true; console.log("1:" + firstCard.isFront + "  2:" + secondCard.isFront); });
        egret.Tween.get(secondCard["gp_poker"]).to({ skewY: 270 }, DZDefine.turnCardTime, egret.Ease.quadOut)
            .call(function () { secondCard["gp_poker_forward"].visible = true; secondCard["img_poker_back"].visible = false; })
            .to({ skewY: 360 }, DZDefine.turnCardTime, egret.Ease.quadOut)
            .call(function () { secondCard.isAction = false; secondCard.isFront = true; console.log("1:" + firstCard.isFront + "  2:" + secondCard.isFront); });
    };
    /**往公共牌区域发一张牌的动画 */
    DZCardController.SendPubCard = function (start, target) {
        var poker = DZCardController.CreatePokerFormPool();
        poker.isFront = false; //先设置为反面
        poker.alpha = 0;
        poker.scaleX = poker.scaleY = 0.1;
        poker.x = start.x;
        poker.y = start.y;
        poker.isAction = false;
        this.tableComponent.addChild(poker);
        poker.isAction = true;
        egret.Tween.get(poker).to({ x: target.x, y: target.y, scaleX: 1, scaleY: 1, alpha: 1 }, DZDefine.sendCardTime)
            .call(function () { /**this._bg["gp_public_cards"].addChild(poker); */ poker.isAction = false; });
        return poker;
    };
    /**单张翻公共牌动画
     * @param poker : 哪张牌
     * @param direction : 方向
     */
    DZCardController.TurnPubCardAnim = function (poker, direction) {
        if (direction === void 0) { direction = PokerDir.B2F; }
        switch (direction) {
            case PokerDir.F2B:
                {
                    poker.isFront = false;
                    poker.isAction = true;
                    egret.Tween.get(poker["gp_poker"]).to({ skewY: 90 }, DZDefine.turnCardTime, egret.Ease.quadOut)
                        .call(function () { poker["gp_poker_forward"].visible = false; poker["img_poker_back"].visible = true; })
                        .to({ skewY: 180 }, DZDefine.turnCardTime, egret.Ease.quadOut)
                        .call(function () { poker.isAction = false; });
                }
                break;
            case PokerDir.B2F:
                {
                    poker.isFront = true;
                    poker.isAction = true;
                    poker["gp_poker"].skewY = 180;
                    egret.Tween.get(poker["gp_poker"]).to({ skewY: 270 }, DZDefine.turnCardTime, egret.Ease.quadOut)
                        .call(function () { poker["gp_poker_forward"].visible = true; poker["img_poker_back"].visible = false; })
                        .to({ skewY: 360 }, DZDefine.turnCardTime, egret.Ease.quadOut)
                        .call(function () { poker.isAction = false; });
                }
                break;
        }
    };
    /**弃牌动画
     * @param _user : 需要弃牌的用户
     */
    DZCardController.AbandonCardAnim = function (_user) {
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