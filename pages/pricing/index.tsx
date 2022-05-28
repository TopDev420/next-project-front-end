import PageHead from 'components/Layouts/PageHead';
import Config from 'config';
import { formatPrice } from 'lib/helpers/number';
import { NextPage } from 'next';

const Pricing: NextPage = () => (
  <>
    <PageHead
      title="Pricing | Vacation.Rentals"
      description="Listing Plan Comparison"
    />
    <div className="company-pricing">
      <div className="container-fluid relative mb-6">
        <div className="media-container relative flex justify-center">
          <div className="bg-source pos-absolute-0">
            <div className="bg-img bg-no-repeat bg-cover pos-absolute-0" />
          </div>
          <div className="media-content flex flex-col justify-center">
            <div className="text-center media-text relative text-white">
              Listing Plan Comparison
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6">
        <div className="table-container mb-5 px-4">
          <table className="border-collapse border w-full">
            <thead>
              <tr>
                <th className="border">Listing Features </th>
                <th className="border whitespace-pre plan p-4">
                  Basic
                  <br />
                  <span className="price">
                    {formatPrice(Config.PRICE_BASIC_YEARLY)} / year
                  </span>
                  <br />
                  <span className="price">
                    {formatPrice(Config.PRICE_BASIC_MONTHLY)} / month
                  </span>
                </th>
                <th className="border whitespace-pre plan p-4">
                  Pro
                  <br />
                  <span className="price">
                    {formatPrice(Config.PRICE_PRO_YEARLY)} / year
                  </span>
                  <br />
                  <span className="price">
                    {formatPrice(Config.PRICE_PRO_MONTHLY)} / month
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Property Management Software</td>
                <td className="border-0 border-l p-4">-</td>
                <td className="border-0 border-l p-4 tickblue">✓</td>
              </tr>
              <tr>
                <td>Availability calendar</td>
                <td className="border-0 border-l p-4 tickblue">✓</td>
                <td className="border-0 border-l p-4 tickblue">✓</td>
              </tr>
              <tr>
                <td>Link to your personal website</td>
                <td className="border-0 border-l p-4 tickblue">✓</td>
                <td className="border-0 border-l p-4 tickblue">✓</td>
              </tr>
              <tr>
                <td>Phone number published</td>
                <td className="border-0 border-l p-4 tickblue">✓</td>
                <td className="border-0 border-l p-4 tickblue">✓</td>
              </tr>
              <tr>
                <td>Free special offers</td>
                <td className="border-0 border-l p-4">-</td>
                <td className="border-0 border-l p-4 tickblue">✓</td>
              </tr>
              <tr>
                <td>Text message (SMS) inquiry alerts</td>
                <td className="border-0 border-l p-4 tickblue">✓</td>
                <td className="border-0 border-l p-4 tickblue">✓</td>
              </tr>
              <tr>
                <td>Featured on home page</td>
                <td className="border-0 border-l p-4">-</td>
                <td className="border-0 border-l p-4 tickblue">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
);

export default Pricing;
