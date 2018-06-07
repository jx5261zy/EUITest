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
 * class name : DZChipView
 * description : 德州扑克 筹码脚本
 * author : 杨浩然
 * time : 2018.5.28
 */
var DZChipView = (function (_super) {
    __extends(DZChipView, _super);
    function DZChipView() {
        return _super.call(this) || this;
    }
    DZChipView.createDZChipView = function () {
        return pool.ObjectPool.instance.getObj(DZChipView.DZ_CHIP_POOL);
    };
    return DZChipView;
}(MoveObject));
DZChipView.DZ_CHIP_POOL = "DZ_CHIP_POOL";
__reflect(DZChipView.prototype, "DZChipView");
//# sourceMappingURL=DZChipView.js.map