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
 * class name : DZDropDownView
 * description : 德州扑克 下拉菜单皮肤脚本
 * author : 杨浩然
 * time : 2018.5.28
 */
var DZDropDownView = (function (_super) {
    __extends(DZDropDownView, _super);
    function DZDropDownView() {
        var _this = _super.call(this) || this;
        _this._isAction = false;
        return _this;
        // this.skinName = "resource/dezhoupoker/eui_skin/view/DZDropDownSkin.exml";
    }
    Object.defineProperty(DZDropDownView.prototype, "isAction", {
        get: function () {
            return this._isAction;
        },
        enumerable: true,
        configurable: true
    });
    DZDropDownView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.AddEvent();
    };
    /**展开 */
    DZDropDownView.prototype.Show = function () {
        this.scaleY = 0;
        this.visible = true;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ scaleY: 1 }, DZDefine.dropMenuTime);
    };
    /**隐藏 */
    DZDropDownView.prototype.Hide = function () {
        var _this = this;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ scaleY: 0 }, DZDefine.dropMenuTime)
            .call(function () {
            _this.visible = false;
            _this.scaleY = 1;
        });
    };
    DZDropDownView.prototype.AddEvent = function () {
        this.btnContainer = new ButtonContainer();
        this.btnContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnBtnClick, this);
        this.btnContainer.addButton(this.btn_change_table);
        this.btnContainer.addButton(this.btn_setting);
        this.btnContainer.addButton(this.btn_type_eg);
    };
    DZDropDownView.prototype.OnBtnClick = function (evt) {
        switch (evt.data) {
            case this.btn_change_table:
                console.log("点击了换桌按钮");
                break;
            case this.btn_setting:
                console.log("点击了设置按钮");
                break;
            case this.btn_type_eg:
                console.log("点击了牌型按钮");
                break;
        }
    };
    DZDropDownView.prototype.dispose = function () {
    };
    return DZDropDownView;
}(eui.Component));
__reflect(DZDropDownView.prototype, "DZDropDownView");
//# sourceMappingURL=DZDropDownView.js.map