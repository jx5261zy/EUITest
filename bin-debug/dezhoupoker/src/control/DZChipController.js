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
    // public static chipContainer:Array<eui.Image>;
    /**移动筹码 */
    DZChipController.prototype.MoveUserChip = function (_userID) {
    };
    /**移动所有玩家的筹码入底池 */
    DZChipController.prototype.MoveAllChipsToPot = function () {
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