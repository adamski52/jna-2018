import "./LanguageText.scss";

import {GenericItem} from "./GenericItem";
import {ILanguage} from "../interfaces/Language.interface";

export class LanguageText extends GenericItem {
    constructor(language:ILanguage) {
        super("span");

        let text:string = language.name;
        if(language.percentage) {
            text += " (" + language.percentage + "%)";
        }

        this.setText(text);
    }
}
