import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = 'gpi1{bh&wnvs<&fn^-j=@k^6i%~g[*|q'; // Random key. For now it will be hardcoded, but needs to be stored safely.
const ivLength = 16;

@Injectable()
export class EncryptionService {
  private key: string = key;

  encrypt(text: string): string {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(this.key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  decrypt(encryptedText: string): string {
    const textParts = encryptedText.split(':');
    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedTextBuffer = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(this.key),
      iv,
    );
    let decrypted = decipher.update(encryptedTextBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
