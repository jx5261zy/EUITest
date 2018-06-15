// TypeScript file

/**
 * class name : DZChipController
 * description : 德州扑克 筹码控制模块 主要负责筹码的控制
 * author : 杨浩然
 * time : 2018.5.30
 */

class DZChipController extends egret.EventDispatcher
{

    public static tableComponent:eui.Component;
    // public static chipContainer:Array<eui.Image>;


    /**移动筹码
     * 并不会给筹码赋值，赋显，会将筹码的内存返回出去
     * @param user : 需要移动筹码的用户
     */
    public static MoveUserChip(user:DZUser):DZChipView
    {
        if(user == null) return;
        var chip:DZChipView = DZChipController.CreateChipFormPool();
        this.tableComponent.addChild(chip);
        var start:egret.Point = new egret.Point(user.headComponent.x,user.headComponent.y);
        start.x += user.headComponent.width / 2;
        start.y += user.headComponent.height / 2;
        chip.x = start.x;
        chip.y = start.y;
        chip.isAction = false;
        var target:egret.Point = new egret.Point(user.gp_betPool.x,user.gp_betPool.y);
        target.y += 3;//筹码如果直接按照背景的位置有点偏，所以往下来一点正好
        egret.Tween.get(chip).to({x:target.x,y:target.y},DZDefine.sendChipTime)
                            .call(()=>{user.gp_betPool.visible = true;chip.isAction = false;
                                           if(user.lastChip != null)
                                            {
                                                DZChipController.tableComponent.removeChild(user.lastChip);
                                                DZChipController.RecycleChipToPool(user.lastChip);
                                            }
                                        });

        return chip;
    }

    //TODO：记得要撰写边池，需要跟服务器商讨逻辑谁来处理
    /**移动所有玩家的筹码入底池 */
    public static MoveAllChipsToPot()
    {
        if(Main.instance.chairID_User.length <= 0)
            return;

        var pot:eui.Group = DZChipController.tableComponent["gp_pub_chip"];
        var target:egret.Point = new egret.Point(pot.x,pot.y);
        target.y += 3;//筹码如果直接按照背景的位置有点偏，所以往下来一点正好

        var users = Main.instance.chairID_User;
        users.forEach(ele=>{
            if(ele.chip != null)
            {
                    ele.chip.isAction = true;
                    ele.gp_betPool.visible = false;//玩家的下注背景隐藏
                    egret.Tween.get(ele.chip).to({x:target.x,y:target.y},DZDefine.sendChipTime)
                                        .call(()=>  {
                                                            ele.chip.isAction = false;
                                                            pot.visible = true;
                                                            // ele.chip.dispose();//移动完销毁物体
                                                            DZChipController.RecycleChipToPool(ele.chip);
                                                        });
            }
        });

        


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