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
  