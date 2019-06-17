// Core
import { Writable } from 'stream';

// Instruments
import { validateSchema } from './instruments';

class AccountManager extends Writable {
  constructor (options = {}) {
    super(options);
    this.data = [];
  }

  _write (chunk, encoding, done) {
    const { payload } = chunk;

    this.data.push(this.#modify(payload));
    done();
  }

  #modify (data) {
    const modifiedData = {
      payload: {
        ...data,
      },
      meta: {
        source: AccountManager.name.toLowerCase(),
      },
    };

    validateSchema(modifiedData, AccountManager.name);

    return modifiedData;
  }
}

export default AccountManager;
