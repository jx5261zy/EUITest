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
 * class name : DZBetSlider
 * description : 德州扑克 下注滑动条控制脚本
 * author : 杨浩然
 * time : 2018.6.12
 */
var DZBetSlider = (function (_super) {
    __extends(DZBetSlider, _super);
    function DZBetSlider() {
        return _super.call(this) || this;
    }
    DZBetSlider.prototype.updateSkinDisplayList = function () {
        _super.prototype.updateSkinDisplayList.call(this);
        this.track_fill.height = this.value / this.maximum * this.height;
    };
    return DZBetSlider;
}(eui.VSlider));
__reflect(DZBetSlider.prototype, "DZBetSlider");
//# sourceMappingURL=DZBetSlider.js.map