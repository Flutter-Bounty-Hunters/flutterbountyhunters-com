// Connects to EmailJS, which sends the Work With Us form without a server.

(function(){
   emailjs.init({
     publicKey: "fOv5J8j1CnmUDzs_1",
     limitRate: {
      // Set the limit rate for the application
      id: 'app',
      // Allow 1 request per 10s
      throttle: 10000,
    },
   });
})();
