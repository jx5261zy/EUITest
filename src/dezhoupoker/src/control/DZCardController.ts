// TypeScript file

/**
 * class name : DZCardController
 * description : 德州扑克 扑克牌控制模块 初步决定这个类不放大量的成员变量，主要负责卡牌的控制，单例模式调用
 * author : 杨浩然
 * time : 2018.5.28
 */

class DZCardController extends egret.EventDispatcher
{
    /**桌子皮肤 */
    public static tableComponent:eui.Component;

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

    /**播放发玩家手牌的动画
     * 不会给卡牌赋值，赋显，返回一个手牌数组
     */
    public static SendUserCardsAnim(start:egret.Point,target:egret.Point):DZCardView[]
    {
            var firstCard = DZCardController.CreatePokerFormPool();
            firstCard.x = start.x;
            firstCard.y = start.y;
            firstCard.alpha = 0;
            firstCard.scaleX = firstCard.scaleY = 0.01;
            var secondCard = DZCardController.CreatePokerFormPool();
            secondCard.x = start.x;
            secondCard.y = start.y;
            secondCard.alpha = 0;
            secondCard.scaleX = secondCard.scaleY = 0.01;
            firstCard.isFront = secondCard.isFront = false;
            firstCard.isAction = secondCard.isAction = false;

            DZPokerOnGameView.instance.chipAndCardContanier.addChild(firstCard);
            DZPokerOnGameView.instance.chipAndCardContanier.addChild(secondCard);            

            var userCard = [firstCard,secondCard];

            firstCard.isAction = secondCard.isAction = true;               
            egret.Tween.get(firstCard).to({x:target.x,y:target.y,rotation:DZDefine.firstCardAngle,scaleX:DZDefine.b_scale,scaleY:DZDefine.b_scale,alpha:1},DZDefine.sendCardTime)
                        .call(()=>{firstCard.isAction = false;});
            egret.Tween.get(secondCard).to({x:(target.x + DZDefine.cardDis),y:target.y,rotation:DZDefine.secondCardAngle,scaleX:DZDefine.b_scale,scaleY:DZDefine.b_scale,alpha:1},DZDefine.sendCardTime)
                        .call(()=>{secondCard.isAction = false;});

            return userCard;
    }

    /**为玩家的手牌赋值 */
    public static SetUserCardData(user:DZUser,cardValue:number[],cardType:CardType[]):void
    {
        if(user == null) return;
        var userCardArr = user.cardArr;
        if(userCardArr == null) return;
        var firstCard:DZCardView = userCardArr[0];
        var secondCard:DZCardView = userCardArr[1];
        if(firstCard == null || secondCard == null)
            return;
        firstCard.SetData(cardValue[0],cardType[0],false);
        firstCard.SetDisplay();
        secondCard.SetData(cardValue[1],cardType[1],false);
        secondCard.SetDisplay();
    }


    /**翻单个用户的手牌动画
     * @param user : 需要翻牌的用户
     * @param turnPoint : 翻牌的坐标点
     */
    public static TurnCardAnim(user:DZUser,turnPoint:egret.Point):void
    {
        if(user == null)  return;

        var userCardArr = user.cardArr;
        if(userCardArr == null) return;

        //拿到两张牌
        var firstCard:DZCardView = userCardArr[0];
        var secondCard:DZCardView = userCardArr[1];
        if(firstCard == null || secondCard == null)
            return;

        if(firstCard.isFront || secondCard.isFront)
            return;
        firstCard.isFront = true;
        secondCard.isFront = true;
        firstCard["gp_poker"].skewY = 180;
        secondCard["gp_poker"].skewY = 180;

        firstCard.x = turnPoint.x;
        firstCard.y = turnPoint.y;
        secondCard.x = turnPoint.x + DZDefine.cardDis;
        secondCard.y = turnPoint.y;
        //由于背面显示时是斜着的并且scale尺寸不合适，故调整
        firstCard.rotation = secondCard.rotation = 0;
        firstCard.scaleX = firstCard.scaleY = DZDefine.f_scale;
        secondCard.scaleX = secondCard.scaleY = DZDefine.f_scale;

        if(firstCard.isAction || secondCard.isAction)
            return;

        firstCard.isAction = secondCard.isAction = true;
        egret.Tween.get(firstCard["gp_poker"]).to({skewY:270},DZDefine.turnCardTime,egret.Ease.quadOut)
                    .call(()=>{firstCard["gp_poker_forward"].visible = true;firstCard["img_poker_back"].visible = false;})
                    .to({skewY:360},DZDefine.turnCardTime,egret.Ease.quadOut)
                    .call(()=>{firstCard.isAction = false;firstCard.isFront = true;});
        egret.Tween.get(secondCard["gp_poker"]).to({skewY:270},DZDefine.turnCardTime,egret.Ease.quadOut)
                    .call(()=>{secondCard["gp_poker_forward"].visible = true;secondCard["img_poker_back"].visible = false;})
                    .to({skewY:360},DZDefine.turnCardTime,egret.Ease.quadOut)
                    .call(()=>{secondCard.isAction = false;secondCard.isFront = true;});
    }


    /**往公共牌区域发一张牌的动画 */
    public static SendPubCardAnim(start:egret.Point,target:egret.Point):DZCardView
    {
        var poker = DZCardController.CreatePokerFormPool();
        poker.isFront = false;//先设置为反面
        poker.alpha = 0;
        poker.scaleX = poker.scaleY = 0.1;
        poker.x = start.x;
        poker.y = start.y;
        poker.isAction = false;
        DZPokerOnGameView.instance.chipAndCardContanier.addChild(poker);
        poker.isAction = true;
        egret.Tween.get(poker).to({x:target.x,y:target.y,scaleX:1,scaleY:1,alpha:1},DZDefine.sendCardTime)
                            .call(()=> {
                                                poker.isAction = false;
                                                //发完牌就让牌翻过来
                                                DZCardController.TurnPubCardAnim(poker);
                                            });
        return poker;
    }


    /**单张翻公共牌动画
     * @param poker : 哪张牌
     * @param direction : 方向
     */
    public static TurnPubCardAnim(poker:DZCardView,direction:PokerDir = PokerDir.B2F)
    {
        switch(direction)
        {
            case PokerDir.F2B:
            {
                poker.isFront = false;
                poker.isAction = true;
                egret.Tween.get(poker["gp_poker"]).to({skewY:90},DZDefine.turnCardTime,egret.Ease.quadOut)
                            .call(()=>{poker["gp_poker_forward"].visible = false;poker["img_poker_back"].visible = true;})
                            .to({skewY:180},DZDefine.turnCardTime,egret.Ease.quadOut)
                            .call(()=>{poker.isAction = false});
            }break;

            case PokerDir.B2F:
            {
                poker.isFront = true;
                poker.isAction = true;
                poker["gp_poker"].skewY = 180;
                egret.Tween.get(poker["gp_poker"]).to({skewY:270},DZDefine.turnCardTime,egret.Ease.quadOut)
                            .call(()=>{poker["gp_poker_forward"].visible = true;poker["img_poker_back"].visible = false;})
                            .to({skewY:360},DZDefine.turnCardTime,egret.Ease.quadOut)
                            .call(()=>{poker.isAction = false});
            }break;
        }
    }


    /**弃牌动画
     * @param _user : 需要弃牌的用户
     */
    public static AbandonCardAnim(user:DZUser):void
    {
        if(!user.cardArr) return;
        if(user.cardArr.length == 0) return;
        var firstCard:DZCardView = user.cardArr[0];
        var secondCard:DZCardView = user.cardArr[1];
        //弃牌的目标就是发牌点吧
        var target:egret.Point = DZPokerOnGameView.instance.cardStart;
        egret.Tween.get(firstCard).to({x:target.x,y:target.y,scaleX:0.3,scaleY:0.3,alpha:0},DZDefine.sendCardTime)
                            .call(()=> {
                                                DZPokerOnGameView.instance.chipAndCardContanier.removeChild(firstCard);
                                                firstCard.Recycle();
                                                DZCardController.RecyclePokerToPool(firstCard);
                                            });
        egret.Tween.get(secondCard).to({x:target.x,y:target.y,scaleX:0.3,scaleY:0.3,alpha:0},DZDefine.sendCardTime)
                            .call(()=> {
                                                DZPokerOnGameView.instance.chipAndCardContanier.removeChild(secondCard);
                                                secondCard.Recycle();
                                                DZCardController.RecyclePokerToPool(secondCard);
                                            });
    }

    /**获得卡牌值资源 */
    public static GetValueRes(value:number,type:CardType):string
    {
        let outStr:string = "dz_r_";
        if(type == CardType.SPADE || type == CardType.CLUB)
            outStr = "dz_b_";

        return outStr + value + "_png"; 
    }
    /**获得卡牌花色资源 */
    public static GetTypeRes(value:number,type:CardType):string
    {
        let outStr = "dz_type";
        if(value > 10)
        {
            return outStr + type + "_" + value + "_png";
        }
        return outStr + "_" + type + "_png";
    }


    //对象池相关
    public static DZ_CARD_POOLNAME:string = "DZ_CARD_POOLNAME";
    public static CreatePokerFormPool():DZCardView
    {
        return pool.ObjectPool.instance.getObj(DZCardController.DZ_CARD_POOLNAME);
    }
    public static RecyclePokerToPool(obj:DZCardView)
    {
        pool.ObjectPool.instance.pushObj(DZCardController.DZ_CARD_POOLNAME,obj);
    }



//class end
}