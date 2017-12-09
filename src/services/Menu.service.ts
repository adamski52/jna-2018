import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {IMenuState} from "../interfaces/MenuState.interface";
import {ILanguage} from "../interfaces/Language.interface";

export class MenuService {
    private static state:IMenuState = {
        isOpen: false,
        disabledLanguages: []
    };

    private static subject:BehaviorSubject<IMenuState> = new BehaviorSubject(MenuService.state);

    public static subscribe(callback:(response:IMenuState) => void):Subscription {
        return MenuService.subject.subscribe(callback);
    }

    public static toggleMenu():void {
        MenuService.state.isOpen = !MenuService.state.isOpen;
        MenuService.subject.next(MenuService.state);
    }

    public static toggleLanguage(language:ILanguage):void {
        let index:number = MenuService.state.disabledLanguages.indexOf(language.name);

        if(index < 0) {
            MenuService.state.disabledLanguages.push(language.name);
        }
        else {
            MenuService.state.disabledLanguages.splice(index, 1);
        }

        MenuService.subject.next(MenuService.state);
    }
}
