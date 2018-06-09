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
        var _this = _super.call(this) || this;
        _this.skinName = "DZChipSkin";
        _this.touchEnabled = _this.touchChildren = false;
        return _this;
    }
    Object.defineProperty(DZChipView.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (_value) {
            this._value = _value;
        },
        enumerable: true,
        configurable: true
    });
    DZChipView.prototype.SetDisplay = function () {
        if (this._value == 0)
            return;
        this.img_chip_bg.source = DZChipController.GetDisplayRes(this._value);
    };
    return DZChipView;
}(MoveObject));
__reflect(DZChipView.prototype, "DZChipView");
//# sourceMappingURL=DZChipView.js.map