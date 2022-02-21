import { Validators } from "./Validators";

describe("Validators Class", () => {
  it("isValidEmail should return only true", () => {
    const emails = [
      "souz@gmail.com",
      "example123.3@exmaple.com",
      "l3.!.2@mail.com",
    ];

    const results = emails.map((email) => Validators.isValidEmail(email));

    const trueCounter = results.filter((result) => result).length;

    expect(trueCounter).toBe(3);
  });

  it("isValidEmail should return only false", () => {
    const emails = ["souz@gmail", "example123.3@@exmaple.com"];

    const results = emails.map((email) => Validators.isValidEmail(email));

    const falseCounter = results.filter((result) => !result).length;

    expect(falseCounter).toBe(2);
  });

  it ("isEmptyString should return true", () => {
    const str = '123',

    result = Validators.isEmptyString(str);

    expect(result).toBe(false);
  });

  
  it ("isEmptyString should return true", () => {
    const str = '     ',

    result = Validators.isEmptyString(str);

    expect(result).toBe(true);
  });

});
