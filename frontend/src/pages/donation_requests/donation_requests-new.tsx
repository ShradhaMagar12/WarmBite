import { mdiChartTimelineVariant } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { SwitchField } from '../../components/SwitchField'

import { SelectField } from '../../components/SelectField'
import {RichTextField} from "../../components/RichTextField";

import { create } from '../../stores/donation_requests/donation_requestsSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'

const initialValues = {

    donor: '',

    ngo: '',

    donation_type: 'Food',

    meal_type: '',

    quantity: '',

    status: 'Pending',

    pickup: false,

    location: '',

}

const Donation_requestsNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/donation_requests/donation_requests-list')
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="New Item" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
                initialValues
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

  <FormField label="Donor" labelFor="donor">
      <Field name="donor" id="donor" component={SelectField} options={[]} itemRef={'users'}></Field>
  </FormField>

  <FormField label="NGO" labelFor="ngo">
      <Field name="ngo" id="ngo" component={SelectField} options={[]} itemRef={'NGO'}></Field>
  </FormField>

  <FormField label="DonationType" labelFor="donation_type">
      <Field name="donation_type" id="donation_type" component="select">

        <option value="Food">Food</option>

        <option value="Clothes">Clothes</option>

        <option value="Other">Other</option>

      </Field>
  </FormField>

  <FormField
      label="MealType"
  >
      <Field
          name="meal_type"
          placeholder="MealType"
      />
  </FormField>

    <FormField
        label="Quantity"
    >
        <Field
            type="number"
            name="quantity"
            placeholder="Quantity"
        />
    </FormField>

  <FormField label="Status" labelFor="status">
      <Field name="status" id="status" component="select">

        <option value="Pending">Pending</option>

        <option value="Accepted">Accepted</option>

        <option value="Rejected">Rejected</option>

        <option value="Completed">Completed</option>

      </Field>
  </FormField>

  <FormField label='Pickup' labelFor='pickup'>
      <Field
          name='pickup'
          id='pickup'
          component={SwitchField}
      ></Field>
  </FormField>

  <FormField
      label="Location"
  >
      <Field
          name="location"
          placeholder="Location"
      />
  </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/donation_requests/donation_requests-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

Donation_requestsNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default Donation_requestsNew
