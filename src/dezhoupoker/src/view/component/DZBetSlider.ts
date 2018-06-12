// TypeScript file

/**
 * class name : DZBetSlider
 * description : 德州扑克 下注滑动条控制脚本
 * author : 杨浩然
 * time : 2018.6.12
 */

class DZBetSlider extends eui.VSlider
{
    public constructor()
    {
        super();
    }

    public track_fill:eui.Image;

    public updateSkinDisplayList()
    {
        super.updateSkinDisplayList();
        this.track_fill.height = this.value / this.maximum * this.height;
    }
}