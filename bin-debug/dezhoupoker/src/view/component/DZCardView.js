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
 * class name : DZCardView
 * description : 德州扑克 扑克牌皮肤脚本
 * author : 杨浩然
 * time : 2018.5.28
 */
var DZCardView = (function (_super) {
    __extends(DZCardView, _super);
    function DZCardView() {
        var _this = _super.call(this) || this;
        _this.isFront = false; //牌的正反属性
        _this.skinName = "DZPokerSkin";
        _this.touchEnabled = _this.touchChildren = false;
        return _this;
    }
    Object.defineProperty(DZCardView.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DZCardView.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    DZCardView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    DZCardView.prototype.Dispose = function () {
    };
    DZCardView.prototype.SetData = function (_value, _type, _isFront) {
        this._value = _value;
        this._type = _type;
        this.isFront = _isFront;
    };
    DZCardView.prototype.moveToTargetPos = function (targetX, targetY, controlPoints, duration, delay, onMoveStartCallBack, onMoveComplete, oMoveCallBackThisObj, moveCompleteIsFlip) {
        if (controlPoints === void 0) { controlPoints = null; }
        if (duration === void 0) { duration = 0; }
        if (delay === void 0) { delay = 0; }
        if (onMoveStartCallBack === void 0) { onMoveStartCallBack = null; }
        if (onMoveComplete === void 0) { onMoveComplete = null; }
        if (oMoveCallBackThisObj === void 0) { oMoveCallBackThisObj = null; }
        if (moveCompleteIsFlip === void 0) { moveCompleteIsFlip = false; }
        _super.prototype.moveToTargetPos.call(this, targetX, targetY, controlPoints, duration, delay, onMoveStartCallBack, onMoveComplete, oMoveCallBackThisObj);
    };
    return DZCardView;
}(MoveObject));
__reflect(DZCardView.prototype, "DZCardView");
//# sourceMappingURL=DZCardView.js.map