var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModuleBase = (function (_super) {
    __extends(ModuleBase, _super);
    function ModuleBase() {
        var _this = _super.call(this) || this;
        _this._openWdTypeArr = [];
        _this._openWdDataArr = [];
        return _this;
    }
    Object.defineProperty(ModuleBase.prototype, "moduleType", {
        get: function () {
            return this._moduleType;
        },
        enumerable: true,
        configurable: true
    });
    ModuleBase.prototype.init = function (resGroups, wdTypeList, isShowLoadingView) {
        if (isShowLoadingView === void 0) { isShowLoadingView = true; }
        this._moduleType = this.hashCode + "";
        this._resGroups = resGroups;
        this._wdTypeList = wdTypeList;
        this._isShowLoadingView = isShowLoadingView;
        this._isResLoadComplete = !resGroups || resGroups.length == 0;
    };
    ModuleBase.prototype.openWindow = function (wdType, data) {
        if (this._wdTypeList && this._wdTypeList.length > 0 && this._wdTypeList.indexOf(wdType) == -1)
            return;
        if (this._isResLoadComplete) {
            this.showWindow(wdType, data);
            return;
        }
        var index = this._openWdTypeArr.indexOf(wdType);
        if (index > -1) {
            this._openWdDataArr[index] = data;
        }
        else {
            this._openWdTypeArr.push(wdType);
            this._openWdDataArr.push(data);
        }
        // ModuleLoadManager.instance.loadModule(this._moduleType,this._resGroups,this.onLoadComplete,this,this._isShowLoadingView);
    };
    ModuleBase.prototype.onLoadComplete = function () {
        this._isResLoadComplete = true;
        var l = this._openWdTypeArr.length;
        for (var i = 0; i < l; i++) {
            this.showWindow(this._openWdTypeArr.shift(), this._openWdDataArr.shift());
        }
    };
    /**显示窗口*/
    ModuleBase.prototype.showWindow = function (wdType, data) {
    };
    ModuleBase.prototype.close = function () {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    ModuleBase.prototype.destroyModuleRes = function () {
        if (this._resGroups && this._resGroups.length > 0) {
            this._isResLoadComplete = false;
        }
        this._resGroups = null;
        this._wdTypeList = null;
    };
    return ModuleBase;
}(egret.EventDispatcher));
__reflect(ModuleBase.prototype, "ModuleBase");
//# sourceMappingURL=ModuleBase.js.map