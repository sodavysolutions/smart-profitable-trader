import { redirect } from "next/navigation";

// Redirect to unified Leads & Conversations page
export default function ChatbotConversationsRedirect() {
  redirect("/spt/admin/leads?tab=ai_chatbot");
}
