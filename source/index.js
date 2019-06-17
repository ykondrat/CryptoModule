// Core
import { pipeline } from 'stream';
import { promisify } from 'util';

// Streams
import Ui from './example-2/Ui';
import Guardian from './example-2/Guardian';
import AccountManager from './example-2/AccountManager';

// Config
import {
  uiOptions,
  guardianOptions,
  accountManagerOptions,
} from './example-2/config';

const customers = [
  {
    name:     'Pitter Black',
    email:    'pblack@email.com',
    password: 'pblack_123',
  },
  {
    name:     'Oliver White',
    email:    'owhite@email.com',
    password: 'owhite_456',
  },
];

const ui = new Ui(customers, uiOptions);
const guardian = new Guardian(guardianOptions);
const manager = new AccountManager(accountManagerOptions);
const pipelineAsync = promisify(pipeline);

async function run () {
  await pipelineAsync(
    ui,
    guardian,
    manager,
  );
}

run()
  .then(() => {
    console.log('Stream Done');
  })
  .catch(
    (error) => {
      console.error(error);
    },
  );
