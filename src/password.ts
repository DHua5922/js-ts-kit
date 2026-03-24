class Bcrypt {
  bcrypt: any;

  constructor(bcrypt: any) {
    this.bcrypt = bcrypt;
  }

  async hashPassword(passwordToBeHashed: string, rounds: number) {
    const salt = await this.bcrypt.genSalt(rounds);
    return this.bcrypt.hash(passwordToBeHashed, salt);
  }

  isMatchingPassword(hashedPassword: string, unhashedPassword: string) {
    return this.bcrypt.compare(unhashedPassword, hashedPassword);
  }
}

export { Bcrypt };
