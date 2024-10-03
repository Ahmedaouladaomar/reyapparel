export default function generateStatusMailHtml(user: any, status: any) {
  return `<!DOCTYPE html>
          <html>
            <body>
              Hello dear ${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}, 
              <br><br>
              Your order status has been updated to <strong>${status}</strong>.
              <br><br>
              Feel free to reach out for any concern
              <br><br>
              Regards,
              <br>Reyapparel team
            </body>
          </html>`;
}
