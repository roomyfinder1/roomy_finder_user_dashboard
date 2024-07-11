// pdf
import html2pdf from 'html2pdf.js';
import toast from 'react-hot-toast';
import { useRef, useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';

export const handleDownloadPdf = async (elementName, fileName) => {
  const element = document.getElementById(elementName);

  if (!element) {
    console.error('Element not found');
    return;
  }

  toast.success(`${fileName} is being download`);

  // Select all span elements with class 'image_component'
  const imageContainers = element.querySelectorAll('.image_component');
  // Collect all img elements inside these span elements
  const images = Array.from(imageContainers);

  const imageLoadPromises = images.map((img) => {
    if (img.complete && img.naturalHeight !== 0) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      img.onload = () => {
        resolve();
      };
      img.onerror = (error) => {
        console.error('Error loading image:', img.src, error);
        resolve(); // Resolve even on error to not block the PDF generation
      };
    });
  });

  // Save the original styles
  const originalStyle = {
    backgroundColor: element.style.backgroundColor,
    color: element.style.color,
  };

  // Apply temporary white background and black text
  element.style.backgroundColor = 'white';
  element.style.color = 'black';

  try {
    await Promise.all(imageLoadPromises);

    const opt = {
      // margin: 0.1,
      filename: `${fileName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { useCORS: true, scale: 2, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .finally(() => {
        // Revert to original styles
        element.style.backgroundColor = originalStyle.backgroundColor;
        element.style.color = originalStyle.color;
      });
  } catch (error) {
    console.log('Error generating PDF:', error);

    toast.error(`Error occur while downloading ${fileName}`);

    // Revert to original styles in case of error
    element.style.backgroundColor = originalStyle.backgroundColor;
    element.style.color = originalStyle.color;
  }
};

const usePrintPdf = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: '',
    onBeforePrint: () => {
      const element = componentRef.current;

      if (!element) {
        console.error('Element not found');
        return;
      }

      // Save the original styles
      element.dataset.originalBackgroundColor = element.style.backgroundColor;
      element.dataset.originalColor = element.style.color;

      // Apply temporary white background and black text
      element.style.backgroundColor = 'white';
      element.style.color = 'black';
    },
    onAfterPrint: () => {
      const element = componentRef.current;

      if (element) {
        // Revert to original styles after printing
        element.style.backgroundColor = element.dataset.originalBackgroundColor;
        element.style.color = element.dataset.originalColor;
      }
    },
  });

  const handlePrintWithToast = useCallback(
    async (elementName, fileName) => {
      const element = document.getElementById(elementName);

      if (!element) {
        console.error('Element not found');
        return;
      }

      toast.success(`${fileName} is being download`);

      // Select all span elements with class 'image_component'
      const imageContainers = element.querySelectorAll('.image_component');
      // Collect all img elements inside these span elements
      const images = Array.from(imageContainers);

      const imageLoadPromises = images.map((img) => {
        if (img.complete && img.naturalHeight !== 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          img.onload = () => {
            resolve();
          };
          img.onerror = (error) => {
            console.error('Error loading image:', img.src, error);
            resolve(); // Resolve even on error to not block the PDF generation
          };
        });
      });

      try {
        await Promise.all(imageLoadPromises);
        handlePrint();
      } catch (error) {
        console.log('Error generating PDF:', error);
        toast.error(`Error occurred while downloading ${fileName}`);
      }
    },
    [handlePrint]
  );

  return { handlePrintWithToast, componentRef };
};

export default usePrintPdf;
