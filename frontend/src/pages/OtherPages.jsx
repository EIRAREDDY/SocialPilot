
import {
  Workflow,
  Users,
  MessageCircle,
  Camera
} from "lucide-react";

const pageDetails = {
  automations: {
    title: "Automations",
    description: "Create and manage your Instagram and Facebook automation rules.",
    icon: Workflow
  },
  leads: {
    title: "Leads",
    description: "View and manage people who interact with your social channels.",
    icon: Users
  },
  conversations: {
    title: "Conversations",
    description: "Manage your social media conversations in one place.",
    icon: MessageCircle
  },
  instagram: {
    title: "Instagram",
    description: "Connect and manage your Instagram Professional account.",
    icon: Camera
  },
  facebook: {
    title: "Facebook",
    description: "Connect and manage your Facebook Page.",
    icon: MessageCircle
  }
};

function OtherPages({ type }) {
  const page = pageDetails[type];
  const Icon = page.icon;

  return (
    <div className="content-page">
      <div className="page-icon">
        <Icon size={28} />
      </div>

      <h1>{page.title}</h1>
      <p>{page.description}</p>

      <div className="coming-soon">
        <h3>Coming soon</h3>
        <p>We'll build this section step by step.</p>
      </div>
    </div>
  );
}

export default OtherPages;
