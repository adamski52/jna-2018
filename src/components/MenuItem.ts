import "./MenuItem.scss";

import {GenericItem} from "./GenericItem";
import {Language} from "./Language";
import {ILanguage} from "../interfaces/Language.interface";
import {MenuService} from "../services/Menu.service";
import {IMenuState} from "../interfaces/MenuState.interface";

export class MenuItem extends GenericItem {
    private _language:ILanguage;
    constructor(language:ILanguage) {
        super("a");

        this._language = language;

        this.createLanguageItem(language);
        this.setupSubscriptions();

        this.getContainer().addEventListener("click", (e: MouseEvent) => {
            this.onClick(e);
        });
    }

    private createLanguageItem(language:ILanguage):void {
        let languageItem:Language = new Language(language);
        this.addChild(languageItem);
    }

    private setupSubscriptions():void {
        MenuService.subscribe((menuState:IMenuState) => {
            this.updateStyles(menuState);
        });
    }

    private updateStyles(menuState:IMenuState):void {
        if(menuState.disabledLanguages.indexOf(this._language.name) < 0) {
            this.removeClass("jna-icon-toggle-off");
            this.addClass("jna-icon-toggle-on");
            return;
        }

        this.removeClass("jna-icon-toggle-on");
        this.addClass("jna-icon-toggle-off");
    }

    protected onClick(e:MouseEvent):void {
        e.preventDefault();

        MenuService.toggleLanguage(this._language);
    }
}
