import { Container, Grid, MenuItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axiosInstance from '../../../utils/axios';
import { API_URL } from '../../../config-global';
import { PATH_DASHBOARD } from '../../../routes/paths';

export default function UserBusinessReportV2() {
  const { userId } = useParams();

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
    getAreas(userId);
  }, [userId]);

  const handleNavigateToReport = (area) => {
    navigate(PATH_DASHBOARD.c_panel.area_business_report(area));
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" textAlign="center">
            Business Report
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
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
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>Competitor</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Duabi</Typography>
              <Typography>Al Barsha</Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Container>
  );
}
