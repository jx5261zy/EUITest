// TypeScript file

/**
 * class name : DZDropDownView
 * description : 德州扑克 下拉菜单皮肤脚本
 * author : 杨浩然
 * time : 2018.5.28
 */

class DZDropDownView extends eui.Component
{
    private _isAction:boolean = false;
    public get isAction():boolean
    {
        return this._isAction;
    }

    public constructor()
    {
        super();
        // this.skinName = "resource/dezhoupoker/eui_skin/view/DZDropDownSkin.exml";
    }
    private btnContainer:ButtonContainer;
    /**换桌 */
    private btn_change_table:eui.Group;
    /**牌型 */
    private btn_type_eg:eui.Group;
    /**设置 */
    private btn_setting:eui.Group;

    protected createChildren():void
    {
        super.createChildren();
        this.AddEvent();
    }

    /**展开 */
    public Show():void
    {
        this.scaleY = 0;
        this.visible = true;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({scaleY:1},DZDefine.dropMenuTime);
    }

    /**隐藏 */
    public Hide()
    {
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({scaleY:0},DZDefine.dropMenuTime)
                            .call(()=>{
                                this.visible = false;
                                this.scaleY = 1;
                            })
    }


    private AddEvent()
    {
        this.btnContainer = new ButtonContainer();
        this.btnContainer.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnBtnClick,this);
        this.btnContainer.addButton(this.btn_change_table);
        this.btnContainer.addButton(this.btn_setting);
        this.btnContainer.addButton(this.btn_type_eg);
    }


    private OnBtnClick(evt:egret.Event)
    {
        switch(evt.data)
        {
            case this.btn_change_table:
                console.log("点击了换桌按钮");
            break;

            case this.btn_setting:
                console.log("点击了设置按钮");
            break;

            case this.btn_type_eg:
                console.log("点击了牌型按钮");
            break;
        }
    }


    public dispose():void
    {
        
    }

//class end
}