var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author ''"
 *
 */
var MoveObject = (function (_super) {
    __extends(MoveObject, _super);
    function MoveObject() {
        var _this = _super.call(this) || this;
        _this._moveTargetPosArr = [];
        _this._w = 0;
        _this._h = 0;
        return _this;
    }
    Object.defineProperty(MoveObject.prototype, "w", {
        get: function () {
            return this._w;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoveObject.prototype, "h", {
        get: function () {
            return this._h;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoveObject.prototype, "objW", {
        get: function () {
            return this._w * this.scaleX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoveObject.prototype, "objH", {
        get: function () {
            return this._h * this.scaleY;
        },
        enumerable: true,
        configurable: true
    });
    MoveObject.prototype.setPos = function (x, y) {
        if (isNaN(x) || isNaN(y))
            return;
        this.x = x;
        this.y = y;
        this.clearMove();
    };
    /**
     * 移动到目标位置
     * @param targetX
     * @param targetY
     * @param controlPoints
     * @param duration 秒
     * @param delay 秒
     * @param onMoveStartCallBack
     * @param onMoveComplete
     * @param oMoveCallBackThisObj
     */
    MoveObject.prototype.moveToTargetPos = function (targetX, targetY, controlPoints, duration, delay, onMoveStartCallBack, onMoveComplete, oMoveCallBackThisObj, ease, vars) {
        if (controlPoints === void 0) { controlPoints = null; }
        if (duration === void 0) { duration = 0; }
        if (delay === void 0) { delay = 0; }
        if (onMoveStartCallBack === void 0) { onMoveStartCallBack = null; }
        if (onMoveComplete === void 0) { onMoveComplete = null; }
        if (oMoveCallBackThisObj === void 0) { oMoveCallBackThisObj = null; }
        if (ease === void 0) { ease = null; }
        if (vars === void 0) { vars = null; }
        if (!this._isMoveStart) {
            this._isMoveStart = true;
            this.touchEnabled = false;
            this._targetX = targetX;
            this._targetY = targetY;
            if (delay > 0) {
                delay = delay * 1000;
                egret.clearTimeout(this._moveToTargetDelayTImerID);
                this._moveToTargetDelayTImerID = egret.setTimeout(this.startMoveToTargetPos, this, delay, targetX, targetY, controlPoints, duration, onMoveStartCallBack, onMoveComplete, oMoveCallBackThisObj, ease, vars);
            }
            else {
                this.startMoveToTargetPos(targetX, targetY, controlPoints, duration, onMoveStartCallBack, onMoveComplete, oMoveCallBackThisObj, ease, vars);
            }
        }
        else {
            var l = this._moveTargetPosArr.length;
            var obj;
            if (l == 0) {
                if (this._targetX == targetX && this._targetY == targetY)
                    return;
            }
            else {
                obj = this._moveTargetPosArr[l - 1];
                if (obj.targetX == targetX && obj.targetY == targetY)
                    return;
            }
            obj = {};
            obj.targetX = targetX;
            obj.targetY = targetY;
            obj.controlPoints = controlPoints;
            obj.duration = duration;
            obj.delay = delay * 1000;
            obj.onMoveStartCallBack = onMoveStartCallBack;
            obj.onMoveComplete = onMoveComplete;
            obj.oMoveCallBackThisObj = oMoveCallBackThisObj;
            obj.ease = ease;
            obj.vars = vars;
            this._moveTargetPosArr.push(obj);
        }
    };
    MoveObject.prototype.startMoveToTargetPos = function (targetX, targetY, controlPoints, duration, onMoveStartCallBack, onMoveComplete, oMoveCallbackThisObj, ease, vars) {
        if (controlPoints === void 0) { controlPoints = null; }
        if (duration === void 0) { duration = 0; }
        if (onMoveStartCallBack === void 0) { onMoveStartCallBack = null; }
        if (onMoveComplete === void 0) { onMoveComplete = null; }
        if (oMoveCallbackThisObj === void 0) { oMoveCallbackThisObj = null; }
        if (ease === void 0) { ease = null; }
        if (vars === void 0) { vars = null; }
        if (this.x != targetX || this.y != targetY) {
            var moveT = .26;
            var t = duration;
            if (onMoveStartCallBack != null)
                onMoveStartCallBack.call(oMoveCallbackThisObj, this);
            if (!vars)
                vars = {};
            if (controlPoints != null && controlPoints.length > 0) {
                this._curControlPoints = controlPoints;
                controlPoints.unshift({ x: this.x, y: this.y });
                controlPoints.push({ x: targetX, y: targetY });
                if (duration == 0) {
                    var dx = Math.abs(controlPoints[0].x - targetX);
                    t = dx / this._w * moveT * 1.5;
                    if (t > .9)
                        t = .9;
                    if (t < .5)
                        t = .5;
                }
                ease = ease ? ease : egret.Ease.sineIn;
                vars.factor = 1;
                this._moveToTargetTween = egret.Tween.get(this).to(vars, t * 1000, ease).call(this.moveToCurTargetComplete, this, [onMoveComplete, oMoveCallbackThisObj]);
            }
            else {
                if (duration == 0)
                    t = moveT;
                vars.x = targetX;
                vars.y = targetY;
                ease = ease ? ease : egret.Ease.sineOut;
                this._moveToTargetTween = egret.Tween.get(this).to(vars, t * 1000, ease).call(this.moveToCurTargetComplete, this, [onMoveComplete, oMoveCallbackThisObj]);
            }
        }
        else {
            this.moveToCurTargetComplete(onMoveComplete, oMoveCallbackThisObj);
        }
    };
    Object.defineProperty(MoveObject.prototype, "factor", {
        get: function () {
            return 0;
        },
        set: function (value) {
            var self = this;
            if (!self._curControlPoints && self._curControlPoints.length < 3)
                return;
            self.x = (1 - value) * (1 - value) * self._curControlPoints[0].x + 2 * value * (1 - value) * self._curControlPoints[1].x + value * value * self._curControlPoints[2].x;
            self.y = (1 - value) * (1 - value) * self._curControlPoints[0].y + 2 * value * (1 - value) * self._curControlPoints[1].y * value * value * self._curControlPoints[2].y;
        },
        enumerable: true,
        configurable: true
    });
    MoveObject.prototype.moveToCurTargetComplete = function (onMoveComplete, oMoveCallbackThisObj) {
        if (onMoveComplete != null)
            onMoveComplete.call(oMoveCallbackThisObj, this);
        this.moveToNextTargetPos();
    };
    MoveObject.prototype.moveToNextTargetPos = function () {
        if (this._moveTargetPosArr == null) {
            Utils.showLog("移动对象已销毁");
            return;
        }
        if (this._moveTargetPosArr.length == 0) {
            this.onMoveToTargetComplete();
            return;
        }
        var obj = this._moveTargetPosArr.shift();
        this._targetX = obj.targetX;
        this._targetY = obj.targetY;
        if (obj.delay > 0) {
            egret.clearTimeout(this._moveToTargetDelayTImerID);
            this._moveToTargetDelayTImerID = egret.setTimeout(this.startMoveToTargetPos, this, obj.delay, obj.targetX, obj.targetY, obj.controlPoints, obj.duration, obj.onMoveStartCallBack, obj.onMoveComplete, obj.oMoveCallBackThisObj, obj.ease, obj.vars);
        }
        else {
            this.startMoveToTargetPos(obj.targetX, obj.targetY, obj.controlPoints, obj.duration, obj.onMoveStartCallBack, obj.onMoveComplete, obj.oMoveCallBackThisObj, obj.ease, obj.vars);
        }
        obj.onMoveStartCallBack = null;
        obj.oMoveCallBackThisObj = null;
        obj.onMoveComplete = null;
        obj.ease = null;
    };
    MoveObject.prototype.removeAllTargetPos = function () {
        var l = this._moveTargetPosArr.length;
        var obj;
        for (var i = 0; i < l; i++) {
            obj = this._moveTargetPosArr[i];
            obj.onMoveStartCallBack = null;
            obj.oMoveCallBackThisObj = null;
            obj.onMoveComplete = null;
            obj.ease = null;
        }
        this._moveTargetPosArr.length = 0;
    };
    /**
     * 立即完成移动
     */
    MoveObject.prototype.moveImmediatelyComplete = function () {
        if (this._isMoveStart) {
            if (this._moveTargetPosArr.length > 0) {
                var obj = this._moveTargetPosArr[this._moveTargetPosArr.length - 1];
                this.x = obj.targetX;
                this.y = obj.targetY;
            }
            else {
                if (!isNaN(this._targetX) && !isNaN(this._targetY)) {
                    this.x = this._targetX;
                    this.y = this._targetY;
                }
            }
            this.clearMove();
            this.onMoveToTargetComplete();
        }
    };
    /**
     * 停止移动
     */
    MoveObject.prototype.clearMove = function () {
        if (this._isMoveStart) {
            this._isMoveStart = false;
            if (this._moveToTargetTween) {
                this._moveToTargetTween.pause();
                this._moveToTargetTween["_target"] = null;
            }
            this._moveToTargetTween = null;
            egret.clearTimeout(this._moveToTargetDelayTImerID);
            this.removeAllTargetPos();
        }
    };
    MoveObject.prototype.onMoveToTargetComplete = function () {
        this._isMoveStart = false;
        this.dispatchEventWith(egret.Event.COMPLETE);
    };
    MoveObject.prototype.recycle = function () {
        this._isMoveStart = false;
        this.alpha = 1;
        if (this._moveToTargetTween)
            this._moveToTargetTween["_target"] = null;
        this._moveToTargetTween = null;
        if (this._hideTween)
            this._hideTween["_target"] = null;
        this._hideTween = null;
        this.removeAllTargetPos();
        egret.clearTimeout(this._moveToTargetDelayTImerID);
        egret.Tween.removeTweens(this);
        if (this.parent)
            this.parent.removeChild(this);
    };
    /**
     * 隐藏
     * @param t 秒
     * @param isDispose
     */
    MoveObject.prototype.hide = function (t, delay, isDispose) {
        if (t === void 0) { t = 0; }
        if (delay === void 0) { delay = 0; }
        if (isDispose === void 0) { isDispose = false; }
        this._isDisposeHide = isDispose;
        if (this._hideTween) {
            this._hideTween.pause();
            this._hideTween["_target"] = null;
        }
        this._hideTween = null;
        if (t > 0) {
            this._hideTween = egret.Tween.get(this).wait(delay).to({ alpha: 0 }, t * 1000).call(this.onHideComplete, this);
        }
        else {
            this.alpha = 0;
            this.onHideComplete();
        }
    };
    MoveObject.prototype.onHideComplete = function () {
        if (this._isDisposeHide) {
            this.dispose();
        }
    };
    MoveObject.prototype.show = function () {
        this.alpha = 1;
        if (this._hideTween) {
            this._hideTween.pause();
            this._hideTween["_target"] = null;
        }
        this._hideTween = null;
    };
    MoveObject.prototype.dispose = function () {
        this.removeAllTargetPos();
        this._curControlPoints = null;
        this._moveToTargetTween = null;
        this._hideTween = null;
        this.removeChildren();
        this._moveTargetPosArr = null;
        egret.clearTimeout(this._moveToTargetDelayTImerID);
        egret.Tween.removeTweens(this);
        if (this.parent)
            this.parent.removeChild(this);
    };
    MoveObject.getDurTime = function (startX, startY, targetX, targetY, baseDist, baseT) {
        if (baseDist === void 0) { baseDist = 1000; }
        if (baseT === void 0) { baseT = .9; }
        var dist = MoveObject.getDist(startX, startY, targetX, targetY);
        return dist / baseDist * baseT; //秒
    };
    MoveObject.getDist = function (startX, startY, targetX, targetY) {
        var dx = targetX - startX;
        var dy = targetY - startY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        return dist;
    };
    MoveObject.getRotation = function (startX, startY, targetX, targetY) {
        var dx = targetX - startX;
        var dy = targetY - startY;
        var radian = Math.atan2(dy, dx);
        return radian * 180 / Math.PI;
    };
    MoveObject.getContainerCoordinate = function (disObj, container, result) {
        if (!result)
            result = new egret.Point(0, 0);
        if (!disObj.parent)
            return result;
        disObj.parent.localToGlobal(disObj.x, disObj.y, result);
        container.globalToLocal(result.x, result.y, result);
        return result;
    };
    return MoveObject;
}(eui.Component));
__reflect(MoveObject.prototype, "MoveObject");
//# sourceMappingURL=MoveObject.js.map