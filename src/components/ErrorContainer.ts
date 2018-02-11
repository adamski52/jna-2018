import "./ErrorContainer.scss";

import {GenericItem} from "./GenericItem";

export class ErrorContainer extends GenericItem {
    private _timeout:number;
    constructor() {
        super("div");
    }

    public show(error:string):void {
        this.addClass("open");
        this.setText(error);

        if(this._timeout === undefined) {
            this._timeout = window.setTimeout(() => {
                this.hide();
                this._timeout = undefined;
            }, 5000);
        }
    }

    public hide():void {
        this.removeClass("open");
    }
}
