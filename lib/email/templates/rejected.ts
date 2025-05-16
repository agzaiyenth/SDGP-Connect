export function rejectedTemplate({ group_num, title,  reason }: { group_num: string; title: string; projectId: string; reason: string }) {
  return `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2>Hello ${group_num},</h2>
      <p>Your project titled "${title}" has been <span style="color: red; font-weight: bold;">rejected</span> at SDGP.</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <p></p>We appreciate your effort and encourage you to resubmit .</p>
      <br/>
      <p>Best regards,<br/>SDGP Team</p>
      if you think this is a mistake, please contact developer <a href="https://wa.me/+94774738649" style="color: #0070f3;">zion</a></p>
      <footer>
    </div>
  `;
}
