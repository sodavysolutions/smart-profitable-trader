type MessagePayload = {
  recipient: string;
  title: string;
  body: string;
  tags?: string[];
};

export async function addSendySubscriber(payload: MessagePayload & { email: string }) {
  return {
    provider: "sendy",
    configured: Boolean(process.env.SENDY_API_KEY && process.env.SENDY_BASE_URL),
    action: "add_subscriber",
    payload
  };
}

export async function sendWhatsAppMessage(payload: MessagePayload) {
  return {
    provider: "whatsapp",
    configured: Boolean(process.env.WHATSAPP_API_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID),
    action: "send_template_or_message",
    payload
  };
}

export async function sendSmsMessage(payload: MessagePayload) {
  return {
    provider: "sms",
    configured: Boolean(process.env.SMS_API_KEY && process.env.SMS_SENDER_ID),
    action: "send_sms",
    payload
  };
}
