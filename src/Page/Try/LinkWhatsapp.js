import React, { useState } from "react";

const LinkWhatsapp = () => {
  const [typemessage, setTypeMessage] = useState("");

  const phoneNumber = "9122668359";

  const handleSubmit = () => {
    if (typemessage.trim() === "") {
      alert("Please enter a message.");
      return;
    }

    // Format the WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      typemessage
    )}`;

    // Set a timeout to send the message after 1 minute (60000 milliseconds)
    setTimeout(() => {
      console.log("bunty");

      // Confirm with the user before sending the message
      const userConfirmation = window.confirm(
        "Do you want to send this message to WhatsApp? If yes, click OK."
      );

      if (userConfirmation) {
        window.open(whatsappUrl, "_blank");
      }
    }, 60000); // 60000 milliseconds = 1 minute
  };

  return (
    <div>
      <input
        onChange={(e) => setTypeMessage(e.target.value)}
        value={typemessage}
        type="text"
        placeholder="Type your message"
      />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default LinkWhatsapp;
