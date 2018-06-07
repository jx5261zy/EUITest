/**
 *''"
 * @author 
 *
 */
class WindowBase extends eui.Component{
		public static BASE_WIDTH:number = 1334;
		public static BASE_HEIGHT:number = 750;

		private _width:number = 0;
    	private _height:number = 0;
    	/**
    	 * 窗口宽度(设置值)
    	 */
    	public get w():number
    	{
    	    return this._width;
    	}
    	/**
    	 * 窗口高度(设置值)
    	 */
        public get h():number
    	{
    	    return this._height;
    	}
    	 /**
    	 * 窗口宽度
    	 */
    	public get wdWidth():number
    	{
    	    return this._width * this.scaleX;
    	}
    	 /**
    	 * 窗口高度
    	 */
    	public get wdHeight():number
    	{
            return this._height * this.scaleY;
    	}
    	private _isAnimation:boolean;
    	/**
    	 * 是否显示窗口动画
    	 */
    	public set isAnimation(val:boolean)
    	{
    	    this._isAnimation = val;
    	}
        private _isClose:boolean;
        /**
         * 是否关闭中
         */
        public get isClose():boolean
        {
            return this._isClose;
        }
		private _maskAlpha:number = 0;
		private _isEnabledClickClose:boolean;
		public set isEnabledClickClose(val:boolean)
		{
			this._isEnabledClickClose = val;
		}
		public isEnabledMaskTouch:boolean = true;
        protected _fullBg: eui.Rect;
        private showFullBg():void
        {
			if(!this._fullBg)
			{
				this._fullBg = new eui.Rect();
				this._fullBg.fillColor = 0;
				this._fullBg.fillAlpha = .7;
				if(this._isEnabledClickClose) this._fullBg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onFullBgClick,this);
			}
			this.parent.addChildAt(this._fullBg,this.parent.numChildren - 1);
			this._fullBg.alpha = this._maskAlpha;
			this._fullBg.visible = true;
			this._fullBg.width = Main.getInstance().stage.stageWidth;
			this._fullBg.height = Main.getInstance().stage.stageHeight;
			this._fullBg.touchEnabled = this._isEnabledClickClose || this.isEnabledMaskTouch;
        }
        private setFullBgPos():void
        {
            if(this._fullBg){
                this.scaleX = this.scaleY = 1;
                var p:egret.Point = this._fullBg.parent.globalToLocal(0,0);
                this._fullBg.x = p.x;
                this._fullBg.y = p.y;
            }
        }
        
		public constructor(width?:number,height?:number) {
    		super();
    		this._width = width;
            this._height = height;
            this.anchorOffsetX = this._width * .5;
            this.anchorOffsetY = this._height * .5;
		}
		protected createChildren():void
		{
			super.createChildren();
			var b:boolean;
			if(isNaN(this._width) || this._width == undefined || this._width == null || this._width <= 0) 
			{
				this._width = this.width;
				b = true;
			}
			if(isNaN(this._height) || this._height == undefined || this._height == null || this._height <= 0) 
			{
				this._height = this.height;
				b = true;
			}
			if(b)
			{
				this.anchorOffsetX = this._width * .5;
            	this.anchorOffsetY = this._height * .5;
			}
		}
	    public setSize(width:number,height:number):void
	    {
	        this._width = width;
	        this._height = height;
        }
		/**
		 * @param layerType 0 ui 1 top
		*/
        public show(layerType:number = 0,isShowMask:boolean = false,isCenter:boolean = true,maskAlpha:number = 0.7,isClickClose:boolean = false,parentObj:egret.DisplayObjectContainer = null):void
	    {
			this.visible = true;
			if(parentObj)
			{
				parentObj.addChild(this);
			}else
			{
				if(layerType == 0)
				{
					// Main.getInstance().display(this);
				}else
				{
					// Main.getInstance().topUi.addChild(this);
				}
			}

			if(isCenter)
			{
				if(parentObj)
				{
					this.x = (parentObj.width - this.w) * .5 + this.anchorOffsetX;
					this.y = (parentObj.height - this.h) * .5 + this.anchorOffsetY;
				}else
				{
					this.x = (Main.getInstance().stage.stageWidth - this.w) * .5 + this.anchorOffsetX;
					this.y = (Main.getInstance().stage.stageHeight - this.h) * .5 + this.anchorOffsetY;
				}
			}
			this._maskAlpha = maskAlpha;
			this._isEnabledClickClose = isClickClose;
			if(isShowMask)
			{
				this.showFullBg();
				this.setFullBgPos();
			}
			this._isClose = false;
            this.aniShow();
	    }
	    private aniShow():void
	    {
            if(this._isAnimation) {
                this.scaleX = this.scaleY = 0;
                this.alpha = 0;
				egret.Tween.get(this).to({scaleX: 1,scaleY: 1,alpha: 1},400,egret.Ease.backOut).call( this.onAnimationShowComplete,this);
            }
	    }
        private onAnimationShowComplete()
        {
            //Utils.showLog("窗口动画完成");
        }
		public hide():void
		{
			egret.Tween.removeTweens(this);
			if(this.parent) this.parent.removeChild(this);
			if(this._fullBg && this._fullBg.parent)  this._fullBg.parent.removeChild(this._fullBg);
		}
		public setWindowVisible(isVisible:boolean):void
		{
			this.visible = isVisible;
			if(this._fullBg) this._fullBg.visible = isVisible;
		}
        private onFullBgClick():void
        {
			this._fullBg.touchEnabled = false;
			this.close();
        }
	    public close():void
	    {
            this._isClose = true;
			// if(this._fullBg) this._fullBg.visible = false;
            if(this._isAnimation)
            {
				egret.Tween.get(this).to({scaleX: 0,scaleY: 0,alpha: 0},400,egret.Ease.backIn).call( this.onAnimationHideComplete,this);
            } else {
                this.dispatchEventWith(egret.Event.CLOSE);
            }
	    }
        protected onAnimationHideComplete()
        {
            this.dispatchEventWith(egret.Event.CLOSE);
        }

        private _isDispose:boolean;
        protected get isDispose():boolean
        {
            return this._isDispose;
        }
	    public dispose():void
	    {
    	    this._isDispose = true;
			egret.Tween.removeTweens(this);
            if(this._fullBg) {
				if(this._fullBg.parent) this._fullBg.parent.removeChild(this._fullBg);
                this._fullBg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onFullBgClick,this);
                this._fullBg = null;
            }
            this._isAnimation = false;
            this.removeChildren();
            if(this.parent != null) this.parent.removeChild(this);
	    }
	}