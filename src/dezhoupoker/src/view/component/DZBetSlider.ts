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

    private _addView:DZAddChipView;
    public set addView(value:DZAddChipView)
    {
        this._addView = value;
    }
    public track_fill_mask:eui.Rect;

    public updateSkinDisplayList()
    {
        super.updateSkinDisplayList();
        this.track_fill_mask.height = this.value / this.maximum * this.height;
        this.track_fill_mask.anchorOffsetY = this.track_fill_mask.height;//不停的根据高度更改锚点，保证锚点始终在最下方
        if(this.value == this.maximum)
        {
            this._addView.OnValueMax();
        }
        else
        {
            this._addView.OnValueNormal();
        }
    }
}