import "./StyledItem.scss";

import {StyleUtils} from "../StyleUtils";
import {Item} from "../Item/Item";
import {IVisualBound} from "../Interfaces";

export class StyledItem extends Item {
    private _scale:number;
    private _width:number;
    private _top:number;
    private _left:number;
    private _height:number;
    private _blur:number;
    private _baseBlur:number = 20;
    private _baseWidth:number = 300;
    private _baseHeight:number = 300;
    private _origTop:number;
    private _origLeft:number;
    private _mouseOriginX:number;
    private _mouseOriginY:number;

    constructor(type:string = "div") {
        super(type);
        this.getContainer().classList.add("styled-item");
        this.setupDrag();

        this.setScale(1, false);
        this.setPosition(0, 0, false);
        this.render();
    }

    private onDrag(e:MouseEvent):void {
        this._left = this._origLeft + (e.screenX - this._mouseOriginX);
        this._top = this._origTop + (e.screenY - this._mouseOriginY);
        this.render();
    }

    private setupDrag():void {
        let dragHandle:EventListener = (e:MouseEvent) => {
            e.preventDefault();
            this.onDrag(e);
        };

        let releaseOutsideHandler:EventListener = (e:MouseEvent) => {
            e.preventDefault();
            document.removeEventListener("mousemove", dragHandle);
        };

        this.getContainer().addEventListener("mousedown", (e:MouseEvent) => {
            e.preventDefault();
            this._mouseOriginX = e.screenX;
            this._mouseOriginY = e.screenY;
            this._origLeft = this._left;
            this._origTop = this._top;

            document.addEventListener("mousemove", dragHandle);
        });

        this.getContainer().addEventListener("mouseup", releaseOutsideHandler);
    }

    public render():void {
        StyleUtils.width(this.getContainer(), this._width);
        StyleUtils.height(this.getContainer(), this._height);
        StyleUtils.top(this.getContainer(), this._top);
        StyleUtils.left(this.getContainer(), this._left);
        StyleUtils.blur(this.getContainer(), this._blur);
    }

    public getVisualBounds():IVisualBound {
        return {
            top: this._top,
            left: this._left,
            right: this._left + this._width,
            bottom: this._top + this._height,
            height: this._height,
            width: this._width,
            scale: this._scale
        };
    }

    public setBlur(doRender:boolean = true):void {
        this._blur = this._baseBlur * (Math.abs(this._scale - 1));
        if(doRender) {
            this.render();
        }
    }

    public move(deltaTop:number, doRender:boolean = true):void {
        this._top = this._top - deltaTop * this._scale;
        if(doRender) {
            this.render();
        }
    }

    public setPosition(left:number, top:number, doRender:boolean = true):void {
        this._left = left;
        this._top = top;

        if(doRender) {
            this.render();
        }
    }

    public setScale(scale:number, doRender:boolean = true):void {
        this._scale = scale;
        this._width = this._baseWidth * this._scale;
        this._height = this._baseHeight * this._scale;
        this.setPosition(this._left, this._top, false);
        this.setBlur(false);

        if(doRender) {
            this.render();
        }
    }
}
