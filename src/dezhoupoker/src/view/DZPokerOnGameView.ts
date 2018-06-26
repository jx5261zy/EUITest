// TypeScript file

//======================================//
//          QUESTIONS：_(:3」∠)_
//======================================//

//----------2018.5.21----------
//1.服务器是怎么接收和发送数据的？通过类还是逐条解析？(貌似是类)
//2.21点如何加载所有玩家的信息？
//3.客户端是如何与服务器进行沟通的？发送消息的函数又在哪里？接收的又在哪里？
//4.BaseComponent和GameViewBase这两个类中的的方法以及成员变量如何使用？
//5.UserData中的所有静态成员是在哪里赋值的？
//6.GameTable中的users数组数据哪里赋值的？凭空变出来的啊？
//7.EXML文件的可视化编辑界面咋用···（参考Unity中的Hierarchy，不同于Unity此处每一个对象的ID是不允许相同的）
//8.Mediator类中的监听函数listNotificationInterests是如何触发的？运行逻辑是啥？
//9.每一个子游戏的default.res.json和default.thm.json在哪里加载的？
//10.updateChairInfo和updateTable貌似是每帧调用的？
//11.大厅中的子游戏按钮事件监听在哪里？

//----------2018.5.22----------
//1.在进入桌子界面之前获取的桌子上的玩家信息有哪些是有用的？
//2.21点桌子是如何做到每轮游戏调用updateChairInfo函数

//----------2018.5.23----------
//1.BJGameOnView类中725行中的中括号是什么意思？啥语法？

//----------2018.5.24----------
//1.this.usersChair_ID_map = {};//这样申请了一个容器？还是一个类啊，卧槽
//2.GameUser类中的role在什么地方给赋值的？（跟table一个地方）

//----------2018.5.25----------
//1.双下划线的成员变量有什么特殊含义？
//2.Main中LoginView是如何加载的？匿名函数太多了
//3.如何从账号密码弹窗转到大厅？

//----------2018.5.27----------
//PS：皮肤中卡牌透明是因为卡牌组件中的mask的影响
//1.测试功能时，貌似皮肤文件加载不正确，是因为未加载皮肤解释器还是皮肤所使用的资源未加载？


/**
 * class name : DeZhouPokerOnGameView
 * description : 正在编写中...   (╯°Д°)╯︵┻━┻
 * @author : 杨浩然
 * time : 2018.5.21
 */

class DZPokerOnGameView extends GameViewBase
{
    private static _instance:DZPokerOnGameView;
    public static get instance():DZPokerOnGameView
    {
        if(this._instance != null)
            return this._instance;
        else
        {
            console.log("DZPokerOnGameView 单例为空");
            return null;
        }
            
    }
    /**皮肤文件的基础路径 */
    public static skinPath:string = "resource/dezhoupoker/";
    /**卡牌以及筹码显示容器 */
    public chipAndCardContanier:egret.DisplayObjectContainer;

    /**桌子信息 */
    private _table:GameTable;
    public get table():GameTable
    {
        return this._table;
    }

    /**界面中所有的按钮 */
    private _btn_return:eui.Image;
    private _btn_drop_down:eui.Image;
    private _btn_abandon:eui.Image;
    private _btn_pass:eui.Image;
    private _btn_add:eui.Image;
    private _btn_allin:eui.Image;
    /**看上去是个组，其实就是当做按钮用的，哇哈哈哈 */
    private _gp_cingl:eui.Group;

    /**皮肤 按钮 容器 */
    private _btnContainer:ButtonContainer;
    /**公共牌容器 */
    private _pubCardContainer:Array<DZCardView>;
    /**所有玩家的手牌 */
    private _userCardContainer:Array<DZCardView[]>;
    /**发牌的起点 */
    public cardStart:egret.Point;
    private mainUser:DZUser;
    /**当前操作的玩家的椅子号 */
    private _curUser:DZUser;
    /**key 椅子号 value 用户ID 
     * 这个数组多次使用，一定要记得及时的更新这个数组中的数据
    */
    public chairID_userID:Array<number>;
    /**key 椅子号 value 用户对象 */
    public chairID_user:Array<DZUser>;
    /**庄 */
    private _banker:DZUser;
    /**大盲位 */
    private _highBland:DZUser;
    /**小盲位 */
    private _lowBland:DZUser;
    /**小盲注的下注量 */
    private _lowBetValue:number;
    /**计时器 */
    private _timer:GameTimer;
    /**最近一次下注的值 */
    public lastBetValue:number = 0;
    /**底池的值 */
    public potValue:number = 0;
    
    public constructor(_table:GameTable)
    {
        super(_table,"dezhoupoker",6);
        DZPokerOnGameView._instance = this;
        // this.load(DZPokerOnGameView.skinPath + "resource/eui_skin/game/DZPokerOnGameSkin.exml");
        this.load("resource/dezhoupoker/eui_skin/game/DZPokerOnGameSkin.exml");
    }

    
    /**销毁函数 */
    public Dispose():void
    {

    }


    //覆写父类的方法
    //override时，子类的方法访问权限应与父类相同
    protected initComponent():void
    {
        this.inited = true;

        //为各种容器申请内存
        this._pubCardContainer = new Array<DZCardView>();
        this._userCardContainer = new Array<DZCardView[]>();
        this.chipAndCardContanier = new egret.DisplayObjectContainer();
        this.addChild(this.chipAndCardContanier);

        this.cardStart = new egret.Point(this["pos_send_card"].x,this["pos_send_card"].y);
        
        //循环将桌子上的所有玩家头像框，下注框隐藏
        for(let i = 0; i < 6; i++)
        {
            this["user_" + i].visible = false;
            this["betPool_" + i].visible = false;
        }
        //隐藏底池背景
        this["betPool_pub"].visible = false;

        //创建扑克牌对象池
        pool.ObjectPool.instance.createObjectPool(DZCardController.DZ_CARD_POOLNAME,DZCardView);
        pool.ObjectPool.instance.createObjectPool(DZChipController.DZ_CHIP_POOLNAME,DZChipView);

        DZCardController.tableComponent = this;
        DZChipController.tableComponent = this;
        
        //获取皮肤中的组件
        this._btn_return = this["btn_return"];
        this._btn_drop_down = this["btn_drop_down"];
        this._btn_abandon = this["btn_abandon"];
        this._btn_pass = this["btn_pass"];
        this._btn_add = this["btn_add"];
        this._btn_allin = this["btn_allin"];
        this._gp_cingl = this["gp_cingl"];

        //增加按钮
        this._btnContainer = new ButtonContainer();
        this._btnContainer.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnBtnClick,this);
        this._btnContainer.addButton(this._btn_abandon);
        this._btnContainer.addButton(this._btn_add);
        this._btnContainer.addButton(this._btn_allin);
        this._btnContainer.addButton(this._btn_drop_down);
        this._btnContainer.addButton(this._btn_pass);
        this._btnContainer.addButton(this._btn_return);
        this._btnContainer.addButton(this._gp_cingl);
        
        //底部操作条移动至摄像机视野外
        this["gp_operation_btns"].y = 750;
        this.updateChairInfo(this._gameTable);

    }


    /**计时器回调 */
    protected onTimer(timerID: number,remainTime:number):void
    {
        switch(timerID)
        {
            case DZDefine.Bland_Timer://自动下盲注的计时器
                if(remainTime <= 0)
                {
                    this.GetBland();
                    this._lowBland.Bet(this._lowBetValue);
                    console.log(this._lowBland.nickname + "下小盲注");
                    // this._highBland.Bet(this._lowBetValue * 2);
                    this._highBland.Bet(this.lastBetValue * 2);
                    console.log(this._highBland.nickname + "下大盲注");

                    this.stopTimer(DZDefine.Bland_Timer);
                    Main.instance.isBlindEnd = true;
                    Main.instance.lastOpChairID = this._highBland.chairID;
                }
            break;

            case DZDefine.Rob_Operate_Timer://机器人操作时间
                if(remainTime < 11 && !Main.instance.isUserOpEnd)
                {
                    var opType:UserOp;
                    var addValue:number;
                    var random = Math.random();
                    if(random <= 0.1)
                    {
                        opType = UserOp.ADD;
                        addValue = 20;
                    }
                    else if(random > 0.1 && random < 0.7)
                        opType = UserOp.CINGL;
                    else if(random >= 0.7)
                        opType = UserOp.ABANDON;
                    // opType = UserOp.ABANDON;

                    this.RobOperation(this._curUser,opType,addValue);
                    this.stopTimer(DZDefine.Rob_Operate_Timer);
                    Main.instance.isUserOpEnd = true;

                }
            break;

            case DZDefine.TurnCard_Timer://主玩家翻牌计时器
                if(remainTime <= 0)
                {
                    var turnPoint = this.GetUserFrontCardPos(this.mainUser.chairID);
                    DZCardController.TurnCardAnim(this.mainUser,turnPoint);
                    this.stopTimer(DZDefine.TurnCard_Timer);
                }
            break;
            
            case DZDefine.RecycleChips_Timer://回收玩家显示的筹码对象，在这里做的原因是匿名函数的局部变量存活周期与移除代码不匹配，会导致内存为空，移除报错
                if(remainTime <= 0)
                {
                    this.stopTimer(DZDefine.RecycleChips_Timer);
                    for(var key in DZPokerOnGameView.instance.table.users)
                    {
                        var user = DZPokerOnGameView.instance.table.users[key] as DZUser;
                        if(user.chip == null) continue;
                        if(DZPokerOnGameView.instance.chipAndCardContanier.contains(user.chip))
                            DZPokerOnGameView.instance.chipAndCardContanier.removeChild(user.chip);
                        DZChipController.RecycleChipToPool(user.chip);
                        user.chip = null;
                    }
                }
            break;

        }
    }


    /**游戏进程计时器回调
     * 只有一个，记录从游戏开始到一局游戏结束的整个时间过程 */
    protected onGameTimer(chairID:number,timerID: number,remainTime:number)
    {
        switch(timerID)
        {
            case DZDefine.Operation_Timer:
                if(remainTime < 3 && !Main.instance.isUserOpEnd)
                {
                    console.log("玩家操作");
                    this._curUser.HideOperationBar();
                    this.HideOperateBtns();
                    Main.instance.isUserOpEnd = true;
                    this.stopGameTimer();
                }
            break;
        }
    }



    /**翻单个用户的手牌动画
     * @param chairID : 需要翻牌的椅子号
     */
    public TurnCardAnim(chairID:number):void
    {
        var userID = this.chairID_userID[chairID];
        var user = this._table.getUser(userID) as DZUser;
        var turnPoint:egret.Point = this.GetUserFrontCardPos(chairID);
        DZCardController.TurnCardAnim(user,turnPoint);
    }

    /**翻公共牌动画 
     * @param index:牌在组里的下标
     * @param direction:翻转的方向，1由正->反  2由反->正
     */
    public TurnPubCardAnim(index:number,direction:PokerDir = PokerDir.B2F):void
    {
        var poker = this._pubCardContainer[index];
        if(poker == null || poker.isFront || poker.isAction)
            return;
        DZCardController.TurnPubCardAnim(poker);
    }


    /**发庄logo */
    public SendBankerLogoAnim(chairID:number):void
    {
        var start:egret.Point = new egret.Point(this.width / 2,this.height / 2);
        var logo:eui.Image = new eui.Image("dz_zhuang_png");
        this.addChild(logo);
        logo.x = start.x;
        logo.y = start.y;
        logo.width = logo.height = 20;
        logo.name = "img_zhuang";

        var target:egret.Point = this.GetBankerLogoPos(chairID);
        egret.Tween.get(logo).to({x:target.x,y:target.y},DZDefine.sendBankerTime);
    }


    /**获得庄logo该去的位置
     * @param chairID ： 椅子号
     */
    public GetBankerLogoPos(chairID:number):egret.Point
    {
        //在桌子右边的玩家特殊处理
        if(chairID == 1)
        {
            return new egret.Point(1095,428);
        }
        //约束后会让获得的组件的坐标为零，所以要用帧末的数据，傻逼设计
        this.validateNow();
        var user = this.GetUserByChairID(chairID);
        var head = user.headComponent;
        var point = new egret.Point(head.x + DZDefine.b_logoOffsetHeadX,head.y + DZDefine.b_logoOffsetHeadY);
        return point;
    }


    /**获取玩家的展示手牌时的位置 */
    public GetUserFrontCardPos(chairID:number,isMainUser:boolean = false):egret.Point
    {
        //约束后会让获得的组件的坐标为零，所以要用帧末的数据，傻逼设计
        this.validateNow();
        var user = this.GetUserByChairID(chairID);
        if(user == null) return;
        var head = user.headComponent;
        if(head == null)
            return null;
        var point = new egret.Point(head.x + DZDefine.f_cardOffsetHeadX,head.y + DZDefine.f_cardOffsetHeadY);
        return point;
    }


    /**根据情况显示不同的操作按钮
     * @param status:不同情况
     */
    public SetOperationBtnsDisplay(status:number,cinglNum?:number):void
    {   
        //先把所有的按钮都隐藏
        this._btn_add.visible = false;
        this._btn_allin.visible = false;
        this._btn_pass.visible = false;
        this._gp_cingl.visible = false;
        //然后根据传入的状态显示该显示的按钮
        switch(status)
        {
            case DZDefine.ABANDON_CINGL_ADD:
                this._gp_cingl.visible = true;
                //将之前无效化过的按钮激活
                if(!this._gp_cingl.touchEnabled)
                    this._btnContainer.setBtnEnabled(this._gp_cingl,true);
                if(cinglNum != 0 && cinglNum != undefined)
                    this["cingl_num"].text = cinglNum;
                this._btn_add.visible = true;
            break;

            case DZDefine.ABANDON_CINGL_ALLIN:
                this._gp_cingl.visible = true;
                //全下的状态下是不可以选择跟注的，所以无效化按钮
                this._btnContainer.setBtnEnabled(this._gp_cingl,false,true);
                this._btn_allin.visible = true;
            break;

            case DZDefine.ABANDON_PASS_ADD:
                this._btn_pass.visible = true;
                this._btn_add.visible = true;
            break;
        }
    }

    /**底部操作条上升 */
    public ShowOperateBtns():void
    {
        var bottom:eui.Group = this["gp_operation_btns"];
        egret.Tween.get(bottom).to({x:0,y:650},DZDefine.operationBtns)
                            .call(()=>{bottom.touchChildren = true});//移动完毕让所有的按钮都为可以点击
    }
    /**隐藏底部操作按钮 按钮下沉*/
    private HideOperateBtns():void
    {
        var bottom:eui.Group = this["gp_operation_btns"]; 
        bottom.touchChildren = false;//在隐藏时让所有的按钮都无法点击
        egret.Tween.get(bottom).to({x:0,y:750},DZDefine.operationBtns);
    }


    /**往公共牌区域发一张牌的动画 */
    public SendPubCard():DZCardView
    {
        if(this._pubCardContainer.length >= 5)
            return null;
        var start:egret.Point = new egret.Point(this.cardStart.x,this.cardStart.y);
        var target = this.GetPubTargetPos();
        var poker = DZCardController.SendPubCardAnim(start,target);
        this._pubCardContainer.push(poker);
        return poker;
    }


    /**公共牌的数量，由于没有获得子节点的方法，所以申请变量自行控制 */
    /**获取公共牌发送的目标点，用于Tween动画 */
    public GetPubTargetPos():egret.Point
    {
        var point:egret.Point = new egret.Point;
        point.x = this["gp_public_cards"].x;
        point.y = this["gp_public_cards"].y;
        var cardW:number = 116;
        point.x = point.x + cardW * this._pubCardContainer.length;
        return point;
    }


    /**播放发所有玩家手牌的动画 */
    public SendUsersCardsAnim()
    {

    }


    /**为玩家的手牌赋值 */
    public SetUserCardData(chairID:number,cardValue:number[],cardType:CardType[]):void
    {
        var userID = this.chairID_userID[chairID];
        var user = this._table.getUser(userID) as DZUser;
        DZCardController.SetUserCardData(user,cardValue,cardType);
    }


    /**获取玩家的手牌发送目标位置 背面 */
    public GetUserBackCardPos(chairID:number,isMainUser:boolean = false):egret.Point
    {
        //约束后会让获得的组件的坐标为零，所以要用帧末的数据，傻逼设计
        this.validateNow();
        var user = this.GetUserByChairID(chairID);
        var head = user.headComponent;
        if(head == null)
            return null;

        var point = new egret.Point(head.x + DZDefine.b_cardOffsetHeadX,head.y + DZDefine.b_cardOffsetHeadY);
        return point;
    }



    /**更新所有用户的数据信息 */
    private UpdateChairData(_table:GameTable):void
    {
        if([null,undefined].indexOf(_table) != -1)
            return;
        if([null,undefined].indexOf(this._gameTable) != -1)
            this._table = new GameTable(_table.tableID);
        else
            this._table = new GameTable(_table.tableID);
        if(this._table.tableID != _table.tableID)
            this._table.tableID = _table.tableID;

        for(var key in _table.users)//用法跟键值对一样
        {
            var _user:GameUser = _table.users[key];
            var dz_user:DZUser = this._table.users[key];

            //如果这个人的数据已经存在于桌子类中的用户容器中，就直接给赋值就好了
            if(dz_user && dz_user.chairID == _user.chairID)
            {
                dz_user.role = _user.role;
                dz_user.status = _user.status;
                dz_user.tableID = _user.tableID;
                dz_user.chairID = _user.chairID;
                dz_user.nickname = _user.nickname;
            }
            else
            {
                if(dz_user)
                {
                    //TODO：
                }
                //如果不存在那就new一个呗，然后添加进去
                dz_user = new DZUser(_user.userID,_user.tableID,_user.chairID,_user.role);
                dz_user.gold = _user.gold;
                dz_user.nickname = _user.nickname;
                dz_user.status = _user.status;
                //给桌子添加玩家
                this._table.addUser(dz_user);

                if(_user.userID == UserData.userID)
                    this.mainUser = dz_user;
            }
        }

    }


    /**更新皮肤中头像框组件的显示 */
    public updateChairInfo(_table:GameTable):void
    {
        this.UpdateChairData(_table);
        if(this._table)
        {
            this.chairID_userID = new Array<number>();
            for(var key in this._table.users)
            {
                this.chairID_userID[this._table.users[key].chairID + ''] = this._table.users[key].userID;
                if(this.inited)
                {
                    var id = this._table.users[key].chairID;
                    var user:DZUser = this._table.users[key];
                    user.direction = id;//桌子的方位
                    if(id >= 0 && id <= 5)
                    {
                        var component = this["user_" + id];
                        if(component == null)
                        {
                            console.log("空组件");
                            return;
                        }
                        user.InitFaceGroup(this["user_" + id]);
                        user.betPool = this["betPool_" + user.chairID];
                    }
                }
            }
        }
    }


    /**获得盲注位 */
    private GetBland():void
    {
        var index = this._banker.chairID;
        index++;
        //获得小盲位
        while(true)
        {
            if(index > 5)
                index = 0;
            var userID = this.chairID_userID[index];
            var _low:DZUser = this._table.getUser(userID) as DZUser;
            if(_low != null)
            {
                this._lowBland = _low;
                break;
            }
            index++;
        }
        index++;
        //获得大盲位
        while(true)
        {
            if(index > 5)
                index = 0;
            var userID = this.chairID_userID[index];
            var _high = this._table.getUser(userID) as DZUser;
            if(_high != null)
            {
                this._highBland = _high;
                break;
            }    
        }

    }


    /**所有的按键回调 */
    private OnBtnClick(evt:egret.Event):void
    {
        switch(evt.data)
        {
            case this._btn_add:
                console.log("点击了加注按钮");
            break;

            case this._btn_abandon:
                this._curUser.Abandon();
                this.HideOperateBtns();
                DZChipController.MoveUserChipToPot(this._curUser);
                Main.instance.isUserOpEnd = true;
                console.log("点击了弃牌按钮");
            break;

            case this._btn_allin:
                console.log("点击了全下按钮");
            break;

            case this._btn_drop_down:
                console.log("点击了下拉菜单按钮");
            break;

            case this._btn_pass:
                console.log("点击了过牌按钮");
            break;

            case this._btn_return:
                console.log("点击了返回按钮");
            break;

            case this._gp_cingl:
                var cinglValue = this.lastBetValue - this._curUser.betValue;
                this._curUser.Bet(cinglValue);
                this.stopGameTimer();
                this.HideOperateBtns();
                Main.instance.isUserOpEnd = true;
                console.log("点击了跟按钮,跟注" + cinglValue);
            break;
        }
    }


    /**用户操作 */
    public UserOperation():void
    {
        
    }


    /**展开下拉菜单 */
    private ShowDropDownView():void
    {

    }
    private HideDropDownView():void
    {
        
    }


    /**退出游戏 */
    public QuitGame()
    {

    }

    /**根据玩家椅子号获得玩家对象 */
    public GetUserByChairID(chairID:number):DZUser
    {
        if(chairID < 0 || chairID > 5) return;
        var userID = this.chairID_userID[chairID];
        var user = this._table.getUser(userID) as DZUser;
        return user;
    }


    //----------SC_CMD_FUNC-----------
    
    /**开始盲注 */
    public SC_StartGame(packet:any):void
    {
        this._lowBetValue = packet.iLowBetValue;
        var banker = this.GetUserByChairID(packet.iBankerID);
        banker.isBanker = true;
        this._banker = banker;
        this.SendBankerLogoAnim(banker.chairID);
        this.GetBland();
        this.setTimer(DZDefine.Bland_Timer,DZDefine.sendBankerTime / 1000);//下盲注
        
    }


    /**盲注结束 发手牌 */
    public SC_Blind_END_SendCard(packet:any):void
    {
        Main.instance.isSendUserCard = true;
        for(let i = 0; i < this.chairID_userID.length; i++)
        {
            var user:DZUser = this.GetUserByChairID(i);
            if(user.isAbandon) continue;//如果玩家弃牌了，就不发了
            var target:egret.Point = this.GetUserBackCardPos(user.chairID);
            user.cardArr = DZCardController.SendUserCardsAnim(this.cardStart,target);
        }
        //发完手牌主玩家的牌要翻转
        this.setTimer(DZDefine.TurnCard_Timer,DZDefine.sendCardTime / 1000 + 0.2);
    }

    public SC_SendPubCard()
    {
        this.SendPubCard();
    }

    /**翻开所有手牌 */
    public SC_TurnAllUserCards()
    {
        for(let i = 0; i < this.chairID_userID.length; i++)
        {
            var user = this.GetUserByChairID(i);
            var target:egret.Point = this.GetUserFrontCardPos(user.chairID);
            DZCardController.TurnCardAnim(user,target);
            console.log(user.nickname + "翻开手牌");
        }
    }

    
    /**玩家操作 */
    public SC_User_Operation(packet:any)
    {
        this._curUser = this.GetUserByChairID(packet.iCurChairID);
        
        var opType:UserOp = packet.iOpType;
        var addValue:number = packet.iAddValue;
        //如果可以加注，则加注按钮的位图文本显示的数字
        var cinglNum = this.lastBetValue - this._curUser.betValue;
        if(cinglNum <= 0) cinglNum = 0;
        if(this._curUser != this.mainUser)
        {
            this.setTimer(DZDefine.Rob_Operate_Timer,DZDefine.iOperateTime);
            this._curUser.StartOperationBarAnim(DZDefine.iOperateTime);
        }
        else
        {
            //判断状态给底部操作栏显示状态
            if(this._curUser.gold <= this.lastBetValue)//如果玩家的钱不够或者刚好时
            {
                this.SetOperationBtnsDisplay(DZDefine.ABANDON_CINGL_ALLIN);
            }
            else if(this.lastBetValue == 0)//如果最近的下注为零，代表可以过牌
            {
                this.SetOperationBtnsDisplay(DZDefine.ABANDON_PASS_ADD);
            }
            else if(this._curUser.gold > this.lastBetValue)//如果玩家的钱够跟注时
            {
                this.SetOperationBtnsDisplay(DZDefine.ABANDON_CINGL_ADD,cinglNum);
            }

            this.ShowOperateBtns();
            this.mainUser.StartOperationBarAnim(DZDefine.iOperateTime);
            this.setGameTimer(this.mainUser.chairID,DZDefine.Operation_Timer,DZDefine.iOperateTime);
        }
    }


    /**一轮下注结束，移动所有玩家筹码入底池 */
    public SC_BetEnd()
    {
        DZChipController.MoveAllChipsToPot();
        //设置一个计时器用于回收玩家筹码的内存
        this.setTimer(DZDefine.RecycleChips_Timer,DZDefine.sendChipTime / 1000 + 0.2);
    }

    //--------------------------------



    //*********** 测试使用代码 **********//
    private SetBanker(chairID:number):void
    {
        var userID = this.chairID_userID[chairID];
        var user = this._table.getUser(userID) as DZUser;
        user.isBanker = true;
        this._banker = user;
        console.log(user.nickname + "是庄家");
    }

    private RobOperation(user:DZUser,opType:UserOp,addValue?:number)
    {
        switch(opType)
        {
            case UserOp.ABANDON:
                this._curUser.Abandon();
                DZChipController.MoveUserChipToPot(this._curUser);
                console.log(this._curUser.nickname + "弃牌");
            break;

            case UserOp.ADD:
                var cinglValue = this.lastBetValue - this._curUser.betValue;
                this._curUser.Bet(cinglValue + addValue);
                console.log(this._curUser.nickname + "加注" + addValue);
            break;

            case UserOp.CINGL:
                var cinglValue = this.lastBetValue - this._curUser.betValue;
                this._curUser.Bet(cinglValue);
                console.log(this._curUser.nickname + "跟");
            break;
        }
    }

    public PrintInfo()
    {
        console.log("=====最近一次的下注量：" + this.lastBetValue);
        console.log("=====底池的值：" + this.potValue);
        if(this._curUser != null) console.log("=====当前操作的玩家昵称：" + this._curUser.nickname);
        if(this._curUser != null) console.log("=====当前操作玩家的下注量：" + this._curUser.betValue);
    }




//class end
}


/**扑克牌的翻转方向 */
enum PokerDir
{
    F2B,
    B2F,
}


/**卡牌的花色 */
enum CardType
{
    DIAMONDS,
    CLUB,
    HEART,
    SPADE,
}