// TypeScript file

/**
 * class name : DZDefine
 * description : 德州扑克公用的一些静态属性
 * author : 杨浩然
 * time : 2018.6.8
 */

class DZDefine
{
    /**玩家手牌背面时的缩放尺寸 */
    public static b_scale:number = 0.4;
    /**玩家手牌距离头像框的偏移 背面 */
    public static b_cardOffsetHeadX:number = 93;
    public static b_cardOffsetHeadY:number = 60;
    /**玩家两张手牌之间的距离 背面*/
    public static cardDis:number = 30;
    /**第一张手牌的倾斜角 */
    public static firstCardAngle:number = -10;
    /**第二张手牌的倾斜角 */
    public static secondCardAngle:number = 20;
    /**玩家手牌正面时的缩放尺寸 */
    public static f_scale:number = 0.7;
    /**玩家手牌距离头像框的偏移 正面 */
    public static f_cardOffsetHeadX:number = 5;
    public static f_cardOffsetHeadY:number = 33;
    /**庄logo距离头像框的偏移 */
    public static b_logoOffsetHeadX:number = 136;
    public static b_logoOffsetHeadY:number = 140;
    /**卡牌大个花色小于10的图片宽高，避免过大 */
    public static img_type_b_w:number = 60;
    public static img_type_b_h:number = 80;
    /**翻牌缓动动画的时间 */
    public static turnCardTime:number = 200;
    /**发牌缓动动画的时间 */
    public static sendCardTime:number = 200;
    /**筹码移动的 */
    public static sendChipTime:number = 200;
    /**底部按钮上升/下降的时间 */
    public static operationBtns:number = 500;
    /**操作时间 */
    public static iOperateTime:number = 15;
    /**庄logo 缓动动画的时间 */
    public static sendBankerTime:number = 500;
    /**下拉菜单 缓动动画的时间 */
    public static dropMenuTime:number = 200;


    //----------Timer----------
    /**发庄计时器 */
    public static SendBanker_Timer:number = 1000; 
    /**下盲注 */
    public static Bland_Timer:number = 1001;
    /**机器人作出反应的计时器 */
    public static Rob_Operate_Timer:number = 1002;
    /**主玩家手牌翻牌 */
    public static TurnCard_Timer:number = 1003;
    /**移除所有玩家筹码显示的计时器 */
    public static RecycleChips_Timer:number = 1004;
    /**移除单个玩家筹码显示的计时器 */
    public static RecycleChip_Timer:number = 1005;
    //-------------------------


    //----------GameTimer----------
    /**玩家操作 计时器类别 */
    public static Operation_Timer:number = 10000; 
    //-------------------------


    //----------底部操作按钮的显示状态----------
    /**弃 跟 加 */
    public static ABANDON_CINGL_ADD = 0;
    /**弃 跟(disabled) 全 */
    public static ABANDON_CINGL_ALLIN = 1;
    /**弃 过 加 */
    public static ABANDON_PASS_ADD = 2;
    /**一个位图字体的宽度 */
    public static bplb_Width = 26;


//class end
}