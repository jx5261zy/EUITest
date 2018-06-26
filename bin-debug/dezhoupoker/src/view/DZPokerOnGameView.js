// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var DZPokerOnGameView = (function (_super) {
    __extends(DZPokerOnGameView, _super);
    function DZPokerOnGameView(_table) {
        var _this = _super.call(this, _table, "dezhoupoker", 6) || this;
        /**最近一次下注的值 */
        _this.lastBetValue = 0;
        /**底池的值 */
        _this.potValue = 0;
        DZPokerOnGameView._instance = _this;
        // this.load(DZPokerOnGameView.skinPath + "resource/eui_skin/game/DZPokerOnGameSkin.exml");
        _this.load("resource/dezhoupoker/eui_skin/game/DZPokerOnGameSkin.exml");
        return _this;
    }
    Object.defineProperty(DZPokerOnGameView, "instance", {
        get: function () {
            if (this._instance != null)
                return this._instance;
            else {
                console.log("DZPokerOnGameView 单例为空");
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DZPokerOnGameView.prototype, "table", {
        get: function () {
            return this._table;
        },
        enumerable: true,
        configurable: true
    });
    /**销毁函数 */
    DZPokerOnGameView.prototype.Dispose = function () {
    };
    //覆写父类的方法
    //override时，子类的方法访问权限应与父类相同
    DZPokerOnGameView.prototype.initComponent = function () {
        this.inited = true;
        //为各种容器申请内存
        this._pubCardContainer = new Array();
        this._userCardContainer = new Array();
        this.chipAndCardContanier = new egret.DisplayObjectContainer();
        this.addChild(this.chipAndCardContanier);
        this.cardStart = new egret.Point(this["pos_send_card"].x, this["pos_send_card"].y);
        //循环将桌子上的所有玩家头像框，下注框隐藏
        for (var i = 0; i < 6; i++) {
            this["user_" + i].visible = false;
            this["betPool_" + i].visible = false;
        }
        //隐藏底池背景
        this["betPool_pub"].visible = false;
        //创建扑克牌对象池
        pool.ObjectPool.instance.createObjectPool(DZCardController.DZ_CARD_POOLNAME, DZCardView);
        pool.ObjectPool.instance.createObjectPool(DZChipController.DZ_CHIP_POOLNAME, DZChipView);
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
        this._btnContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnBtnClick, this);
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
    };
    /**计时器回调 */
    DZPokerOnGameView.prototype.onTimer = function (timerID, remainTime) {
        switch (timerID) {
            case DZDefine.Bland_Timer:
                if (remainTime <= 0) {
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
            case DZDefine.Rob_Operate_Timer:
                if (remainTime < 11 && !Main.instance.isUserOpEnd) {
                    var opType;
                    var addValue;
                    var random = Math.random();
                    if (random <= 0.1) {
                        opType = UserOp.ADD;
                        addValue = 20;
                    }
                    else if (random > 0.1 && random < 0.7)
                        opType = UserOp.CINGL;
                    else if (random >= 0.7)
                        opType = UserOp.ABANDON;
                    // opType = UserOp.ABANDON;
                    this.RobOperation(this._curUser, opType, addValue);
                    this.stopTimer(DZDefine.Rob_Operate_Timer);
                    Main.instance.isUserOpEnd = true;
                }
                break;
            case DZDefine.TurnCard_Timer:
                if (remainTime <= 0) {
                    var turnPoint = this.GetUserFrontCardPos(this.mainUser.chairID);
                    DZCardController.TurnCardAnim(this.mainUser, turnPoint);
                    this.stopTimer(DZDefine.TurnCard_Timer);
                }
                break;
            case DZDefine.RecycleChips_Timer:
                if (remainTime <= 0) {
                    this.stopTimer(DZDefine.RecycleChips_Timer);
                    for (var key in DZPokerOnGameView.instance.table.users) {
                        var user = DZPokerOnGameView.instance.table.users[key];
                        if (user.chip == null)
                            continue;
                        if (DZPokerOnGameView.instance.chipAndCardContanier.contains(user.chip))
                            DZPokerOnGameView.instance.chipAndCardContanier.removeChild(user.chip);
                        DZChipController.RecycleChipToPool(user.chip);
                        user.chip = null;
                    }
                }
                break;
        }
    };
    /**游戏进程计时器回调
     * 只有一个，记录从游戏开始到一局游戏结束的整个时间过程 */
    DZPokerOnGameView.prototype.onGameTimer = function (chairID, timerID, remainTime) {
        switch (timerID) {
            case DZDefine.Operation_Timer:
                if (remainTime < 3 && !Main.instance.isUserOpEnd) {
                    console.log("玩家操作");
                    this._curUser.HideOperationBar();
                    this.HideOperateBtns();
                    Main.instance.isUserOpEnd = true;
                    this.stopGameTimer();
                }
                break;
        }
    };
    /**翻单个用户的手牌动画
     * @param chairID : 需要翻牌的椅子号
     */
    DZPokerOnGameView.prototype.TurnCardAnim = function (chairID) {
        var userID = this.chairID_userID[chairID];
        var user = this._table.getUser(userID);
        var turnPoint = this.GetUserFrontCardPos(chairID);
        DZCardController.TurnCardAnim(user, turnPoint);
    };
    /**翻公共牌动画
     * @param index:牌在组里的下标
     * @param direction:翻转的方向，1由正->反  2由反->正
     */
    DZPokerOnGameView.prototype.TurnPubCardAnim = function (index, direction) {
        if (direction === void 0) { direction = PokerDir.B2F; }
        var poker = this._pubCardContainer[index];
        if (poker == null || poker.isFront || poker.isAction)
            return;
        DZCardController.TurnPubCardAnim(poker);
    };
    /**发庄logo */
    DZPokerOnGameView.prototype.SendBankerLogoAnim = function (chairID) {
        var start = new egret.Point(this.width / 2, this.height / 2);
        var logo = new eui.Image("dz_zhuang_png");
        this.addChild(logo);
        logo.x = start.x;
        logo.y = start.y;
        logo.width = logo.height = 20;
        logo.name = "img_zhuang";
        var target = this.GetBankerLogoPos(chairID);
        egret.Tween.get(logo).to({ x: target.x, y: target.y }, DZDefine.sendBankerTime);
    };
    /**获得庄logo该去的位置
     * @param chairID ： 椅子号
     */
    DZPokerOnGameView.prototype.GetBankerLogoPos = function (chairID) {
        //在桌子右边的玩家特殊处理
        if (chairID == 1) {
            return new egret.Point(1095, 428);
        }
        //约束后会让获得的组件的坐标为零，所以要用帧末的数据，傻逼设计
        this.validateNow();
        var user = this.GetUserByChairID(chairID);
        var head = user.headComponent;
        var point = new egret.Point(head.x + DZDefine.b_logoOffsetHeadX, head.y + DZDefine.b_logoOffsetHeadY);
        return point;
    };
    /**获取玩家的展示手牌时的位置 */
    DZPokerOnGameView.prototype.GetUserFrontCardPos = function (chairID, isMainUser) {
        if (isMainUser === void 0) { isMainUser = false; }
        //约束后会让获得的组件的坐标为零，所以要用帧末的数据，傻逼设计
        this.validateNow();
        var user = this.GetUserByChairID(chairID);
        if (user == null)
            return;
        var head = user.headComponent;
        if (head == null)
            return null;
        var point = new egret.Point(head.x + DZDefine.f_cardOffsetHeadX, head.y + DZDefine.f_cardOffsetHeadY);
        return point;
    };
    /**根据情况显示不同的操作按钮
     * @param status:不同情况
     */
    DZPokerOnGameView.prototype.SetOperationBtnsDisplay = function (status, cinglNum) {
        //先把所有的按钮都隐藏
        this._btn_add.visible = false;
        this._btn_allin.visible = false;
        this._btn_pass.visible = false;
        this._gp_cingl.visible = false;
        //然后根据传入的状态显示该显示的按钮
        switch (status) {
            case DZDefine.ABANDON_CINGL_ADD:
                this._gp_cingl.visible = true;
                //将之前无效化过的按钮激活
                if (!this._gp_cingl.touchEnabled)
                    this._btnContainer.setBtnEnabled(this._gp_cingl, true);
                if (cinglNum != 0 && cinglNum != undefined)
                    this["cingl_num"].text = cinglNum;
                this._btn_add.visible = true;
                break;
            case DZDefine.ABANDON_CINGL_ALLIN:
                this._gp_cingl.visible = true;
                //全下的状态下是不可以选择跟注的，所以无效化按钮
                this._btnContainer.setBtnEnabled(this._gp_cingl, false, true);
                this._btn_allin.visible = true;
                break;
            case DZDefine.ABANDON_PASS_ADD:
                this._btn_pass.visible = true;
                this._btn_add.visible = true;
                break;
        }
    };
    /**底部操作条上升 */
    DZPokerOnGameView.prototype.ShowOperateBtns = function () {
        var bottom = this["gp_operation_btns"];
        egret.Tween.get(bottom).to({ x: 0, y: 650 }, DZDefine.operationBtns)
            .call(function () { bottom.touchChildren = true; }); //移动完毕让所有的按钮都为可以点击
    };
    /**隐藏底部操作按钮 按钮下沉*/
    DZPokerOnGameView.prototype.HideOperateBtns = function () {
        var bottom = this["gp_operation_btns"];
        bottom.touchChildren = false; //在隐藏时让所有的按钮都无法点击
        egret.Tween.get(bottom).to({ x: 0, y: 750 }, DZDefine.operationBtns);
    };
    /**往公共牌区域发一张牌的动画 */
    DZPokerOnGameView.prototype.SendPubCard = function () {
        if (this._pubCardContainer.length >= 5)
            return null;
        var start = new egret.Point(this.cardStart.x, this.cardStart.y);
        var target = this.GetPubTargetPos();
        var poker = DZCardController.SendPubCardAnim(start, target);
        this._pubCardContainer.push(poker);
        return poker;
    };
    /**公共牌的数量，由于没有获得子节点的方法，所以申请变量自行控制 */
    /**获取公共牌发送的目标点，用于Tween动画 */
    DZPokerOnGameView.prototype.GetPubTargetPos = function () {
        var point = new egret.Point;
        point.x = this["gp_public_cards"].x;
        point.y = this["gp_public_cards"].y;
        var cardW = 116;
        point.x = point.x + cardW * this._pubCardContainer.length;
        return point;
    };
    /**播放发所有玩家手牌的动画 */
    DZPokerOnGameView.prototype.SendUsersCardsAnim = function () {
    };
    /**为玩家的手牌赋值 */
    DZPokerOnGameView.prototype.SetUserCardData = function (chairID, cardValue, cardType) {
        var userID = this.chairID_userID[chairID];
        var user = this._table.getUser(userID);
        DZCardController.SetUserCardData(user, cardValue, cardType);
    };
    /**获取玩家的手牌发送目标位置 背面 */
    DZPokerOnGameView.prototype.GetUserBackCardPos = function (chairID, isMainUser) {
        if (isMainUser === void 0) { isMainUser = false; }
        //约束后会让获得的组件的坐标为零，所以要用帧末的数据，傻逼设计
        this.validateNow();
        var user = this.GetUserByChairID(chairID);
        var head = user.headComponent;
        if (head == null)
            return null;
        var point = new egret.Point(head.x + DZDefine.b_cardOffsetHeadX, head.y + DZDefine.b_cardOffsetHeadY);
        return point;
    };
    /**更新所有用户的数据信息 */
    DZPokerOnGameView.prototype.UpdateChairData = function (_table) {
        if ([null, undefined].indexOf(_table) != -1)
            return;
        if ([null, undefined].indexOf(this._gameTable) != -1)
            this._table = new GameTable(_table.tableID);
        else
            this._table = new GameTable(_table.tableID);
        if (this._table.tableID != _table.tableID)
            this._table.tableID = _table.tableID;
        for (var key in _table.users) {
            var _user = _table.users[key];
            var dz_user = this._table.users[key];
            //如果这个人的数据已经存在于桌子类中的用户容器中，就直接给赋值就好了
            if (dz_user && dz_user.chairID == _user.chairID) {
                dz_user.role = _user.role;
                dz_user.status = _user.status;
                dz_user.tableID = _user.tableID;
                dz_user.chairID = _user.chairID;
                dz_user.nickname = _user.nickname;
            }
            else {
                if (dz_user) {
                }
                //如果不存在那就new一个呗，然后添加进去
                dz_user = new DZUser(_user.userID, _user.tableID, _user.chairID, _user.role);
                dz_user.gold = _user.gold;
                dz_user.nickname = _user.nickname;
                dz_user.status = _user.status;
                //给桌子添加玩家
                this._table.addUser(dz_user);
                if (_user.userID == UserData.userID)
                    this.mainUser = dz_user;
            }
        }
    };
    /**更新皮肤中头像框组件的显示 */
    DZPokerOnGameView.prototype.updateChairInfo = function (_table) {
        this.UpdateChairData(_table);
        if (this._table) {
            this.chairID_userID = new Array();
            for (var key in this._table.users) {
                this.chairID_userID[this._table.users[key].chairID + ''] = this._table.users[key].userID;
                if (this.inited) {
                    var id = this._table.users[key].chairID;
                    var user = this._table.users[key];
                    user.direction = id; //桌子的方位
                    if (id >= 0 && id <= 5) {
                        var component = this["user_" + id];
                        if (component == null) {
                            console.log("空组件");
                            return;
                        }
                        user.InitFaceGroup(this["user_" + id]);
                        user.betPool = this["betPool_" + user.chairID];
                    }
                }
            }
        }
    };
    /**获得盲注位 */
    DZPokerOnGameView.prototype.GetBland = function () {
        var index = this._banker.chairID;
        index++;
        //获得小盲位
        while (true) {
            if (index > 5)
                index = 0;
            var userID = this.chairID_userID[index];
            var _low = this._table.getUser(userID);
            if (_low != null) {
                this._lowBland = _low;
                break;
            }
            index++;
        }
        index++;
        //获得大盲位
        while (true) {
            if (index > 5)
                index = 0;
            var userID = this.chairID_userID[index];
            var _high = this._table.getUser(userID);
            if (_high != null) {
                this._highBland = _high;
                break;
            }
        }
    };
    /**所有的按键回调 */
    DZPokerOnGameView.prototype.OnBtnClick = function (evt) {
        switch (evt.data) {
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
    };
    /**用户操作 */
    DZPokerOnGameView.prototype.UserOperation = function () {
    };
    /**展开下拉菜单 */
    DZPokerOnGameView.prototype.ShowDropDownView = function () {
    };
    DZPokerOnGameView.prototype.HideDropDownView = function () {
    };
    /**退出游戏 */
    DZPokerOnGameView.prototype.QuitGame = function () {
    };
    /**根据玩家椅子号获得玩家对象 */
    DZPokerOnGameView.prototype.GetUserByChairID = function (chairID) {
        if (chairID < 0 || chairID > 5)
            return;
        var userID = this.chairID_userID[chairID];
        var user = this._table.getUser(userID);
        return user;
    };
    //----------SC_CMD_FUNC-----------
    /**开始盲注 */
    DZPokerOnGameView.prototype.SC_StartGame = function (packet) {
        this._lowBetValue = packet.iLowBetValue;
        var banker = this.GetUserByChairID(packet.iBankerID);
        banker.isBanker = true;
        this._banker = banker;
        this.SendBankerLogoAnim(banker.chairID);
        this.GetBland();
        this.setTimer(DZDefine.Bland_Timer, DZDefine.sendBankerTime / 1000); //下盲注
    };
    /**盲注结束 发手牌 */
    DZPokerOnGameView.prototype.SC_Blind_END_SendCard = function (packet) {
        Main.instance.isSendUserCard = true;
        for (var i = 0; i < this.chairID_userID.length; i++) {
            var user = this.GetUserByChairID(i);
            if (user.isAbandon)
                continue; //如果玩家弃牌了，就不发了
            var target = this.GetUserBackCardPos(user.chairID);
            user.cardArr = DZCardController.SendUserCardsAnim(this.cardStart, target);
        }
        //发完手牌主玩家的牌要翻转
        this.setTimer(DZDefine.TurnCard_Timer, DZDefine.sendCardTime / 1000 + 0.2);
    };
    DZPokerOnGameView.prototype.SC_SendPubCard = function () {
        this.SendPubCard();
    };
    /**翻开所有手牌 */
    DZPokerOnGameView.prototype.SC_TurnAllUserCards = function () {
        for (var i = 0; i < this.chairID_userID.length; i++) {
            var user = this.GetUserByChairID(i);
            var target = this.GetUserFrontCardPos(user.chairID);
            DZCardController.TurnCardAnim(user, target);
            console.log(user.nickname + "翻开手牌");
        }
    };
    /**玩家操作 */
    DZPokerOnGameView.prototype.SC_User_Operation = function (packet) {
        this._curUser = this.GetUserByChairID(packet.iCurChairID);
        var opType = packet.iOpType;
        var addValue = packet.iAddValue;
        //如果可以加注，则加注按钮的位图文本显示的数字
        var cinglNum = this.lastBetValue - this._curUser.betValue;
        if (cinglNum <= 0)
            cinglNum = 0;
        if (this._curUser != this.mainUser) {
            this.setTimer(DZDefine.Rob_Operate_Timer, DZDefine.iOperateTime);
            this._curUser.StartOperationBarAnim(DZDefine.iOperateTime);
        }
        else {
            //判断状态给底部操作栏显示状态
            if (this._curUser.gold <= this.lastBetValue) {
                this.SetOperationBtnsDisplay(DZDefine.ABANDON_CINGL_ALLIN);
            }
            else if (this.lastBetValue == 0) {
                this.SetOperationBtnsDisplay(DZDefine.ABANDON_PASS_ADD);
            }
            else if (this._curUser.gold > this.lastBetValue) {
                this.SetOperationBtnsDisplay(DZDefine.ABANDON_CINGL_ADD, cinglNum);
            }
            this.ShowOperateBtns();
            this.mainUser.StartOperationBarAnim(DZDefine.iOperateTime);
            this.setGameTimer(this.mainUser.chairID, DZDefine.Operation_Timer, DZDefine.iOperateTime);
        }
    };
    /**一轮下注结束，移动所有玩家筹码入底池 */
    DZPokerOnGameView.prototype.SC_BetEnd = function () {
        DZChipController.MoveAllChipsToPot();
        //设置一个计时器用于回收玩家筹码的内存
        this.setTimer(DZDefine.RecycleChips_Timer, DZDefine.sendChipTime / 1000 + 0.2);
    };
    //--------------------------------
    //*********** 测试使用代码 **********//
    DZPokerOnGameView.prototype.SetBanker = function (chairID) {
        var userID = this.chairID_userID[chairID];
        var user = this._table.getUser(userID);
        user.isBanker = true;
        this._banker = user;
        console.log(user.nickname + "是庄家");
    };
    DZPokerOnGameView.prototype.RobOperation = function (user, opType, addValue) {
        switch (opType) {
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
    };
    DZPokerOnGameView.prototype.PrintInfo = function () {
        console.log("=====最近一次的下注量：" + this.lastBetValue);
        console.log("=====底池的值：" + this.potValue);
        if (this._curUser != null)
            console.log("=====当前操作的玩家昵称：" + this._curUser.nickname);
        if (this._curUser != null)
            console.log("=====当前操作玩家的下注量：" + this._curUser.betValue);
    };
    return DZPokerOnGameView;
}(GameViewBase));
/**皮肤文件的基础路径 */
DZPokerOnGameView.skinPath = "resource/dezhoupoker/";
__reflect(DZPokerOnGameView.prototype, "DZPokerOnGameView");
/**扑克牌的翻转方向 */
var PokerDir;
(function (PokerDir) {
    PokerDir[PokerDir["F2B"] = 0] = "F2B";
    PokerDir[PokerDir["B2F"] = 1] = "B2F";
})(PokerDir || (PokerDir = {}));
/**卡牌的花色 */
var CardType;
(function (CardType) {
    CardType[CardType["DIAMONDS"] = 0] = "DIAMONDS";
    CardType[CardType["CLUB"] = 1] = "CLUB";
    CardType[CardType["HEART"] = 2] = "HEART";
    CardType[CardType["SPADE"] = 3] = "SPADE";
})(CardType || (CardType = {}));
//# sourceMappingURL=DZPokerOnGameView.js.map