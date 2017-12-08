import "./Menu.scss";

import {GenericItem} from "./GenericItem";
import {ILanguage} from "../interfaces/Language.interface";
import {AllLanguagesService} from "../services/AllLanguages.service";
import {MenuService} from "../services/Menu.service";
import {IMenuState} from "../interfaces/MenuState.interface";
import {MenuToggle} from "./MenuToggle";
import {MenuItem} from "./MenuItem";

export class Menu extends GenericItem {
    constructor() {
        super("nav");

        this.createToggle();
        this.setupSubscriptions();
    }

    private createToggle():void {
        let toggle:MenuToggle = new MenuToggle();
        this.addChild(toggle, true);
    }

    private setupSubscriptions():void {
        AllLanguagesService.subscribe((languages:ILanguage[]) => {
            this.createMenuItems(languages);
        });

        MenuService.subscribe((menuState:IMenuState) => {
            this.updateStyles(menuState);
        });
    }

    private createMenuItems(languages:ILanguage[]):void {
        this.removeAllChildren();

        languages.forEach((language:ILanguage) => {
            let menuItem:MenuItem = new MenuItem(language);
            this.addChild(menuItem);
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
