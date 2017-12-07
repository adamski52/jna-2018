import "./Header.scss";
import {GenericItem} from "./GenericItem";
import {Heading} from "./Heading";

export class Header extends GenericItem {
    private _title:Heading;

    constructor() {
        super("div");
        this._title = new Heading();
        this.addChild(this._title);
    }
}
