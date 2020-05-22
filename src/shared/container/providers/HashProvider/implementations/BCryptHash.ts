import { compare, hash } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

class BCryptHash implements IHashProvider {
  public async createHash(string: string): Promise<string> {
    return hash(string, 8);
  }

  public async compareHash(string: string, hashed: string): Promise<boolean> {
    return compare(string, hashed);
  }
}

export default BCryptHash;
