const eol = require('os').EOL;
import chai from 'chai';
import { temporaryDir, shell, pkg, exists, exec, read, shellAsync } from '../helpers';
import chaiString from 'chai-string';

chai.use(chaiString);
const expect = chai.expect;
const tmp = temporaryDir();

describe('CLI Interface Literal Types', () => {
    let stdoutString = undefined;
    let literalTypeFile;
    let anotherLiteralTypeFile;
    let typealiasesFile;

    const tmpFolder = tmp.name + '-big-app';
    const distFolder = tmpFolder + '/documentation';

    before(done => {
        tmp.create(distFolder);
        let ls = shell('node', [
            './bin/index-cli.js',
            '-p',
            './test/fixtures/todomvc-ng2/src/tsconfig.json',
            '-d',
            distFolder
        ]);
        // let ls2 = shell('node', [
        //     './bin/index-cli.js',
        //     '-p',
        //     './test/fixtures/todomvc-ng2/src/tsconfig.json',
        //     '-d',
        //     distFolder,
        //     '-e',
        //     'json'
        // ]);

        if (ls.stderr.toString() !== '') {
            console.error(`shell error: ${ls.stderr.toString()}`);
            done('error');
        }
        stdoutString = ls.stdout.toString();
        // console.log(stdoutString);
        literalTypeFile = read(`${distFolder}/interfaces/LiteralType.html`);
        anotherLiteralTypeFile = read(`${distFolder}/interfaces/AnotherLiteralType.html`);
        typealiasesFile = read(`${distFolder}/miscellaneous/typealiases.html`);
        done();
    });
    after(() => {
        tmp.clean(distFolder)
    });

    it(`should support property with literal type of 'hello'`, () => {
        expect(literalTypeFile).to.contain('<code>&quot;hello&quot;');
    });

    it(`should support property with union literal type of 'hello' | 'goodbye'`, () => {
        expect(anotherLiteralTypeFile).to.contain('<code>&quot;hello&quot; | &quot;goodbye&quot;');
    });

    [
        {
            typealias: 'MyNewType',
            types: ['IInterface1', 'IInterface2'],
            expected: `<code><a href="../interfaces/IInterface1.html" target="_self" >IInterface1</a> | <a href="../interfaces/IInterface2.html" target="_self" >IInterface2</a>`
        },
        {
            typealias: 'MyNewType2',
            types: ['IInterface3', 'IInterface4'],
            expected: `<code><a href="../interfaces/IInterface3.html" target="_self" >IInterface3</a> | <a href="../interfaces/IInterface4.html" target="_self" >IInterface4</a>`
        },
        {
            typealias: 'MyNewType3',
            types: ['MyClass1', 'MyClass2'],
            expected: `<code><a href="../classes/MyClass1.html" target="_self" >MyClass1</a> | <a href="../classes/MyClass2.html" target="_self" >MyClass2</a>`
        },
        {
            typealias: 'MyNewType4',
            types: ['MyClass3', 'MyClass4'],
            expected: `<code>
<a href="../classes/MyClass3.html" target="_self" >MyClass3</a>
|
<a href="../classes/MyClass4.html" target="_self" >MyClass4</a>`
        }
    ]
        .forEach((data) => {
            it(`should support linking to typealias union types - typealias (${data.typealias}), types (${data.types}), expected (${data.expected})`,
                () => {
                    expect(typealiasesFile).to.containIgnoreSpaces(data.expected);
                });
        });

    [
        {
            typealias: 'MyNewType7', types: ['IInterface1', 'IInterface2'], expected: `<code>
[
<a href="../interfaces/IInterface1.html" target="_self" >IInterface1</a>
,
<a href="../interfaces/IInterface2.html" target="_self" >IInterface2</a>
]`
        },
        {
            typealias: 'MyNewType8',
            types: ['IInterface3', 'IInterface4'],
            expected: `<code>
[
<a href="../interfaces/IInterface3.html" target="_self" >IInterface3</a>
,
<a href="../interfaces/IInterface4.html" target="_self" >IInterface4</a>
]`
        },
        {
            typealias: 'MyNewType9',
            types: ['MyClass1', 'MyClass2'],
            expected: `<code>
[
<a href="../classes/MyClass1.html" target="_self" >MyClass1</a>
,
<a href="../classes/MyClass2.html" target="_self" >MyClass2</a>
]`
        },
        {
            typealias: 'MyNewType10',
            types: ['MyClass3', 'MyClass4'],
            expected: `<code>
[
<a href="../classes/MyClass3.html" target="_self" >MyClass3</a>
,
<a href="../classes/MyClass4.html" target="_self" >MyClass4</a>
]`
        }
    ]
        .forEach((data) => {
            it(`should support linking to typealias tuple types - typealias (${data.typealias}), types (${data.types}), expected (${data.expected})`,
                () => {
                    expect(typealiasesFile).to.containIgnoreSpaces(data.expected);
                });
        });

    [
        {
            typealias: 'ChartChange', types: ['"creating"', '"created"', '"updating"', '"updated"'], expected: `&quot;creating&quot; | &quot;created&quot; | &quot;updating&quot; | &quot;updated&quot;`
        }
    ]
        .forEach((data) => {
            it(`should not add extra spaces within quoted literal types - typealias (${data.typealias}), types (${data.types}), expected (${data.expected})`,
                () => {
                    expect(typealiasesFile).to.contain(data.expected);
                });
        });

});
