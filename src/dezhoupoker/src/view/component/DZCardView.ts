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

    /**赋值 */
    public SetData(_value:number,_type:CardType,_isFront:boolean = false):void
    {
        this._value = _value;
        this._type = _type;
        this.isFront = _isFront;
    }
    /**赋显 */
    public SetDisplay():void
    {
        this.img_value.source = DZCardController.GetValueRes(this._value,this._type);
        if(this._value > 10)
        {
            this.img_type.source = DZCardController.GetTypeRes(this._value - 10,this._type);
            this.img_type_b.source = DZCardController.GetTypeRes(this._value,this._type);
            return;
        }
        this.img_type.source = DZCardController.GetTypeRes(this._value,this._type);
        this.img_type_b.source = DZCardController.GetTypeRes(this._value,this._type);
        //更改包括10以下的大个花色的图标 避免尺寸过大
        this.img_type_b.width = DZDefine.img_type_b_w;
        this.img_type_b.height = DZDefine.img_type_b_h;
    }


    public ShowMask()
    {
        this.img_mask.visible = true;
    }

    public HideMask()
    {
        this.img_mask.visible = false;
    }

	public moveToTargetPos(targetX: number,targetY: number,controlPoints: Array<any> = null,duration: number = 0,delay: number = 0,onMoveStartCallBack: Function = null,onMoveComplete: Function = null,oMoveCallBackThisObj: any = null,moveCompleteIsFlip:boolean = false): void {
		
		super.moveToTargetPos(targetX,targetY,controlPoints,duration,delay,onMoveStartCallBack,onMoveComplete,oMoveCallBackThisObj);
	}



    


//class end    
}