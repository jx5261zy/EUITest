//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


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
    private _cardStartPos:eui.Rect;
    private mainUser:DZUser;
    private chairID_User:Array<DZUser>;
    /**庄 */
    private _banker:DZUser;
    /**计时器 */
    private _timer:GameTimer;

    public static getInstance():Main
    {
        if(Main.instance != null)
            return Main.instance;
    }


    /**
     * 加载进度界面
     * loading process interface
     */
    private _bg:any;
    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren();
        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter",assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }
    private createScene(){
        if(this.isThemeLoadEnd && this.isResourceLoadEnd){
            this.startCreateScene();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    private textfield:egret.TextField;

    private static instance:Main;
    private OnKeyDown(key)
    {
        switch(key.keyCode)
        {
            //W
            case 87:
                Main.instance.ShowOperateBtns();
                console.log("显示按钮组");
            break;

            //S
            case 83:
                Main.instance.HideOperateBtns();
                console.log("隐藏按钮组");
            break;

            //space
            case 32:
                var poker:DZCardView = Main.instance.SendPubCard();
                if(poker != null)
                {
                    var value = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
                    var type = Math.round(Math.random() * 10 % 3);
                    // var type = CardType.DIAMONDS;
                    poker.SetData(value,type,false);
                    poker.SetDisplay();
                    console.log("发一张公共牌");
                }
            break;

            //U
            case 85:
                Main.instance.mainUser.StartOperationBarAnim(DZDefine.iOperateTime);
                Main.instance.chairID_User.forEach(element=>{
                    element.StartOperationBarAnim(DZDefine.iOperateTime);
                })
                console.log("开始玩家操作倒计时");
            break;

            //F
            case 70:
                for(let i = 0; i < Main.instance._pubCardContainer.length; i++)
                {
                    if(!Main.instance._pubCardContainer[i].isFront)
                    {
                        Main.instance.TurnPubCardAnim(i,PokerDir.B2F);
                        break;
                    }
                }
            break;

            //C
            case 67:
                Main.instance.SendUsersCardsAnim();
                console.log("发送所有玩家的手牌");
            break;

            //X
            case 88:
                for(let i = 0; i < 6; i++)
                {
                    Main.instance.TurnCardAnim(i);
                    var value = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
                    var type = Math.round(Math.random() * 10 % 3);
                    var value1 = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
                    var type1 = Math.round(Math.random() * 10 % 3);
                    var _value = [value,value1];
                    var _type = [type,type1];
                    Main.instance.SetUserCardData(i,_value,_type);
                }
                
                
                console.log("翻开主玩家手牌");
            break;

            //Z
            case 90:
                Main.instance.TurnCardAnim(Main.instance.mainUser.chairID);
                var value = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
                var type = Math.round(Math.random() * 10 % 3);
                var value1 = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
                var type1 = Math.round(Math.random() * 10 % 3);
                var _value = [value,value1];
                var _type = [type,type1];
                Main.instance.SetUserCardData(Main.instance.mainUser.chairID,_value,_type);
            break;

            //B
            case 66:
                var bankerID = Math.round(Math.random() * 10 % Main.instance.chairID_User.length);
                if(bankerID == 6)
                    bankerID--;
                // var bankerID = 2;
                console.log("bankerID:" + bankerID);
                Main.instance.chairID_User[bankerID].isBanker = true;
                Main.instance.SendBankerLogoAnim(bankerID);

            break;


            //I
            case 73:
                Main.instance.SetOperationBtnsDisplay(DZDefine.Q_CINGL_ADD);
            break;

            //O
            case 79:
                Main.instance.SetOperationBtnsDisplay(DZDefine.Q_CINGL_ALLIN);
            break;

            //P
            case 80:
                Main.instance.SetOperationBtnsDisplay(DZDefine.Q_PASS_ADD);
            break;


        }
    }


    private OnBtnClick(evt:egret.Event):void
    {
        switch(evt.data)
        {
            case this._btn_add:
                console.log("点击了加注按钮");
            break;

            case this._btn_abandon:
                console.log("点击了放弃按钮");
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
                console.log("点击了跟按钮");
            break;
        }
    }


    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        Main.instance = this;
        document.onkeydown = this.OnKeyDown;

        this._bg = new eui.Component();
        this._bg.skinName = "resource/dezhoupoker/eui_skin/game/DZPokerOnGameSkin.exml";
        this._bg.createChildren();
        this.addChild(this._bg);
        this._pubCardContainer = new Array<DZCardView>();
        this._userCardContainer = new Array<DZCardView[]>();
        this._cardStartPos = this._bg["pos_send_card"];
        this.chairID_User = new Array<DZUser>();
        
        //循环将桌子上的所有玩家头像框，下注框隐藏
        for(let i = 0; i < 6; i++)
        {
            this._bg["user_" + i].visible = false;
            this._bg["user_chip_" + i].visible = false;
        }

        //创建扑克牌对象池
        pool.ObjectPool.instance.createObjectPool(DZCardController.DZ_CARD_POOLNAME,DZCardView);
        pool.ObjectPool.instance.createObjectPool(DZChipController.DZ_CHIP_POOLNAME,DZChipView);

        //获取皮肤中的组件
        this._btn_return = this._bg["btn_return"];
        this._btn_drop_down = this._bg["btn_drop_down"];
        this._btn_abandon = this._bg["btn_abandon"];
        this._btn_pass = this._bg["btn_pass"];
        this._btn_add = this._bg["btn_add"];
        this._btn_allin = this._bg["btn_allin"];
        this._gp_cingl = this._bg["gp_cingl"];

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
        
        this._bg["gp_operation_btns"].y = 750;
        this.SetUsers();
        this.StartGame();

    }

    //!!!!!!!!!!!TODO : BUG手牌可以无限翻，isFront属性会莫名改变
    /**翻单个用户的手牌动画
     * @param chairID : 需要翻牌的椅子号
     */
    public TurnCardAnim(chairID:number):void
    {
        var userCardArr = this._userCardContainer[chairID];
        if(userCardArr == null)
            return;
        var firstCard:DZCardView = userCardArr[0];
        var secondCard:DZCardView = userCardArr[1];
        if(firstCard == null || secondCard == null)
            return;
        console.log("1:" + firstCard.isFront + "  2:" + secondCard.isFront);
        if(firstCard.isFront || secondCard.isFront)
            return;
        firstCard.isFront = true;
        secondCard.isFront = true;
        console.log("1:" + firstCard.isFront + "  2:" + secondCard.isFront);
        firstCard["gp_poker"].skewY = 180;
        secondCard["gp_poker"].skewY = 180;
        var turnPoint:egret.Point = this.GetUserFrontCardPos(chairID);
        firstCard.x = turnPoint.x;
        firstCard.y = turnPoint.y;
        secondCard.x = turnPoint.x + DZDefine.cardDis;
        secondCard.y = turnPoint.y;
        firstCard.rotation = secondCard.rotation = 0;
        firstCard.scaleX = firstCard.scaleY = DZDefine.f_scale;
        secondCard.scaleX = secondCard.scaleY = DZDefine.f_scale;

        if(firstCard.isAction || secondCard.isAction)
            return;

        firstCard.isAction = secondCard.isAction = true;
        console.log("1:" + firstCard.isFront + "  2:" + secondCard.isFront);
        egret.Tween.get(firstCard["gp_poker"]).to({skewY:270},DZDefine.turnCardTime,egret.Ease.quadOut)
                    .call(()=>{firstCard["gp_poker_forward"].visible = true;firstCard["img_poker_back"].visible = false;})
                    .to({skewY:360},DZDefine.turnCardTime,egret.Ease.quadOut)
                    .call(()=>{firstCard.isAction = false;firstCard.isFront = true;console.log("1:" + firstCard.isFront + "  2:" + secondCard.isFront);});
        egret.Tween.get(secondCard["gp_poker"]).to({skewY:270},DZDefine.turnCardTime,egret.Ease.quadOut)
                    .call(()=>{secondCard["gp_poker_forward"].visible = true;secondCard["img_poker_back"].visible = false;})
                    .to({skewY:360},DZDefine.turnCardTime,egret.Ease.quadOut)
                    .call(()=>{secondCard.isAction = false;secondCard.isFront = true;console.log("1:" + firstCard.isFront + "  2:" + secondCard.isFront);});
    }


    /**翻公共牌动画 
     * @param index:牌在组里的下标
     * @param direction:翻转的方向，1由正->反  2由反->正
     */
    public TurnPubCardAnim(index:number,direction:PokerDir):void
    {
        // var poker = this._bg["gp_public_cards"].getChildAt(index);
        var poker = this._pubCardContainer[index];
        if(poker == null || poker.isFront || poker.isAction)
            return;
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

    /**发庄logo */
    public SendBankerLogoAnim(chairID:number):void
    {
        var start:egret.Point = new egret.Point(this._bg.width / 2,this._bg.height / 2);
        var logo:eui.Image = new eui.Image("dz_zhuang_png");
        this._bg.addChild(logo);
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
        var user:eui.Component = this.chairID_User[chairID].headComponent;
        console.log("x:" + user.x + "  y:" + user.y);
        var point = new egret.Point(user.x + DZDefine.b_logoOffsetHeadX,user.y + DZDefine.b_logoOffsetHeadY);
        return point;
    }

    /**播放发所有玩家手牌的动画 */
    public SendUsersCardsAnim()
    {
        var start = this._cardStartPos;
        this.chairID_User.forEach(element => {
            //创建两张牌
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
            this._bg.addChild(firstCard);
            this._bg.addChild(secondCard);

            var userCard = [firstCard,secondCard];
            this._userCardContainer[element.chairID] = userCard;

            // if(element == this.mainUser)
            // {
            //     var target:egret.Point = this.GetUserBackCardPos(element.chairID);
            //     firstCard.isAction = secondCard.isAction = true;
            //     egret.Tween.get(firstCard).to({x:target.x,y:target.y,rotation:DZDefine.firstCardAngle,scaleX:DZDefine.b_scale,scaleY:DZDefine.b_scale,alpha:1},DZDefine.sendCardTime)
            //                 .call(()=>{firstCard.isAction = false;});
            //     egret.Tween.get(secondCard).to({x:(target.x + DZDefine.cardDis),y:target.y,rotation:DZDefine.secondCardAngle,scaleX:DZDefine.b_scale,scaleY:DZDefine.b_scale,alpha:1},DZDefine.sendCardTime)
            //                 .call(()=>{secondCard.isAction = false;});
            // }
            // else
            // {
                var target:egret.Point = this.GetUserBackCardPos(element.chairID);
                firstCard.isAction = secondCard.isAction = true;               
                egret.Tween.get(firstCard).to({x:target.x,y:target.y,rotation:DZDefine.firstCardAngle,scaleX:DZDefine.b_scale,scaleY:DZDefine.b_scale,alpha:1},DZDefine.sendCardTime)
                            .call(()=>{firstCard.isAction = false;});
                egret.Tween.get(secondCard).to({x:(target.x + DZDefine.cardDis),y:target.y,rotation:DZDefine.secondCardAngle,scaleX:DZDefine.b_scale,scaleY:DZDefine.b_scale,alpha:1},DZDefine.sendCardTime)
                            .call(()=>{secondCard.isAction = false;});
            // }

        });
    }


    /**为玩家的手牌赋值 */
    public SetUserCardData(chairID:number,cardValue:number[],cardType:CardType[]):void
    {
        var userCardArr = this._userCardContainer[chairID];
        if(userCardArr == null)
            return;
        var firstCard:DZCardView = userCardArr[0];
        var secondCard:DZCardView = userCardArr[1];
        if(firstCard == null || secondCard == null)
            return;
        firstCard.SetData(cardValue[0],cardType[0],false);
        firstCard.SetDisplay();
        secondCard.SetData(cardValue[1],cardType[1],false);
        secondCard.SetDisplay();
    }


    /**获取玩家的手牌发送目标位置 背面 */
    public GetUserBackCardPos(chairID:number,isMainUser:boolean = false):egret.Point
    {
        // var chair = this._bg["user_" + chairID];
        //约束后会让获得的组件的坐标为零，所以要用帧末的数据，傻逼设计
        this.validateNow();
        var chair = this.chairID_User[chairID].headComponent;
        if(chair == null)
            return null;

        var point = new egret.Point(chair.x + DZDefine.b_cardOffsetHeadX,chair.y + DZDefine.b_cardOffsetHeadY);
        return point;
    }

    /**获取玩家的展示手牌时的位置 */
    public GetUserFrontCardPos(chairID:number,isMainUser:boolean = false):egret.Point
    {
        // var chair = this._bg["user_" + chairID];
        //约束后会让获得的组件的坐标为零，所以要用帧末的数据，傻逼设计
        this.validateNow();
        var chair = this.chairID_User[chairID].headComponent;
        
        if(chair == null)
            return null;

        var point = new egret.Point(chair.x + DZDefine.f_cardOffsetHeadX,chair.y + DZDefine.f_cardOffsetHeadY);
        return point;
    }

    /**根据情况显示不同的操作按钮
     * @param status:不同情况
     */
    public SetOperationBtnsDisplay(status:number):void
    {   
        //先把所有的按钮都隐藏
        this._btn_add.visible = false;
        this._btn_allin.visible = false;
        this._btn_pass.visible = false;
        this._gp_cingl.visible = false;
        switch(status)
        {
            case DZDefine.Q_CINGL_ADD:
                this._gp_cingl.visible = true;
                //将之前无效化过的按钮激活
                if(!this._gp_cingl.touchEnabled)
                    this._btnContainer.setBtnEnabled(this._gp_cingl,true);
                this._btn_add.visible = true;
            break;

            case DZDefine.Q_CINGL_ALLIN:
                this._gp_cingl.visible = true;
                //全下的状态下是不可以选择跟注的，所以无效化按钮
                this._btnContainer.setBtnEnabled(this._gp_cingl,false,true);
                this._btn_allin.visible = true;
            break;

            case DZDefine.Q_PASS_ADD:
                this._btn_pass.visible = true;
                this._btn_add.visible = true;
            break;
        }
    }

    /**底部操作条上升 */
    public ShowOperateBtns():void
    {
        var bottom = this._bg["gp_operation_btns"];
        egret.Tween.get(bottom).to({x:0,y:650},DZDefine.operationBtns);
    }
    /**隐藏底部操作按钮 按钮下沉*/
    private HideOperateBtns():void
    {
        var bottom = this._bg["gp_operation_btns"]; 
        egret.Tween.get(bottom).to({x:0,y:750},DZDefine.operationBtns);
    }


    /**往公共牌区域发一张牌的动画 */
    public SendPubCard():DZCardView
    {
        if(this._pubCardContainer.length >= 5)
            return null;

        var start = this._cardStartPos;
        var poker = DZCardController.CreatePokerFormPool();
        poker.isFront = false;//先设置为反面
        poker.alpha = 0;
        poker.scaleX = poker.scaleY = 0.1;
        poker.x = start.x;
        poker.y = start.y;
        poker.isAction = false;
        this._bg.addChild(poker);
        var target = this.GetPubTargetPos();
        this._pubCardContainer.push(poker);

        poker.isAction = true;
        egret.Tween.get(poker).to({x:target.x,y:target.y,scaleX:1,scaleY:1,alpha:1},DZDefine.sendCardTime)
            .call(()=>{this._bg["gp_public_cards"].addChild(poker);poker.isAction = false;});

        return poker;
    }

    /**公共牌的数量，由于没有获得子节点的方法，所以申请变量自行控制 */
    /**获取公共牌发送的目标点，用于Tween动画 */
    public GetPubTargetPos():egret.Point
    {
        var point:egret.Point = new egret.Point;
        point.x = this._bg["gp_public_cards"].x;
        point.y = this._bg["gp_public_cards"].y;
        var cardW:number = 116;
        point.x = point.x + cardW * this._pubCardContainer.length;
        return point;
    }


    /**给卡牌赋值
     * @param
     */
    public SendPubCardData(_cardType:CardType,_cardValue:number,_poker:DZCardView,_isFront:boolean):void
    {
        _poker.SetData(_cardValue,_cardType,_isFront);
    }

    /**
	 * 创建一个游戏timer 唯一的
	 * @param chairID
	 * @param timerID
	 * @param time
	 */
	public SetGameTimer(chairID: number,timerID:number,time:number):void
	{
		if(this._timer == null)
		{
			this._timer = new GameTimer(1000/30);
			this._timer.addEventListener(egret.TimerEvent.TIMER,this.onGameTimerEvent,this);
		}
		this._timer.chairID = chairID;
		this._timer.timerID = timerID;
		this._timer.totalTime = time;
		this._timer.start();
	}
    private onGameTimerEvent(e:egret.Event):void
	{
		var remainTime: number = this._timer.remainTime;
		if(remainTime == 0)
		{
			this._timer.stop();
		}
		this.OnGameTimer(this._timer.chairID,this._timer.timerID,remainTime);
	}

    private OnGameTimer(chairID:number,timerID:number,remainTime:number)
    {
        switch(timerID)
        {
            case DZDefine.Operation_Timer:
                if(remainTime == 0)
                    console.log("Time Over");
                else
                    console.log(remainTime);
            break;
        }
    }




    //测试代码
    private StartGame()
    {
        //先给一个庄
        var bankerID = Math.round(Math.random() * 10 % this.chairID_User.length);
        if(bankerID == 6)
            bankerID--;
        // var bankerID = 2;
        console.log("bankerID:" + bankerID);
        this.chairID_User[bankerID].isBanker = true;
        this.SendBankerLogoAnim(bankerID);

        this.SendUsersCardsAnim();
        for(let i = 0; i < 6; i++)
            Main.instance.TurnCardAnim(i);

    }

    private SetUsers()
    {
        this.mainUser = new DZUser(111,10,0,UserData);
        this.mainUser.nickname = "绘图铅笔2B";
        this.mainUser.gold = 11111;
        this.mainUser.InitFaceGroup(this._bg["user_" + this.mainUser.chairID]);
        this.chairID_User[this.mainUser.chairID] = this.mainUser;

        var user1 = new DZUser(112,10,1,UserData);
        user1.nickname = "Holly";
        user1.gold = 10000;
        user1.InitFaceGroup(this._bg["user_" + user1.chairID]);
        this.chairID_User[user1.chairID] = user1;

        var user2 = new DZUser(112,10,2,UserData);
        user2.nickname = "Shit";
        user2.gold = 10000;
        user2.InitFaceGroup(this._bg["user_" + user2.chairID]);
        this.chairID_User[user2.chairID] = user2;

        var user3 = new DZUser(112,10,3,UserData);
        user3.nickname = "Mother";
        user3.gold = 10000;
        user3.InitFaceGroup(this._bg["user_" + user3.chairID]);
        this.chairID_User[user3.chairID] = user3;

        var user4 = new DZUser(112,10,4,UserData);
        user4.nickname = "Fucker";
        user4.gold = 10000;
        user4.InitFaceGroup(this._bg["user_" + user4.chairID]);
        this.chairID_User[user4.chairID] = user4;

        var user5 = new DZUser(112,10,5,UserData);
        user5.nickname = "Stupid";
        user5.gold = 10000;
        user5.InitFaceGroup(this._bg["user_" + user5.chairID]);
        this.chairID_User[user5.chairID] = user5;

    }



//class end
}


enum PokerDir
{
    F2B,
    B2F,
}

enum CardType
{
    DIAMONDS,
    CLUB,
    HEART,
    SPADE,
}


