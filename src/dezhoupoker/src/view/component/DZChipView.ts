// TypeScript file

/**
 * class name : DZChipView
 * description : 德州扑克 筹码脚本
 * author : 杨浩然
 * time : 2018.5.28
 */

class DZChipView extends MoveObject
{

    private _value:number;
    public get value():number
    {
        return this._value;
    }

    /**筹码背景图 */
    private img_chip_bg:eui.Image;

    public constructor()
    {
        super();
        this.skinName = "DZChipSkin";
        this.touchEnabled = this.touchChildren = false;
    }

    public set value(_value:number)
    {
        this._value = _value;
    }

    public SetDisplay():void
    {
        if(this._value == 0)
            return;
        this.img_chip_bg.source = DZChipController.GetDisplayRes(this._value);
    }




//class end   
}