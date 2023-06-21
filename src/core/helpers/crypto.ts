import * as crypto from 'node:crypto';

export function createSHA256(text: string, salt: string): string {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(text).digest('hex');
}
