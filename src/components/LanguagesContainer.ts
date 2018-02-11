import "./LanguagesContainer.scss";

import {ILanguage} from "../interfaces/Language.interface";
import {Language} from "./Language";
import {GenericItem} from "./GenericItem";

export class LanguagesContainer extends GenericItem {
    constructor() {
        super("div");
    }

    public setLanguages(languages:ILanguage[]):void {
        this.removeAllChildren();

        languages.forEach((language:ILanguage) => {
            let languageItem:Language = new Language(language);
            this.addChild(languageItem);
        });
    }
}