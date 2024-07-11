/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-destructuring */
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import { Tab, Card, Tabs, Container, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
// _mock_
import { _userAbout } from '../../../_mock/arrays';
// components
import Iconify from '../../../components/iconify';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections
import { ProfileCover } from '../../../sections/@dashboard/user/profile';
import { useSelector, useDispatch } from '../../../redux/store';
import LoadingScreen from '../../../components/loading-screen/LoadingScreen';
import UserProfileAbout from '../../../sections/@dashboard/cPanel/UserProfileAbout';
import { getUser } from '../../../redux/slices/userCPanel';

// ----------------------------------------------------------------------

UserProfilePage.propTypes = {
  state12: PropTypes.array,
};

export default function UserProfilePage({ state12 = null }) {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState('profile');

  // getting the user Id
  const { userId } = useParams();

  const { userDetails, userLoading } = useSelector((store) => store.userCPanel);
  const { user, properties } = userDetails;

  const TABS = [
    {
      value: 'profile',
      label: 'Profile',
      icon: <Iconify icon="ic:round-account-box" />,
      component: getProfileComponent(user?.type, user),
    },
  ];

  function getProfileComponent(type, stat) {
    return <UserProfileAbout loading={userLoading} user={user} properties={properties} />;
  }

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  if (userLoading) return <LoadingScreen />;

  return (
    <>
      <Helmet>
        <title> {user ? `${user?.firstName} : Profile` : 'User Profile'}</title>
      </Helmet>

      {userLoading ? (
        <linearProgress />
      ) : (
        <Container maxWidth={themeStretch ? false : '90%'}>
          <CustomBreadcrumbs heading="Profile" links={[{ name: 'User Profile', href: '' }]} />
          <Card
            sx={{
              height: 150,
              position: 'relative',
              borderRadius: 0,
              border: '2px solid',
              borderBottom: 'none',
            }}
          >
            <ProfileCover user={user} />

            <Tabs
              value={currentTab}
              onChange={(event, newValue) => setCurrentTab(newValue)}
              sx={{
                // width: 1,
                bottom: { xs: 'auto', md: 0 }, // Set bottom for medium screens and up
                top: { xs: 0, md: 'auto' }, // Set top for extra-small screens
                zIndex: 9,
                right: { xs: 'auto', md: 0 },
                position: 'absolute',

                '& .MuiTabs-flexContainer': {
                  px: { md: 3 },
                  justifyContent: {
                    sm: 'center',
                    md: 'flex-end',
                  },
                },
              }}
            >
              {TABS.map((tab) => (
                <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
              ))}
            </Tabs>
          </Card>

          {TABS.map(
            (tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>
          )}
        </Container>
      )}
    </>
  );
}
