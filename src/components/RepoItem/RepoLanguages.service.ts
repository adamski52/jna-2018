import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {ILanguage, ILanguageMeta} from "../interfaces/language";
import {IRepo} from "../interfaces/repo";
import {RepoLanguageMap} from "./RepoLanguageMap";

export class ReposLanguagesService {
    private subject:BehaviorSubject<ILanguage[]> = new BehaviorSubject([{
        name: "none",
        iconClass: "none",
        percentage: 100
    }]);

    public subscribe(callback:(response:ILanguage[]) => void):Subscription {
        return this.subject.subscribe(callback);
    }

    public getIconClass(language:string):string {
        language = language.replace(/\+/gi, "plus");
        language = language.replace(/#/gi, "sharp");
        language = language.replace(/\s/gi, "");
        language = language.toUpperCase();

        return "devicon-" + (RepoLanguageMap[language] || RepoLanguageMap["OTHER"]);
    }

    public get(repo:IRepo):void {
        //HttpService.get(this.subject);

        let response:ILanguageMeta = {
            "TypeScript": 135022,
            "CSS": 20277,
            "HTML": 7500,
            "JavaScript": 4117
        };

        let languages:ILanguage[] = [],
            total:number = 0;

        Object.keys(response).forEach((key:string) => {
            languages.push({
                name: key,
                iconClass: this.getIconClass(key),
                percentage: response[key]
            });

            total += response[key];
        });

        languages.forEach((language:ILanguage) => {
            language.percentage = Math.ceil((language.percentage / total) * 100);
        });

        this.subject.next(languages)
    }
}
