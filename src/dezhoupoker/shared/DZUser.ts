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
    /**手牌数组 */
    public cardArr:DZCardView[];
    /**筹码显示组件 */
    public chip:DZChipView;
    /**记住上一次的筹码，方便清理内存以及清理显示 */
    public tmpChip:DZChipView;

    /**头像组件 */
    private img_bg:eui.Image;
    private lb_name:eui.Label;
    private lb_gold:eui.Label;
    private img_faceID:eui.Image;
    /**头像框中的时间条 */
    private img_time_bar:eui.Image;
    /**对应的下注池 */
    public gp_betPool:eui.Group;
    /**头像框的倒计时条 */
    private _borderProgressBarDraw:BorderProgressBarDraw;

    private _isFaceGropuInited:boolean = false;

    public constructor(_userID:number,_tableID:number,_chairID:number,_role:any,bet:eui.Group)
    {
        super(_userID,_tableID,_chairID,_role);
        this.gp_betPool = bet;
    }


    /** 初始化控件
     *  包括给所有成员变量赋值，以及头像框各控件的赋值
     */
    public Init(_component:eui.Component)
    {
        this.headComponent = _component;
        this.headComponent.visible = true;
        //初始化组件变量(多此一举)
        // this.img_bg = this.headComponent.getChildByName("img_bg") as eui.Image;
        this.img_bg = this.headComponent["img_bg"];
        this.lb_name = this.headComponent["lb_name"];
        this.lb_gold = this.headComponent["lb_gold"];
        this.img_faceID = this.headComponent["img_faceID"];
        this.img_time_bar = this.headComponent["img_time_bar"];


        //TODO ：倒计时条
        var barW = this.img_time_bar.width;
        var barH = this.img_time_bar.height;
        this._borderProgressBarDraw = new BorderProgressBarDraw(this.img_time_bar,barW,barH);

        Utils.loadHeadImg(this.role.iFaceUrl,this.img_bg);//加载用户头像，这个方法不清楚怎么实现的
        this.headComponent.touchChildren = false;
        this.headComponent.touchEnabled = true;
        //TODO：给头像组件增加点击监听
        this.lb_name.text = Utils.cutStrWithDot(this.nickname,8);
        this.ShowHeadGold();
        if(this.userID == UserData.userID)
        {
            //TODO：播放头像框高亮动画
            //TODO：播放音乐
        }


    }


    /**初始化组件中的各个控件的数据 */
    public InitFaceGroup(_component:eui.Component):void
    {
        this.Init(_component);
        if(this._isFaceGropuInited)
            return;
        this._isFaceGropuInited = true;
    }

    
    /**显示头像框中的金币数量 */
    private ShowHeadGold()
    {
        if(this.headComponent)
            this.lb_gold.text = Utils.numberFormat(this.gold,2);//gold数据在第一次服务器发送时就已经存在了
    }


    /**头像框高亮动画 提醒玩家在桌子的哪个位置 */
    public ShowUserTablePosAnim()
    {

    }
    

    /**点击头像回调函数 */
    public OnHeadClick()
    {

    }


    /**显示头像遮罩 */
    public ShowHeadMask():void
    {

    }
    /**隐藏头像遮罩 */
    public HideHeadMask():void
    {

    }


    /**下注 */
    public Bet(value:number)
    {
        if(this.gold < value)
        {
            console.log("金币不足");
            return;
        }
        if(this.chip != null)
        {
            this.tmpChip = this.chip;
        }
        this.chip = DZChipController.MoveUserChip(this);
        this.chip.value = value;
        this.gold -= value;
        this.ShowHeadGold();
        // this.gp_betPool["lb_chip_" + this.chairID].text = value;
        var label:eui.Label = this.gp_betPool.getChildByName("lb_chip_" + this.chairID) as eui.Label;
        if(label == null) console.log("label是空的");
        else label.text = value + "";
        this.chip.SetDisplay();
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

    
    /**改变玩家的操作状态  弃牌，加注，跟注，让牌，全下 */
    public ChangeState()
    {
        
    }


//class end
}