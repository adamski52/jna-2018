import "./Commit.scss";

import {GenericItem} from "./GenericItem";
import {ICommit} from "../interfaces/Commit.interface";
import {LanguageMap} from "../services/LanguageMap.service";

export class Commit extends GenericItem {
    constructor(commit:ICommit) {
        super("li");
        this.addClass(LanguageMap.getIconClass("GITHUB"));
        this.setText(commit.commit.message);
    }
}
