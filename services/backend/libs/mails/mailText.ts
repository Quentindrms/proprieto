export function createAccountHtml(userEmail: string): string {
	return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bienvenue sur Proprieto</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Manrope',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
    style="background-color:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
          style="max-width:560px;background-color:#f8fafc;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">

          <!-- Header -->
          <tr>
            <td style="background-color:#111827;padding:32px 40px;">
              <p style="margin:0;font-size:26px;font-weight:700;color:#f8fafc;letter-spacing:-0.5px;">
                Proprieto
              </p>
              <p style="margin:6px 0 0;font-size:13px;color:#94a3b8;font-weight:400;">
                Gestionnaire de propriété
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0f172a;">
                Bienvenue sur Proprieto&nbsp;!
              </p>
              <p style="margin:0 0 24px;font-size:15px;color:#64748b;line-height:1.6;">
                Votre compte a bien été créé pour l'adresse&nbsp;:
              </p>

              <!-- Email chip -->
              <table cellpadding="0" cellspacing="0" role="presentation"
                style="margin-bottom:28px;background-color:#e2e8f0;border-radius:10px;">
                <tr>
                  <td style="padding:12px 20px;font-size:14px;font-weight:600;color:#0f172a;">
                    ${userEmail}
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 28px;font-size:15px;color:#64748b;line-height:1.6;">
                Vous pouvez dès maintenant vous connecter à votre espace et commencer à gérer
                vos propriétés, contrats, clients et finances en un seul endroit.
              </p>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="background-color:#34d399;border-radius:12px;">
                    <a href="https://proprieto.quentin-derimais.fr/auth/login"
                      style="display:inline-block;padding:12px 28px;font-size:15px;font-weight:700;
                             color:#f8fafc;text-decoration:none;border-radius:12px;">
                      Accéder à mon espace
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
                Vous recevez cet e-mail car un compte Proprieto vient d'être créé avec votre adresse.<br />
                Si vous n'êtes pas à l'origine de cette action, ignorez simplement ce message.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
