var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocalConfigInfo = (function () {
    function LocalConfigInfo() {
        this._effect = true;
        this._music = true;
        var music = egret.localStorage.getItem("musicsound");
        var effect = egret.localStorage.getItem("effectsound");
        this._music = music == "false" ? false : true;
        this._effect = effect == "false" ? false : true;
    }
    Object.defineProperty(LocalConfigInfo.prototype, "effect", {
        /**特效声音配置*/
        get: function () {
            return this._effect;
        },
        set: function (val) {
            this._effect = val;
            egret.localStorage.setItem("effectsound", val ? "true" : "false");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocalConfigInfo.prototype, "music", {
        /**背景音乐配置*/
        get: function () {
            return this._music;
        },
        set: function (val) {
            this._music = val;
            egret.localStorage.setItem("musicsound", val ? "true" : "false");
        },
        enumerable: true,
        configurable: true
    });
    return LocalConfigInfo;
}());
__reflect(LocalConfigInfo.prototype, "LocalConfigInfo");
//# sourceMappingURL=LocalConfigInfo.js.map