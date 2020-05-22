import { container } from 'tsyringe';

import IHashProvider from './models/IHashProvider';
import BCryptHash from './implementations/BCryptHash';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHash);
