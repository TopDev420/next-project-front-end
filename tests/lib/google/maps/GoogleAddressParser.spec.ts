import { GoogleAddressParser } from 'lib/google/maps/GoogleAddressParser';
import { Branson } from 'tests/fixtures/google-place-result';

describe('GoogleAddressParser', () => {
  describe('result', () => {
    it('should work', () => {
      const parser = new GoogleAddressParser(Branson.address_components);
      expect(parser.result()).toMatchSnapshot();
    });
  });
});
