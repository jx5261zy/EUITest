//
//
class PublicNotification {
	public static MYSELF_LEAVE_CHAIR = "MYSELF_LEAVE_CHAIR";
    public static GAME_USER_LEAVE_CHAIR = "GAME_USER_LEAVE_CHAIR";
    public static GAME_SUB_CS_USER_STANDUP = "GAME_SUB_CS_USER_STANDUP"; // 起立请求 离开桌子
    public static GAME_SUB_CS_USER_LEAVE_GAME = "GAME_SUB_CS_USER_LEAVE_GAME"; //玩家已经在游戏中了。。。离开游戏

    public static UPDATE_PPROOM_TABLE_INFO = "UPDATE_PPROOM_TABLE_INFO";

    public static ScoreTableResult = "ScoreTableResult"; //通知游戏逻辑积分场比赛结束

    public static CHANGE_TABLE_SUCCESS = "CHANGE_TABLE_SUCCESS";

    public static UNLOAD_ROOM_VIEW = "UNLOAD_ROOM_VIEW";

    public static UPDATE_DATE_TIME = "UPDATE_DATE_TIME";

    public static GAME_SUB_CS_FRAME_ENTER = "GAME_SUB_CS_FRAME_ENTER";      //进入房间后发送ready消息

    public static FRAME_READY = "FRAME_READY";      //用户准备游戏

    public static UPDATE_TABLE_INFO = "UPDATE_TABLE_INFO";

    public static SHOW_SCROLL_NOTIFICATION = "SHOW_SCROLL_NOTIFICATION";

    public static SC_User_Gold = "SC_User_Gold"; //更新用户金币

    public static GAME_SUB_CS_USER_CHANGE_TABLE = "GAME_SUB_CS_USER_CHANGE_TABLE"; //请求换桌

    public static Update_User_Basic_Info = "Update_User_Basic_Info"; //更新用户信息显示

    public static CS_Search_User_Info = "CS_Search_User_Info"; //根据用户id查询用户名等基本信息
    public static SC_Search_User_Info = "SC_Search_User_Info"; //查询结果返回

    public static SHOW_RANK_VIEW = "SHOW_RANK_VIEW"; // 游戏里面显示排行榜
    public static Socket_Connect_Error = "Socket_Connect_Error"; //
    public static RECONNECT_AND_ROOM_LOGON_ON = "RECONNECT_AND_ROOM_LOGON_ON"; //断线重连后房间重新进入

    public static QUICK_START_GAME = "QUICK_START_GAME";

    /**今日总下注变化*/
    public static SC_User_Today_Chip:string = "SC_User_Today_Chip";
    /**获取排行榜信息  RankType 排行类型 KindId 游戏类型id*/
    public static Game_CS_Request_Rank:string = "Game_CS_Request_Rank";
    /**排行榜信息*/
    public static Game_SC_Response_Rank:string  ="Game_SC_Response_Rank";
    // public static SHOW_

    public static SC_Dismiss_Response = "SC_Dismiss_Response"; //解散房间投票信息

    //接收中奖记录
    public static Game_SC_Response_WinRecord = "Game_SC_Response_WinRecord";
    //请求中奖记录
    public static Game_CS_Request_WinRecord = "Game_CS_Request_WinRecord";
    //请求独立中奖纪录
    public static Game_CS_Request_AloneWinRecord = "Game_CS_Request_AloneWinRecord";
    //独立中奖纪录结果
    public static Game_SC_Response_AloneWinRecord = "Game_SC_Response_AloneWinRecord";
    /**首充状态改变*/
    public static FirstPayStateChange:string = "FirstPayStateChange";

}