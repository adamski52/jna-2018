import {Item} from "../Item/Item";

export class InteractiveItem extends Item {
    protected onMouseUp(e:MouseEvent):void {}
    protected onMouseDown(e:MouseEvent):void {}
    protected onMouseEnter(e:MouseEvent):void {}
    protected onDrag(e:MouseEvent):void {}
    protected onMouseLeave(e:MouseEvent):void {}

    private _isDragging:boolean = false;

    constructor(type:string) {
        super(type);

        this.getContainer().addEventListener("mousedown", (e:MouseEvent) => {
            this._isDragging = false;
            this.onMouseDown(e);
        });

        this.getContainer().addEventListener("mousemove", (e:MouseEvent) => {
            if(!this._isDragging) {
                return;
            }
            this.onDrag(e);
        });

        this.getContainer().addEventListener("mouseup", (e:MouseEvent) => {
            this._isDragging = true;
            this.onMouseUp(e);
        });

        this.getContainer().addEventListener("mouseenter", (e:MouseEvent) => {
            this.onMouseEnter(e);
        });

        this.getContainer().addEventListener("mouseleave", (e:MouseEvent) => {
            this.onMouseLeave(e);
        });
    }
}
