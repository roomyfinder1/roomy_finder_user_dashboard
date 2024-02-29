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
              mb: 3,
              height: 280,
              position: 'relative',
            }}
          >
            <ProfileCover
              name={user ? `${user?.firstName} ${user?.lastName}` : user?.displayName}
              role={user ? user?.type : _userAbout?.role}
              cover={_userAbout?.cover}
              profileUrl={user ? user.profilePicture : null}
            />

            <Tabs
              value={currentTab}
              onChange={(event, newValue) => setCurrentTab(newValue)}
              sx={{
                width: 1,
                bottom: 0,
                zIndex: 9,
                position: 'absolute',
                bgcolor: 'background.paper',
                '& .MuiTabs-flexContainer': {
                  pr: { md: 3 },
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
