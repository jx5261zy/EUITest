//
//
//2017-2-28 20:13:31
//
class MJGameData {
	
	// public static roomManagement : RoomManagement = null;

	// public static user;	
	
	public static turnIdx : number = 0; //代表当前人的椅子顺序
    // public static turnDirection : number = 0; //代表当情人的方向顺序
	public static cbLeftCardCount : number = 0;
	public static queType : number = -1;
	public static wBankerUser : number = -1;
	public static readyTimeOut : number = 30; //准备倒计时
    public static selectTimeOut : number = 5; //选择定缺倒计时
    public static operateCardTimeOut : number = 8; //用户操作时间，比如碰、杠等操作
    public static outCardTimeOut : number = 8; //出牌倒计时
    public static giveupTimeOut : number = 8; //放弃的倒计时

    public static TIME_OUT_TYPE_READY = 1; 
    public static TIME_OUT_TYPE_SELECTCARD = 2;
    public static TIME_OUT_TYPE_OPERATE = 3;
    public static TIME_OUT_TYPE_OUTCARD = 4;
    public static TIME_OUT_TYPE_GIVEUP = 5;

    

    public static CHAIRID : number = -1;

    public static moTurn : number = 0; //该摸哪一个麻将了

    public static diceValue : any = [];

    public static UserBasicInfo : any = {}; //主要存储chairid对应的用户基本信息

    public static inDismissState : number = 0;

    // 根据chairid来定的 0 1 2 3
    // 大概的格式为{idx: 1, scores:[1, 1, -1, -1]}
    public static totalPPScores : any = []; // 积分场所有对局结算

    public static blinkColor =  new egret.ColorMatrixFilter([ 0.3, 0, 0, 0, 0,
                                                            0, 0.3, 0, 0, 0,
                                                            0, 0, 0.3, 0, 0,
                                                            0    , 0    , 0    , 1, 0]);

    public static getIdxByChairID(chairid : number) : number {
        var offset = UserData.chairID - chairid;
        var idx = 1;
        if (offset > 0) {
            idx += offset;
        } else if (offset < 0) {
            if (offset == -1) {
                idx = 4;
            } else if (offset == -2) {
                idx = 3;
            } else if (offset == -3) {
                idx = 2;
            }
        }

        return idx;
    }
	
}