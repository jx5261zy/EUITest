// TypeScript file

/**
 * class name : DZAddChipView
 * description : 德州扑克 加注面板控制脚本
 * author : 杨浩然
 * time : 2018.6.27
 */

class DZAddChipView extends eui.Component
{
    public constructor()
    {
        super();
        this.skinName = "DZAddChipSkin";
    }
    /**ALLIN的背景 */
    public img_allin_bg:eui.Image;
    /**下注滑动条 */
    public betSlider:DZBetSlider;
    /**ALLIN的动画 */
    public lightEffect:egret.tween.TweenGroup;
    /**动画是否播放 */
    public isEffectPlay:boolean = false;
    /**两个灯 */
    public img_add_effect_1:eui.Image;
    public img_add_effect_2:eui.Image;

    protected createChildren()
    {
        super.createChildren();
        this.betSlider.addView = this;
        this.lightEffect.addEventListener("complete",this.OnGroupComplete,this);
    }

    public get value():number
    {
        return this.betSlider.value;
    }
    public set value(value:number)
    {
        this.betSlider.value = value;
    }
    public set maximum(value:number)
    {
        this.betSlider.maximum = value;
    }

    /**当滑动条的值最大时的回调 */
    public OnValueMax()
    {
        if(!this.isEffectPlay)
        {
            this.lightEffect.play(0);
            this.isEffectPlay = true;
        }
            
        if(!this.img_allin_bg.visible) this.img_allin_bg.visible = true;
        console.log("最大值");
    }


    /**滑动条的值正常时的回调 */
    public OnValueNormal()
    {
        if(this.isEffectPlay)
        {
            this.lightEffect.stop();
            this.HideLights();
            this.isEffectPlay = false;
        }
        if(this.img_allin_bg.visible) this.img_allin_bg.visible = false;
        console.log("正常值");
    }

    /**将两个灯光的透明度改为0，隐藏透明度 */
    private HideLights():void
    {
        this.img_add_effect_1.alpha = 0;
        this.img_add_effect_2.alpha = 0;
    }

    /**灯光特效播放完成的回调，用于动画重播 */
    private OnGroupComplete():void
    {
        // console.log("=====动画播放完成，重播=====");
        this.lightEffect.play(0);
    }


//class end
}