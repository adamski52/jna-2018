import "./MenuToggle.scss";

import {GenericItem} from "./GenericItem";
import {MenuService} from "../services/Menu.service";
import {IMenuState} from "../interfaces/MenuState.interface";

export class MenuToggle extends GenericItem {
    constructor() {
        super("a");

        this.setupSubscriptions();
        this.addClass("jna-icon-cog");
    }

    private setupSubscriptions():void {
        MenuService.subscribe((menuState:IMenuState) => {
            this.updateStyles(menuState);
        });
    }

    private updateStyles(menuState:IMenuState):void {
        if(menuState.isOpen) {
            this.addClass("open");
        }
        else {
            this.removeClass("open");
        }
    }
}
