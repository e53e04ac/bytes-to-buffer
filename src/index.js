/*!
 * bytes-to-buffer/src/index.jss
 * e53e04ac <e53e04ac@gmail.com>
 * MIT License
 */

'use strict';

const stream = require('stream');

const { BytesToBuffer } = (() => {

    /** @typedef BytesToBufferConstructorOptions @type {import('../types').BytesToBufferConstructorOptions} */
    /** @typedef _BytesToBuffer @type {import('../types')._BytesToBuffer} */
    /** @typedef BytesToBuffer @type {import('../types').BytesToBuffer} */
    /** @typedef BytesToBufferConstructor @type {import('../types').BytesToBufferConstructor} */

    /** @type {BytesToBufferConstructor}  */
    const BytesToBuffer = (options) => {

        /** @type {BytesToBufferConstructorOptions}  */
        const _options = {};
        _options.allowHalfOpen = options.allowHalfOpen;
        _options.readableHighWaterMark = options.readableHighWaterMark;
        _options.writableHighWaterMark = options.writableHighWaterMark;
        _options.writableCorked = options.writableCorked;
        _options.callback = options.callback;

        /** @type {_BytesToBuffer}  */
        const _it = {};
        _it.buffer = Buffer.alloc(0);

        /** @type {BytesToBuffer}  */
        // @ts-ignore
        const it = new stream.Transform({
            allowHalfOpen: _options.allowHalfOpen,
            writableObjectMode: false,
            readableObjectMode: true,
            readableHighWaterMark: _options.readableHighWaterMark,
            writableHighWaterMark: _options.writableHighWaterMark,
            writableCorked: _options.writableCorked,
            transform: async (chunk, encoding, callback) => {
                _it.buffer = Buffer.concat([_it.buffer, chunk]);
                while (true) {
                    const output = await options.callback(_it.buffer, false);
                    if (output == null) {
                        break;
                    }
                    const buffer = _it.buffer.slice(output.begin, output.end);
                    _it.buffer = _it.buffer.slice(output.next);
                    if (output.push) {
                        it.push(buffer);
                    }
                }
                callback();
            },
            final: async (callback) => {
                const output = await options.callback(_it.buffer, true);
                if (output != null) {
                    const buffer = _it.buffer.slice(output.begin, output.end);
                    _it.buffer = _it.buffer.slice(output.next);
                    if (output.push) {
                        it.push(buffer);
                    }
                }
                callback();
            }
        });
        it.BytesToBufferConstructorOptions = () => {
            return _options;
        };
        it._BytesToBuffer = () => {
            return _it;
        };
        return it;

    };
    return { BytesToBuffer };

})();

module.exports = { BytesToBuffer };
