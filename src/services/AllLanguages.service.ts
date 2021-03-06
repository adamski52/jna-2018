import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {ILanguage} from "../interfaces/Language.interface";

export class AllLanguagesService {
    private static subject:BehaviorSubject<ILanguage[]> = new BehaviorSubject([]);
    private static languages:ILanguage[] = [];

    public static subscribe(callback:(response:ILanguage[]) => void):Subscription {
        return this.subject.subscribe(callback);
    }

    public static addLanguages(languages):void {
        let prevCount:number = AllLanguagesService.languages.length;
        languages.forEach((language:ILanguage) => {
            let existingLanguage:ILanguage = AllLanguagesService.languages.find((lang:ILanguage) => {
                return lang.name === language.name;
            });

            if(existingLanguage) {
                return;
            }

            let copiedLanguage:ILanguage = {
                percentage: undefined,
                name: language.name,
                iconClass: language.iconClass
            };

            AllLanguagesService.languages.push(copiedLanguage);
        });

        let currentCount:number = AllLanguagesService.languages.length;
        if(currentCount <= prevCount) {
            return;
        }

        AllLanguagesService.languages.sort((lhs:ILanguage, rhs:ILanguage) => {
            if(lhs.name > rhs.name) {
                return 1;
            }

            if(lhs.name > rhs.name) {
                return -1;
            }

            return 0;
        });

        AllLanguagesService.subject.next(AllLanguagesService.languages);
    }
}
