//
// created at 2017-5-11 15:33:39
// 
module EffectUtils {
	//抖动对象特效
    // 1：抖动  2：震动
    export function shakeScreen(panel : any, effectType:number = 1, oldX : number = 0, oldY : number = 0):void{
        
        var shakeNum = 40;
        // var oldX:number = panel.x;
        // var oldY:number = panel.y;

        if(effectType == 1){
            egret.Tween.get(panel).to({x:oldX - 10},shakeNum)
                                  .to({x: oldX + 20}, shakeNum)
                                  .to({x: oldX - 20}, shakeNum)
                                  .to({x: oldX + 20}, shakeNum)
                                  .to({x: oldX, y: oldY}, shakeNum);
            // egret.setTimeout(function () {              
            //     egret.Tween.get(panel).to({x:oldX + 20},shakeNum); 
            // }, this, shakeNum*2); 
            // egret.setTimeout(function () {              
            //     egret.Tween.get(panel).to({x:oldX - 20},shakeNum); 
            // }, this, shakeNum*3); 
            // egret.setTimeout(function () {              
            //     egret.Tween.get(panel).to({x:oldX + 20},shakeNum); 
            // }, this, shakeNum*4); 
            // egret.setTimeout(function () {              
            //     egret.Tween.get(panel).to({x:oldX, y:oldY},shakeNum); 
            // }, this, shakeNum*5);

        }else{

            egret.Tween.get(panel).to({x:oldX - 10,y:oldY},shakeNum)
                                  .to({x: oldX + 20}, shakeNum)
                                  .to({y: oldY + 15}, shakeNum)
                                  .to({y: oldY - 20}, shakeNum)
                                  .to({y: oldY + 10}, shakeNum)
                                  .to({x: oldX, y: oldY}, shakeNum);

            // egret.setTimeout(function () {              
            //     egret.Tween.get(panel).to({x:oldX + 20,y:oldY},shakeNum); 
            // }, this, shakeNum*2); 
            // egret.setTimeout(function () {              
            //     egret.Tween.get(panel).to({x:oldX,y:oldY + 15},shakeNum); 
            // }, this, shakeNum*3); 
            // egret.setTimeout(function () {              
            //     egret.Tween.get(panel).to({x:oldX,y:oldY - 20},shakeNum); 
            // }, this, shakeNum*4); 
            // egret.setTimeout(function () {              
            //     egret.Tween.get(panel).to({x:oldX,y:oldY + 10},shakeNum); 
            // }, this, shakeNum*5); 
            // egret.setTimeout(function () {              
            //     egret.Tween.get(panel).to({x:oldX,y:oldY},shakeNum); 
            // }, this, shakeNum*6);      
        }
    }
}