import {autoPlay} from 'es6-tween'

import "./App.scss";
import {Item} from "../Item/Item";
import {IVisualBound} from "../Interfaces";
import {ReposService} from "../RepoItem/Repos.service";
import {IRepo} from "../interfaces/repo";
import {RepoItem} from "../RepoItem/RepoItem";

export class App extends Item {
    private _prevY:number = 0;
    private _items:RepoItem[] = [];
    private _repos:RepoItem[] = [];

    constructor() {
        super("div");
        this.getContainer().classList.add("app");

        this.setupRepos();

        this.setupScrolling();

        autoPlay(true);
    }

    private updateItems():void {
        this._items = [].concat(this._repos);

        let top:number = 0;
        this._items.forEach((item:RepoItem) => {
            let scale:number = .1 + (Math.random() *.8);
            item.setScale(scale);

            let left:number = Math.max(0, -item.getVisualBounds().width + Math.random() * (window.innerWidth));
            let bounds:IVisualBound = item.getVisualBounds();
            top += bounds.height * bounds.scale;

            item.setPosition(left, top);
            this.getContainer().appendChild(item.getContainer());
        });
    }

    private setupRepos():void {
        ReposService.subscribe((repos:IRepo[]) => {
            this._repos = [];
            repos.forEach((r:IRepo) => {
                let repo:RepoItem = new RepoItem(r);
                this._repos.push(repo);
            });
            this.updateItems();
        });

        ReposService.get();
    }

    private setupScrolling():void {
        document.addEventListener("scroll", () => {
            let delta:number = window.scrollY - this._prevY;
            this._prevY = window.scrollY;

            this._items.forEach((item:RepoItem) => {
                item.move(delta);
            });
        });
    }
}
