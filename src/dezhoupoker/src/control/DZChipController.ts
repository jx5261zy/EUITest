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


    /**根据值获得显示资源 */
    public static GetDisplayRes(_value:number):string
    {
        var outStr:string = "dz_userchip_";
        var _str:string = "";
        if(_value > 0 && _value <= 50)
            _str = "0_png";
        else if(_value > 50 && _value <= 100)
            _str = "1_png";
        else if(_value > 100 && _value <= 200)
            _str = "2_png";
        else if(_value > 200 && _value <= 500)
            _str = "3_png";
        else if(_value > 500)
            _str = "4_png"
        return outStr + _str;
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