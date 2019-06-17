// Core
import { Readable } from 'stream';

// Instruments
import { validateSchema } from './instruments';

class Ui extends Readable {
  constructor (data = [], options = {}) {
    super(options);

    this.data = data;
  }

  _read () {
    const data = this.data.shift();

    if (!data) {
      this.push(null);
    } else {
      this.push(this.#modify(data));
    }
  }

  #modify (data) {
    const modifiedData = {
      payload: {
        ...data,
      },
      meta: {
        source: Ui.name.toLowerCase(),
      },
    };

    validateSchema(modifiedData, Ui.name);

    return modifiedData;
  }
}

export default Ui;
