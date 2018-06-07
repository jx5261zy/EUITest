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
var WindowBase = (function (_super) {
    __extends(WindowBase, _super);
    function WindowBase(width, height) {
        var _this = _super.call(this) || this;
        _this._width = 0;
        _this._height = 0;
        _this._maskAlpha = 0;
        _this.isEnabledMaskTouch = true;
        _this._width = width;
        _this._height = height;
        _this.anchorOffsetX = _this._width * .5;
        _this.anchorOffsetY = _this._height * .5;
        return _this;
    }
    Object.defineProperty(WindowBase.prototype, "w", {
        /**
         * 窗口宽度(设置值)
         */
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowBase.prototype, "h", {
        /**
         * 窗口高度(设置值)
         */
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowBase.prototype, "wdWidth", {
        /**
        * 窗口宽度
        */
        get: function () {
            return this._width * this.scaleX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowBase.prototype, "wdHeight", {
        /**
        * 窗口高度
        */
        get: function () {
            return this._height * this.scaleY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowBase.prototype, "isAnimation", {
        /**
         * 是否显示窗口动画
         */
        set: function (val) {
            this._isAnimation = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowBase.prototype, "isClose", {
        /**
         * 是否关闭中
         */
        get: function () {
            return this._isClose;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowBase.prototype, "isEnabledClickClose", {
        set: function (val) {
            this._isEnabledClickClose = val;
        },
        enumerable: true,
        configurable: true
    });
    WindowBase.prototype.showFullBg = function () {
        if (!this._fullBg) {
            this._fullBg = new eui.Rect();
            this._fullBg.fillColor = 0;
            this._fullBg.fillAlpha = .7;
            if (this._isEnabledClickClose)
                this._fullBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFullBgClick, this);
        }
        this.parent.addChildAt(this._fullBg, this.parent.numChildren - 1);
        this._fullBg.alpha = this._maskAlpha;
        this._fullBg.visible = true;
        this._fullBg.width = Main.getInstance().stage.stageWidth;
        this._fullBg.height = Main.getInstance().stage.stageHeight;
        this._fullBg.touchEnabled = this._isEnabledClickClose || this.isEnabledMaskTouch;
    };
    WindowBase.prototype.setFullBgPos = function () {
        if (this._fullBg) {
            this.scaleX = this.scaleY = 1;
            var p = this._fullBg.parent.globalToLocal(0, 0);
            this._fullBg.x = p.x;
            this._fullBg.y = p.y;
        }
    };
    WindowBase.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var b;
        if (isNaN(this._width) || this._width == undefined || this._width == null || this._width <= 0) {
            this._width = this.width;
            b = true;
        }
        if (isNaN(this._height) || this._height == undefined || this._height == null || this._height <= 0) {
            this._height = this.height;
            b = true;
        }
        if (b) {
            this.anchorOffsetX = this._width * .5;
            this.anchorOffsetY = this._height * .5;
        }
    };
    WindowBase.prototype.setSize = function (width, height) {
        this._width = width;
        this._height = height;
    };
    /**
     * @param layerType 0 ui 1 top
    */
    WindowBase.prototype.show = function (layerType, isShowMask, isCenter, maskAlpha, isClickClose, parentObj) {
        if (layerType === void 0) { layerType = 0; }
        if (isShowMask === void 0) { isShowMask = false; }
        if (isCenter === void 0) { isCenter = true; }
        if (maskAlpha === void 0) { maskAlpha = 0.7; }
        if (isClickClose === void 0) { isClickClose = false; }
        if (parentObj === void 0) { parentObj = null; }
        this.visible = true;
        if (parentObj) {
            parentObj.addChild(this);
        }
        else {
            if (layerType == 0) {
            }
            else {
            }
        }
        if (isCenter) {
            if (parentObj) {
                this.x = (parentObj.width - this.w) * .5 + this.anchorOffsetX;
                this.y = (parentObj.height - this.h) * .5 + this.anchorOffsetY;
            }
            else {
                this.x = (Main.getInstance().stage.stageWidth - this.w) * .5 + this.anchorOffsetX;
                this.y = (Main.getInstance().stage.stageHeight - this.h) * .5 + this.anchorOffsetY;
            }
        }
        this._maskAlpha = maskAlpha;
        this._isEnabledClickClose = isClickClose;
        if (isShowMask) {
            this.showFullBg();
            this.setFullBgPos();
        }
        this._isClose = false;
        this.aniShow();
    };
    WindowBase.prototype.aniShow = function () {
        if (this._isAnimation) {
            this.scaleX = this.scaleY = 0;
            this.alpha = 0;
            egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 400, egret.Ease.backOut).call(this.onAnimationShowComplete, this);
        }
    };
    WindowBase.prototype.onAnimationShowComplete = function () {
        //Utils.showLog("窗口动画完成");
    };
    WindowBase.prototype.hide = function () {
        egret.Tween.removeTweens(this);
        if (this.parent)
            this.parent.removeChild(this);
        if (this._fullBg && this._fullBg.parent)
            this._fullBg.parent.removeChild(this._fullBg);
    };
    WindowBase.prototype.setWindowVisible = function (isVisible) {
        this.visible = isVisible;
        if (this._fullBg)
            this._fullBg.visible = isVisible;
    };
    WindowBase.prototype.onFullBgClick = function () {
        this._fullBg.touchEnabled = false;
        this.close();
    };
    WindowBase.prototype.close = function () {
        this._isClose = true;
        // if(this._fullBg) this._fullBg.visible = false;
        if (this._isAnimation) {
            egret.Tween.get(this).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 400, egret.Ease.backIn).call(this.onAnimationHideComplete, this);
        }
        else {
            this.dispatchEventWith(egret.Event.CLOSE);
        }
    };
    WindowBase.prototype.onAnimationHideComplete = function () {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    Object.defineProperty(WindowBase.prototype, "isDispose", {
        get: function () {
            return this._isDispose;
        },
        enumerable: true,
        configurable: true
    });
    WindowBase.prototype.dispose = function () {
        this._isDispose = true;
        egret.Tween.removeTweens(this);
        if (this._fullBg) {
            if (this._fullBg.parent)
                this._fullBg.parent.removeChild(this._fullBg);
            this._fullBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFullBgClick, this);
            this._fullBg = null;
        }
        this._isAnimation = false;
        this.removeChildren();
        if (this.parent != null)
            this.parent.removeChild(this);
    };
    return WindowBase;
}(eui.Component));
WindowBase.BASE_WIDTH = 1334;
WindowBase.BASE_HEIGHT = 750;
__reflect(WindowBase.prototype, "WindowBase");
//# sourceMappingURL=WindowBase.js.map