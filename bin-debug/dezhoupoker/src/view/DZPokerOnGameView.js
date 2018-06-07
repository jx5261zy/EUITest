// // TypeScript file
// //======================================//
// //          QUESTIONS：_(:3」∠)_
// //======================================//
// //----------2018.5.21----------
// //1.服务器是怎么接收和发送数据的？通过类还是逐条解析？(貌似是类)
// //2.21点如何加载所有玩家的信息？
// //3.客户端是如何与服务器进行沟通的？发送消息的函数又在哪里？接收的又在哪里？
// //4.BaseComponent和GameViewBase这两个类中的的方法以及成员变量如何使用？
// //5.UserData中的所有静态成员是在哪里赋值的？
// //6.GameTable中的users数组数据哪里赋值的？凭空变出来的啊？
// //7.EXML文件的可视化编辑界面咋用···（参考Unity中的Hierarchy，不同于Unity此处每一个对象的ID是不允许相同的）
// //8.Mediator类中的监听函数listNotificationInterests是如何触发的？运行逻辑是啥？
// //9.每一个子游戏的default.res.json和default.thm.json在哪里加载的？
// //10.updateChairInfo和updateTable貌似是每帧调用的？
// //11.大厅中的子游戏按钮事件监听在哪里？
// //----------2018.5.22----------
// //1.在进入桌子界面之前获取的桌子上的玩家信息有哪些是有用的？
// //2.21点桌子是如何做到每轮游戏调用updateChairInfo函数
// //----------2018.5.23----------
// //1.BJGameOnView类中725行中的中括号是什么意思？啥语法？
// //----------2018.5.24----------
// //1.this.usersChair_ID_map = {};//这样申请了一个容器？还是一个类啊，卧槽
// //2.GameUser类中的role在什么地方给赋值的？（跟table一个地方）
// //----------2018.5.25----------
// //1.双下划线的成员变量有什么特殊含义？
// //2.Main中LoginView是如何加载的？匿名函数太多了
// //3.如何从账号密码弹窗转到大厅？
// //----------2018.5.27----------
// //PS：皮肤中卡牌透明是因为卡牌组件中的mask的影响
// //1.测试功能时，貌似皮肤文件加载不正确，是因为未加载皮肤解释器还是皮肤所使用的资源未加载？
// /**
//  * class name : DeZhouPokerOnGameView
//  * description : 正在编写中...   (╯°Д°)╯︵┻━┻
//  * @author : 杨浩然
//  * time : 2018.5.21
//  */
// class DZPokerOnGameView extends GameViewBase
// {
//     /**皮肤文件的基础路径 */
//     public static skinPath:string = "resource/dezhoupoker/";
//     public mainUser:DZUser;
//     public inited:boolean = false;
//     /**当前桌子上所有玩家的用户数据 */
//     private _tableData:GameTable = null;  
//     /**当前轮次的底池总数 */
//     private _currentPot:number = 0;
//     /**当前操作的椅子号 */
//     private _currentChairID:number = -1;
//     /**小盲注的椅子号 */
//     private _lowBlindChairID:number = -1;
//     /**大盲注的椅子号 */
//     private _highBlindChairID:number = -1
//     /**庄的椅子号 */
//     private _bankerChairID:number = -1;
//     /**最近一次下注的数值 */
//     private _lastBetVal:number = 0;
//     /** 键是用户的椅子号，值是用户的ID */
//     private _usersChair_ID_map:any;
//     /**皮肤 按钮 容器 */
//     private _btnContainer:ButtonContainer;
//     /**公共牌数据容器 */
//     private _publicCardDataContainer;
//     /**公共牌组 */
//     private _publicCardGroup:eui.Group;
//     /**操作按钮组 */
//     private _gp_operation_btns:eui.Group;
//     /**界面中所有的按钮 */
//     private _btn_return:eui.Image = this["btn_return"];
//     private _btn_drop_down:eui.Image = this["btn_drop_down"];
//     private _btn_abandon:eui.Image = this["btn_abandon"];
//     private _btn_pass:eui.Image = this["btn_pass"];
//     private _btn_add:eui.Image = this["btn_add"];
//     private _btn_allin:eui.Image = this["btn_allin"];
//     /**跟注按钮组 */
//     private _gp_cingl:eui.Group;
//     /**跟注按钮 数字组 */
//     private _gp_nums:eui.Group;
//     /**玩家组 数组 */
//     private _gp_user_arr;
//     public constructor(_table:GameTable)
//     {
//         super(_table,"dezhoupoker",6);
//         this.load(DZPokerOnGameView.skinPath + "resource/eui_skin/game/DZPokerOnGameSkin.exml");
//     }
//     /**销毁函数 */
//     public Dispose():void
//     {
//     }
//     //覆写父类的方法
//     //override时，子类的方法访问权限应与父类相同
//     protected initComponent():void
//     {
//         if(this.isDispose)
//             return;
//         super.initComponent();
//         //TODO:声音相关
//         //TODO：滚动公告相关
//         //TODO：对象池制作卡牌对象和筹码对象
//         UserData.changeTable = false;
//         //先注释，无框架脚本类，注释避免报错
//         // AppFacade.getInstance().registerMediator(new DZPokerOnMediator(this));
//         this._gp_user_arr = {};
//         //遍历皮肤中的用户头像框组件，并初始化不可见
//         for(let i = 0; i < 6; i++)
//         {
//             this["user_" + i].visable = false;
//             this._gp_user_arr["user_" + i] = this["user_" + i];
//         }
//         this._gp_operation_btns = this["gp_operation_btns"];
//         this._gp_cingl = this["gp_cingl"];
//         this._gp_nums = this["gp_nums"];
//         this._btnContainer = new ButtonContainer();
//         this._btnContainer.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnBtnClick,this);
//         //TODO：增加按键
//         this._btnContainer.addButton(this._btn_abandon);
//         this._btnContainer.addButton(this._btn_add);
//         this._btnContainer.addButton(this._btn_pass);
//         this._btnContainer.addButton(this._btn_return);
//         this._btnContainer.addButton(this._btn_drop_down);
//         this._btnContainer.addButton(this._gp_cingl);
//         this._btnContainer.addButton(this._btn_allin);
//         this.updateChairInfo(this._gameTable);
//     }
//     /**更新所有用户的数据信息 */
//     private UpdateChairData(_table:GameTable):void
//     {
//         if([null,undefined].indexOf(_table) != -1)
//             return;
//         if([null,undefined].indexOf(this._gameTable) != -1)
//             this._tableData = new GameTable(_table.tableID);
//         else
//             this._tableData = new GameTable(_table.tableID);
//         if(this._tableData.tableID != _table.tableID)
//             this._tableData.tableID = _table.tableID;
//         for(var key in _table.users)//用法跟键值对一样
//         {
//             var _user:GameUser = _table.users[key];
//             var dz_user:DZUser = this._tableData.users[key];
//             //如果这个人的数据已经存在于桌子类中的用户容器中，就直接给赋值就好了
//             if(dz_user && dz_user.chairID == _user.chairID)
//             {
//                 dz_user.role = _user.role;
//                 dz_user.status = _user.status;
//                 dz_user.tableID = _user.tableID;
//                 dz_user.chairID = _user.chairID;
//                 dz_user.nickname = _user.nickname;
//             }
//             else
//             {
//                 if(dz_user)
//                 {
//                     //TODO：
//                 }
//                 //如果不存在那就new一个呗，然后添加进去
//                 dz_user = new DZUser(_user.userID,_user.tableID,_user.chairID,_user.role);
//                 dz_user.gold = _user.gold;
//                 dz_user.nickname = _user.nickname;
//                 dz_user.status = _user.status;
//                 this._tableData.addUser(dz_user);
//                 if(_user.userID == UserData.userID)
//                     this.mainUser = dz_user;
//             }
//         }
//     }
//     /**更新皮肤中头像框组件的显示 */
//     public updateChairInfo(_table:GameTable):void
//     {
//         this.UpdateChairData(_table);
//         if(this._tableData)
//         {
//             this._usersChair_ID_map = {};//这样申请了一个容器？还是一个类啊，卧槽
//             for(var key in this._tableData.users)
//             {
//                 this._usersChair_ID_map[this._tableData.users[key].chairID + ''] = this._tableData.users[key].userID;
//                 if(this.inited)
//                 {
//                     var id = this._tableData.users[key].chairID;
//                     var user:DZUser = this._tableData.users[key];
//                     user.direction = id;//桌子的方位
//                     if(id >= 0 && id <= 5)
//                     {
//                         var component = this["user_" + id];
//                         if(component == null)
//                         {
//                             console.log("空组件");
//                             return;
//                         }
//                         user.InitFaceGroup(this["user_" + id]);
//                     }
//                 }
//             }
//         }
//     }
//     /**获得两个盲注位的椅子号
//      * @param bankerID : 本轮庄家椅子号
//      */
//     private GetBlindChairID(bankerID:number):void
//     {
//     }
//     /**分配 庄Logo 动画 */
//     public SendBankerLogoAnim()
//     {
//     }
//     /**发主玩家手牌数据给主玩家的容器 */
//     private SendMainUserCard(packet:any):void
//     {
//     }
//     /**所有的按键回调 */
//     private OnBtnClick(evt:egret.Event):void
//     {
//     }
//     /**显示底部操作按钮组 按钮上升*/
//     private ShowOperateBtns():void
//     {
//     }
//     /**隐藏底部操作按钮 按钮下沉*/
//     private HideOperateBtns():void
//     {
//     }
//     /**用户操作 */
//     public UserOperation():void
//     {
//     }
//     /**展开下拉菜单 */
//     private ShowDropDownView():void
//     {
//     }
//     private HideDropDownView():void
//     {
//     }
//     /**退出游戏 */
//     public QuitGame()
//     {
//     }
//     //----------SC_CMD_FUNC-----------
//     /**开始盲注 */
//     public SC_StartGame(packet:any):void
//     {
//         //TODO:给this中的 庄 座位号赋值
//     }
//     /**盲注结束 发手牌 */
//     public SC_Blind_END_SendCard(packet:any):void
//     {
//     }
//     //--------------------------------
// //class end
// } 
//# sourceMappingURL=DZPokerOnGameView.js.map