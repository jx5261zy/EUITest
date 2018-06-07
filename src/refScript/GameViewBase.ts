/**
 *''"
 * @author 
 *
 */
class GameViewBase extends BaseComponent{
	private static POOL_BITMAP_LABEL:string = "poolBitmapLabel";
	/**
	 * 创建一个游戏timer
	 */
	// private _gameTimer: GameTimer;
	private _timerDic:any = {};

	/**
	 * 本地位置编号
	 */
	private _localIdxArr:Array<number> = [];

	protected _myWorldIdx:number;
	protected set myWorldIdx(val:number)
	{
		if(this._myWorldIdx == val) return;
		this._myWorldIdx = val;
		this.setLocalIdxs();
	}
	protected _maxPlayerCount:number = 0;
	public get playerCount():number
	{
		return this._maxPlayerCount;
	}
	public constructor(table : GameTable,gameType:string,maxPlayerCount:number) {
		super(table);
		GlobalPara.gameType = gameType;
		this._maxPlayerCount = maxPlayerCount;
		this._myWorldIdx = UserData.chairID;
		this.setLocalIdxs();
		pool.ObjectPool.instance.createObjectPool(GameViewBase.POOL_BITMAP_LABEL,eui.BitmapLabel,30);
	}
	 protected initComponent() {
        super.initComponent();
		// 发送Frame_Enter消息
        // AppFacade.getInstance().sendNotification(PublicNotification.GAME_SUB_CS_FRAME_ENTER);
	 }

	 protected setFrameRate():void
	 {
		 var fr:number = 60;
		 if(Utils.isNative())
		 {
			 fr = 30;
		 }
		 egret.MainContext.instance.stage.frameRate = fr;
	 }
	 protected clear():void
	 {

	 }

	/**
	 * 创建一个游戏timer 唯一的
	 * @param chairID
	 * @param timerID
	 * @param time
	 */
	public setGameTimer(chairID: number,timerID:number,time:number):void
	{
		// if(this._gameTimer == null)
		// {
		// 	this._gameTimer = new GameTimer(1000/30);
		// 	this._gameTimer.addEventListener(egret.TimerEvent.TIMER,this.onGameTimerEvent,this);
		// }
		// this._gameTimer.chairID = chairID;
		// this._gameTimer.timerID = timerID;
		// this._gameTimer.totalTime = time;
		// this._gameTimer.start();
	}

	/**
	 * 停止游戏timer
	 */
	public stopGameTimer():void
	{
		// if(this._gameTimer) {
		// 	this._gameTimer.stop();
		// }
	}

	private onGameTimerEvent(e:egret.Event):void
	{
		// var remainTime: number = this._gameTimer.remainTime;
		// if(remainTime == 0)
		// {
		// 	this._gameTimer.stop();
		// }
		// this.onGameTimer(this._gameTimer.chairID,this._gameTimer.timerID,remainTime);
	}

	/**
	 * 创建一个计时器
	 */
	public setTimer(timerID:number,time:number):void
	{
		// var timer:GameTimer = this._timerDic[timerID];
		// if(timer == null)
		// {
		// 	timer = new GameTimer(1000/30);
		// 	timer.addEventListener(egret.TimerEvent.TIMER,this.onTimerEvent,this);
		// 	this._timerDic[timerID] = timer;
		// }
		// timer.timerID = timerID;
		// timer.totalTime = time;
		// timer.start();
	}
        
	private onTimerEvent(e:egret.TimerEvent):void
	{
		// var timer: GameTimer = e.currentTarget;
		// if(timer.remainTime == 0)
		// {
		// 	timer.stop();
		// }
		// this.onTimer(timer.timerID,timer.remainTime);
	}
        
	/**
	 * 停止timer
	 * @param timerID
	 */
	public stopTimer(timerID:number):void
	{
		// var timer: GameTimer = this._timerDic[timerID];
		// if(timer)
		// {
		// 	timer.stop();
		// }
	}

	/**
	 * 计时器处理
	 * @param timerID
	 */
	protected onTimer(timerID: number,remainTime:number): void {
		
	}

	/**
	 * 游戏计时器处理
	 * @param timerID
	 */
	protected onGameTimer(chairID:number,timerID: number,remainTime:number):void
	{
		
	}

	public getLocalPos(worldPos: number): number {
		if(this._localIdxArr[worldPos] == undefined) return -1;
		return this._localIdxArr[worldPos];
	}

	private setLocalIdxs(): void {
		this._localIdxArr[this._myWorldIdx] = 0;
		for(var i = 1;i < this._maxPlayerCount;i++) {
			this._localIdxArr[(this._myWorldIdx + i) % this._maxPlayerCount] = i;
		}
	}
	public showTipView(str:string):void
    {
        // var tipView:TipView = new TipView(str);
        // Main.getInstance().addTopUi(tipView);
    }

	public alphaAniImg(disObj:egret.DisplayObject,duration:number = 0,completeIsVisible:boolean = false,aniTime:number = 400,aniDelay:number = 100):void
	{
		if(duration > 0)
		{
			egret.Tween.get(disObj).wait(duration).call(this.alphaAniImgComplete,this,[disObj,completeIsVisible]);
		}
		disObj.alpha = .2;
		egret.Tween.get(disObj,{loop:true}).to({alpha:1},aniTime).wait(aniDelay).to({alpha:.2},aniTime);
	}
	public alphaAniImgComplete(img:egret.DisplayObject,isVisible:boolean):void
	{
		egret.Tween.removeTweens(img);
		img.alpha = 1;
		img.visible = isVisible;
	}

	protected checkBetLimit(userGold:number,chipValue:number,curTotalBet:number,goldRange1:number,betLimit1:number,goldRange2:number,betLimit2:number,isTip:boolean = true):boolean
    {
        if(userGold + curTotalBet < goldRange1)
        {
            if(curTotalBet >= betLimit1 || chipValue > betLimit1)
            {
                if(isTip) this.showTipView("当前金币小于"+goldRange1+"，最大押注为"+betLimit1+"金币");
                return false;
            }
            return true;
        }
        // if(userGold + curTotalBet < goldRange2)
        // {
        //      if(curTotalBet >= betLimit2 || chipValue > betLimit2)
        //     {
        //         if(isTip) this.showTipView("当前金币小于"+goldRange2+"，最大押注为"+betLimit2+"金币");
        //         return false;
        //     }
        //     return true;
        // }
        return true;
    }

	public forceLeaveGame() : void {
		if(!UserData.roomMoneyNotEnough)
		{
			this.showTipView("由于你长时间没有操作，以为你退出游戏房间！");
		}
	}

	public componentDispose():void
	{
		super.componentDispose();
		this.dispose();
	}

	public dispose():void
	{
		// if(this._gameTimer != null) {
		// 	this._gameTimer.removeEventListener(egret.TimerEvent.TIMER,this.onGameTimerEvent,this);
		// 	this._gameTimer.stop();
		// 	this._gameTimer = null;
		// }
		var timer:egret.Timer;
		for(var k in this._timerDic)
		{
			timer = this._timerDic[k];
			timer.stop();
			timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerEvent,this);
			delete this._timerDic[k];
		}
		this._timerDic = null;
		this.removeChildren();
		// Utils.safeRemove(this);
		pool.ObjectPool.instance.cleanObjectPool(GameViewBase.POOL_BITMAP_LABEL);
	}

	public static createBitmapLabel():eui.BitmapLabel
	{
		var bitmapLabel:eui.BitmapLabel = pool.ObjectPool.instance.getObj(GameViewBase.POOL_BITMAP_LABEL);
		bitmapLabel.alpha = 1;
		return bitmapLabel;
	}
	public static pushBitmapLabel(obj:eui.BitmapLabel):void
	{
		egret.Tween.removeTweens(obj);
		pool.ObjectPool.instance.pushObj(GameViewBase.POOL_BITMAP_LABEL,obj);
	}
}