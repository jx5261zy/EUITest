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
 * class name : DZAddChipView
 * description : 德州扑克 加注面板控制脚本
 * author : 杨浩然
 * time : 2018.6.27
 */
var DZAddChipView = (function (_super) {
    __extends(DZAddChipView, _super);
    function DZAddChipView() {
        var _this = _super.call(this) || this;
        _this.skinName = "DZAddChipSkin";
        return _this;
    }
    DZAddChipView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.betSlider.addView = this;
    };
    /**当滑动条的值最大时的回调 */
    DZAddChipView.prototype.OnValueMax = function () {
        console.log("最大值");
    };
    /**滑动条的值正常时的回调 */
    DZAddChipView.prototype.OnValueNormal = function () {
        console.log("正常值");
    };
    return DZAddChipView;
}(eui.Component));
__reflect(DZAddChipView.prototype, "DZAddChipView");
//# sourceMappingURL=DZAddChipView.js.map