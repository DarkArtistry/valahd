"use client"
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './page.module.css'
import { styled } from '@mui/system';

const CustomAccordion = styled(Accordion)({
  color: 'rgba(236,236,241,1)',
  background: '#673ab7',
  });

export default function Introduction() {
  return (
    <div className={styles.introduction}>
      <CustomAccordion className={styles.accordian}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Introduction</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography variant="body1" gutterBottom>
          Valahd is an open-source platform designed for secure and privacy-focused market portfolio analysis. The name &apos;Valahd&apos; comes from the Dothraki language in the popular series Game of Thrones, where it means &apos;giddy up.&apos; It was famously used by Daenerys in season 5 when commanding her dragon, Drogon, to fly while she was surrounded by the Sons of the Harpy. Just as Daenerys took control in her moment of need, Valahd aims to give its users control over their investment data.
        </Typography>
        <br/><br/>
        <Typography variant="body1" gutterBottom>
          The color theme of Valahd is inspired by the vibrant hues of the unicorn emoji. This symbol of magic and wonder encapsulates the vision of Valahd - to create a tool that feels both exciting and intuitive, turning the often complex world of investment portfolio analysis into a delightful and empowering experience. With its playful yet sophisticated design, Valahd invites users to explore their data in a new light, offering a unique blend of functionality and aesthetics.
        </Typography>
        <br/><br/>
        <Typography variant="body1" gutterBottom>
          Funded by Amanda and Kim from Top-Value, Valahd operates locally on your machine, providing user control over data and privacy. It offers a range of and datas for all investment levels, and its open-source nature encourages community contributions. Amanda&apos;s and Kim&apos;s generous funding has been pivotal in bringing this tool to the public.
        </Typography>
        <br/><br/>
        <Typography variant="body1" gutterBottom>
          To start using Valahd, follow these steps: 
        </Typography>
        <br/><br/>
        <Typography variant="body1" gutterBottom>
          1. Select your desired benchmark currency.
        </Typography>
        <Typography variant="body1" gutterBottom>
          2. Select your cryptocurrencies of interests.
        </Typography>
        <Typography variant="body1" gutterBottom>
          3. Fetch Market Data.
        </Typography>
        <Typography variant="body1" gutterBottom>
          4. For enhanced security, generate a random secret key and store it securely.
        </Typography>
        <Typography variant="body1">
          5. Export the encrypted Valahd file for future use.
        </Typography>
        <br/><br/>
        <Typography variant="body1">
          When you wish to import the encrypted file in the future, make sure to enter your secret key first. This ensures your data remains secure and accessible only by you.
        </Typography>
        </AccordionDetails>
      </CustomAccordion>
    </div>
  );
}