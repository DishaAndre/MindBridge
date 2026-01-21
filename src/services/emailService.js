// Email service using Resend API
const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
const RESEND_API_URL = 'https://api.resend.com/emails';

export const emailService = {
  // Check if email service is properly configured
  isConfigured() {
    return RESEND_API_KEY && RESEND_API_KEY !== 'your_resend_api_key_here' && RESEND_API_KEY.length > 10;
  },

  // Send alert email to caregiver
  async sendAlertEmail(emailData) {
    if (!this.isConfigured()) {
      console.warn('Email service not configured, logging alert instead');
      this.logEmailFallback('Alert Email', emailData);
      return { success: false, message: 'Email service not configured' };
    }

    try {
      const response = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'MindBridge <alerts@mindbridge.app>',
          to: [emailData.to],
          subject: `MindBridge Alert: ${emailData.title}`,
          html: this.generateAlertEmailHTML(emailData),
          text: this.generateAlertEmailText(emailData)
        })
      });

      if (!response.ok) {
        throw new Error(`Email API error: ${response.status}`);
      }

      const result = await response.json();
      return { success: true, result };

    } catch (error) {
      console.error('Error sending alert email:', error);
      this.logEmailFallback('Alert Email (Failed)', emailData);
      throw error;
    }
  },

  // Send welcome email to new user
  async sendWelcomeEmail(userEmail, userName, userType) {
    if (!this.isConfigured()) {
      console.warn('Email service not configured, logging welcome email instead');
      this.logEmailFallback('Welcome Email', { to: userEmail, userName, userType });
      return { success: false, message: 'Email service not configured' };
    }

    try {
      const response = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'MindBridge <welcome@mindbridge.app>',
          to: [userEmail],
          subject: 'Welcome to MindBridge!',
          html: this.generateWelcomeEmailHTML(userName, userType),
          text: this.generateWelcomeEmailText(userName, userType)
        })
      });

      if (!response.ok) {
        throw new Error(`Email API error: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      console.error('Error sending welcome email:', error);
      this.logEmailFallback('Welcome Email (Failed)', { to: userEmail, userName, userType });
      throw error;
    }
  },

  // Send crisis alert email
  async sendCrisisAlertEmail(emailData) {
    if (!this.isConfigured()) {
      console.warn('Email service not configured, logging crisis alert instead');
      this.logEmailFallback('Crisis Alert Email', emailData);
      return { success: false, message: 'Email service not configured' };
    }

    try {
      const response = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'MindBridge Crisis <crisis@mindbridge.app>',
          to: [emailData.to],
          subject: '🚨 URGENT: Crisis Alert from MindBridge',
          html: this.generateCrisisEmailHTML(emailData),
          text: this.generateCrisisEmailText(emailData)
        })
      });

      if (!response.ok) {
        throw new Error(`Email API error: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      console.error('Error sending crisis alert email:', error);
      this.logEmailFallback('Crisis Alert Email (Failed)', emailData);
      throw error;
    }
  },

  // Fallback logging when email service is not configured
  logEmailFallback(type, data) {
    const emailLog = {
      type,
      timestamp: new Date().toISOString(),
      data,
      note: 'Email service not configured - logged instead of sent'
    };
    
    console.log('📧 Email Fallback:', emailLog);
    
    // Store in localStorage for demo purposes
    try {
      const existingLogs = JSON.parse(localStorage.getItem('emailLogs') || '[]');
      existingLogs.unshift(emailLog);
      localStorage.setItem('emailLogs', JSON.stringify(existingLogs.slice(0, 50))); // Keep last 50
    } catch (error) {
      console.error('Error storing email log:', error);
    }
  },

  // Generate HTML for alert email
  generateAlertEmailHTML(data) {
    const priorityColors = {
      critical: '#dc2626',
      high: '#ea580c',
      medium: '#d97706',
      low: '#65a30d'
    };

    const priorityColor = priorityColors[data.priority] || '#6b7280';

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MindBridge Alert</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">MindBridge Alert</h1>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <div style="background: ${priorityColor}; color: white; padding: 10px 15px; border-radius: 5px; display: inline-block; font-weight: bold; text-transform: uppercase; margin-bottom: 20px;">
                ${data.priority} Priority
            </div>
            
            <h2 style="color: #1f2937; margin-bottom: 15px;">${data.title}</h2>
            
            <p style="margin-bottom: 20px;"><strong>Individual:</strong> ${data.individualName}</p>
            <p style="margin-bottom: 20px;"><strong>Alert Type:</strong> ${data.alertType.replace('_', ' ').toUpperCase()}</p>
            <p style="margin-bottom: 20px;"><strong>Description:</strong> ${data.description}</p>
            <p style="margin-bottom: 30px;"><strong>Time:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h3 style="margin-top: 0; color: #374151;">What should you do?</h3>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>Check in with ${data.individualName} as soon as possible</li>
                    <li>Review their recent mood patterns in the caregiver dashboard</li>
                    <li>Consider reaching out via phone or in-person visit</li>
                    ${data.priority === 'critical' ? '<li><strong>If this is a crisis situation, contact emergency services immediately</strong></li>' : ''}
                </ul>
            </div>
            
            <div style="text-align: center;">
                <a href="https://mindbridge.app/caregiver-dashboard" style="background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">View Dashboard</a>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            
            <p style="font-size: 14px; color: #6b7280; text-align: center; margin: 0;">
                This alert was generated by MindBridge's AI monitoring system.<br>
                If you believe this is an error, please contact support.
            </p>
        </div>
    </body>
    </html>`;
  },

  // Generate text version of alert email
  generateAlertEmailText(data) {
    return `
MindBridge Alert - ${data.priority.toUpperCase()} Priority

${data.title}

Individual: ${data.individualName}
Alert Type: ${data.alertType.replace('_', ' ').toUpperCase()}
Description: ${data.description}
Time: ${new Date(data.timestamp).toLocaleString()}

What should you do?
- Check in with ${data.individualName} as soon as possible
- Review their recent mood patterns in the caregiver dashboard
- Consider reaching out via phone or in-person visit
${data.priority === 'critical' ? '- If this is a crisis situation, contact emergency services immediately' : ''}

View your dashboard: https://mindbridge.app/caregiver-dashboard

This alert was generated by MindBridge's AI monitoring system.
If you believe this is an error, please contact support.
    `;
  },

  // Generate welcome email HTML
  generateWelcomeEmailHTML(userName, userType) {
    const features = userType === 'caregiver' 
      ? ['Monitor individuals under your care', 'Receive real-time alerts', 'Access communication tools', 'View mood patterns and trends']
      : ['Track your emotions daily', 'Chat with AI companion 24/7', 'Access calming activities', 'Visualize your mood journey'];

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to MindBridge</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to MindBridge!</h1>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1f2937;">Hi ${userName}! 👋</h2>
            
            <p>Welcome to MindBridge, your comprehensive mental health support platform. We're excited to have you join our community!</p>
            
            <h3 style="color: #374151;">What you can do with MindBridge:</h3>
            <ul>
                ${features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                <h4 style="margin-top: 0; color: #1e40af;">Getting Started</h4>
                <p style="margin-bottom: 0;">
                    ${userType === 'caregiver' 
                      ? 'Visit your caregiver dashboard to set up monitoring for individuals under your care.'
                      : 'Start with your first emotion check-in to begin tracking your mental health journey.'
                    }
                </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://mindbridge.app/${userType === 'caregiver' ? 'caregiver-dashboard' : 'emotion-check-in-portal'}" 
                   style="background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                    Get Started
                </a>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            
            <p style="font-size: 14px; color: #6b7280; text-align: center; margin: 0;">
                Need help? Visit our <a href="https://mindbridge.app/platform-explanation-center" style="color: #3b82f6;">Help Center</a> or contact support.<br>
                You're receiving this email because you created a MindBridge account.
            </p>
        </div>
    </body>
    </html>`;
  },

  // Generate welcome email text
  generateWelcomeEmailText(userName, userType) {
    const features = userType === 'caregiver' 
      ? ['- Monitor individuals under your care', '- Receive real-time alerts', '- Access communication tools', '- View mood patterns and trends']
      : ['- Track your emotions daily', '- Chat with AI companion 24/7', '- Access calming activities', '- Visualize your mood journey'];

    return `
Welcome to MindBridge!

Hi ${userName}!

Welcome to MindBridge, your comprehensive mental health support platform. We're excited to have you join our community!

What you can do with MindBridge:
${features.join('\n')}

Getting Started:
${userType === 'caregiver' 
  ? 'Visit your caregiver dashboard to set up monitoring for individuals under your care.'
  : 'Start with your first emotion check-in to begin tracking your mental health journey.'
}

Get started: https://mindbridge.app/${userType === 'caregiver' ? 'caregiver-dashboard' : 'emotion-check-in-portal'}

Need help? Visit our Help Center: https://mindbridge.app/platform-explanation-center

You're receiving this email because you created a MindBridge account.
    `;
  },

  // Generate crisis email HTML
  generateCrisisEmailHTML(data) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>URGENT: Crisis Alert</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #dc2626; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🚨 CRISIS ALERT</h1>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <div style="background: #dc2626; color: white; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
                <h2 style="margin: 0; font-size: 20px;">IMMEDIATE ATTENTION REQUIRED</h2>
            </div>
            
            <p style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">
                Crisis indicators have been detected for ${data.individualName}.
            </p>
            
            <div style="background: #fef2f2; border: 2px solid #fca5a5; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h3 style="color: #dc2626; margin-top: 0;">IMMEDIATE ACTIONS REQUIRED:</h3>
                <ol style="margin: 0; padding-left: 20px; color: #7f1d1d;">
                    <li><strong>Contact ${data.individualName} immediately</strong></li>
                    <li><strong>If you cannot reach them, consider calling emergency services (911)</strong></li>
                    <li><strong>Crisis hotlines: 988 (Suicide & Crisis Lifeline)</strong></li>
                    <li><strong>Review the crisis details in your dashboard</strong></li>
                </ol>
            </div>
            
            <p><strong>Detection Time:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
            <p><strong>Confidence Level:</strong> ${data.confidenceLevel}%</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://mindbridge.app/caregiver-dashboard" 
                   style="background: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px;">
                    VIEW CRISIS DETAILS
                </a>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #6b7280;">
                <h4 style="margin-top: 0; color: #374151;">Crisis Resources:</h4>
                <ul style="margin: 0; padding-left: 20px;">
                    <li><strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988</li>
                    <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
                    <li><strong>Emergency Services:</strong> Call 911</li>
                    <li><strong>National Suicide Prevention Lifeline:</strong> 1-800-273-8255</li>
                </ul>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            
            <p style="font-size: 14px; color: #6b7280; text-align: center; margin: 0;">
                This is an automated crisis alert from MindBridge's AI monitoring system.<br>
                <strong>Time is critical - please act immediately.</strong>
            </p>
        </div>
    </body>
    </html>`;
  },

  // Generate crisis email text
  generateCrisisEmailText(data) {
    return `
🚨 URGENT: CRISIS ALERT 🚨

IMMEDIATE ATTENTION REQUIRED

Crisis indicators have been detected for ${data.individualName}.

IMMEDIATE ACTIONS REQUIRED:
1. Contact ${data.individualName} immediately
2. If you cannot reach them, consider calling emergency services (911)
3. Crisis hotlines: 988 (Suicide & Crisis Lifeline)
4. Review the crisis details in your dashboard

Detection Time: ${new Date(data.timestamp).toLocaleString()}
Confidence Level: ${data.confidenceLevel}%

VIEW CRISIS DETAILS: https://mindbridge.app/caregiver-dashboard

Crisis Resources:
- 988 Suicide & Crisis Lifeline: Call or text 988
- Crisis Text Line: Text HOME to 741741
- Emergency Services: Call 911
- National Suicide Prevention Lifeline: 1-800-273-8255

This is an automated crisis alert from MindBridge's AI monitoring system.
Time is critical - please act immediately.
    `;
  }
};
