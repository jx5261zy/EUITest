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
        /**动画是否播放 */
        _this.isEffectPlay = false;
        _this.skinName = "DZAddChipSkin";
        return _this;
    }
    DZAddChipView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.betSlider.addView = this;
        this.lightEffect.addEventListener("complete", this.OnGroupComplete, this);
    };
    Object.defineProperty(DZAddChipView.prototype, "value", {
        get: function () {
            return this.betSlider.value;
        },
        set: function (value) {
            this.betSlider.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DZAddChipView.prototype, "maximum", {
        set: function (value) {
            this.betSlider.maximum = value;
        },
        enumerable: true,
        configurable: true
    });
    /**当滑动条的值最大时的回调 */
    DZAddChipView.prototype.OnValueMax = function () {
        if (!this.isEffectPlay) {
            this.lightEffect.play(0);
            this.isEffectPlay = true;
        }
        if (!this.img_allin_bg.visible)
            this.img_allin_bg.visible = true;
        console.log("最大值");
    };
    /**滑动条的值正常时的回调 */
    DZAddChipView.prototype.OnValueNormal = function () {
        if (this.isEffectPlay) {
            this.lightEffect.stop();
            this.HideLights();
            this.isEffectPlay = false;
        }
        if (this.img_allin_bg.visible)
            this.img_allin_bg.visible = false;
        console.log("正常值");
    };
    /**将两个灯光的透明度改为0，隐藏透明度 */
    DZAddChipView.prototype.HideLights = function () {
        this.img_add_effect_1.alpha = 0;
        this.img_add_effect_2.alpha = 0;
    };
    /**灯光特效播放完成的回调，用于动画重播 */
    DZAddChipView.prototype.OnGroupComplete = function () {
        // console.log("=====动画播放完成，重播=====");
        this.lightEffect.play(0);
    };
    return DZAddChipView;
}(eui.Component));
__reflect(DZAddChipView.prototype, "DZAddChipView");
//# sourceMappingURL=DZAddChipView.js.map