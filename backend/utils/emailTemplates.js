exports.productDeliveryEmail = ({ email, products }) => {
    const productList = products
      .map(
        p => `
        <li style="margin-bottom:12px;">
          <strong>${p.title}</strong>
          <ul>
            ${p.files
              .map(
                f =>
                  `<li><a href="${f.url}" target="_blank">${f.name}</a></li>`
              )
              .join("")}
          </ul>
        </li>`
      )
      .join("");
  
    return `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
        <h2>Your Digital Products Are Ready</h2>
        <p>Thank you for your purchase. You can access your files below:</p>
        <ul>${productList}</ul>
        <p style="margin-top:20px;">
          If you have any issues, reply to this email.
        </p>
        <hr/>
        <p style="font-size:12px;color:#666;">
          Digital A-Game • Learn. Build. Operate.
        </p>
      </div>
    `;
  };
  

  exports.webDiscoveryConfirmation = ({ name }) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
        <h2>We’ve Received Your Discovery Submission</h2>
  
        <p>Hi ${name},</p>
  
        <p>
          Thank you for taking the time to complete the Web & Digital Systems Discovery form.
          This already tells us you’re serious about building something structured and intentional.
        </p>
  
        <p>
          Here’s what happens next:
        </p>
  
        <ul>
          <li>We review your submission internally</li>
          <li>We assess complexity and alignment</li>
          <li>If aligned, we’ll schedule a 1-hour strategy session</li>
        </ul>
  
        <p>
          You can expect a response within 24–48 hours.
        </p>
  
        <hr />
  
        <p style="font-size: 12px; color:#666;">
          Digital A-Game • Strategy before design
        </p>
      </div>
    `;
  };
  