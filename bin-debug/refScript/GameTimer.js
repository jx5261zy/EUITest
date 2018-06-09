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
var GameTimer = (function (_super) {
    __extends(GameTimer, _super);
    function GameTimer(delay, repeatCount) {
        var _this = _super.call(this, delay, repeatCount) || this;
        /**计时器类型 */
        _this.timerID = 0;
        /**总时间 */
        _this.totalTime = 0;
        _this.chairID = -1;
        _this._startTime = 0;
        return _this;
    }
    Object.defineProperty(GameTimer.prototype, "remainTime", {
        get: function () {
            var dt = (egret.getTimer() - this._startTime) / 1000;
            var t = this.totalTime - dt;
            if (t < 0)
                t = 0;
            return t;
        },
        enumerable: true,
        configurable: true
    });
    GameTimer.prototype.start = function () {
        _super.prototype.start.call(this);
        this._startTime = egret.getTimer();
    };
    return GameTimer;
}(egret.Timer));
__reflect(GameTimer.prototype, "GameTimer");
//# sourceMappingURL=GameTimer.js.map