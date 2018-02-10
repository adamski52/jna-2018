import "./AsyncItem.scss";
import {GenericItem} from "./GenericItem";

export class AsyncItem extends GenericItem {
    private _spinner:HTMLElement;

    constructor(type: string = "div") {
        super(type);
        this.createSpinner();
    }

    private createSpinner():void {
        this._spinner = document.createElement("div");
        this._spinner.classList.add("Spinner");
        this.getContainer().appendChild(this._spinner);
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
