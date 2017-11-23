import {Item} from "../Item/Item";

export class InteractiveItem extends Item {
    protected onMouseUp(e:MouseEvent):void {}
    protected onMouseDown(e:MouseEvent):void {}
    protected onMouseEnter(e:MouseEvent):void {}
    protected onDrag(e:MouseEvent):void {}
    protected onMouseLeave(e:MouseEvent):void {}

    private _dragHandler:EventListener = (e:MouseEvent) => {
        e.preventDefault();

        this.onDrag(e);
    };

    constructor(type:string) {
        super(type);

        this.getContainer().addEventListener("mousedown", (e:MouseEvent) => {
            e.preventDefault();

            this.onMouseUp(e);
            document.addEventListener("mousemove", this._dragHandler);
            this.onMouseDown(e);
        });

        this.getContainer().addEventListener("mouseup", (e:MouseEvent) => {
            e.preventDefault();

            document.removeEventListener("mousemove", this._dragHandler);
            this.onMouseUp(e);
        });

        this.getContainer().addEventListener("mouseenter", (e:MouseEvent) => {
            e.preventDefault();

            this.onMouseEnter(e);
        });

        this.getContainer().addEventListener("mouseleave", (e:MouseEvent) => {
            e.preventDefault();

            this.onMouseLeave(e);
        });
    }
}
