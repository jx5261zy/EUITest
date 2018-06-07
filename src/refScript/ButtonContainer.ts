/**
 *''"
 * @author 
 *
 */
class ButtonContainer extends egret.EventDispatcher{
	private _btns:Array<egret.DisplayObject> = [];
	private _isTabBtn:boolean = false;
	public set isTabBtn(val:boolean)
	{
		this._isTabBtn = val;
	}
	private  _soundNameDic:any = {};
	private _clickStageX:number = 0;
	public get clickStageX():number
	{
		return this._clickStageX;
	}
	private _clickStageY:number = 0;
	public get clickStageY():number
	{
		return this._clickStageY;
	}
	public constructor() {
		super();
	}
	public addButton(btn:egret.DisplayObject,soundName?:string,isBigAni?:boolean,isStopPropagation:boolean = true):void
	{
		if(!btn) return;
		btn.touchEnabled = true;
		if(btn["touchChildren"] != undefined) btn["touchChildren"] = false;
		btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClick,this);
		btn["isBigAni"] = isBigAni;
		btn["isStopPropagation"] = isStopPropagation;
		this._btns.push(btn);
		if(soundName)
		{
			this._soundNameDic[btn.hashCode] = soundName;
		}
		if(isBigAni)
		{
			var d:number = 0;
			if(btn.anchorOffsetX != btn.width * .5)
			{
				d = btn.width * .5 - btn.anchorOffsetX;
				btn.anchorOffsetX = btn.width * .5;
				btn.x += d;
			}
			if(btn.anchorOffsetY != btn.height * .5)
			{
				d = btn.height * .5 - btn.anchorOffsetY;
				btn.anchorOffsetY = btn.height * .5;
				btn.y += d;
			}
		}
	}
	public addButtons(bts:Array<egret.DisplayObject>,soundNameArr?:Array<string>):void
	{
		var l:number = bts.length;
		for(var i:number = 0;i<l;i++)
		{
			if(soundNameArr)
			{
				this.addButton(bts[i],soundNameArr[i]);
			}else
			{
				this.addButton(bts[i]);
			}
		}
		if(l > 0 && this._isTabBtn)
		{
			this.setSelectBtn(bts[0]);
		}
	}
	public removeButtons():void
	{
		var l:number = this._btns.length;
		var btn:egret.DisplayObject;
		for(var i:number = 0;i<l;i++)
		{
			btn = this._btns[i];
			egret.Tween.removeTweens(btn);
			btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClick,this);
		}
		this._btns.length = 0;
	}
	public setSelectBtn(btn:egret.DisplayObject,isDispatch?:boolean):void
	{
		if(this._isTabBtn)
		{
			this.enabledBtns();
			this.setBtnEnabled(btn,false);
		}
		if(isDispatch) this.dispatchEventWith(egret.TouchEvent.TOUCH_TAP,false,btn);
	}
	private onBtnClick(e:egret.TouchEvent):void
	{
		var btn:egret.DisplayObject = e.currentTarget;
		if(btn["isStopPropagation"]) e.stopPropagation();
		var curTime:number = egret.getTimer();
		if(btn["prevClickTime"] > 0)
		{
			var dt:number = curTime - btn["prevClickTime"];
			if(dt < 200) return;
		}
		btn["prevClickTime"] = curTime;
		var soundName:string = this._soundNameDic[btn.hashCode];
		if(soundName)
		{

		}
		if(btn["isBigAni"])
		{
			egret.Tween.removeTweens(btn);
			egret.Tween.get(btn).to({scaleX:1.2,scaleY:1.2},100).wait(50).to({scaleX:1,scaleY:1},100);
		}
		this._clickStageX = e.stageX;
		this._clickStageY = e.stageY;
		this.setSelectBtn(btn,true);
	}
	private enabledBtns(isEnabled:boolean = true):void
	{
		var l:number = this._btns.length;
		var btn:egret.DisplayObject;
		for(var i:number = 0;i<l;i++)
		{
			btn = this._btns[i];
			this.setBtnEnabled(btn,isEnabled);
		}
	}
	public setBtnEnabled(btn:any,isEnabled:boolean,isGrey:boolean = false):void
	{
		if(btn["enabled"] != undefined)
		{
			btn["enabled"] = isEnabled;
		}
		if(btn["selected"] != undefined)
		{
			btn["selected"] = !isEnabled;
		}
		btn.touchEnabled = isEnabled;
		if(!isEnabled)
		{
			if(isGrey) Utils.ColorGrey(btn);
		}else
		{
			btn.filters = null;
		}
	}
	public dispose():void
	{
		this.removeButtons();
		this._btns = null;
		this._soundNameDic = null;
	}
}