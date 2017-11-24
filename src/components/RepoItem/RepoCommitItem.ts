import {Item} from "../Item/Item";
import {ICommit} from "../interfaces/commit";

export class RepoCommitItem extends Item {
    constructor(commit:ICommit) {
        super("li");

        this.getContainer().classList.add("repo-commit-item");
        this.getContainer().innerText = commit.commit.message;
    }
}
