import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

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
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/donation_requests/donation_requestsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import dataFormatter from '../../helpers/dataFormatter';

const EditDonation_requestsPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    donor: null,

    ngo: null,

    donation_type: '',

    'meal_type': '',

    quantity: '',

    status: '',

    pickup: false,

    'location': '',

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { donation_requests } = useAppSelector((state) => state.donation_requests)

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof donation_requests === 'object') {
      setInitialValues(donation_requests)
    }
  }, [donation_requests])

  useEffect(() => {
      if (typeof donation_requests === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (donation_requests)[el])
          setInitialValues(newInitialVal);
      }
  }, [donation_requests])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/donation_requests/donation_requests-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit donation_requests')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit donation_requests'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

  <FormField label='Donor' labelFor='donor'>
        <Field
            name='donor'
            id='donor'
            component={SelectField}
            options={initialValues.donor}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

  <FormField label='NGO' labelFor='ngo'>
        <Field
            name='ngo'
            id='ngo'
            component={SelectField}
            options={initialValues.ngo}
            itemRef={'NGO'}

        ></Field>
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

EditDonation_requestsPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditDonation_requestsPage
