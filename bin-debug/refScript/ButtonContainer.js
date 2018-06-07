var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *''"
 * @author
 *
 */
var ButtonContainer = (function (_super) {
    __extends(ButtonContainer, _super);
    function ButtonContainer() {
        var _this = _super.call(this) || this;
        _this._btns = [];
        _this._isTabBtn = false;
        _this._soundNameDic = {};
        _this._clickStageX = 0;
        _this._clickStageY = 0;
        return _this;
    }
    Object.defineProperty(ButtonContainer.prototype, "isTabBtn", {
        set: function (val) {
            this._isTabBtn = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonContainer.prototype, "clickStageX", {
        get: function () {
            return this._clickStageX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonContainer.prototype, "clickStageY", {
        get: function () {
            return this._clickStageY;
        },
        enumerable: true,
        configurable: true
    });
    ButtonContainer.prototype.addButton = function (btn, soundName, isBigAni, isStopPropagation) {
        if (isStopPropagation === void 0) { isStopPropagation = true; }
        if (!btn)
            return;
        btn.touchEnabled = true;
        if (btn["touchChildren"] != undefined)
            btn["touchChildren"] = false;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        btn["isBigAni"] = isBigAni;
        btn["isStopPropagation"] = isStopPropagation;
        this._btns.push(btn);
        if (soundName) {
            this._soundNameDic[btn.hashCode] = soundName;
        }
        if (isBigAni) {
            var d = 0;
            if (btn.anchorOffsetX != btn.width * .5) {
                d = btn.width * .5 - btn.anchorOffsetX;
                btn.anchorOffsetX = btn.width * .5;
                btn.x += d;
            }
            if (btn.anchorOffsetY != btn.height * .5) {
                d = btn.height * .5 - btn.anchorOffsetY;
                btn.anchorOffsetY = btn.height * .5;
                btn.y += d;
            }
        }
    };
    ButtonContainer.prototype.addButtons = function (bts, soundNameArr) {
        var l = bts.length;
        for (var i = 0; i < l; i++) {
            if (soundNameArr) {
                this.addButton(bts[i], soundNameArr[i]);
            }
            else {
                this.addButton(bts[i]);
            }
        }
        if (l > 0 && this._isTabBtn) {
            this.setSelectBtn(bts[0]);
        }
    };
    ButtonContainer.prototype.removeButtons = function () {
        var l = this._btns.length;
        var btn;
        for (var i = 0; i < l; i++) {
            btn = this._btns[i];
            egret.Tween.removeTweens(btn);
            btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        }
        this._btns.length = 0;
    };
    ButtonContainer.prototype.setSelectBtn = function (btn, isDispatch) {
        if (this._isTabBtn) {
            this.enabledBtns();
            this.setBtnEnabled(btn, false);
        }
        if (isDispatch)
            this.dispatchEventWith(egret.TouchEvent.TOUCH_TAP, false, btn);
    };
    ButtonContainer.prototype.onBtnClick = function (e) {
        var btn = e.currentTarget;
        if (btn["isStopPropagation"])
            e.stopPropagation();
        var curTime = egret.getTimer();
        if (btn["prevClickTime"] > 0) {
            var dt = curTime - btn["prevClickTime"];
            if (dt < 200)
                return;
        }
        btn["prevClickTime"] = curTime;
        var soundName = this._soundNameDic[btn.hashCode];
        if (soundName) {
        }
        if (btn["isBigAni"]) {
            egret.Tween.removeTweens(btn);
            egret.Tween.get(btn).to({ scaleX: 1.2, scaleY: 1.2 }, 100).wait(50).to({ scaleX: 1, scaleY: 1 }, 100);
        }
        this._clickStageX = e.stageX;
        this._clickStageY = e.stageY;
        this.setSelectBtn(btn, true);
    };
    ButtonContainer.prototype.enabledBtns = function (isEnabled) {
        if (isEnabled === void 0) { isEnabled = true; }
        var l = this._btns.length;
        var btn;
        for (var i = 0; i < l; i++) {
            btn = this._btns[i];
            this.setBtnEnabled(btn, isEnabled);
        }
    };
    ButtonContainer.prototype.setBtnEnabled = function (btn, isEnabled, isGrey) {
        if (isGrey === void 0) { isGrey = false; }
        if (btn["enabled"] != undefined) {
            btn["enabled"] = isEnabled;
        }
        if (btn["selected"] != undefined) {
            btn["selected"] = !isEnabled;
        }
        btn.touchEnabled = isEnabled;
        if (!isEnabled) {
            if (isGrey)
                Utils.ColorGrey(btn);
        }
        else {
            btn.filters = null;
        }
    };
    ButtonContainer.prototype.dispose = function () {
        this.removeButtons();
        this._btns = null;
        this._soundNameDic = null;
    };
    return ButtonContainer;
}(egret.EventDispatcher));
__reflect(ButtonContainer.prototype, "ButtonContainer");
//# sourceMappingURL=ButtonContainer.js.map