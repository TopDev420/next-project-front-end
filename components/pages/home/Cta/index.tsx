import Link from 'next/link';
import Separator from 'components/pages/home/Separator';

const Cta = () => (
  <Separator>
    <div className="flex flex-col md:flex-row md:justify-between">
      <h3 className="text-2xl mb-4 md:mb-0 text-center md:mr-6">
        Ready to join the hundreds of homeowners and property managers listing
        on Vacation.Rentals?
      </h3>
      <Link href="/rooms/new">
        <a className="flex items-center border-2 border-white bg-red-500 hover:bg-white hover:text-red-500 duration-200 whitespace-nowrap px-6 py-4">
          Get Started!
        </a>
      </Link>
    </div>
  </Separator>
);

export default Cta;
