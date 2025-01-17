'use strict';

const _ = require('lodash');
const chokidar = require('chokidar');
const upath = require('upath');
const renderAssets = require('./render-assets');
const renderPug = require('./render-pug');
const renderScripts = require('./render-scripts');
const renderSCSS = require('./render-scss');
const renderHtml = require('./render-html');

const watcher = chokidar.watch('src', {
    persistent: true,
});

let READY = false;

process.title = 'pug-watch';
process.stdout.write('Loading');
let allPugFiles = {};

watcher.on('add', filePath => _processFile(upath.normalize(filePath), 'add'));
watcher.on('change', filePath => _processFile(upath.normalize(filePath), 'change'));
watcher.on('ready', () => {
    READY = true;
    console.log(' READY TO ROLL!');
});

_handleSCSS();

function _processFile(filePath, watchEvent) {

    if (!READY) {
        if (filePath.match(/\.html$/)) {
            if (!filePath.match(/includes/) && !filePath.match(/mixins/) && !filePath.match(/\/pug\/layouts\//)) {
                allPugFiles[filePath] = true;
            }
        }
        process.stdout.write('.');
        return;
    }

    console.log(`### INFO: File event: ${watchEvent}: ${filePath}`);
    try {
        if (filePath.match(/\.html$/)) {
            return _handleHtml(filePath, watchEvent);
        }

        if (filePath.match(/\.scss$/)) {
            if (watchEvent === 'change') {
                return _handleSCSS(filePath, watchEvent);
            }
            return;
        }

        if (filePath.match(/src\/js\//)) {
            return renderScripts();
        }

        if (filePath.match(/src\/assets\//)) {
            return renderAssets();
        }
    } catch (e) {
        console.log(`### Error: ${e}`);
    }

}

function _handleHtml(filePath, watchEvent) {
    if (watchEvent === 'change') {
        if (filePath.match(/includes/) || filePath.match(/mixins/) || filePath.match(/\/pug\/layouts\//)) {
            return _renderAllHtml();
        }
        return renderHtml(filePath);
    }
    if (!filePath.match(/includes/) && !filePath.match(/mixins/) && !filePath.match(/\/pug\/layouts\//)) {
        return renderHtml(filePath);
    }
}

function _renderAllHtml() {
    console.log('### INFO: Rendering All');
    _.each(allPugFiles, (value, filePath) => {
        renderHtml(filePath);
    });
}

function _handleSCSS() {
    renderSCSS();
}
