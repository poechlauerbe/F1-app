// app.test.cjs
const { expect } = require('chai'); // Use require for Chai
const sinon = require('sinon'); // Use require for Sinon
const { loadDrivers } = require('../../server.js');
const { addDriver } = require('../../services/obj_drivers.js');

// Mock the fetch function globally
global.fetch = sinon.stub();

describe('loadDrivers', () => {
  afterEach(() => {
    sinon.restore(); // Reset any stubs or mocks after each test
  });

  it('should call addDriver for each driver in the data', async () => {
    const fakeData = [
      {
        driver_number: 44,
        full_name: 'Lewis Hamilton',
        country_code: 'GB',
        team_name: 'Mercedes',
        team_colour: '#00D2BE',
        headshot_url: 'https://example.com/headshot.jpg'
      }
    ];
    global.fetch.resolves({ json: () => fakeData });

    const addDriverSpy = sinon.spy(addDriver);

    await loadDrivers();

    expect(addDriverSpy.callCount).to.equal(fakeData.length);
    fakeData.forEach((driver, index) => {
      expect(addDriverSpy.getCall(index).args).to.deep.equal([
        driver.driver_number,
        driver.full_name,
        driver.country_code,
        driver.team_name,
        driver.team_colour,
        driver.headshot_url
      ]);
    });
  });

  it('should retry on fetch failure', async () => {
    const maxRetries = 3;
    global.fetch.onFirstCall().rejects(new Error('Fetch failed'));
    global.fetch.onSecondCall().resolves({ json: () => [] });

    await loadDrivers(0, maxRetries);

    expect(global.fetch.callCount).to.equal(2);
  });

  it('should stop retrying after max retries are reached', async () => {
    const maxRetries = 2;
    global.fetch.rejects(new Error('Fetch failed'));

    await loadDrivers(0, maxRetries);

    expect(global.fetch.callCount).to.equal(maxRetries + 1);
  });
});
