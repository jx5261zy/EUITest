//
// created at 2017-5-11 15:33:39
// 
var EffectUtils;
(function (EffectUtils) {
    //抖动对象特效
    // 1：抖动  2：震动
    function shakeScreen(panel, effectType, oldX, oldY) {
        if (effectType === void 0) { effectType = 1; }
        if (oldX === void 0) { oldX = 0; }
        if (oldY === void 0) { oldY = 0; }
        var shakeNum = 40;
        // var oldX:number = panel.x;
        // var oldY:number = panel.y;
        if (effectType == 1) {
            egret.Tween.get(panel).to({ x: oldX - 10 }, shakeNum)
                .to({ x: oldX + 20 }, shakeNum)
                .to({ x: oldX - 20 }, shakeNum)
                .to({ x: oldX + 20 }, shakeNum)
                .to({ x: oldX, y: oldY }, shakeNum);
        }
        else {
            egret.Tween.get(panel).to({ x: oldX - 10, y: oldY }, shakeNum)
                .to({ x: oldX + 20 }, shakeNum)
                .to({ y: oldY + 15 }, shakeNum)
                .to({ y: oldY - 20 }, shakeNum)
                .to({ y: oldY + 10 }, shakeNum)
                .to({ x: oldX, y: oldY }, shakeNum);
        }
    }
    EffectUtils.shakeScreen = shakeScreen;
})(EffectUtils || (EffectUtils = {}));
//# sourceMappingURL=EffectUtils.js.map