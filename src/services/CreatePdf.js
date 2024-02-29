import { Container, Button } from '@mui/material';
import PropTypes from 'prop-types';

// js pdf
import { jsPDF } from 'jspdf';
// eslint-disable-next-line import/no-extraneous-dependencies
import html2canvas from 'html2canvas';
import { useSettingsContext } from '../components/settings';

CreatePdf.propTypes = {
  title: PropTypes.string,
};

function CreatePdf({ title }) {
  const { themeStretch } = useSettingsContext();

  const createPDF = async () => {
    try {
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF('portrait', 'pt', 'a4');
      const data = await html2canvas(document.getElementById('PDF'));
      const img = data.toDataURL('image/png');
      const imgProperties = pdf.getImageProperties(img);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
      pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${title}.pdf`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth={themeStretch ? false : '90%'} sx={{ mb: 2 }}>
      <Button onClick={createPDF} sxm={{ my: 2 }}>
        Downloads As Pdf
      </Button>
    </Container>
  );
}

export default CreatePdf;
