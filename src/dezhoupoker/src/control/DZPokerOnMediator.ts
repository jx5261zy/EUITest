// // TypeScript file

// /**
//  * class name : DeZhouPokerOnMediator
//  * description : 德州消息号 正在编写中...   (╯°Д°)╯︵┻━┻
//  * author : 杨浩然
//  * time : 2018.5.27
//  */

// //用户准备游戏已经在PublicNotification类中定义FRAME_READY消息号

// class DZPokerOnMediator extends BaseMediator
// {
//     public static NAME:string = "DZPokerOnMediator";

//     //----------CS_CMD----------

//     /**玩家弃牌 */
//     public static CS_Abandon:string = "CS_Abandon";
//     /**玩家跟注 */
//     public static CS_Cingl:string = "CS_Cingl";
//     /**玩家加注 */
//     public static CS_Add:string = "CS_Add";
//     /**玩家过牌 */
//     public static CS_Pass:string = "CS_Pass";
//     /**玩家盲注 */
//     public static CS_Blind:string = "CS_Blind";
//     /**玩家操作 发送服务器*/
//     public static CS_Player_Operation:string = "CS_Player_Operation";

//     //--------------------------
    

//     //----------SC_CMD----------

//     /**开始游戏 */
//     public static SC_StartGame:string = "SC_Start";
//     /**玩家弃牌 */
//     public static SC_Abandon:string = "SC_Abandon";
//     /**玩家跟注 */
//     public static SC_Cingl:string = "SC_Cingl";
//     /**玩家加注 */
//     public static SC_Add:string = "SC_Add";
//     /**玩家让牌 */
//     public static SC_Pass:string = "SC_Pass";
//     /**盲注结束 发手牌 */
//     public static SC_Blind_END_SendCard:string = "SC_Blind_END_SendCard";
//     /**发三张公共牌 */
//     public static SC_Flop:string = "SC_Flop";
//     /**发第四张公共牌 */
//     public static SC_Turn:string = "SC_Turn";
//     /**发第五张公共牌(河牌) */
//     public static SC_River:string = "SC_River";
//     /**显示游戏结果 */
//     public static SC_Game_Result:string = "SC_Game_Result";
//     /**玩家操作 接收服务器*/
//     public static SC_Player_Operation:string = "SC_Player_Operation";

//     //--------------------------
    

//     public constructor(view,name:string = "DZPokerOnMediator")
//     {
//         super(view,name);
//     }


//     public listNotificationInterests()
//     {
//         return [
//             PublicNotification.CHANGE_TABLE_SUCCESS,
//             DZPokerOnMediator.SC_StartGame,
//         ];
//     }

//     //----------PUB_CMD_FUNC---------

//     /**换桌成功
//      * 
//      */
//     public CHANGE_TABLE_SUCCESS(packet:any):void
//     {

//     }

//     //-------------------------------


//     //----------CS_CMD_FUNC--------



//     //-----------------------------
    

//     //---------SC_CMD_FUNC---------

//     /**开始盲注 
//      * 这里相当于游戏开始消息，所以需要庄家的 chairID 和 userID 用于判断小盲位以及大盲位
//     */
//     public SC_StartGame(packet:any):void
//     {

//     }


//     /**盲注结束 发手牌 */
//     public SC_Blind_END_SendCard(packet:any):void
//     {

//     }

//     //-----------------------------


// //class end
// }