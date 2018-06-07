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

    /**卡牌的数值 */
    private _value:number;
    public get value():number
    {
        return this._value;
    }

    /**卡牌的花色 */
    private _type:CardType;
    public get type():CardType
    {
        return this._type;
    }
    

    /**皮肤组件 */
    private gp_poker:eui.Group;
    private img_poker_back:eui.Image;
    private img_value:eui.Image;
    private img_type:eui.Image;
    private img_type_b:eui.Image;
    private img_mask:eui.Image;

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


    public SetData(_value:number,_type:CardType,_isFront:boolean):void
    {
        this._value = _value;
        this._type = _type;
        this.isFront = _isFront;
    }

	public moveToTargetPos(targetX: number,targetY: number,controlPoints: Array<any> = null,duration: number = 0,delay: number = 0,onMoveStartCallBack: Function = null,onMoveComplete: Function = null,oMoveCallBackThisObj: any = null,moveCompleteIsFlip:boolean = false): void {
		
		super.moveToTargetPos(targetX,targetY,controlPoints,duration,delay,onMoveStartCallBack,onMoveComplete,oMoveCallBackThisObj);
	}



    


//class end    
}