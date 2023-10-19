export default function useGooglePlaces(link) {
  return new Promise((resolve, reject) => {
    let googleScript = document.querySelector(`script[src="${link}"]`);

    if (!googleScript) {
      googleScript = document.createElement('script');
      googleScript.src = `${link}&callback=initMap`;

      window.initMap = function () {
        console.log('Google Maps API is loaded');
      };

      googleScript.async = true;
      document.head.append(googleScript);

      googleScript.addEventListener('error', () => {
        reject();
      });

      googleScript.addEventListener('load', () => {
        resolve();
      });
    }
  });
}
