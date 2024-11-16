import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { EmojiPeople, Message, EventNote, TrendingUp, InsertChart } from '@mui/icons-material';
import { API_URL } from '../../../../config-global';

export default function LandlordChatDetails() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/c_panel/business_report/landlord_chat_details/${userId}`
        );
        setChats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChatDetails();
  }, [userId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" align="center">
        {error}
      </Typography>
    );
  }

  const cards = [
    {
      title: 'Total Interactions',
      value: chats.totalInteractions,
      icon: <EmojiPeople fontSize="large" color="primary" />,
    },
    {
      title: 'Total Messages',
      value: chats.totalMessages,
      icon: <Message fontSize="large" color="primary" />,
      details: (
        <>
          <Typography>Sent: {chats.sentMessages}</Typography>
          <Typography>Received: {chats.receivedMessages}</Typography>
        </>
      ),
    },
    {
      title: 'Chat Response Rate',
      value: chats.responseRate,
      icon: <TrendingUp fontSize="large" color="primary" />,
    },
    {
      title: 'Daily Interactions',
      value: chats.dailyInteractions,
      icon: <Message fontSize="large" color="primary" />,
      details: (
        <>
          <Typography>Sent: {chats?.dailySentMessages || 0}</Typography>
          <Typography>Received: {chats?.dailyReceivedMessages || 0}</Typography>
        </>
      ),
    },
    {
      title: 'Weekly Interactions',
      value: chats.weeklyInteractions,
      icon: <EventNote fontSize="large" color="primary" />,
      details: (
        <>
          <Typography>Sent: {chats?.weeklySentMessages || 0}</Typography>
          <Typography>Received: {chats?.weeklyReceivedMessages || 0}</Typography>
        </>
      ),
    },
    {
      title: 'Monthly Interactions',
      value: chats.monthlyInteractions,
      icon: <EventNote fontSize="large" color="primary" />,
      details: (
        <>
          <Typography>Sent: {chats?.monthlySentMessages || 0}</Typography>
          <Typography>Received: {chats.monthlyReceivedMessages || 0}</Typography>
        </>
      ),
    },
    // {
    //   title: 'Daily Messages',
    //   value: `${chats.dailySentMessages} sent / ${chats.dailyReceivedMessages} received`,
    //   icon: <Message fontSize="large" color="primary" />,
    // },
    // {
    //   title: 'Weekly Messages',
    //   value: `${chats.weeklySentMessages} sent / ${chats.weeklyReceivedMessages} received`,
    //   icon: <Message fontSize="large" color="primary" />,
    // },
    // {
    //   title: 'Monthly Messages',
    //   value: `${chats.monthlySentMessages} sent / ${chats.monthlyReceivedMessages} received`,
    //   icon: <Message fontSize="large" color="primary" />,
    // },
    {
      title: 'Total Bookings',
      value: chats.totalBookings,
      icon: <InsertChart fontSize="large" color="primary" />,
    },
    {
      title: 'Bookings Increased',
      value: chats.increasedBookings,
      icon: <TrendingUp fontSize="large" color="primary" />,
    },
    {
      title: 'Property Views Increased',
      value: chats.propertyViewsIncreased,
      icon: <TrendingUp fontSize="large" color="primary" />,
    },
  ];

  const rowColors = ['#e3f2fd', '#ffccbc', '#e1bee7']; // Row colors for better visual distinction

  return (
    <Grid container spacing={3} padding={2}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom align="center">
          Landlord Chatting Details
        </Typography>
      </Grid>

      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{
              backgroundColor: rowColors[index % rowColors.length], // Apply alternating row colors
              borderRadius: 3,
              boxShadow: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '200px', // Adjust height for more consistent layout
              padding: 2,
              transition: '0.3s',
              '&:hover': {
                boxShadow: 8,
                transform: 'translateY(-5px)', // Add slight elevation on hover
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                {card.title}
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ margin: '12px 0' }}
              >
                <Typography variant="h4" sx={{ marginRight: 1 }}>
                  {card.value}
                </Typography>
                {card.icon}
              </Box>
              {card.details && <Box sx={{ marginTop: 1 }}>{card.details}</Box>}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
