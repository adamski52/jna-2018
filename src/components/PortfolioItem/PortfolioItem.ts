import "./PortfolioItem.scss";

import {StyledItem} from "../StyledItem/StyledItem";
import {Item} from "../Item/Item";

export class PortfolioItem extends StyledItem {
    private _title:Item;

    constructor() {
        super("div");
        this.getContainer().classList.add("portfolio-item");

        this._title = new Item("h3");
        this._title.getContainer().classList.add("title");
        this.getContainer().appendChild(this._title.getContainer());
    }

    protected setTitle(title:string):void {
        this._title.getContainer().innerText = title;
    }
}
