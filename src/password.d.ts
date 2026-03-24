export class Bcrypt {
  bcrypt: any;

  constructor(bcrypt: any);

  hashPassword(passwordToBeHashed: string, rounds: number): Promise<string>;

  isMatchingPassword(
    hashedPassword: string,
    unhashedPassword: string,
  ): Promise<boolean>;
}
