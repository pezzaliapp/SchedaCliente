// Registrazione del service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
      console.log('ServiceWorker registrato con scope:', registration.scope);
    }, function(err) {
      console.error('ServiceWorker registrazione fallita:', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('clienteForm');
  const downloadSection = document.getElementById('downloadSection');
  const mulettoRadios = document.getElementsByName('muletto');
  const consegnaDiv = document.getElementById('consegnaDiv');

  // Mostra/nasconde l'opzione per la consegna in base alla scelta sul muletto
  mulettoRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'No' && radio.checked) {
        consegnaDiv.style.display = 'block';
      } else if (radio.value === 'Si' && radio.checked) {
        consegnaDiv.style.display = 'none';
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    let report = '';

    // Intestazione del report
    report += '--- Scheda Cliente ---\n\n';

    // Tipo di Cliente
    report += 'Tipo di Cliente: ' + formData.get('tipoCliente') + '\n\n';

    // Dati Anagrafici
    report += '--- Dati Anagrafici ---\n';
    report += 'Ragione Sociale: ' + formData.get('ragioneSociale') + '\n';
    report += 'Sede Legale: ' + formData.get('sedeLegale') + '\n';
    report += 'Sede Operativa: ' + formData.get('sedeOperativa') + '\n';
    report += 'Telefono: ' + formData.get('telefono') + '\n';
    report += 'Fax: ' + formData.get('fax') + '\n';
    report += 'Email: ' + formData.get('email') + '\n';
    report += 'Pec: ' + formData.get('pec') + '\n';
    report += 'Sito Internet: ' + formData.get('sitoInternet') + '\n\n';

    // Fatturazione
    report += '--- Fatturazione ---\n';
    report += 'Partita IVA: ' + formData.get('partitaIva') + '\n';
    report += 'Codice Fiscale: ' + formData.get('codiceFiscale') + '\n';
    report += 'Codice Univoco: ' + formData.get('codiceUnivoco') + '\n\n';

    // Banca
    report += '--- Banca ---\n';
    report += 'Banca d\'appoggio: ' + formData.get('banca') + '\n';
    report += 'Agenzia: ' + formData.get('agenzia') + '\n';
    report += 'IBAN: ' + formData.get('iban') + '\n\n';

    // Spedizione
    report += '--- Spedizione ---\n';
    report += 'Corriere convenzionato: ' + formData.get('corriere') + '\n';
    report += 'Disponete di muletto: ' + formData.get('muletto') + '\n';
    if (formData.get('muletto') === 'No') {
      report += 'Consegna: ' + formData.get('consegna') + '\n';
    }
    report += '\n';

    // Data
    report += 'Data: ' + formData.get('data') + '\n';

    // Creazione del file TXT
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    downloadSection.innerHTML = '<a href="' + url + '" download="SchedaCliente.txt">Scarica Report TXT</a>';
  });
});
