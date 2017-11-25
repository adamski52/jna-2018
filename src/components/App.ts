import "./App.scss";

import {autoPlay} from 'es6-tween'

import {GenericItem} from "./GenericItem";
import {IVisualBound} from "../interfaces/VisualBound.interface";
import {Repo} from "./Repo";
import {ReposService} from "../services/Repos.service";
import {IRepo} from "../interfaces/Repo.interface";

export class App extends GenericItem {
    private _prevY:number = 0;

    constructor() {
        super("div");

        this.setupSubscriptions();
        this.setupScrolling();

        autoPlay(true);
    }

    private createRepos(repos:IRepo[]):void {
        this.removeAllChildren();

        let top:number = 0;
        repos.forEach((repo:IRepo) => {
            let item:Repo = new Repo(repo),
                scale:number = .1 + (Math.random() *.8),
                left:number = Math.max(0, -item.getVisualBounds().width + Math.random() * (window.innerWidth));

            item.setScale(scale);

            let bounds:IVisualBound = item.getVisualBounds();
            top += bounds.height * bounds.scale;

            item.setPosition(left, top);
            this.addChild(item);
        });
    }

    private setupSubscriptions():void {
        ReposService.subscribe((repos:IRepo[]) => {
            this.createRepos(repos);
        });

        ReposService.get();
    }

    private setupScrolling():void {
        document.addEventListener("scroll", () => {
            let delta:number = window.scrollY - this._prevY;
            this._prevY = window.scrollY;

            this._children.forEach((item:Repo) => {
                item.move(delta);
            });
        });
    }
}
