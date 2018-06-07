class ModuleBase extends egret.EventDispatcher{
	private _moduleType:string;
	public get moduleType():string
	{
		return this._moduleType;
	}
	private _resGroups:Array<string>;
	private _isShowLoadingView:boolean;
	private _openWdTypeArr:Array<string> = [];
	private _openWdDataArr:Array<any> = [];
	private _wdTypeList:Array<string>;
	private _isResLoadComplete:boolean;
	public constructor() {
		super();
	}
	protected init(resGroups:Array<string>,wdTypeList:Array<string>,isShowLoadingView:boolean = true):void
	{
		this._moduleType = this.hashCode + "";
		this._resGroups = resGroups;
		this._wdTypeList = wdTypeList;
		this._isShowLoadingView = isShowLoadingView;
		this._isResLoadComplete = !resGroups || resGroups.length == 0;
	}

	public openWindow(wdType:string,data?:any):void
	{
		if(this._wdTypeList && this._wdTypeList.length > 0 && this._wdTypeList.indexOf(wdType) == -1) return;
		if(this._isResLoadComplete)
		{
			this.showWindow(wdType,data);
			return;
		}
		var index:number = this._openWdTypeArr.indexOf(wdType);
		if(index > -1)
		{
			this._openWdDataArr[index] = data;
		}else
		{
			this._openWdTypeArr.push(wdType);
			this._openWdDataArr.push(data);
		}
		// ModuleLoadManager.instance.loadModule(this._moduleType,this._resGroups,this.onLoadComplete,this,this._isShowLoadingView);
	}
	private onLoadComplete():void
	{
		this._isResLoadComplete = true;
		var l:number = this._openWdTypeArr.length;
		for(var i:number = 0;i<l;i++)
		{
			this.showWindow(this._openWdTypeArr.shift(),this._openWdDataArr.shift());
		}
	}

	/**显示窗口*/
	protected showWindow(wdType:string,data?:any):void
	{

	}
	protected close():void
	{
		this.dispatchEventWith(egret.Event.CLOSE);
	}
	public destroyModuleRes():void
	{
		if(this._resGroups && this._resGroups.length > 0)
		{
			this._isResLoadComplete = false;
			// ModuleLoadManager.instance.destroyModuleRes(this._moduleType);
		}
		this._resGroups = null;
		this._wdTypeList = null;
	}
}