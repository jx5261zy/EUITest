// TypeScript file

/**
 * class name : DZChipController
 * description : 德州扑克 筹码控制模块 主要负责筹码的控制
 * author : 杨浩然
 * time : 2018.5.30
 */

class DZChipController extends egret.EventDispatcher
{


    /**移动筹码 */
    public MoveUserChip(_userID:number)
    {

    }


    /**移动所有玩家的筹码入底池 */
    public MoveAllChipsToPot()
    {

    }


    /**从底池向玩家分发筹码 */
    public MovePotChipsToUser()
    {

    }


    //对象池相关
    public static DZ_CHIP_POOLNAME:string = "DZ_CHIP_POOL";
    public static CreateChipFormPool():DZChipView
    {
        return pool.ObjectPool.instance.getObj(DZChipController.DZ_CHIP_POOLNAME);
    }
    public static RecycleChipToPool(obj:DZChipView)
    {
        pool.ObjectPool.instance.pushObj(DZChipController.DZ_CHIP_POOLNAME,obj);
    }
     


//class end
}