import { IHtmlEngineHelper, IHandlebarsOptions } from './html-engine-helper.interface';
import DependenciesEngine from '../dependencies.engine';
import AngularVersionUtil from '../../../utils/angular-version.util';
import BasicTypeUtil from '../../../utils/basic-type.util';
import Configuration from '../../configuration';

export class LinkType2Helper implements IHtmlEngineHelper {
    constructor() {
    }

    public helperFunc(context: any, name: string, options: IHandlebarsOptions) {
        const nameRegex = /([A-Za-z0-9":]+)/;
        context.types = name.split(nameRegex)
            .map(val => {
                if (val.match(/^([A-Za-z0-9]+)$/)) {
                    let _result = DependenciesEngine.find(val);
                    const setNameResult = this.getTypeLinkForName(val, _result);
                    if (setNameResult) {
                        return { ...setNameResult, isType: true, withline: context.withline || false, line: context.line || null };
                    }
                }
                return { raw: val, isType: false };
            });

        return options.fn(context);
    }

    private getTypeLinkForName(name: string, _result): any {
        let angularDocPrefix = AngularVersionUtil.prefixOfficialDoc(
            Configuration.mainData.angularVersion
        );
        const type = {
            raw: null,
            href: null,
            target: null
        };
        if (_result) {
            type.raw = name;
            if (_result.source === 'internal') {
                if (_result.data.type === 'class') {
                    _result.data.type = 'classe';
                }
                type.href = '../' + _result.data.type + 's/' + _result.data.name + '.html';
                if (
                    _result.data.type === 'miscellaneous' ||
                    (_result.data.ctype && _result.data.ctype === 'miscellaneous')
                ) {
                    let mainpage = '';
                    switch (_result.data.subtype) {
                        case 'enum':
                            mainpage = 'enumerations';
                            break;
                        case 'function':
                            mainpage = 'functions';
                            break;
                        case 'typealias':
                            mainpage = 'typealiases';
                            break;
                        case 'variable':
                            mainpage = 'variables';
                    }
                    type.href =
                        '../' + _result.data.ctype + '/' + mainpage + '.html#' + _result.data.name;
                }
                type.target = '_self';
            } else {
                type.href = `https://${angularDocPrefix}angular.io/${_result.data.path}`;
                type.target = '_blank';
            }

            return type;
        } else if (BasicTypeUtil.isKnownType(name)) {
            type.raw = name;
            type.target = '_blank';
            type.href = BasicTypeUtil.getTypeUrl(name);
            return type;
        } else {
            return null;
        }
    }
}
