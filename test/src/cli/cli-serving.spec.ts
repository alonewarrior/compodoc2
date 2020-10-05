import * as chai from 'chai';
import { temporaryDir, shell, pkg, exists, exec, read, shellAsync } from '../helpers';

const expect = chai.expect,
    tmp = temporaryDir();

describe('CLI serving', () => {
    const distFolder = tmp.name + '-serving',
        TIMEOUT = 8000;

    describe('when serving with -s flag in another directory', () => {
        let stdoutString = '',
            child;
        before(function(done) {
            tmp.create(distFolder);
            let ls = shell('node', ['./bin/index-cli.js', '-s', '-d', distFolder, '--port', '8081'], {
                timeout: TIMEOUT
            });

            if (ls.stderr.toString() !== '') {
                console.error(`shell error: ${ls.stderr.toString()}`);
                done('error');
            }
            stdoutString = ls.stdout.toString();
            // console.log(stdoutString);
            done();
        });
        after(() => {
            tmp.clean(distFolder);
        });

        it('should serve', () => {
            expect(stdoutString).to.contain(
                `Serving documentation from ${distFolder} at http://127.0.0.1:8081`
            );
        });
    });

    describe('when serving with default directory', () => {
        let stdoutString = '',
            child;
        before(function(done) {
            tmp.create('documentation');
            let ls = shell(
                'node',
                [
                    './bin/index-cli.js',
                    '-p',
                    './test/fixtures/sample-files/tsconfig.simple.json',
                    '-s',
                    '--port', '8082'
                ],
                { timeout: 25000 }
            );

            if (ls.stderr.toString() !== '') {
                console.error(`shell error: ${ls.stderr.toString()}`);
                done('error');
            }
            stdoutString = ls.stdout.toString();
            // console.log(stdoutString);
            done();
        });

        it('should display message', () => {
            expect(stdoutString).to.contain(
                'Serving documentation from ./documentation/ at http://127.0.0.1:8082'
            );
        });
    });

    describe('when serving with default directory and different host', () => {
        let stdoutString = '',
            child;
        before(function(done) {
            tmp.create('documentation');
            let ls = shell(
                'node',
                [
                    './bin/index-cli.js',
                    '-p', './test/fixtures/sample-files/tsconfig.simple.json',
                    '-s',
                    '--host', '127.0.0.2',
                    '--port', '8083'
                    // '-d', './documentation/'
                ],
                { timeout: 25000 }
            );

            if (ls.stderr.toString() !== '') {
                console.error(`shell error: ${ls.stderr.toString()}`);
                done('error');
            }
            stdoutString = ls.stdout.toString();
            // console.log(stdoutString);
            done();
        });

        it('should display message', () => {
            expect(stdoutString).to.contain(
                'Serving documentation from ./documentation/ at http://127.0.0.2:8083'
            );
        });
    });

    describe('when serving with default directory and without doc generation', () => {
        let stdoutString = '',
            child;
        before(function(done) {
            let ls = shell('node', ['./bin/index-cli.js', '-s', '-d', './documentation/', '--port', '8084'], {
                timeout: TIMEOUT
            });

            if (ls.stderr.toString() !== '') {
                console.error(`shell error: ${ls.stderr.toString()}`);
                done('error');
            }
            stdoutString = ls.stdout.toString();
            // console.log(stdoutString);
            done();
        });

        it('should display message', () => {
            expect(stdoutString).to.contain(
                'Serving documentation from ./documentation/ at http://127.0.0.1:8084'
            );
        });
    });

    describe('when serving with default directory, without -d and without doc generation', () => {
        let stdoutString = '',
            child;
        before(function(done) {
            let ls = shell('node', ['./bin/index-cli.js', '-s', '--port', '8085'], { timeout: TIMEOUT });

            if (ls.stderr.toString() !== '') {
                console.error(`shell error: ${ls.stderr.toString()}`);
                done('error');
            }
            stdoutString = ls.stdout.toString();
            // console.log(stdoutString);
            done();
        });
        after(() => {
            tmp.clean('documentation');
        });

        it('should display message', () => {
            expect(stdoutString).to.contain(
                'Serving documentation from ./documentation/ at http://127.0.0.1:8085'
            );
        });
    });
});
