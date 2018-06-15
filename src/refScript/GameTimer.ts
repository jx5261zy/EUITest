/**
 *''"
 * @author 
 *
 */
class GameTimer extends egret.Timer{
    /**计时器类型 */
    public timerID:number = 0;
    
    /**总时间 */
    public totalTime:number = 0;
    
    public get remainTime():number
    {
        var dt: number = (egret.getTimer() - this._startTime) / 1000;
        var t: number = this.totalTime - dt;
        if(t < 0) t = 0;
        return t;
    }
    
    public chairID:number = -1;
    
    private _startTime:number = 0;
	public constructor(delay:number,repeatCount?:number) {
        super(delay,repeatCount);
	}

	public start():void
	{
	    super.start();
	    this._startTime = egret.getTimer();
	}
}
