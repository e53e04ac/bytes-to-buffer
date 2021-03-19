/*!
 * bytes-to-buffer/types/index.d.ts
 * e53e04ac <e53e04ac@gmail.com>
 * MIT License
 */

import stream from 'stream';

type BytesToBufferConstructorOptions = {
    allowHalfOpen?: boolean
    readableHighWaterMark?: number;
    writableHighWaterMark?: number;
    writableCorked?: number;
    callback: {
        (bytes: any, final: boolean): Promise<undefined | null | { begin: number; end: number; next: number; push: boolean; }>;
    };
};

type _BytesToBuffer = {
    buffer: Buffer;
};

type BytesToBuffer = stream.Transform & {
    BytesToBufferConstructorOptions: {
        (): BytesToBufferConstructorOptions;
    };
    _BytesToBuffer: {
        (): _BytesToBuffer;
    };
};

type BytesToBufferConstructor = {
    (options: BytesToBufferConstructorOptions): BytesToBuffer;
};

export const BytesToBuffer: BytesToBufferConstructor;
