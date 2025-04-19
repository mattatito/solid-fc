// Using strategy pattern
interface EmailNotification {
  send(to: string, message: string): void;
}

class SMTPEmailNotification implements EmailNotification {
  constructor(
    private smtpServer: string,
    private username: string,
    private password: string
  );

  send(to: string, message: string) {
    console.log(`SMTP: Sending email to ${to}`);
    console.log(
      `SMTP Config: Server=${this.smtpServer}, User=${this.username}`
    );
  }
}

class SESEmailNotification implements EmailNotification {
  constructor(
    private awsRegion: string,
    private awsAccessKey: string,
    private awsSecretKey: string
  );

  send(to: string, message: string) {
    console.log(`SES: Sending email to ${to}`);
    console.log(`SES Config: Region=${this.awsRegion}`);
  }
}

class SendGridEmailNotification implements EmailNotification {
  constructor(private apiKey: string) {}

  send(to: string, message: string): void {
    console.log(`SendGrid: Sending email to ${to}`);
    console.log(`SendGrid Config: API Key=${this.apiKey}`);
  }
}

// Using factory method
abstract class EmailNotificationFactory {
  abstract createNotification(): EmailNotification;

  sendEmail(to: string, message: string): void {
    const notification = this.createNotification();
    notification.send(to, message);
  }
}

class SMTPEmailNotificationFactory extends EmailNotificationFactory {
  createNotification(): EmailNotification {
    const smtpServer = process.env.SMTP_SERVER;
    const username = process.env.SMTP_USERNAME;
    const password = process.env.SMTP_PASSWORD;

    if (!smtpServer || !username || !password) {
      throw new Error(
        "Missing SMTP configuration: Please set SMTP_SERVER, SMTP_USERNAME, and SMTP_PASSWORD in the environment."
      );
    }
    return new SMTPEmailNotification(smtpServer, username, password);
  }
}

class SESEmailNotificationFactory extends EmailNotificationFactory {
  createNotification(): EmailNotification {
    const awsRegion = process.env.AWS_REGION;
    const awsAccessKey = process.env.AWS_ACCESS_KEY;
    const awsSecretKey = process.env.AWS_SECRET_KEY;

    if (!awsRegion || !awsAccessKey || !awsSecretKey) {
      throw new Error(
        "Missing AWS SES configuration: Please set AWS_REGION, AWS_ACCESS_KEY, and AWS_SECRET_KEY in the environment."
      );
    }
    return new SESEmailNotification(awsRegion, awsAccessKey, awsSecretKey);
  }
}

class SendGridEmailNotificationFactory extends EmailNotificationFactory {
  createNotification(): EmailNotification {
    const apiKey = process.env.SENDGRID_API_KEY;

    if (!apiKey) {
      throw new Error(
        "Missing SendGrid configuration: Please set SENDGRID_API_KEY in the environment."
      );
    }

    return new SendGridEmailNotification(apiKey);
  }
}

class EmailNotificationService2 {
  sendEmail(provider: EmailNotificationFactory): void {
    provider.sendEmail("user@example", "Hello via EmailNotificatioNService!");
  }
}

const notificationService = new EmailNotificationService2();

notificationService.sendEmail(new SMTPEmailNotificationFactory());
notificationService.sendEmail(new SESEmailNotificationFactory());
notificationService.sendEmail(new SendGridEmailNotificationFactory());
