import "./App.scss";

import {autoPlay} from 'es6-tween'

import {GenericItem} from "./GenericItem";
import {IVisualBound} from "../interfaces/VisualBound.interface";
import {Repo} from "./Repo";
import {ReposService} from "../services/Repos.service";
import {IRepo} from "../interfaces/Repo.interface";
import {Header} from "./Header";
import {ErrorService} from "../services/Error.service";
import {ErrorContainer} from "./ErrorContainer";

export class App extends GenericItem {
    private _prevY:number = 0;
    private _header:Header;
    private _errorContainer:ErrorContainer;

    constructor() {
        super("div");

        this.createHeader();
        this.createErrorContainer();
        this.setupSubscriptions();
        this.setupScrolling();

        autoPlay(true);
    }

    private createHeader():void {
        this._header = new Header();
        this.addChild(this._header, true);
    }

    private createErrorContainer():void {
        this._errorContainer = new ErrorContainer();
        this.addChild(this._errorContainer, true);
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
        ErrorService.subscribe((error:any) => {
            if(error.status === 403 && error.statusText === "Forbidden") {
                this._errorContainer.show("Oh no!  We've reached the GitHub API Rate Limit!  I must be popular.  Please try back in about an hour.");
            }
        });

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
