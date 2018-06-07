
/**
 *
 * @author ''"
 *
 */
class MoveObject extends eui.Component{
private _isMoveStart: boolean;
private _targetX: number;
private _targetY: number;
private _moveTargetPosArr: Array<any> = [];
private _moveToTargetTween: egret.Tween;
private _hideTween: egret.Tween;
private _moveToTargetDelayTImerID: number;
protected _w: number = 0;
public get w(): number {
    return this._w;
}
protected _h: number = 0;
public get h(): number {
    return this._h;
}
public get objW():number
{
    return this._w * this.scaleX;
}
public get objH():number
{
    return this._h * this.scaleY;
}

private _isDisposeHide: boolean;
	public constructor() {
	super();
	}
public setPos(x: number,y: number): void {
	if(isNaN(x) || isNaN(y)) return;
    this.x = x;
    this.y = y;
    this.clearMove();
}
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
public moveToTargetPos(targetX: number,targetY: number,controlPoints: Array<any> = null,duration: number = 0,delay: number = 0,onMoveStartCallBack: Function = null,onMoveComplete: Function = null,oMoveCallBackThisObj: any = null,ease:any = null,vars:any = null): void {
    if(!this._isMoveStart) {
	this._isMoveStart = true;
	this.touchEnabled = false;

	this._targetX = targetX;
	this._targetY = targetY;
	if(delay > 0) {
	    delay = delay * 1000;
		egret.clearTimeout(this._moveToTargetDelayTImerID);
		this._moveToTargetDelayTImerID = egret.setTimeout(this.startMoveToTargetPos,this,delay,targetX,targetY,controlPoints,duration,onMoveStartCallBack,onMoveComplete,oMoveCallBackThisObj,ease,vars);
	} else {
	    this.startMoveToTargetPos(targetX,targetY,controlPoints,duration,onMoveStartCallBack,onMoveComplete,oMoveCallBackThisObj,ease,vars);
	}
    } else {
	var l: number = this._moveTargetPosArr.length;
	var obj: any;
	if(l == 0) {
	    if(this._targetX == targetX && this._targetY == targetY) return;
	} else {
	    obj = this._moveTargetPosArr[l - 1];
	    if(obj.targetX == targetX && obj.targetY == targetY) return;
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
}
private startMoveToTargetPos(targetX: number,targetY: number,controlPoints: Array<any> = null,duration: number = 0,onMoveStartCallBack: Function = null,onMoveComplete: Function = null,oMoveCallbackThisObj: any = null,ease:any = null,vars:any = null): void {
    if(this.x != targetX || this.y != targetY) {
		var moveT: number = .26;
		var t: number = duration;
		if(onMoveStartCallBack != null) onMoveStartCallBack.call(oMoveCallbackThisObj,this);
		if(!vars) vars = {};
		if(controlPoints != null && controlPoints.length > 0) {
			this._curControlPoints = controlPoints;
			controlPoints.unshift({x:this.x,y:this.y});
			controlPoints.push({ x: targetX,y: targetY });
			if(duration == 0)
			{
				var dx: number = Math.abs(controlPoints[0].x - targetX);
				t = dx / this._w * moveT * 1.5;
				if(t > .9) t = .9;
				if(t < .5) t = .5;
			}
			ease = ease ? ease : egret.Ease.sineIn;
			vars.factor = 1;
			this._moveToTargetTween = egret.Tween.get(this).to(vars,t * 1000,ease).call(this.moveToCurTargetComplete,this,[onMoveComplete,oMoveCallbackThisObj]);
		} else {
			if(duration == 0) t = moveT;
			vars.x = targetX;
			vars.y = targetY;
			ease = ease ? ease : egret.Ease.sineOut;
			this._moveToTargetTween = egret.Tween.get(this).to(vars,t * 1000,ease).call(this.moveToCurTargetComplete,this,[onMoveComplete,oMoveCallbackThisObj]);
		}
    } else {
		this.moveToCurTargetComplete(onMoveComplete,oMoveCallbackThisObj);
    }
}
public set factor(value:number)
{
	var self = this;
	if(!self._curControlPoints && self._curControlPoints.length < 3) return;
	self.x = (1 - value) * (1 - value) * self._curControlPoints[0].x + 2 * value * (1 - value) * self._curControlPoints[1].x + value * value * self._curControlPoints[2].x;
	self.y = (1 - value) * (1 - value) * self._curControlPoints[0].y + 2 * value * (1 - value) * self._curControlPoints[1].y * value * value * self._curControlPoints[2].y;
}

public get factor():number
{
	return 0;
}
private _curControlPoints:Array<any>;
private moveToCurTargetComplete(onMoveComplete:Function,oMoveCallbackThisObj:any):void
{
	if(onMoveComplete != null) onMoveComplete.call(oMoveCallbackThisObj,this);
	this.moveToNextTargetPos();
}
private moveToNextTargetPos(): void {
	if(this._moveTargetPosArr == null)
	{
		Utils.showLog("移动对象已销毁");
		return;
	}
    if(this._moveTargetPosArr.length == 0) {
		this.onMoveToTargetComplete();
		return;
    }
    var obj: any = this._moveTargetPosArr.shift();
    this._targetX = obj.targetX;
    this._targetY = obj.targetY;
    if(obj.delay > 0) {
		egret.clearTimeout(this._moveToTargetDelayTImerID);
		this._moveToTargetDelayTImerID = egret.setTimeout(this.startMoveToTargetPos,this,obj.delay,obj.targetX,obj.targetY,obj.controlPoints,obj.duration,obj.onMoveStartCallBack,obj.onMoveComplete,obj.oMoveCallBackThisObj,obj.ease,obj.vars);
	} else {
	this.startMoveToTargetPos(obj.targetX,obj.targetY,obj.controlPoints,obj.duration,obj.onMoveStartCallBack,obj.onMoveComplete,obj.oMoveCallBackThisObj,obj.ease,obj.vars);
    }
    obj.onMoveStartCallBack = null;
    obj.oMoveCallBackThisObj = null;
    obj.onMoveComplete = null;
	obj.ease = null;
}
private removeAllTargetPos(): void {
    var l: number = this._moveTargetPosArr.length;
    var obj: any;
    for(var i: number = 0;i < l;i++) {
	obj = this._moveTargetPosArr[i];
	obj.onMoveStartCallBack = null;
	obj.oMoveCallBackThisObj = null;
	obj.onMoveComplete = null;
	obj.ease = null;
    }
    this._moveTargetPosArr.length = 0;
}

/**
 * 立即完成移动
 */
public moveImmediatelyComplete(): void {
    if(this._isMoveStart) {
		if(this._moveTargetPosArr.length > 0) {
			var obj: any = this._moveTargetPosArr[this._moveTargetPosArr.length - 1];
			this.x = obj.targetX;
			this.y = obj.targetY;
		} else {
			if(!isNaN(this._targetX) && !isNaN(this._targetY)) {
				this.x = this._targetX;
				this.y = this._targetY;
			}
		}
		this.clearMove();
		this.onMoveToTargetComplete();
    }
}

/**
 * 停止移动
 */
public clearMove(): void {
    if(this._isMoveStart) {
	this._isMoveStart = false;

	if(this._moveToTargetTween) 
	{
		this._moveToTargetTween.pause();
		this._moveToTargetTween["_target"] = null;
	}
	this._moveToTargetTween = null;

	egret.clearTimeout(this._moveToTargetDelayTImerID);
	this.removeAllTargetPos();
    }
}
protected onMoveToTargetComplete(): void {
    this._isMoveStart = false;
    this.dispatchEventWith(egret.Event.COMPLETE);
}
public recycle(): void {
    this._isMoveStart = false;
    this.alpha = 1;

	if(this._moveToTargetTween) this._moveToTargetTween["_target"] = null;
	this._moveToTargetTween = null;
	if(this._hideTween) this._hideTween["_target"] = null;
	this._hideTween = null;

    this.removeAllTargetPos();
    egret.clearTimeout(this._moveToTargetDelayTImerID);
	egret.Tween.removeTweens(this);
    if(this.parent) this.parent.removeChild(this);
}
/**
 * 隐藏 
 * @param t 秒
 * @param isDispose
 */
public hide(t:number = 0,delay:number = 0,isDispose:boolean = false):void
{
    this._isDisposeHide = isDispose;
	if(this._hideTween) 
	{
		this._hideTween.pause();
		this._hideTween["_target"] = null;
	}
    this._hideTween = null;
    if(t > 0)
    {
		this._hideTween = egret.Tween.get(this).wait(delay).to({alpha:0},t * 1000).call(this.onHideComplete,this);
    }else
    {
		this.alpha = 0;
		this.onHideComplete();
    }
}
private onHideComplete():void
{
    if(this._isDisposeHide)
    {
		this.dispose();
    }
}

public show():void
{
    this.alpha = 1;
	if(this._hideTween) 
	{
		this._hideTween.pause();
		this._hideTween["_target"] = null;
	}
    this._hideTween = null;
}
	public dispose():void
	{
    this.removeAllTargetPos();
	this._curControlPoints = null;
	this._moveToTargetTween = null;

    this._hideTween = null;

    this.removeChildren();
    this._moveTargetPosArr = null;
    egret.clearTimeout(this._moveToTargetDelayTImerID);

	egret.Tween.removeTweens(this);
	if(this.parent) this.parent.removeChild(this);
	}

    public static getDurTime(startX:number,startY:number,targetX:number,targetY:number,baseDist:number = 1000,baseT:number = .9):number
    {
		var dist:number = MoveObject.getDist(startX,startY,targetX,targetY);
        return dist / baseDist * baseT;//秒
    }

	public static getDist(startX:number,startY:number,targetX:number,targetY:number):number
	{
		var dx:number = targetX - startX;
        var dy:number = targetY - startY;
        var dist:number = Math.sqrt(dx * dx + dy * dy);
		return dist;
	}

	public static getRotation(startX:number,startY:number,targetX:number,targetY:number):number
	{
		var dx:number = targetX - startX;
        var dy:number = targetY - startY;
		var radian:number = Math.atan2(dy,dx);
		return radian * 180/Math.PI;
	}

	public static getContainerCoordinate(disObj:egret.DisplayObject,container:egret.DisplayObjectContainer,result?:egret.Point):egret.Point
	{
		if(!result) result = new egret.Point(0,0);
		if(!disObj.parent) return result;
		disObj.parent.localToGlobal(disObj.x,disObj.y,result);
		container.globalToLocal(result.x,result.y,result);
		return result;
	}
}
