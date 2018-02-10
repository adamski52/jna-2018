import "./Heart.scss";
import {GenericItem} from "./GenericItem";
import {IRepo} from "../interfaces/Repo.interface";
import {HeartService} from "../services/Heart.service";

export class Heart extends GenericItem {
    private _heartService:HeartService;

    constructor(repo:IRepo) {
        super("a");

        this._heartService = new HeartService(repo);

        this.setupSubscriptions();

        this._heartService.get();
    }

    private onClick(e:MouseEvent):void {
        e.preventDefault();

        this.activate();

        this._heartService.post();
    }

    private activate():void {
        this.removeClass("jna-icon-heart");
        this.addClass("jna-icon-heartbeat");
        this.addClass("loading");
    }

    private deactivate():void {
        this.removeClass("jna-icon-heartbeat");
        this.addClass("jna-icon-heart");
        this.removeClass("loading");
    }

    private setupSubscriptions():void {
        this._heartService.subscribe((hearts:number) => {
            this.setText(hearts.toString());
            this.deactivate();
        });

        this.getContainer().addEventListener("click", (e:MouseEvent) => {
            this.onClick(e);
        });
    }
}
