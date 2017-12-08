import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {IMenuState} from "../interfaces/MenuState.interface";

export class MenuService {
    private static subject:BehaviorSubject<IMenuState> = new BehaviorSubject({
        isOpen: false,
        disabledLanguages: []
    });

    public static subscribe(callback:(response:IMenuState) => void):Subscription {
        return MenuService.subject.subscribe(callback);
    }
}
