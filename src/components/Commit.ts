import "./Commit.scss";

import {GenericItem} from "./GenericItem";
import {ICommit} from "../interfaces/Commit.interface";

export class Commit extends GenericItem {
    constructor(commit:ICommit) {
        super("li");
        this.setText(commit.commit.message);
    }
}
