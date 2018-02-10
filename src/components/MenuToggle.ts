import "./MenuToggle.scss";

import {GenericItem} from "./GenericItem";
import {MenuService} from "../services/Menu.service";
import {IMenuState} from "../interfaces/MenuState.interface";

export class MenuToggle extends GenericItem {
    constructor() {
        super("a");

        this.addClass("jna-icon-cog");

        this.getContainer().addEventListener("click", (e: MouseEvent) => {
            this.onClick(e);
        });
    }

    private onClick(e:MouseEvent):void {
        e.preventDefault();

        MenuService.toggleMenu();
    }
}
