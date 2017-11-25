import "./GenericItem.scss";

export class GenericItem {
    private _container:HTMLElement;
    private _spinner:HTMLElement;
    protected _children:GenericItem[] = [];

    constructor(type: string = "div") {
        this._container = document.createElement(type);
        this.addClass(this.constructor.name);

        this.createSpinner();
    }

    private createSpinner():void {
        this._spinner = document.createElement("div");
        this._spinner.classList.add("Spinner");
        this.getContainer().appendChild(this._spinner);
        this.hideSpinner();
    }

    protected onMouseUp(e: MouseEvent):void {
    }

    protected onMouseDown(e: MouseEvent):void {
    }

    protected onMouseEnter(e: MouseEvent):void {
    }

    protected onDrag(e: MouseEvent):void {
    }

    protected onMouseLeave(e: MouseEvent):void {
    }

    private _dragHandler:EventListener = (e: MouseEvent) => {
        e.preventDefault();

        this.onDrag(e);
    };

    protected createEventListeners():void {
        document.addEventListener("mouseup", (e: MouseEvent) => {
            e.preventDefault();
            document.removeEventListener("mousemove", this._dragHandler);
        });

        this.getContainer().addEventListener("mousedown", (e: MouseEvent) => {
            e.preventDefault();

            this.onMouseUp(e);
            document.addEventListener("mousemove", this._dragHandler);
            this.onMouseDown(e);
        });

        this.getContainer().addEventListener("mouseup", (e: MouseEvent) => {
            e.preventDefault();

            document.removeEventListener("mousemove", this._dragHandler);
            this.onMouseUp(e);
        });

        this.getContainer().addEventListener("mouseenter", (e: MouseEvent) => {
            e.preventDefault();

            this.onMouseEnter(e);
        });

        this.getContainer().addEventListener("mouseleave", (e: MouseEvent) => {
            e.preventDefault();

            this.onMouseLeave(e);
        });
    }

    protected setStyle(property: string, value: string | number):void {
        this.getContainer().style[property] = value;
    }

    protected setText(text: string):void {
        this.getContainer().innerText = text;
    }

    protected addChild(item: GenericItem):void {
        this._children.push(item);
        this.getContainer().appendChild(item.getContainer());
    }

    public getContainer():HTMLElement {
        return this._container;
    }

    public removeAllChildren():void {
        this._children.forEach((item: GenericItem) => {
            this.getContainer().removeChild(item.getContainer());
        });

        this._children = [];
    }

    public addClass(className: string):void {
        this.getContainer().classList.add(className);
    }

    protected showSpinner():void {
        this._spinner.classList.remove("hidden");
    }

    protected hideSpinner():void {
        this._spinner.classList.add("hidden");
    }

    protected onLoadStart():void {

    }

    public load():void {
        this.showSpinner();
        this.onLoadStart();
    }
}
