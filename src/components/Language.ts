import "./Language.scss";

import {GenericItem} from "./GenericItem";
import {LanguageText} from "./LanguageText";
import {ILanguage} from "../interfaces/Language.interface";

export class Language extends GenericItem {
    private _languageText:LanguageText;

    constructor(language:ILanguage) {
        super("span");

        this.addClass("colored");
        this.addClass(language.iconClass);

        this.createLanguageText(language);
    }

    private createLanguageText(language:ILanguage):void {
        this._languageText = new LanguageText(language);
        this.addChild(this._languageText);
    }
}
