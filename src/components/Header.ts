import "./Header.scss";
import {GenericItem} from "./GenericItem";
import {Heading} from "./Heading";
import {Menu} from "./Menu";

export class Header extends GenericItem {
    constructor() {
        super("div");

        this.createMenu();
        this.createHeading();
    }

    private createHeading():void {
        let heading:Heading = new Heading();
        this.addChild(heading);
    }

    private createMenu():void {
        let menu:Menu = new Menu();
        this.addChild(menu);
    }
}
