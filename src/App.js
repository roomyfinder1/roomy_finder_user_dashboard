// i18n
import './locales/i18n';

// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
/* eslint-disable import/no-unresolved */
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// map
import './utils/mapboxgl';
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
// ----------------------------------------------------------------------

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// redux
import { Provider as ReduxProvider } from 'react-redux';

// routes
import Router from './routes';

// store
import { store } from './redux/store';
// theme
import ThemeProvider from './theme';
// locales
import ThemeLocalization from './locales';

// components
import { StyledChart } from './components/chart';
import SnackbarProvider from './components/snackbar';
import { ThemeSettings, SettingsProvider } from './components/settings';
import { MotionLazyContainer } from './components/animate';
import ScrollToTop from './components/scroll-to-top';

import { AuthProvider } from './auth/JwtContext';
import { ScrollProvider } from './auth/ScrollContext';
import Scrollbar from './components/scrollbar';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <SettingsProvider>
            <BrowserRouter>
              <Scrollbar>
                <ScrollToTop />
                <MotionLazyContainer>
                  <ThemeProvider>
                    <ThemeSettings>
                      <ThemeLocalization>
                        <SnackbarProvider>
                          <ScrollProvider>
                            <StyledChart />
                            <Router />
                          </ScrollProvider>
                        </SnackbarProvider>
                      </ThemeLocalization>
                    </ThemeSettings>
                  </ThemeProvider>
                </MotionLazyContainer>
              </Scrollbar>
            </BrowserRouter>
          </SettingsProvider>
        </ReduxProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}
