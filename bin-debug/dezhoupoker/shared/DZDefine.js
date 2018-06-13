// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * class name : DZDefine
 * description : 德州扑克公用的一些静态属性
 * author : 杨浩然
 * time : 2018.6.8
 */
var DZDefine = (function () {
    function DZDefine() {
    }
    return DZDefine;
}());
/**玩家手牌背面时的缩放尺寸 */
DZDefine.b_scale = 0.4;
/**玩家手牌距离头像框的偏移 背面 */
DZDefine.b_cardOffsetHeadX = 93;
DZDefine.b_cardOffsetHeadY = 60;
/**玩家两张手牌之间的距离 背面*/
DZDefine.cardDis = 30;
/**第一张手牌的倾斜角 */
DZDefine.firstCardAngle = -10;
/**第二张手牌的倾斜角 */
DZDefine.secondCardAngle = 20;
/**玩家手牌正面时的缩放尺寸 */
DZDefine.f_scale = 0.7;
/**玩家手牌距离头像框的偏移 正面 */
DZDefine.f_cardOffsetHeadX = 5;
DZDefine.f_cardOffsetHeadY = 33;
/**庄logo距离头像框的偏移 */
DZDefine.b_logoOffsetHeadX = 136;
DZDefine.b_logoOffsetHeadY = 140;
/**卡牌大个花色小于10的图片宽高，避免过大 */
DZDefine.img_type_b_w = 60;
DZDefine.img_type_b_h = 80;
/**翻牌缓动动画的时间 */
DZDefine.turnCardTime = 200;
/**发牌缓动动画的时间 */
DZDefine.sendCardTime = 200;
/**筹码移动的 */
DZDefine.sendChipTime = 200;
/**底部按钮上升/下降的时间 */
DZDefine.operationBtns = 500;
/**操作时间 */
DZDefine.iOperateTime = 15;
/**庄logo 缓动动画的时间 */
DZDefine.sendBankerTime = 500;
//----------Timer----------
/**玩家操作 计时器类别 */
DZDefine.Operation_Timer = 1;
//-------------------------
//----------底部操作按钮的显示状态----------
/**弃 跟 加 */
DZDefine.Q_CINGL_ADD = 0;
/**弃 跟(disabled) 全 */
DZDefine.Q_CINGL_ALLIN = 1;
/**弃 过 加 */
DZDefine.Q_PASS_ADD = 2;
/**一个位图字体的宽度 */
DZDefine.bplb_Width = 26;
__reflect(DZDefine.prototype, "DZDefine");
//# sourceMappingURL=DZDefine.js.map