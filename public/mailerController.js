
const sendText = document.getElementById('mail');
let error = 0;
sendText.textContent = "Enviar"

async function sendMail(event) {

  const form = document.getElementById('contact-form');
  sendText.textContent = "Enviando..."
  const dataToSend = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  }

  try {

    if( dataToSend.name == '' || dataToSend.email == '' || dataToSend.name == '' ) {
      error = 1;
      throw new Error('Uno o más campos vacíos.');
    }

    const resp = await fetch('/api/contact', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });

    const response = await resp.json();
    console.log(response);
    if (response.success) {
      sendText.textContent = 'Mensaje enviado correctamente ✅';
      form.reset();
    } else {
      error = 2;
      throw new Error(response);
    }
  } catch (err) {
    switch (error) {
      case 1:
        sendText.textContent = 'Uno o más campos están vacíos ❌, intente otra vez';
      break;
      case 2:
        sendText.textContent = 'Error al enviar el mensaje ❌, intente otra vez!';
      break;
    }
    console.log(err);
  }

}