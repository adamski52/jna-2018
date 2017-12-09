import "./Repo.scss";

import {GenericItem} from "./GenericItem";
import {Background} from "./Background";
import {LanguagesContainer} from "./LanguagesContainer";
import {CommitsContainer} from "./CommitsContainer";
import {Title} from "./Title";
import {Tween, Easing} from "es6-tween";
import {IRepo} from "../interfaces/Repo.interface";
import {StyleUtils} from "../services/StyleUtils.service";
import {IVisualBound} from "../interfaces/VisualBound.interface";
import {MenuService} from "../services/Menu.service";
import {IMenuState} from "../interfaces/MenuState.interface";
import {ILanguage} from "../interfaces/Language.interface";

export class Repo extends GenericItem {
    private _background:Background;
    private _languages:LanguagesContainer;
    private _commits:CommitsContainer;
    private _title:Title;

    private _scale:number;
    private _fixedScale:number;
    private _top:number;
    private _left:number;
    private _blur:number;
    private _baseBlur:number = 15;  // TODO:  Get from rendered style so scss vars carry through?
    private _origTop:number;
    private _origLeft:number;
    private _mouseOriginX:number;
    private _mouseOriginY:number;
    private _tween:Tween;

    constructor(repo:IRepo) {
        super();

        this.createEventListeners();
        this.createBackground(repo);
        this.createTitle(repo);
        this.createLanguageBar(repo);
        this.createCommitsContainer(repo);
        this.setupSubscriptions();

        this._languages.load();
    }

    private setupSubscriptions():void {
        MenuService.subscribe((state:IMenuState) => {
            let repoLanguages:ILanguage[] = this._languages.getLanguages(),
                remainingLanguages:ILanguage[];

            remainingLanguages = repoLanguages.filter((language:ILanguage) => {
                return state.disabledLanguages.indexOf(language.name) < 0;
            });

            if(remainingLanguages.length <= 0) {
                this.hide();
                return;
            }

            this.show();
        });
    }

    private hide():void {
        this.addClass("hidden");
    }

    private show():void {
        this.removeClass("hidden");
    }

    private createBackground(repo:IRepo):void {
        this._background = new Background(repo);
        this.addChild(this._background);
    }

    private createTitle(repo:IRepo):void {
        this._title = new Title(repo);
        this.addChild(this._title);
    }

    private createLanguageBar(repo:IRepo):void {
        this._languages = new LanguagesContainer(repo);
        this.addChild(this._languages);
    }

    private createCommitsContainer(repo:IRepo):void {
        this._commits = new CommitsContainer(repo);
        this.addChild(this._commits);
    }

    private tweenScale(scale:number):void {
        if(this._tween && this._tween.isPlaying()) {
            this._tween.stop();
        }

        this._tween = new Tween(this)
            .to({
                _scale: scale
            })
            .duration(800)  // TODO:  Get from rendered style so scss vars carry through?
            .easing(Easing.Elastic.Out)
            .on("update", () => {
                this.setScale(this._scale);
            })
            .start();
    }

    protected onMouseDown(e:MouseEvent):void {
        this._mouseOriginX = e.screenX;
        this._mouseOriginY = e.screenY;
        this._origLeft = this._left;
        this._origTop = this._top;
    }

    protected onMouseEnter(e:MouseEvent):void {
        this.tweenScale(1);
    }

    protected onMouseLeave(e:MouseEvent):void {
        this.tweenScale(this._fixedScale);
    }

    protected onDrag(e:MouseEvent):void {
        this._left = this._origLeft + (e.screenX - this._mouseOriginX);
        this._top = this._origTop + (e.screenY - this._mouseOriginY);
        this.render();
    }

    public render():void {
        StyleUtils.top(this, this._top);
        StyleUtils.left(this, this._left);
        StyleUtils.blur(this, this._blur);
        StyleUtils.scale(this, this._scale);
    }

    public getVisualBounds():IVisualBound {
        return {
            top: this._top,
            left: this._left,
            height: 300, // TODO:  Get from rendered style so scss vars carry through?
            width: 300,
            scale: this._scale
        };
    }

    protected setBlur(doRender:boolean = true):void {
        this._blur = this._baseBlur * (Math.abs(this._scale - 1));
        if(doRender) {
            this.render();
        }
    }

    public move(deltaTop:number, doRender:boolean = true):void {
        this._top = this._top - deltaTop * Math.pow(this._scale, 1 / this._scale);
        if(doRender) {
            this.render();
        }
    }

    public setPosition(left:number, top:number, doRender:boolean = true):void {
        this._left = left;
        this._top = top;

        if(doRender) {
            this.render();
        }
    }

    public setScale(scale:number, doRender:boolean = true):void {
        if(this._fixedScale === undefined) {
            this._fixedScale = scale;
        }

        this._scale = scale;
        this.setBlur(false);

        if(doRender) {
            this.render();
        }
    }
}
