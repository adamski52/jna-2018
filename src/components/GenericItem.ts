import "./GenericItem.scss";

export class GenericItem {
    private _container:HTMLElement;
    protected _children:GenericItem[] = [];

    constructor(type: string = "div") {
        this._container = document.createElement(type);
        this.addClass(this.constructor.name);
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

    protected addChild(item: GenericItem, permanent:boolean = false):void {
        this.getContainer().appendChild(item.getContainer());

        if(!permanent) {
            this._children.push(item);
        }
    }

    public setAttribute(name:string, value:string):void {
        this.getContainer().setAttribute(name, value);
    }

    public setStyle(property: string, value: string | number):void {
        this.getContainer().style[property] = value;
    }

    public setText(text: string):void {
        this.getContainer().innerText = text;
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

    public removeClass(className: string):void {
        this.getContainer().classList.remove(className);
    }
}
