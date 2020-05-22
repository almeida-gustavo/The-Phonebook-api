export default interface IHashProvidet {
  createHash(string: string): Promise<string>;
  compareHash(string: string, hashed: string): Promise<boolean>;
}
