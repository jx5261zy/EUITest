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

    /**下注滑动条 */
    public betSlider:DZBetSlider;

    protected createChildren()
    {
        super.createChildren();
        this.betSlider.addView = this;
    }

    /**当滑动条的值最大时的回调 */
    public OnValueMax()
    {
        console.log("最大值");
    }
    /**滑动条的值正常时的回调 */
    public OnValueNormal()
    {
        console.log("正常值");
    }

}