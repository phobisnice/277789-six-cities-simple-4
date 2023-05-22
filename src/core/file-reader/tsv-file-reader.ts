import { createReadStream } from 'node:fs';
import EventEmitter from 'node:events';
import { FileReaderInterface } from './file-reader.interface.js';

const CHUNK_SIZE = 65536; // 64KB

export default class TSVFileReader extends EventEmitter implements FileReaderInterface {
  constructor(public filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const stream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingDada = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await(const chunk of stream) {
      remainingDada = chunk.toString();

      while ((nextLinePosition = remainingDada.indexOf('\n')) >= 0) {
        const completeRow = remainingDada.slice(0, nextLinePosition + 1);
        remainingDada = remainingDada.slice(++nextLinePosition);
        importedRowCount++;

        this.emit('line', completeRow);
      }
    }

    this.emit('end', importedRowCount);
  }
}
