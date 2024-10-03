export default function generateMailHtml(cart: any, user: any) {
  return `<!DOCTYPE html>
          <html>
            <head>
              <style>
                table {
                  margin-top: 10px;
                  font-family: Arial, Helvetica, sans-serif;
                  border-collapse: collapse;
                  width: 100%;
                }
                
                table td, table th {
                  border: 1px solid #ddd;
                  padding: 8px;
                }
                
                table tr:nth-child(even){background-color: #E7B421;}
                

                
                table th {
                  padding-top: 12px;
                  padding-bottom: 12px;
                  text-align: left;
                  background-color: #E7B421;
                  color: white;
                }
              </style>
            </head>
            <body>
              Hello dear ${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}, 
              <br><br>
              Thank you for your trust in our products, this a receipt of payment of your latest purchase.
              <table>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
                ${cart.items.map(
                  (item: any) =>
                    `<tr>
                      <td>${item.variant.product.name}</td>
                      <td>${item.variant.product.price}</td>
                      <td>${item.quantity}</td>
                    </tr>`
                )}
              </table>
              <br><br>
              <h2>Total paid: $${cart.totalPrice}</h2>
              <br><br>
              Feel free to reach out for any concern
              <br><br>
              Regards,
              <br>Reyapparel team
            </body>
          </html>`;
}
