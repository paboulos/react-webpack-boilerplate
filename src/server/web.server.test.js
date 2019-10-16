import 'regenerator-runtime/runtime';
import WebServer from './web.server';

describe('Web Server', () => {
  let webserver = null;
  beforeAll(() => webserver = new WebServer());

  test('Should start', async () => {
    let promise = webserver.start();
    await expect(promise).resolves.toBeUndefined();
  });
  test('Should stop', async () => {
    let promise = webserver.stop();
    await expect(promise).resolves.toBeUndefined();
  });
});