import "./LanguageText.scss";

import {GenericItem} from "./GenericItem";
import {ILanguage} from "../interfaces/Language.interface";

export class LanguageText extends GenericItem {
    constructor(language:ILanguage) {
        super("span");
        this.setText(language.name + " (" + language.percentage + "%)");
    }
}
