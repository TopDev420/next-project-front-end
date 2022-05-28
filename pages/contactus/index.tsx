import { yupResolver } from '@hookform/resolvers/yup';
import { ContactInput, ContactInputSchema } from 'lib/forms/contactus';
import type { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorProvider } from 'components/Error/Provider';
import { useCallback, useState, useEffect } from 'react';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import { useMutation } from 'react-query';
import { contact } from 'lib/apis/contactus';
import Alert, { AlertProps } from 'components/Alert';
import LoadingIndicator from 'components/LoadingIndicator';
import PageHead from 'components/Layouts/PageHead';

const ContactUs: NextPage = () => {
  const accountTypes = [
    {
      label: 'Traveler',
      value: 'traveler',
    },
    {
      label: 'Owner',
      value: 'Owner/Manager',
    },
  ];

  const [alert, setAlert] = useState<Omit<AlertProps, 'onChange'>>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactInput>({
    resolver: yupResolver(ContactInputSchema),
  });

  const {
    mutate: submitContact,
    data: submitResult,
    isError,
    error: serverError,
    isLoading: submitLoading,
  } = useMutation<boolean, Error, ContactInput>(contact);

  const onSubmit: SubmitHandler<ContactInput> = useCallback(
    (val) => {
      submitContact(val);
    },
    [submitContact],
  );

  useEffect(() => {
    if (submitResult) {
      setAlert({
        severity: 'success',
        title: 'Successfully submitted',
      });
      reset({
        name: '',
        email: '',
        type: null,
        phone: '',
        message: '',
      });
    }
  }, [reset, submitResult]);

  return (
    <div className="contact-page mb-20">
      <PageHead
        title="Contact Us | Vacation Homes For Rent From Owners And Property Managers"
        description="Our vacation rentals from owners and property managers allow you to book direct with no fees, no commissions, no hidden charges. We make the introduction and leave the rest up to you. Take a vacation - not taken."
      />
      <div className="contact-map">
        <iframe
          title="branson position"
          width="100%"
          height="400"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51217.84283639826!2d-93.29805190049649!3d36.64767968953203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87cf01e9c1f60ea9%3A0xf3370960da92ac34!2sBranson%2C+MO+65616%2C+USA!5e0!3m2!1sen!2sin!4v1554930946066!5m2!1sen!2sin"
          frameBorder={0}
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
        />
      </div>
      <div className="flex justify-center">
        <div className="contact-container flex flex-col lg:flex-row shadow-xl max-w-full lg:max-w-screen-xl">
          <div className="w-full lg:w-2/3 bg-white p-16">
            <h4 className="font-bold text-3xl mb-8">Contact Us</h4>
            {isError && <Alert severity="danger" title="Submit failed" />}
            {alert && (
              <Alert
                severity={alert.severity}
                title={alert.title}
                onClose={() => setAlert(undefined)}
              />
            )}
            <ErrorProvider client={errors} server={serverError}>
              <div className="contact-container__form flex flex-wrap">
                <div className="contact-container__form-control w-full sm:w-1/2">
                  <div className="mb-3">
                    <label htmlFor="name-input">Name</label>
                  </div>
                  <div className="contact-container__form-input">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      aria-label="name"
                      name="name"
                      id="name-input"
                      className="contact-container__form-elem p-2 rounded"
                      {...register('name')}
                    />
                    <InvalidFeedback name="name" />
                  </div>
                </div>
                <div className="contact-container__form-control w-full sm:w-1/2">
                  <div className="mb-3">
                    <label htmlFor="email-input">Email Address</label>
                  </div>
                  <div className="contact-container__form-input">
                    <input
                      type="text"
                      placeholder="Enter your email address"
                      aria-label="email"
                      name="email"
                      className="contact-container__form-elem"
                      id="email-input"
                      {...register('email')}
                    />
                    <InvalidFeedback name="email" />
                  </div>
                </div>
                <div className="contact-container__form-control w-full sm:w-1/2">
                  <div className="mb-3">
                    <label htmlFor="type-input">Role</label>
                  </div>
                  <div className="contact-container__form-input">
                    <select
                      className="contact-container__form-elem"
                      id="type-input"
                      {...register('type')}
                    >
                      <option value="">Select</option>
                      {accountTypes.map((accountType, index) => (
                        <option value={accountType.value} key={index}>
                          {accountType.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="contact-container__form-control w-full sm:w-1/2">
                  <div className="mb-3">
                    <label htmlFor="phone-input">Phone</label>
                  </div>
                  <div className="contact-container__form-input">
                    <input
                      type="text"
                      placeholder="Enter your phone number"
                      aria-label="name"
                      name="name"
                      className="contact-container__form-elem"
                      id="phone-input"
                      {...register('phone')}
                    />
                    <InvalidFeedback name="phone" />
                  </div>
                </div>
                <div className="contact-container__form-control w-full">
                  <div className="mb-3">
                    <label htmlFor="content-input">Message</label>
                  </div>
                  <div className="contact-container__form-input relative">
                    <textarea
                      aria-label="message"
                      name="message"
                      className="contact-container__form-elem text-input"
                      id="content-input"
                      {...register('message')}
                    />
                    <InvalidFeedback name="content" />
                    <button
                      type="button"
                      aria-label="submit"
                      className="btn-contact-submit text-lg"
                      onClick={handleSubmit(onSubmit)}
                    >
                      {submitLoading && (
                        <div className="pl-2 pb-3">
                          <LoadingIndicator left light />
                        </div>
                      )}
                      {!submitLoading && (
                        <svg height="32" viewBox="0 0 24 24" width="27">
                          <path
                            d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z"
                            fill="#fff"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </ErrorProvider>
          </div>
          <div className="w-full lg:w-1/3 bg-blue-900 p-16 relative text-white">
            <h4 className="font-bold text-3xl mb-8">Contact Information</h4>
            <ul className="contact-list flex flex-col gap-y-8">
              <li className="contact-list__row flex gap-x-4">
                <svg
                  className="w-3"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="map-marker"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"
                  />
                </svg>
                <span>Branson, Missouri 65616</span>
              </li>
              <li className="contact-list__row flex gap-x-4">
                <svg
                  className="w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="phone"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"
                  />
                </svg>
                <span>
                  <a href="tel:(417) 232-6205">417 230 0717</a>
                </span>
              </li>
              <li className="contact-list__row flex gap-x-4">
                <svg
                  className="w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="envelope"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                  />
                </svg>
                <span>
                  <a href="mailto:sales@vacarent.com">Sales@VacaRent.com</a>
                </span>
              </li>
            </ul>
            <ul className="contact-social-links absolute bottom-0 right-0 flex p-4 bg-blue-900 gap-x-5 w-full justify-center mb-7">
              <li>
                <a
                  href="https://www.facebook.com/www.vacation.rentals/"
                  aria-label="facebook-link"
                >
                  <svg viewBox="0 0 48 48" width="27px" height="27px">
                    <path
                      fill="#ffffff"
                      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                    />
                    <path
                      fill="#1f4767"
                      d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/Vacarent"
                  aria-label="twitter-link"
                >
                  <svg
                    fill="#ffffff"
                    viewBox="0 0 50 50"
                    width="27px"
                    height="27px"
                  >
                    <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/vacarent"
                  aria-label="linked-link"
                >
                  <svg viewBox="0 0 48 48" width="27px" height="27px">
                    <path
                      fill="#ffffff"
                      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                    />
                    <path
                      fill="#1f4767"
                      d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
