/**
 *
 * @author ''"
 *
 */
class BorderProgressBarDraw {
	private _barDisObj:egret.DisplayObject;
	private _totalDrawTime:number = 0;
    private _darwR:number = 0;
    private _shape:egret.Shape;
    private _angle:number = 0;
    private _startTime:number = 0;
    private _startAngle:number = 0;
	public constructor(barDisObj:egret.DisplayObject,barW:number,barH:number) {
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
	public startDraw(time:number,startAngle:number = -90):void
	{
        this._totalDrawTime = time * 1000;
        this._angle = startAngle;
        this._startAngle = startAngle * Math.PI / 180;
        this._startTime = egret.getTimer();
        egret.startTick(this.drawMask,this);
    }
    private drawMask(timeStamp?:number):boolean
    {
        var curTime:number = egret.getTimer();
        var dt:number = curTime - this._startTime;
        var angle:number = this._angle;
        if(dt > this._totalDrawTime)
        {
            this.clearDraw();
            return false;
        }else
        {
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
    }
	public stopDraw():void
	{
        egret.stopTick(this.drawMask,this);
	}
    public clearDraw():void
	{
        this.stopDraw();
        this._shape.graphics.clear();
	}
	public dispose():void
	{
        this.stopDraw();
		this._barDisObj = null;
        if(this._shape.parent) this._shape.parent.removeChild(this._shape);
        this._shape = null;
	}
}