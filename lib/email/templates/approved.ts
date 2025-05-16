export function approvedTemplate({ group_num, title, projectId }: { group_num: string; title: string; projectId: string }) {
  return `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2>Hello Team ${group_num},</h2>
      <p>Your project titled "${title}" has been <span style="color: green; font-weight: bold;">approved</span> at SDGP!</p>
      <p>You can view it here: <a href="https://sdgp.lk/project/${projectId}" style="color: #0070f3;">sdgp.lk/project/${projectId}</a></p>
      <br/>
      <p>If there are any issues, please contact developer <a href="https://wa.me/+94774738649" style="color: #0070f3;">zion</a></p>
      <p>Best regards,<br/>SDGP Team</p>
      <footer>
      </footer>
    </div>
  `;
}
