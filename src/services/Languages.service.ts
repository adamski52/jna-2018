import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {ILanguage} from "../interfaces/Language.interface";
import {LanguageMap} from "./LanguageMap.service";
import {ILanguageMeta} from "../interfaces/LanguageMeta.interface";
import {HttpService} from "./Http.service";
import {IRepo} from "../interfaces/Repo.interface";
import {AllLanguagesService} from "./AllLanguages.service";

export class LanguagesService {
    private subject:BehaviorSubject<ILanguage[]> = new BehaviorSubject([]);

    public subscribe(callback:(response:ILanguage[]) => void):Subscription {
        return this.subject.subscribe(callback);
    }

    public get(repo:IRepo):void {
        HttpService.get("http://www.maintaincomposure.com/git/repos/adamski52/" + repo.name + "/languages", (response: ILanguageMeta) => {
            let languages: ILanguage[] = [],
                total: number = 0;

            Object.keys(response).forEach((key: string) => {
                languages.push({
                    name: key,
                    iconClass: LanguageMap.getIconClass(key),
                    percentage: response[key]
                });

                total += response[key];
            });

            languages.forEach((language: ILanguage) => {
                language.percentage = Math.ceil((language.percentage / total) * 100);
            });

            AllLanguagesService.addLanguages(languages);

            this.subject.next(languages);
        });
    }
}
