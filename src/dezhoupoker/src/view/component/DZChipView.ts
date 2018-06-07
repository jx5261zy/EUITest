// TypeScript file

/**
 * class name : DZChipView
 * description : 德州扑克 筹码脚本
 * author : 杨浩然
 * time : 2018.5.28
 */

class DZChipView extends MoveObject
{
    public static DZ_CHIP_POOL:string = "DZ_CHIP_POOL";

    public constructor()
    {
        super();
    }

    public static createDZChipView():DZChipView
    {
        return pool.ObjectPool.instance.getObj(DZChipView.DZ_CHIP_POOL);
    }


//class end   
}