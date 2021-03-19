/*!
 * bytes-to-buffer/test/index.test.js
 * e53e04ac <e53e04ac@gmail.com>
 * MIT License
 */

'use strict';

const stream = require('stream');

const chai = require('chai');

describe('index.js', async () => {

    const { BytesToBuffer } = require('../');

    it('coverage', async () => {

        const input = new stream.Readable({
            objectMode: false,
            read: (size) => {
                input.push(Buffer.from([0, 1, 0, 2, 3, 0]));
                input.push(null);
            }
        });

        const delimiter = Buffer.from([0]);

        const bytesToBuffer = BytesToBuffer({
            callback: async (bytes, final) => {
                const index = bytes.indexOf(delimiter);
                if (index >= 0) {
                    return { begin: 0, end: index, next: index + delimiter.length, push: true };
                }
            }
        });
        bytesToBuffer.BytesToBufferConstructorOptions();
        bytesToBuffer._BytesToBuffer();

        const output = new stream.Writable({
            objectMode: false,
            write: (chunk, encoding, callback) => {
                callback();
            }
        });

        await new Promise((resolve, reject) => {
            stream.pipeline([
                input,
                bytesToBuffer,
                output
            ], (error) => {
                if (error != null) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });

    });

    it('coverage', async () => {

        const input = new stream.Readable({
            objectMode: false,
            read: (size) => {
                input.push(Buffer.from([0]));
                input.push(null);
            }
        });

        const delimiter = Buffer.from([0]);

        const bytesToBuffer = BytesToBuffer({
            callback: async (bytes, final) => {
                const index = bytes.indexOf(delimiter);
                if (final || index >= 0) {
                    return { begin: 0, end: index, next: index + delimiter.length, push: false };
                }
            }
        });
        bytesToBuffer.BytesToBufferConstructorOptions();
        bytesToBuffer._BytesToBuffer();

        const output = new stream.Writable({
            objectMode: false,
            write: (chunk, encoding, callback) => {
                callback();
            }
        });

        await new Promise((resolve, reject) => {
            stream.pipeline([
                input,
                bytesToBuffer,
                output
            ], (error) => {
                if (error != null) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });

    });

    it('coverage', async () => {

        const input = new stream.Readable({
            objectMode: false,
            read: (size) => {
                input.push(Buffer.from([0]));
                input.push(null);
            }
        });

        const delimiter = Buffer.from([0]);

        const bytesToBuffer = BytesToBuffer({
            callback: async (bytes, final) => {
                const index = bytes.indexOf(delimiter);
                if (final || index >= 0) {
                    return { begin: 0, end: index, next: index + delimiter.length, push: true };
                }
            }
        });
        bytesToBuffer.BytesToBufferConstructorOptions();
        bytesToBuffer._BytesToBuffer();

        const output = new stream.Writable({
            objectMode: false,
            write: (chunk, encoding, callback) => {
                callback();
            }
        });

        await new Promise((resolve, reject) => {
            stream.pipeline([
                input,
                bytesToBuffer,
                output
            ], (error) => {
                if (error != null) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });

    });

});
