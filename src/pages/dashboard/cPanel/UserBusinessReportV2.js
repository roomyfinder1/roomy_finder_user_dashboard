import { Container, Grid, MenuItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axiosInstance from '../../../utils/axios';
import { API_URL } from '../../../config-global';
import { PATH_DASHBOARD } from '../../../routes/paths';

export default function UserBusinessReportV2() {
  const user = 'user';

  const landlordSections = [
    {
      name: 'Properties income',
      url: PATH_DASHBOARD.c_panel.user_business_report_landlord(user),
    },
    {
      name: 'Properties Monthly Income',
      url: PATH_DASHBOARD.c_panel.user_business_report_properties_monthly_income(user),
    },
    {
      name: 'Memberships',
      url: PATH_DASHBOARD.c_panel.user_business_report_landlord_memberships(user),
    },
    {
      name: 'Paid to Roomy',
      url: PATH_DASHBOARD.c_panel.user_business_report_landlord_paid_to_roomy(user),
    },
    {
      name: 'VAT',
      url: PATH_DASHBOARD.c_panel.user_business_report_landlord_vat_fee_payment(user),
    },
    {
      name: 'Maintenance Payments',
      url: PATH_DASHBOARD.c_panel.user_business_report_landlord_maintenance_payments(user),
    },

    {
      name: 'Preferred Payments Method',
      url: PATH_DASHBOARD.c_panel.user_business_report_landlord_preferred_payment_method(user),
    },
    {
      name: 'Preferences',
      url: PATH_DASHBOARD.c_panel.user_business_report_landlord_preferences(user),
    },
    {
      name: 'Chats',
      url: PATH_DASHBOARD.c_panel.user_business_report_landlord_chat_details(user),
    },
  ];

  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);
  const [areas, setAreas] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getAreas = async (id) => {
    try {
      const { data } = await axiosInstance.get(`${API_URL}/c_panel/tenant_property_areas/${id}`);
      setAreas(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAreas('user');
  }, [user]);

  const handleNavigateToReport = (area) => {
    navigate(PATH_DASHBOARD.c_panel.tenant_area_business_report('user', area));
  };

  const handleNavigateToCompitatorReport = (area) => {
    navigate(PATH_DASHBOARD.c_panel.compitator_area_business_report('user', area));
  };

  const handleNavigateToReport2 = (url) => {
    navigate(url);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" textAlign="center">
            Business Report
          </Typography>
        </Grid>

        {/* <Grid item xs={12}>
          <Typography
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(PATH_DASHBOARD.c_panel.user_business_report_landlord(userId))}
          >
            Landlord CRM
          </Typography>
        </Grid> */}

        <Grid item xs={12}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>Landlord CRM</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {landlordSections.map((section) => (
                <MenuItem key={section.name} onClick={() => handleNavigateToReport2(section.url)}>
                  <Typography>{section.name}</Typography>
                </MenuItem>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>Tenant</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {areas.map((area) => (
                <MenuItem key={area} onClick={() => handleNavigateToReport(area)}>
                  <Typography>{area}</Typography>
                </MenuItem>
              ))}
            </AccordionDetails>
          </Accordion>

          {/* competitor */}
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>Competitor</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {areas.map((area) => (
                <MenuItem key={area} onClick={() => handleNavigateToCompitatorReport(area)}>
                  <Typography>{area}</Typography>
                </MenuItem>
              ))}
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Container>
  );
}
