var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author ''"
 *
 */
var BorderProgressBarDraw = (function () {
    function BorderProgressBarDraw(barDisObj, barW, barH) {
        this._totalDrawTime = 0;
        this._darwR = 0;
        this._angle = 0;
        this._startTime = 0;
        this._startAngle = 0;
        this._barDisObj = barDisObj;
        this._darwR = Math.max(barW, barH) / 2 * 1.5;
        this._shape = new egret.Shape();
        this._barDisObj.parent.addChild(this._shape);
        this._shape.x = this._barDisObj.x + barW * .5;
        this._shape.y = this._barDisObj.y + barH * .5;
        this._barDisObj.mask = this._shape;
    }
    /**
     * 开始 time 秒
     * */
    BorderProgressBarDraw.prototype.startDraw = function (time, startAngle) {
        if (startAngle === void 0) { startAngle = -90; }
        this._totalDrawTime = time * 1000;
        this._angle = startAngle;
        this._startAngle = startAngle * Math.PI / 180;
        this._startTime = egret.getTimer();
        egret.startTick(this.drawMask, this);
    };
    BorderProgressBarDraw.prototype.drawMask = function (timeStamp) {
        var curTime = egret.getTimer();
        var dt = curTime - this._startTime;
        var angle = this._angle;
        if (dt > this._totalDrawTime) {
            this.clearDraw();
            return false;
        }
        else {
            angle += (dt / this._totalDrawTime) * 360;
        }
        angle %= 360;
        this._shape.graphics.clear();
        this._shape.graphics.beginFill(0x00ffff, 1);
        this._shape.graphics.lineTo(this._darwR, 0);
        this._shape.graphics.drawArc(0, 0, this._darwR, this._startAngle, angle * Math.PI / 180, true);
        this._shape.graphics.lineTo(0, 0);
        this._shape.graphics.endFill();
        return false;
    };
    BorderProgressBarDraw.prototype.stopDraw = function () {
        egret.stopTick(this.drawMask, this);
    };
    BorderProgressBarDraw.prototype.clearDraw = function () {
        this.stopDraw();
        this._shape.graphics.clear();
    };
    BorderProgressBarDraw.prototype.dispose = function () {
        this.stopDraw();
        this._barDisObj = null;
        if (this._shape.parent)
            this._shape.parent.removeChild(this._shape);
        this._shape = null;
    };
    return BorderProgressBarDraw;
}());
__reflect(BorderProgressBarDraw.prototype, "BorderProgressBarDraw");
//# sourceMappingURL=BorderProgressBarDraw.js.map