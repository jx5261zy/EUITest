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
 * class name : DZGameModule
 * description : 德州扑克模块控制器，控制游戏中的各种弹出界面
 * author : 杨浩然
 * time : 2018.5.28
 */
var DZGameModule = (function (_super) {
    __extends(DZGameModule, _super);
    function DZGameModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DZGameModule;
}(ModuleBase));
__reflect(DZGameModule.prototype, "DZGameModule");
//# sourceMappingURL=DZGameModule.js.map