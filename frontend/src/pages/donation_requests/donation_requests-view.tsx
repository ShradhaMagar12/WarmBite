import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/donation_requests/donation_requestsSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const Donation_requestsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { donation_requests } = useAppSelector((state) => state.donation_requests)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View donation_requests')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View donation_requests')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/donation_requests/donation_requests-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Donor</p>

                        <p>{donation_requests?.donor?.firstName ?? 'No data'}</p>

                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>NGO</p>

                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>DonationType</p>
                    <p>{donation_requests?.donation_type ?? 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>MealType</p>
                    <p>{donation_requests?.meal_type}</p>
                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Quantity</p>
                  <p>{donation_requests?.quantity || 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Status</p>
                    <p>{donation_requests?.status ?? 'No data'}</p>
                </div>

                <FormField label='Pickup'>
                    <SwitchField
                      field={{name: 'pickup', value: donation_requests?.pickup}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Location</p>
                    <p>{donation_requests?.location}</p>
                </div>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/donation_requests/donation_requests-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

Donation_requestsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default Donation_requestsView;
