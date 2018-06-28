// TypeScript file

/**
 * class name : DZUser
 * description : 德州扑克玩家头像框皮肤控制脚本,以及相应的一些玩家信息保存
 * author : 杨浩然
 * time : 2018.5.22
 */
class DZUser extends GameUser
{
    public headComponent:eui.Component;

    public isAbandon:boolean = false;
    public isBanker:boolean = false;
    public isAllin:boolean = false;
    /**手牌数组 */
    public cardArr:DZCardView[];
    /**筹码显示组件 */
    public chip:DZChipView;
    /**记住上一次的筹码，方便清理内存以及清理显示 */
    public lastChip:DZChipView;
    /**一轮下注的金额  (一轮下注结束时记得要清零) */
    public betValue:number = 0;
    /**一轮操作的结果 */
    public operationResult:UserOp;

    /**头像组件 */
    private img_bg:eui.Image;
    private lb_name:eui.Label;
    private lb_gold:eui.Label;
    private img_faceID:eui.Image;
    private img_add:eui.Image;
    private img_abandon:eui.Image;
    private img_allin:eui.Image;
    private img_thinking:eui.Image;
    /**头像框中的时间条 */
    private img_time_bar:eui.Image;
    /**对应的下注池 */
    public betPool:eui.Component;
    /**头像框的倒计时条 */
    private _borderProgressBarDraw:BorderProgressBarDraw;

    private _isFaceGropuInited:boolean = false;

    public constructor(_userID:number,_tableID:number,_chairID:number,_role:any)
    {
        super(_userID,_tableID,_chairID,_role);
    }


    /** 初始化控件
     *  包括给所有成员变量赋值，以及头像框各控件的赋值
     */
    public Init(_component:eui.Component)
    {
        this.headComponent = _component;
        this.headComponent.visible = true;
        //初始化组件变量
        this.img_bg = this.headComponent["img_bg"];
        this.lb_name = this.headComponent["lb_name"];
        this.lb_gold = this.headComponent["lb_gold"];
        this.img_faceID = this.headComponent["img_faceID"];
        this.img_time_bar = this.headComponent["img_time_bar"];
        this.img_add = this.headComponent["img_add"];
        this.img_abandon = this.headComponent["img_abandon"];
        this.img_allin = this.headComponent["img_allin"];
        this.img_thinking = this.headComponent["img_thinking"];

        var barW = this.img_time_bar.width;
        var barH = this.img_time_bar.height;
        this._borderProgressBarDraw = new BorderProgressBarDraw(this.img_time_bar,barW,barH);

        Utils.loadHeadImg(this.role.iFaceUrl,this.img_bg);//加载用户头像，这个方法不清楚怎么实现的
        this.headComponent.touchChildren = false;
        this.headComponent.touchEnabled = true;
        this.headComponent.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnHeadClick,this);
        this.lb_name.text = Utils.cutStrWithDot(this.nickname,8);
        this.ShowHeadGold();
    }


    /**初始化组件中的各个控件的数据 */
    public InitFaceGroup(_component:eui.Component):void
    {
        if(this._isFaceGropuInited)
            return;
        this._isFaceGropuInited = true;
        this.Init(_component);
    }

    
    /**显示头像框中的金币数量 */
    private ShowHeadGold()
    {
        if(this.headComponent)
            this.lb_gold.text = Utils.numberFormat(this.gold,2);//gold数据在第一次服务器发送时就已经存在了
    }
    
    /**点击头像回调函数 */
    public OnHeadClick()
    {
        console.log("你点击了" + this.nickname + "的头像");
    }


    /**显示头像遮罩 */
    public ShowHeadMask():void
    {
        this.headComponent["img_head_mask"].visible = true;
    }
    /**隐藏头像遮罩 */
    public HideHeadMask():void
    {
        this.headComponent["img_head_mask"].visible = false;
    }


    /**下注 */
    public Bet(value:number)
    {
        if(value <= 0) return;
        if(this.gold < value)
        {
            console.log("金币不足");
            return;
        }
        if(this.chip != null)
        {
            this.lastChip = this.chip;
        }
        this.chip = DZChipController.UserBet(this);
        this.betValue += value;
        //更新最后一次的下注量
        DZPokerOnGameView.instance.lastBetValue = this.betValue;
        this.betPool["lb_chip_value"].text = this.betValue;
        this.chip.value = this.betValue;
        this.gold -= value;
        this.ShowHeadGold();
        this.chip.SetDisplay();

        this.HideOperationBar();
    }


    /**弃牌 */
    public Abandon()
    {
        this.ShowHeadMask();
        this.isAbandon = true;
        DZCardController.AbandonCardAnim(this);
        this.HideOperationBar();
    }


    /**开始头像框操作进度条倒计时动画 */
    public StartOperationBarAnim(_time:number):void
    {
        this._borderProgressBarDraw.startDraw(_time);
        this.img_time_bar.visible = true;
    }
    /**结束头像框操作进度条倒计时动画 */
    public EndOperationBarAnim()
    {
        this._borderProgressBarDraw.clearDraw();
        this.img_time_bar.visible = false;
    }
    /**隐藏头像框操作进度条倒计时条 */
    public HideOperationBar()
    {
        this._borderProgressBarDraw.stopDraw();
        this.img_time_bar.visible = false;
    }


    /**清除用户数据 */
    public ResetData():void
    {
        this.HideOperationBar();//隐藏计时条
        this.betPool.visible = false;//桌面下注的组件隐藏
        this.betPool = null;
        this.betValue = 0;
        this.isBanker = false;
        this.isAbandon = false;
        //如果显示容器包含该用户筹码，清除，并回收对象池
        if(DZPokerOnGameView.instance.chipAndCardContanier.contains(this.chip))
            DZPokerOnGameView.instance.chipAndCardContanier.removeChild(this.chip);
        if(this.chip != null)
            DZChipController.RecycleChipToPool(this.chip);
        //保存上次筹码的变量也做一样的上述操作
        if(DZPokerOnGameView.instance.chipAndCardContanier.contains(this.lastChip))
            DZPokerOnGameView.instance.chipAndCardContanier.removeChild(this.lastChip);
        if(this.lastChip != null)
            DZChipController.RecycleChipToPool(this.lastChip);
        //移除卡牌的显示以及卡牌回收对象池
        if(this.cardArr)
        {
            if(DZPokerOnGameView.instance.chipAndCardContanier.contains(this.cardArr[0]) && DZPokerOnGameView.instance.chipAndCardContanier.contains(this.cardArr[1]))
            {
                DZPokerOnGameView.instance.chipAndCardContanier.removeChild(this.cardArr[0]);
                DZPokerOnGameView.instance.chipAndCardContanier.removeChild(this.cardArr[1]);
            }
            DZCardController.RecyclePokerToPool(this.cardArr[0]);
            DZCardController.RecyclePokerToPool(this.cardArr[1]);
        }
    }


    /**显示操作结果 */
    public ShowOperationResult()
    {
        this.lb_name.visible = false;
        switch(this.operationResult)
        {
            case UserOp.NONE:

            break;

            case UserOp.PASS:

            break;

            case UserOp.ADD:
                this.img_add.visible = true;
            break;

            case UserOp.ABANDON:
                this.img_abandon.visible = true;
            break;

            case UserOp.CINGL:

            break;

            case UserOp.ALLIN:
                this.img_allin.visible = true;
            break;

            case UserOp.THINKING:
                this.img_thinking.visible = true;
            break;
        }
    }
    public HideOperationResult()
    {
        //把名字显示出来
        this.lb_name.visible = true;
        //然后把所有的操作状态的字体隐藏
        this.img_add.visible = false;
        this.img_abandon.visible = false;
        this.img_allin.visible = false;
        this.img_thinking.visible = false;
    }



//class end
}

enum UserOp
{
    NONE,
    THINKING,
    PASS,
    ABANDON,
    CINGL,
    ADD,
    ALLIN,
}