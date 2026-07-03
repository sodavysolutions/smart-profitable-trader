import { redirect } from "next/navigation";

// Redirect to unified Leads & Conversations page filtered to AI Chatbot tab
export default function ChatbotLeadsRedirect() {
  redirect("/spt/admin/leads?tab=ai_chatbot");
}
