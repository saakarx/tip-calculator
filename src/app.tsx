import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

import Button from './components/button';
import InputField from './components/input-field';
import { Label } from './components/label';
import { TipToggleItem } from './components/tip-toggle-item';
import { ToggleGroup } from './components/toggle-group';

import { DollarIcon } from './icons/dollar';
import { PersonIcon } from './icons/person';

import { calculateTip } from './utils/calculate-tip';
import { formatPrice } from './utils/format-price';

const schema = yup
  .object({
    bill: yup
      .number()
      .required(`Required`)
      .test('is-zero', `Can't be zero`, val => !(val === 0)) // Return false if error, else false
      .positive(`Must be > 0`),
    numberOfPeople: yup
      .number()
      .required('Required')
      .test('is-zero', `Can't be zero`, val => !(val === 0)) // Return false if error, else false
      .positive(`Must be > 0`)
      .integer('Must be integer'),
  })
  .shape(
    {
      tip: yup.number().when('customTip', {
        is: (customTip: number) => {
          if (customTip === undefined) return true;
          else return !String(customTip);
        },
        then: sc =>
          sc
            .required('Required')
            .integer('Must be integer')
            .test('is-zero', `Can't be zero`, val => !(val === 0)) // Return false if error, else false
            .positive(`Must be > 0`),
        otherwise: sc => sc.transform(() => ''),
      }),
      customTip: yup.number().when('tip', {
        is: (tip: number) => {
          if (tip === undefined) return true;
          else return !String(tip);
        },
        then: sc =>
          sc
            .required('Required')
            .test('is-zero', `Can't be zero`, val => !(val === 0)) // Return false if error, else false
            .positive('Must be > 0'),
        otherwise: sc => sc.optional(),
      }),
    },
    [['tip', 'customTip']]
  );

const formatUSD = formatPrice('en-US', 'USD');

const App = () => {
  const [tipValues, setTipValues] = React.useState({
    tipPerPerson: 0,
    totalPerPerson: 0,
  });

  const {
    errors,
    touched,
    values,
    handleChange,
    handleSubmit,
    handleReset,
    setFieldValue,
  } = useFormik({
    initialValues: {
      bill: '',
      tip: '',
      customTip: '',
      numberOfPeople: '',
    },
    validationSchema: schema,
    onSubmit: values => {
      const { tipPerPerson, totalPerPerson } = calculateTip(
        Number(values.bill),
        Number(values.tip || values.customTip),
        Number(values.numberOfPeople)
      );

      setTipValues({
        tipPerPerson: tipPerPerson,
        totalPerPerson: totalPerPerson,
      });
    },
  });

  React.useEffect(() => {
    const { tipPerPerson, totalPerPerson } = calculateTip(
      Number(values.bill),
      Number(values.tip || values.customTip),
      Number(values.numberOfPeople)
    );

    setTipValues({
      tipPerPerson: tipPerPerson,
      totalPerPerson: totalPerPerson,
    });
  }, [values]);

  return (
    <main>
      <section className='flex flex-col md:items-center md:justify-center min-h-svh md:px-5'>
        <img
          src='/images/logo.svg'
          alt='Splitter Logo'
          width={87}
          height={54}
          draggable={false}
          className='mt-12 mb-12 mx-auto md:0 select-none'
        />

        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className='w-full max-w-[920px] bg-white rounded-t-[28px] md:rounded-[28px] px-6 py-8 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='space-y-9'>
              <InputField
                id='bill'
                label='Bill'
                icon={DollarIcon}
                inputType='number'
                inputPlaceholder='0'
                inputName='bill'
                inputValue={values.bill}
                inputOnChange={handleChange}
                error={touched.bill && errors.bill ? errors.bill : undefined}
              />

              <div className='space-y-2'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                  <Label
                    htmlFor='customTip'
                    className='text-cyan-darkgrayish block'
                  >
                    Select Tip %
                  </Label>
                  {(touched.tip || touched.customTip) &&
                    (errors.tip || errors.customTip) && (
                      <span className='text-red-400 text-sm leading-none'>
                        {errors.tip || errors.customTip}
                      </span>
                    )}
                </div>
                <ToggleGroup
                  type='single'
                  className='grid grid-cols-2 md:grid-cols-3 gap-4'
                  value={values.tip.toString()}
                  onValueChange={val => {
                    setFieldValue('tip', val);
                    // setFieldTouched('tip', true);
                  }}
                >
                  <TipToggleItem value='5'>5%</TipToggleItem>
                  <TipToggleItem value='10'>10%</TipToggleItem>
                  <TipToggleItem value='15'>15%</TipToggleItem>
                  <TipToggleItem value='25'>25%</TipToggleItem>
                  <TipToggleItem value='50'>50%</TipToggleItem>
                  <InputField
                    id='customTip'
                    inputPlaceholder='Custom'
                    inputType='number'
                    inputClassName='text-xl placeholder:text-center'
                    inputName='customTip'
                    inputValue={values.customTip}
                    inputOnChange={handleChange}
                  />
                </ToggleGroup>
              </div>

              <InputField
                id='number_of_people'
                icon={PersonIcon}
                label='Number of People'
                inputType='number'
                inputName='numberOfPeople'
                inputValue={values.numberOfPeople}
                inputOnChange={handleChange}
                inputPlaceholder='0'
                error={
                  touched.numberOfPeople && errors.numberOfPeople
                    ? errors.numberOfPeople
                    : undefined
                }
              />
            </div>

            <div className='rounded-2xl bg-cyan-verydark px-[22px] py-6 md:p-10 flex flex-col justify-between gap-11'>
              <div className='space-y-7 md:space-y-12'>
                <div className='flex justify-between items-center flex-wrap gap-2'>
                  <div className='flex flex-col gap-1 text-sm'>
                    <span className='text-white'>Tip Amount</span>
                    <span className='text-cyan-grayish text-xs'>/ person</span>
                  </div>
                  <p
                    data-testid='tip-per-person'
                    className='text-cyan-strong text-[42px] break-all leading-none'
                  >
                    {formatUSD(tipValues.tipPerPerson)}
                  </p>
                </div>
                <div className='flex justify-between flex-wrap items-center gap-2'>
                  <div className='flex flex-col gap-1 text-sm'>
                    <span className='text-white'>Total</span>
                    <span className='text-cyan-grayish text-xs'>/ person</span>
                  </div>
                  <p
                    data-testid='total-per-person'
                    className='text-cyan-strong text-[42px] break-all leading-none'
                  >
                    {formatUSD(tipValues.totalPerPerson)}
                  </p>
                </div>
              </div>
              <Button className='hidden' type='submit'>
                Submit
              </Button>
              <Button
                className='uppercase text-lg font-bold tracking-wider'
                type='reset'
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default App;
