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
 * class name : DZChipController
 * description : 德州扑克 筹码控制模块 主要负责筹码的控制
 * author : 杨浩然
 * time : 2018.5.30
 */
var DZChipController = (function (_super) {
    __extends(DZChipController, _super);
    function DZChipController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // /**移动筹码 */
    // public static MoveChip(chip:DZChipView,start:egret.Point,target:egret.Point)
    // {
    //     egret.Tween.get(chip).to({})
    // }
    /**用户下注
     * 并不会给筹码赋值，赋显，会将筹码的内存返回出去
     * @param user : 需要下注的用户
     */
    DZChipController.UserBet = function (user) {
        if (user == null)
            return;
        var chip = DZChipController.CreateChipFormPool();
        DZPokerOnGameView.instance.chipAndCardContanier.addChild(chip);
        var start = new egret.Point(user.headComponent.x, user.headComponent.y);
        start.x += user.headComponent.width / 2;
        start.y += user.headComponent.height / 2;
        chip.x = start.x;
        chip.y = start.y;
        chip.isAction = false;
        var target = new egret.Point(user.betPool.x, user.betPool.y);
        target.y += 3; //筹码如果直接按照背景的位置有点偏，所以往下来一点正好
        egret.Tween.get(chip).to({ x: target.x, y: target.y }, DZDefine.sendChipTime)
            .call(function () {
            user.betPool.visible = true;
            chip.isAction = false;
            if (user.lastChip != null) {
                DZPokerOnGameView.instance.chipAndCardContanier.removeChild(user.lastChip);
                DZChipController.RecycleChipToPool(user.lastChip);
            }
        });
        return chip;
    };
    /**移动玩家筹码入底池 */
    DZChipController.MoveUserChipToPot = function (user) {
        if (user.chip == null)
            return;
        //底池
        var pot = DZChipController.tableComponent["betPool_pub"];
        var target = new egret.Point(pot.x, pot.y);
        target.y += 3; //筹码如果直接按照背景的位置有点偏，所以往下来一点正好
        user.chip.isAction = true;
        user.betPool.visible = false;
        egret.Tween.get(user.chip).to({ x: target.x, y: target.y }, DZDefine.sendChipTime)
            .call(function () {
            DZPokerOnGameView.instance.chipAndCardContanier.removeChild(user.chip);
            DZChipController.RecycleChipToPool(user.chip);
        });
        DZPokerOnGameView.instance.potValue += user.betValue; //底池总值
        user.betValue = 0; //清零玩家一轮下注
        var chip = pot["chip"];
        if (!chip.visible)
            chip.visible = true;
        chip.value = DZPokerOnGameView.instance.potValue;
        chip.SetDisplay();
        if (!pot.visible)
            pot.visible = true;
        pot["lb_chip_value"].text = DZPokerOnGameView.instance.potValue;
    };
    //TODO：记得要撰写边池，需要跟服务器商讨逻辑谁来处理
    /**移动所有玩家的筹码入底池
     * PS : 不要问我为什么不循环调用MoveUserChipToPot方法_(´ཀ`」∠)_
     */
    DZChipController.MoveAllChipsToPot = function () {
        if (DZPokerOnGameView.instance.table.users.length <= 0)
            return;
        //底池
        var pot = DZChipController.tableComponent["betPool_pub"];
        var target = new egret.Point(pot.x, pot.y);
        target.y += 3; //筹码如果直接按照背景的位置有点偏，所以往下来一点正好
        var hasChip = false;
        for (var key in DZPokerOnGameView.instance.table.users) {
            var user = DZPokerOnGameView.instance.table.users[key];
            if (user.chip != null && user.chip != undefined) {
                user.chip.isAction = true;
                hasChip = true;
                user.betPool.visible = false; //玩家的下注背景隐藏
                egret.Tween.get(user.chip).to({ x: target.x, y: target.y }, DZDefine.sendChipTime);
                DZPokerOnGameView.instance.potValue += user.betValue; //底池总值
                user.betValue = 0; //清零玩家一轮下注
            }
        }
        if (hasChip) {
            var chip = pot["chip"];
            if (!chip.visible)
                chip.visible = true;
            chip.value = DZPokerOnGameView.instance.potValue;
            chip.SetDisplay();
            if (!pot.visible)
                pot.visible = true;
            pot["lb_chip_value"].text = DZPokerOnGameView.instance.potValue;
            //清零最后一次下注
            DZPokerOnGameView.instance.lastBetValue = 0;
        }
    };
    /**从底池向玩家分发筹码 */
    DZChipController.prototype.MovePotChipsToUser = function () {
    };
    /**根据值获得显示资源 */
    DZChipController.GetDisplayRes = function (_value) {
        var outStr = "dz_userchip_";
        var _str = "";
        if (_value > 0 && _value <= 50)
            _str = "0_png";
        else if (_value > 50 && _value <= 100)
            _str = "1_png";
        else if (_value > 100 && _value <= 200)
            _str = "2_png";
        else if (_value > 200 && _value <= 500)
            _str = "3_png";
        else if (_value > 500)
            _str = "4_png";
        return outStr + _str;
    };
    DZChipController.CreateChipFormPool = function () {
        return pool.ObjectPool.instance.getObj(DZChipController.DZ_CHIP_POOLNAME);
    };
    DZChipController.RecycleChipToPool = function (obj) {
        pool.ObjectPool.instance.pushObj(DZChipController.DZ_CHIP_POOLNAME, obj);
    };
    return DZChipController;
}(egret.EventDispatcher));
//对象池相关
DZChipController.DZ_CHIP_POOLNAME = "DZ_CHIP_POOL";
__reflect(DZChipController.prototype, "DZChipController");
//# sourceMappingURL=DZChipController.js.map