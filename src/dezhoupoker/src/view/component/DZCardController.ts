// TypeScript file

/**
 * class name : DZCardController
 * description : 德州扑克 扑克牌控制模块 初步决定这个类不放大量的成员变量，主要负责卡牌的控制，单例模式调用
 * author : 杨浩然
 * time : 2018.5.28
 */

class DZCardController extends egret.EventDispatcher
{
    // private static _instance:DZCardController;
    // private static _isInstantation:boolean = false;
    // public static get instance():DZCardController
    // {
    //     if(!this._instance && !this._isInstantation)
    //     {
    //         this._isInstantation = true;
    //         this._instance = new DZCardController();
    //     }
    //     return this._instance
    // }


    /**播放发所有玩家手牌的动画 */
    public SendUsersCardsAnim()
    {

    }


    /**翻单个用户的手牌动画
     * @param _user : 需要翻牌的用户
     */
    public TurnCardAnim(_user:DZUser):void
    {

    }


    /**往公共牌区域发一张牌的动画 */
    public static SendPubCard()
    {

    }


    /**单张翻公共牌动画
     * @param index : 在Group中的下标
     * @param 
     */
    public TurnPubCardAnim(index:number)
    {

    }


    /**弃牌动画
     * @param _user : 需要弃牌的用户
     */
    public AbandonCardAnim(_user:DZUser):void
    {

    }



//class end
}