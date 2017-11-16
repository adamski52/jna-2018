import "./StyledItem.scss";

import {StyleUtils} from "../StyleUtils";
import {Item} from "../Item/Item";
import {IVisualBound} from "../Interfaces";
import {Tween, Easing} from "es6-tween";

export class StyledItem extends Item {
    private _scale:number;
    private _fixedScale:number;
    private _top:number;
    private _left:number;
    private _blur:number;
    private _baseBlur:number = 30;
    private _baseWidth:number = 300;
    private _baseHeight:number = 300;
    private _origTop:number;
    private _origLeft:number;
    private _mouseOriginX:number;
    private _mouseOriginY:number;
    private _tween:Tween;

    private _dragHandle:EventListener = (e:MouseEvent) => {
        e.preventDefault();
        this.onDrag(e);
    };

    private _releaseOutsideHandler:EventListener = (e:MouseEvent) => {
        e.preventDefault();
        document.removeEventListener("mousemove", this._dragHandle);
    };

    constructor(type:string = "div") {
        super(type);
        this.getContainer().classList.add("styled-item");
        this.setupEvents();
    }

    private onDrag(e:MouseEvent):void {
        this._left = this._origLeft + (e.screenX - this._mouseOriginX);
        this._top = this._origTop + (e.screenY - this._mouseOriginY);
        this.render();
    }

    private tweenScale(scale:number):void {
        if(this._tween && this._tween.isPlaying()) {
            this._tween.stop();
        }

        this._tween = new Tween(this)
            .to({
                _scale: scale
            })
            .duration(800)
            .easing(Easing.Elastic.Out)
            .on("update", () => {
                this.setScale(this._scale);
            })
            .start();
    }

    private setupEvents():void {
        this.getContainer().addEventListener("mousedown", (e:MouseEvent) => {
            e.preventDefault();
            this._releaseOutsideHandler(e);
            this._mouseOriginX = e.screenX;
            this._mouseOriginY = e.screenY;
            this._origLeft = this._left;
            this._origTop = this._top;

            document.addEventListener("mousemove", this._dragHandle);
        });

        this.getContainer().addEventListener("mouseup", this._releaseOutsideHandler);

        this.getContainer().addEventListener("mouseenter", (e:MouseEvent) => {
            this.tweenScale(1);
        });

        this.getContainer().addEventListener("mouseleave", (e:MouseEvent) => {
            this.tweenScale(this._fixedScale);
        });
    }

    public render():void {
        StyleUtils.width(this.getContainer(), this._baseWidth);
        StyleUtils.height(this.getContainer(), this._baseHeight);
        StyleUtils.top(this.getContainer(), this._top);
        StyleUtils.left(this.getContainer(), this._left);
        StyleUtils.blur(this.getContainer(), this._blur);
        StyleUtils.scale(this.getContainer(), this._scale);
    }

    public getVisualBounds():IVisualBound {
        return {
            top: this._top,
            left: this._left,
            right: this._left + this._baseWidth,
            bottom: this._top + this._baseHeight,
            height: this._baseHeight,
            width: this._baseWidth,
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
        if(this._fixedScale === undefined) {
            this._fixedScale = scale;
        }

        this._scale = scale;
        this.setBlur(false);

        if(doRender) {
            this.render();
        }
    }
}
