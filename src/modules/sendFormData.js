export function sendFormData(formData) {
  const options = {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("http://localhost:3000", options)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        nameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
        messageInput.value = "";

        openModal(data.msg);
      } else if (data.status === "error") {
      }
    })
    .catch((error) => {
      console.error("Ошибка при отправке данных на сервер: " + error);
    });
}
