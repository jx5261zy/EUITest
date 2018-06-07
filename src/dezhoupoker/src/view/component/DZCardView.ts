// TypeScript file

/**
 * class name : DZCardView
 * description : 德州扑克 扑克牌皮肤脚本
 * author : 杨浩然
 * time : 2018.5.28
 */

class DZCardView extends MoveObject
{
    public isFront:boolean = false;//牌的正反属性

    /**皮肤组件 */

    public constructor()
    {
        super();
        this.skinName = "DZPokerSkin";
        this.touchEnabled = this.touchChildren = false;
    }


    protected createChildren():void
    {
        super.createChildren();
        
    }


    public Dispose():void
    {

    }


    /**从对象池中生成一个扑克牌的皮肤 */
    // public static CreatePokerView():DZCardView
    // {

    // }



	public moveToTargetPos(targetX: number,targetY: number,controlPoints: Array<any> = null,duration: number = 0,delay: number = 0,onMoveStartCallBack: Function = null,onMoveComplete: Function = null,oMoveCallBackThisObj: any = null,moveCompleteIsFlip:boolean = false): void {
		
		super.moveToTargetPos(targetX,targetY,controlPoints,duration,delay,onMoveStartCallBack,onMoveComplete,oMoveCallBackThisObj);
	}
    


//class end    
}